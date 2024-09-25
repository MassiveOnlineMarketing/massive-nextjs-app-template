import { FetchHistoricalMetricsResponseGoogleAdsApi } from "@/src/application/api/google-ads.api.types";
import { GoogleAdsKeywordMetricsInsert } from "@/src/entities/models/google-keyword-tracker/google-ads-keyword-metrics";
import { startSpan } from "@sentry/nextjs";


type ResponseWithIds = FetchHistoricalMetricsResponseGoogleAdsApi & { keywordId: string };

export class GoogleAdsApiMapper {
  static fromApiResponse(
    historicalMetrics: ResponseWithIds[]
  ): GoogleAdsKeywordMetricsInsert[] {
    return startSpan(
      { name: "GoogleAdsApiMapper > toHistoricalMetricsDBInsertDTO" },
      () => {
        if (!historicalMetrics) {
          return [];
        }

        return historicalMetrics.map((metric) => ({
          keywordId: metric.keywordId,
          avgMonthlySearches: metric.keyword_metrics.avg_monthly_searches,
          monthlySearchVolumes: metric.keyword_metrics.monthly_search_volumes,
          competition: metric.keyword_metrics.competition,
          competitionIndex: metric.keyword_metrics.competition_index,
          highTopOfPageBid: metric.keyword_metrics.high_top_of_page_bid_micros,
          lowTopOfPageBid: metric.keyword_metrics.low_top_of_page_bid_micros,
        }));
      }
    );
  }
}
