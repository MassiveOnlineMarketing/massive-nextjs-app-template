import { FetchHistoricalMetricsResponseGoogleAdsApi } from "./google-ads.api.types";

export interface IGoogleAdsApi {
    generateHistoricalMetrics(locationCode: string, languageCode: string, keywords: string[]): Promise<FetchHistoricalMetricsResponseGoogleAdsApi[] | null>;
}