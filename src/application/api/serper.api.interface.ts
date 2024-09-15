import { GoogleKeywordTrackerKeyword } from "@/src/entities/models/google-keyword-tracker/keyword";
import { SuccessfulSerpApiFetches } from "./serper.api.types";


export interface ISerperApi {

    fetchSerpData:(keywords: GoogleKeywordTrackerKeyword[], country: string, language: string, location: string | null, numberOfResults?: number) => Promise<SuccessfulSerpApiFetches[] | undefined>;
}