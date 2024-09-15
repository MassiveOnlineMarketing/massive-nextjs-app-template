import { getInjection } from "@/di/container";

import {
  DatabaseOperationError,
  NotFoundError,
} from "@/src/entities/errors/common";
import { InsufficientCreditsError } from "@/src/entities/errors/credits";

import { User } from "@/src/entities/models/user";

import { SerpResultMapper } from "@/src/interface-adapters/mappers/serp-result.mapper";
import { startSpan } from "@sentry/nextjs";

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
      const googleKeywordTrackerRepository = getInjection(
        "IGoogleKeywordTrackerRepository"
      );
      const websiteRepository = getInjection("IWebsiteRepository");
      const processGoogleKeywordsService = getInjection(
        "IProcessGoogleKeywordsService"
      );
      const usersRepository = getInjection("IUsersRepository");

      //Check if user has enough credits
      if (user.credits < keywords.length) {
        throw new InsufficientCreditsError("Not enough credits");
      }

      // Create keywords
      const googleKeywordTrackerKeywords =
        await googleKeywordTrackerRepository.addKeywords(
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

      const batchResults = await Promise.all(batchPromises);
      const results = batchResults.flat();

      // Format results
      const formattedResultsInserDTO =
        SerpResultMapper.toNewUserSerpResultInsertDTO(results);

      // Insert results
      await processGoogleKeywordsService.insertUserResult(
        formattedResultsInserDTO
      );

      // Deduct credits
      await usersRepository.deductCredits(user.id, results.length);

      return results;
    }
  );
}
