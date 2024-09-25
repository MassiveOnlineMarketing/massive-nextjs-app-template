import { GoogleKeywordTrackerKeyword, GoogleKeywordTrackerKeywordWithResultsQuery } from "@/src/entities/models/google-keyword-tracker/keyword";
import { GoogleKeywordTrackerKeywordTag } from "@/src/entities/models/google-keyword-tracker/tag";

import { GoogleKeywordTrackerResult } from "@/src/entities/models/google-keyword-tracker/result";

export interface IGoogleKeywordTrackerKeywordsRepository {
    getKeywordsWithResultsByToolId(toolId: string): Promise<GoogleKeywordTrackerKeywordWithResultsQuery[]>;
    insertMany(googleKeywordTrackerToolId: string, keywords: string[]): Promise<GoogleKeywordTrackerKeyword[]>;
    deleteMany(ids: string[]): Promise<void>;
    findMany(ids: string[]): Promise<GoogleKeywordTrackerKeyword[]>;
    // findByToolId(googleKeywordTrackerId: string): Promise<GoogleKeywordTrackerKeyword[]>
    findLatestResultsByKeywordIds(keywordIds: string[]): Promise<GoogleKeywordTrackerResult[]>;

    insertTag(name: string): Promise<GoogleKeywordTrackerKeywordTag>;
    removeTag(tag: string, keywordIds: string[]): Promise<void>;
    addTag(tagId: string, keywordIds: string[]): Promise<void>;
    findTagByid(id: string): Promise<GoogleKeywordTrackerKeywordTag | null>;
    findTagByName(name: string): Promise<GoogleKeywordTrackerKeywordTag | null>;
}