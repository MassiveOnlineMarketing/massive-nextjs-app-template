import { injectable } from "inversify";

import { SERPER_API_RESPONSE } from "./serperRes";
import { ISerperApi } from "@/src/application/api/serper.api.interface";

import { GoogleKeywordTrackerKeyword } from "@/src/entities/models/google-keyword-tracker/keyword";

import { InitialSerpApiResponse, SuccessfulSerpApiFetches } from "@/src/application/api/serper.api.types";

@injectable() 
export class MockSerperApi implements ISerperApi {
  async fetchSerpData(
    keywords: GoogleKeywordTrackerKeyword[],
    country: string,
    language: string,
    location: string | null,
    numberOfResults: number = 100
  ): Promise<SuccessfulSerpApiFetches[] | undefined> {

    console.log('mocking fetchSerpData');
    console.log('data w/o keywords', country, language, location, numberOfResults);

    // Ensure keywords array is correctly populated
    if (!keywords || keywords.length === 0) {
      throw new Error("Keywords array is empty or undefined");
    }

    // Ensure the number of keywords matches the number of items in the response
    if (SERPER_API_RESPONSE.length !== keywords.length) {
      throw new Error("Mismatch between number of keywords and SERP API response items");
    }

    return SERPER_API_RESPONSE.map((data: InitialSerpApiResponse, index: number) => ({
      ...data,
      keyword: keywords[index],
    }));
  }
}


