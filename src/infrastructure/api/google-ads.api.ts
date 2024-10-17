import { injectable } from "inversify";
import { startSpan } from "@sentry/nextjs";
import axios from "axios";

import { IGoogleAdsApi } from "@/src/application/api/google-ads.api.interface";
import { FetchHistoricalMetricsResponseGoogleAdsApi } from "@/src/application/api/google-ads.api.types";

@injectable()
export class GoogleAdsApi implements IGoogleAdsApi {
  async generateHistoricalMetrics(
    locationCode: string,
    languageCode: string,
    keywords: string[]
  ): Promise<FetchHistoricalMetricsResponseGoogleAdsApi[] | null> {
    return await startSpan(
      { name: "GoogleAdsApi > generateHistoricalMetrics" },
      async () => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/ads/historical-metrics`,
            {
              'country-code': locationCode,
              'language-code': languageCode,
              'keywords': keywords,
            }
          )

          return response.data.data.results;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    );
  }
}
