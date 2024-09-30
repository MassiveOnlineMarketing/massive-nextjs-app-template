import { injectable } from "inversify";
import { captureException, startSpan } from "@sentry/nextjs";
import axios from "axios";

import { ISerperApi } from "@/src/application/api/serper.api.interface";
import { SuccessfulSerpApiFetches } from "@/src/application/api/serper.api.types";

import { GoogleKeywordTrackerKeyword } from "@/src/entities/models/google-keyword-tracker/keyword";
import { mapSerperApiResponse } from "@/src/interface-adapters/mappers/serper-api.mappers";

@injectable()
export class SerperApi implements ISerperApi {
  async fetchSerpData(
    keywords: GoogleKeywordTrackerKeyword[],
    country: string,
    language: string,
    location: string | null,
    numberOfResults: number = 100
  ): Promise<SuccessfulSerpApiFetches[] | undefined> {
    return await startSpan({ name: "SerperApi > fetchSerpData" }, async () => {
      console.log("🟡 Fetching SERP data");

      console.log(
        " Keywords len:",
        keywords.length,
        " Country:",
        country,
        " Language:",
        language,
        " Location:",
        location
      );

      const data = JSON.stringify(
        keywords.map((keyword) => ({
          q: keyword.keyword,
          location: location ?? undefined,
          gl: country,
          hl: language,
          autrocorrect: false,
          num: numberOfResults,
        }))
      );

      const config = {
        method: "post",
        url: "https://google.serper.dev/search",
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json",
        },
        data: data,
      };

      try {
        const response = await axios(config);

        return mapSerperApiResponse(response.data, keywords);
      } catch (error) {
        console.error("🔴 Error fetching SERP data: ", error);
        captureException(error);
        return
      }
    });
  }
}
