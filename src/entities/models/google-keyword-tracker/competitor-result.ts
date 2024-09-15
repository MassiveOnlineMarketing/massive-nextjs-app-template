import { z } from "zod";

export const selectGoogleKeywordTrackerCompetitorResultCoreSchema = z.object({
    id: z.string(),
    competitorId: z.string(),
    keywordId: z.string(),
    position: z.number().nullable(),
    url: z.string().nullable(),
    metaTitle: z.string().nullable(),
    metaDescription: z.string().nullable(),
    createdAt: z.date(),
})

export const googleKeywordTrackerCompetitorResultSchema = selectGoogleKeywordTrackerCompetitorResultCoreSchema.pick({
    id: true,
    competitorId: true,
    keywordId: true,
    position: true,
    url: true,
    metaTitle: true,
    metaDescription: true,
    createdAt: true,
});

export type GoogleKeywordTrackerCompetitorResult = z.infer<typeof selectGoogleKeywordTrackerCompetitorResultCoreSchema>;

// Backend operation schemas
const insertGoogleKeywordTrackerSchema = selectGoogleKeywordTrackerCompetitorResultCoreSchema.pick({
    competitorId: true,
    keywordId: true,
    position: true,
    url: true,
    metaTitle: true,
    metaDescription: true,
});
export type GoogleKeywordTrackerCompetitorResultInsert = z.infer<typeof insertGoogleKeywordTrackerSchema>;