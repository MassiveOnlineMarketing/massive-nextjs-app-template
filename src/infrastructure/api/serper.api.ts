import { injectable } from "inversify";
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
    console.log("🟡 Fetching SERP data");

    console.log("Keywords: ", keywords, "Country: ", country, "Language: ", language, "Location: ", location);

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
      // console.log("Response: ", response.data);

      return mapSerperApiResponse(response.data, keywords);
    } catch (error) {
      console.error("🔴 Error fetching SERP data: ", error);
    }
  }
}

