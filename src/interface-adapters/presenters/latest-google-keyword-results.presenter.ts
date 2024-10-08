import { startSpan } from "@sentry/nextjs";

import {
  SerpApiPeopleAsloAsk,
  SerpApiRelatedSearches,
} from "@/src/application/api/serper.api.types";
import { GoogleAdsKeywordMetricsInsert } from "@/src/entities/models/google-keyword-tracker/google-ads-keyword-metrics";
import { GoogleKeywordTrackerKeywordWithResultsQuery } from "@/src/entities/models/google-keyword-tracker/keyword";
import { GoogleKeywordTrackerResultTransferDTO } from "@/src/entities/models/google-keyword-tracker/result";
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

export class GoogleLatestResultPresenter {
  static toLatestKeywordResultDTO(
    googleKeywordTrackerKeywordWithResultsQuery: GoogleKeywordTrackerKeywordWithResultsQuery[]
  ): LatestGoogleKeywordResultsDto[] {
    return startSpan(
      { name: "GoogleLatestResultPresenter > toLatestKeywordResultDTO" },
      () => {
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

              createdAt: keyword.createdAt,
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
    );
  }

  static toLatestKeywordResultDTOFromUser(data: test[]): LatestGoogleKeywordResultsDto[] {
    return startSpan(
      { name: "GoogleLatestResultPresenter > toLatestKeywordResultDTOFromUser" },
      () => {
        return data.map((result) => {
          const googleAdsMetrics = result.googleAdsMetrics[0] || {};

          return {
            id: result.userResults[0].keywordId,
            keywordId: result.userResults[0].keywordId,
            keywordName: result.userResults[0].keywordName,
            position: result.userResults[0].position,
            url: result.userResults[0].url,
            metaTitle: result.userResults[0].metaTitle,
            metaDescription: result.userResults[0].metaDescription,
            firstPosition: result.userResults[0].position,
            bestPosition: result.userResults[0].position,
            latestChange: null,
            relatedSearches: result.userResults[0].relatedSearches,
            peopleAlsoAsk: result.userResults[0].peopleAlsoAsk,
            tags: [],

            avgMonthlySearches: googleAdsMetrics.avgMonthlySearches ?? null,
            competition: googleAdsMetrics.competition ?? null,
            competitionIndex: googleAdsMetrics.competitionIndex ?? null,
            highTopOfPageBid: googleAdsMetrics.highTopOfPageBid ?? null,
            lowTopOfPageBid: googleAdsMetrics.lowTopOfPageBid ?? null,

            createdAt: new Date(),
          };
        });
      }
    )
  }
}
type test = {
  userResults: GoogleKeywordTrackerResultTransferDTO[];
  googleAdsMetrics: GoogleAdsKeywordMetricsInsert[];
}