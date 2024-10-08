import { GoogleKeywordTrackerKeyword } from "@/src/entities/models/google-keyword-tracker/keyword";
import { GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation } from "@/src/entities/models/google-keyword-tracker";
import { GoogleKeywordTrackerResult, GoogleKeywordTrackerResultInsert, GoogleKeywordTrackerResultTransferDTO } from "@/src/entities/models/google-keyword-tracker/result";

import { SerperApiSerpResult, SuccessfulSerpApiFetches } from "../api/serper.api.types";

import { GoogleKeywordTrackerSerpResultInsert } from "@/src/entities/models/google-keyword-tracker/serp-result";
import { GoogleKeywordTrackerCompetitorResultInsert } from "@/src/entities/models/google-keyword-tracker/competitor-result";
import { GoogleKeywordTrackerStatsInsert } from "@/src/entities/models/google-keyword-tracker/stats";
import { GoogleAdsKeywordMetricsInsert } from "@/src/entities/models/google-keyword-tracker/google-ads-keyword-metrics";


export interface IProcessGoogleKeywordsService {
    execute: (tool: GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation, keywords: GoogleKeywordTrackerKeyword[]) => Promise<{userResults: GoogleKeywordTrackerResultTransferDTO[], googleAdsMetrics: GoogleAdsKeywordMetricsInsert[]}>;
    findPositionInSerpData: (serp: SuccessfulSerpApiFetches, userDomain: string) => SerperApiSerpResult | undefined;
    topTenPositions: (serp: SuccessfulSerpApiFetches) => SerperApiSerpResult[];
    
    insertUserResult: (results: GoogleKeywordTrackerResultInsert[]) => Promise<GoogleKeywordTrackerResult[] | undefined>;
    insertCompetitorResult: (results: GoogleKeywordTrackerCompetitorResultInsert[]) => Promise<void>;
    insertTopTenResults: (results: GoogleKeywordTrackerSerpResultInsert[]) => Promise<void>;
    insertStats: (stats: GoogleKeywordTrackerStatsInsert) => Promise<void>;
}