import { GoogleKeywordTrackerKeyword } from "@/src/entities/models/google-keyword-tracker/keyword";
import { GoogleKeywordTracker, GoogleKeywordTrackerInsert, GoogleKeywordTrackerStatus, GoogleKeywordTrackerUpdate, GoogleKeywordTrackerWithCompetitors, GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation, GoogleKeywordTrackerWithWebsite } from "@/src/entities/models/google-keyword-tracker";
import { GoogleKeywordTrackerResult } from "@/src/entities/models/google-keyword-tracker/result";
import { GoogleKeywordTrackerKeywordTag } from "@/src/entities/models/google-keyword-tracker/tag";

export interface IGoogleKeywordTrackerRepository {
    insert(inputSchema: GoogleKeywordTrackerInsert): Promise<GoogleKeywordTracker>;
    update(updateSchema: GoogleKeywordTrackerUpdate, id: string): Promise<GoogleKeywordTracker>;
    delete(id: string): Promise<GoogleKeywordTracker>;
    addCompetitors(googleKeywordTrackerId: string, competitors: string[]): Promise<any>;
    removeCompetitors(competitorIds: string[]): Promise<any>;
    updateStatus(id: string, status: GoogleKeywordTrackerStatus): Promise<GoogleKeywordTracker>;

    findById(id: string): Promise<GoogleKeywordTracker | null>;
    findByIdWithWebsite(id: string): Promise<GoogleKeywordTrackerWithWebsite | null>;
    findByIdWithCompetitors(id: string): Promise<GoogleKeywordTrackerWithCompetitors| null>;
    findByIdWithCompetitorsWebsiteAndLocation(id: string): Promise<GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation | null>;
    findAllWithCompetitorsWebsiteAndLocation(): Promise<GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation[]>;
}