import { z } from "zod";

export const selectGoogleKeywordTrackerSerpResultCoreSchema = z.object({
    id: z.string(),
    keywordId: z.string(),
    position: z.number(),
    url: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string().nullable(),
    createdAt: z.date(),
})

export type GoogleKeywordTrackerSerpResult = z.infer<typeof selectGoogleKeywordTrackerSerpResultCoreSchema>;

// Backend operation schemas
const insertGoogleKeywordTrackerSerpResultSchema = selectGoogleKeywordTrackerSerpResultCoreSchema.pick({
    keywordId: true,
    position: true,
    url: true,
    metaTitle: true,
    metaDescription: true,
});
export type GoogleKeywordTrackerSerpResultInsert = z.infer<typeof insertGoogleKeywordTrackerSerpResultSchema>;