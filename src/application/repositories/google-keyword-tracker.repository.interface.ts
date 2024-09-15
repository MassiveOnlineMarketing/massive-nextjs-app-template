import { GoogleKeywordTrackerKeyword } from "@/src/entities/models/google-keyword-tracker/keyword";
import { GoogleKeywordTracker, GoogleKeywordTrackerWithCompetitors, GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation, GoogleKeywordTrackerWithWebsite } from "@/src/entities/models/google-keyword-tracker";
import { GoogleKeywordTrackerResult } from "@/src/entities/models/google-keyword-tracker/result";

export interface IGoogleKeywordTrackerRepository {
    insert(inputSchema: any): Promise<any>;
    update(updateSchema: any): Promise<any>;
    delete(id: string): Promise<any>;

    findById(id: string): Promise<GoogleKeywordTracker | null>;
    findByIdWithWebsite(id: string): Promise<GoogleKeywordTrackerWithWebsite | null>;
    findByIdWithCompetitors(id: string): Promise<GoogleKeywordTrackerWithCompetitors| null>;
    findByIdWithCompetitorsWebsiteAndLocation(id: string): Promise<GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation | null>;
    findAllWithCompetitorsWebsiteAndLocation(): Promise<GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation[]>;

    findKeywordsByToolId(googleKeywordTrackerId: string): Promise<GoogleKeywordTrackerKeyword[]>
    findLatestResultsByKeywordIds(keywordIds: string[]): Promise<GoogleKeywordTrackerResult[]>;
    addKeywords(googleKeywordTrackerToolId: string, keywords: string[]): Promise<GoogleKeywordTrackerKeyword[]>;
}