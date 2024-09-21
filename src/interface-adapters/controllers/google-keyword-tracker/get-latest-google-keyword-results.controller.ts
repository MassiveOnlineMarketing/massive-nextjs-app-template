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

  // avgMonthlySearches: string | null;
  // competition: string | null;
  // competitionIndex: string | null;
  // highTopOfPageBid: string | null;
  // lowTopOfPageBid: string | null;

  createdAt: Date;
};

function presenter(
  googleKeywordTrackerKeywordWithResultsQuery: GoogleKeywordTrackerKeywordWithResultsQuery[]
): LatestGoogleKeywordResultsDto[] {
  return googleKeywordTrackerKeywordWithResultsQuery.map((keyword) => {
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
      // avgMonthlySearches: keyword.,
      // competition: keyword.competition,
      // competitionIndex: keyword.competitionIndex,
      // highTopOfPageBid: keyword.highTopOfPageBid,
      // lowTopOfPageBid: keyword.lowTopOfPageBid,
      createdAt: keyword.createdAt,
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