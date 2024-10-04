import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { getLatestGoogleKeywordResultsUseCase } from "@/src/application/use-cases/google-keyword-tracker/keyword/get-latest-google-keyword-results.use-case";

import { SerpApiPeopleAsloAsk, SerpApiRelatedSearches } from "@/src/application/api/serper.api.types";
import { GoogleKeywordTrackerKeywordWithResultsQuery } from "@/src/entities/models/google-keyword-tracker/keyword";
import { GoogleKeywordTrackerKeywordTag } from "@/src/entities/models/google-keyword-tracker/tag";

export type LatestGoogleKeywordResultsDto = {
  id: string;
  keywordId: string;
  keywordName: string;
  position: number | null;
  url: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  firstPosition: number | null;
  bestPosition: number | null;
  latestChange: number | null;
  relatedSearches: SerpApiRelatedSearches[] | null;
  peopleAlsoAsk: SerpApiPeopleAsloAsk[] | null;
  tags: GoogleKeywordTrackerKeywordTag[];

  avgMonthlySearches: string | null;
  competition: string | null;
  competitionIndex: string | null;
  highTopOfPageBid: string | null;
  lowTopOfPageBid: string | null;

  createdAt: Date;
};

function presenter(
  googleKeywordTrackerKeywordWithResultsQuery: GoogleKeywordTrackerKeywordWithResultsQuery[]
): LatestGoogleKeywordResultsDto[] {
  return googleKeywordTrackerKeywordWithResultsQuery.map((keyword) => {
    const googleAdsMetrics = keyword.googleAdsKeywordMetrics[0] || {};

    if (!keyword.results[0]) {
      // console.error('Error: keyword.results[0] is undefined for keyword:', keyword);
      return {
        id: keyword.id,
        keywordId: keyword.id,
        keywordName: keyword.keyword,
        position: null,
        url: null,
        metaTitle: null,
        metaDescription: null,
        firstPosition: null,
        bestPosition: null,
        latestChange: null,
        relatedSearches: null,
        peopleAlsoAsk: null,
        tags: keyword.tags,

        avgMonthlySearches: googleAdsMetrics.avgMonthlySearches ?? null,
        competition: googleAdsMetrics.competition ?? null,
        competitionIndex: googleAdsMetrics.competitionIndex ?? null,
        highTopOfPageBid: googleAdsMetrics.highTopOfPageBid ?? null,
        lowTopOfPageBid: googleAdsMetrics.lowTopOfPageBid ?? null,

        createdAt: keyword.createdAt
      }; // or handle the error as needed
    }

    return {
      id: keyword.results[0].id,
      keywordId: keyword.id,
      keywordName: keyword.keyword,
      position: keyword.results[0].position,
      url: keyword.results[0].url,
      metaTitle: keyword.results[0].metaTitle,
      metaDescription: keyword.results[0].metaDescription,
      firstPosition: keyword.results[0].firstPosition,
      bestPosition: keyword.results[0].bestPosition,
      latestChange: keyword.results[0].latestChange,
      relatedSearches: keyword.results[0].relatedSearches,
      peopleAlsoAsk: keyword.results[0].peopleAlsoAsk,
      tags: keyword.tags,

      avgMonthlySearches: googleAdsMetrics.avgMonthlySearches ?? null,
      competition: googleAdsMetrics.competition ?? null,
      competitionIndex: googleAdsMetrics.competitionIndex ?? null,
      highTopOfPageBid: googleAdsMetrics.highTopOfPageBid ?? null,
      lowTopOfPageBid: googleAdsMetrics.lowTopOfPageBid ?? null,

      createdAt: keyword.results[0].createdAt,
    };
  });
}

export async function getLatestGoogleKeywordResultsController(
  id: string
): Promise<LatestGoogleKeywordResultsDto[]> {
  return await startSpan(
    { name: "getLatestGoogleKeywordResults Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();
      

      return await getLatestGoogleKeywordResultsUseCase(id, user).then(presenter);
    }
  );
}