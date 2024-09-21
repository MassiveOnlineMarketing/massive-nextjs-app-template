import { AxiosResponse } from "axios";
import { FetchHistoricalMetricsResponseGoogleAdsApi } from "./google-ads.api.types";

export interface IGoogleAdsApi {
    generateHistoricalMetrics(country_code: string, language_code: string, keywordString: string[]): Promise<FetchHistoricalMetricsResponseGoogleAdsApi[] | null>;
}