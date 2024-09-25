import { injectable } from "inversify";
import { startSpan } from "@sentry/nextjs";
import axios from "axios";

import { IGoogleAdsApi } from "@/src/application/api/google-ads.api.interface";
import { FetchHistoricalMetricsResponseGoogleAdsApi } from "@/src/application/api/google-ads.api.types";

@injectable()
export class GoogleAdsApi implements IGoogleAdsApi {
  async generateHistoricalMetrics(
    country_code: string,
    language_code: string,
    keywords: string[]
  ): Promise<FetchHistoricalMetricsResponseGoogleAdsApi[] | null> {
    return await startSpan(
      { name: "GoogleAdsApi > generateHistoricalMetrics" },
      async () => {
        try {
          // make api call to adsApi to get the keyword metrices
          const keywordString = keywords.join(',');
          const encodedKeywords = encodeURIComponent(keywordString);
          const url = `${
            process.env.NEXT_PUBLIC_PYTHON_API_URL
          }/historical-metrics?country-code=${country_code}&language-code=${language_code}&keywords=${encodedKeywords}`;
          console.log("reqUrl", url);
          const res = await axios(url);
          // console.log("res.data.results", res.data.results);
          return res.data.results;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    );
  }
}
