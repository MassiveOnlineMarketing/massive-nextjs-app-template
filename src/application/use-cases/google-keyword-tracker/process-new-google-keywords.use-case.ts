import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import {
  DatabaseOperationError,
  NotFoundError,
} from "@/src/entities/errors/common";
import { InsufficientCreditsError } from "@/src/entities/errors/credits";

import { User } from "@/src/entities/models/user";

import { SerpResultMapper } from "@/src/interface-adapters/mappers/serp-result.mapper";
import { GoogleLatestResultPresenter } from "@/src/interface-adapters/presenters/latest-google-keyword-results.presenter";

import { GoogleAdsKeywordMetricsInsert } from "@/src/entities/models/google-keyword-tracker/google-ads-keyword-metrics";
import { Prisma } from "@prisma/client";
import { db } from "@/prisma";
import { GoogleAdsApiMapper } from "@/src/interface-adapters/mappers/google-ads.mappers";
import { GoogleKeywordTrackerKeyword } from "@/src/entities/models/google-keyword-tracker/keyword";

const BATCH_SIZE = 99;
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function processNewGoogleKeywordUseCase(
  googleKeywordTrackerToolId: string,
  keywords: string[],
  user: User
) {
  return await startSpan(
    { name: "processNewGoogleKeyword Use Case" },
    async () => {
      const googleKeywordTrackerRepository = getInjection("IGoogleKeywordTrackerRepository");
      const websiteRepository = getInjection("IWebsiteRepository");
      const processGoogleKeywordsService = getInjection("IProcessGoogleKeywordsService");
      const usersRepository = getInjection("IUsersRepository");
      const googleKeywordTrackerKeywordsRepository = getInjection('IGoogleKeywordTrackerKeywordsRepository');

      //Check if user has enough credits
      if (user.credits < keywords.length) {
        throw new InsufficientCreditsError("Not enough credits");
      }

      // Create keywords
      const googleKeywordTrackerKeywords =
        await googleKeywordTrackerKeywordsRepository.insertMany(
          googleKeywordTrackerToolId,
          keywords
        );
      if (!googleKeywordTrackerKeywords) {
        throw new DatabaseOperationError("Failed to add keywords");
      }

      const googleKeywordTrackerTool =
        await googleKeywordTrackerRepository.findByIdWithCompetitorsWebsiteAndLocation(
          googleKeywordTrackerToolId
        );
      if (!googleKeywordTrackerTool) {
        throw new NotFoundError("Google keyword tracker tool not found");
      }

      const website = await websiteRepository.getById(
        googleKeywordTrackerTool.websiteId
      );
      if (!website) {
        throw new NotFoundError("Website not found");
      }

      // Process keywords
      const batchPromises = [];

      for (
        let i = 0;
        i < googleKeywordTrackerKeywords.length;
        i += BATCH_SIZE
      ) {
        const batch = googleKeywordTrackerKeywords.slice(i, i + BATCH_SIZE);

        const batchPromise = delay((i / BATCH_SIZE) * 1000).then(() =>
          processGoogleKeywordsService.execute(googleKeywordTrackerTool, batch)
        );
        batchPromises.push(batchPromise);
      }

      const batchResults = (await Promise.all(batchPromises)).flat();

      // Format results
      const formattedResultsInserDTO =
        SerpResultMapper.toNewUserSerpResultInsertDTO(batchResults);

      // Insert results
      await processGoogleKeywordsService.insertUserResult(
        formattedResultsInserDTO
      );

      // Deduct credits
      await usersRepository.deductCredits(user.id, batchResults.length);

      // Handle Google Ads Historical Metrics
      const googleAdsMetrics = await generateGoogleAdsHistoricalMetrics(
        googleKeywordTrackerTool.location.locationCode,
        googleKeywordTrackerTool.location.languageCode,
        googleKeywordTrackerKeywords
      )

      

      return GoogleLatestResultPresenter.toLatestKeywordResultDTOFromUserAndAds(batchResults, googleAdsMetrics);
    }
  );
}


async function insertGoogleAdsMetrics(GoogleAdsMetrics: GoogleAdsKeywordMetricsInsert[]): Promise<void> {
  const formattedMetrics = GoogleAdsMetrics.map((metric) => ({
    ...metric,
    monthlySearchVolumes: metric.monthlySearchVolumes
      ? JSON.stringify(metric.monthlySearchVolumes)
      : Prisma.JsonNull,
  }));


  await db.googleAdsKeywordMetrics.createMany({
    data: formattedMetrics,
  })
}

async function generateGoogleAdsHistoricalMetrics(
  country_code: string,
  language_code: string,
  keywords: GoogleKeywordTrackerKeyword[]
): Promise<GoogleAdsKeywordMetricsInsert[]> {
  return await startSpan(
    { name: "processNewGoogleKeyword Use Case > generateGoogleAdsHistoricalMetrics" },
    async () => {
      const keywordIdMap = keywords.reduce<{ [key: string]: string }>(
        (map, keyword) => {
          map[keyword.keyword] = keyword.id;
          return map;
        },
        {}
      );
      // Not implemented yet
      const keywordString = keywords.map((keyword) => keyword.keyword);

      const googleAdsApi = getInjection('IGoogleAdsApi')

      const googleAdsMetrics =
        await googleAdsApi.generateHistoricalMetrics(
          country_code,
          language_code,
          keywordString
        );

      if (!googleAdsMetrics) {
        throw new Error("🔴  Failed to fetch google ads metrics");
      }

      const filteredAdsMetrics = googleAdsMetrics
        .filter((metric) => keywordIdMap[metric.text] !== undefined)
        .map((metric) => {
          return {
            keywordId: keywordIdMap[metric.text],
            ...metric,
          };
        });

      console.log("🟢 Google Ads Metrics", filteredAdsMetrics.length);

      const GoogleAdsKeywordMetricsInsert = GoogleAdsApiMapper.fromApiResponse(filteredAdsMetrics);
      insertGoogleAdsMetrics(GoogleAdsKeywordMetricsInsert);

      return GoogleAdsKeywordMetricsInsert;
    }
  );
}

