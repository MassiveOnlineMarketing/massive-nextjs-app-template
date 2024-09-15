import { z } from "zod";

export const selectGoogleKeywordTrackerKeywordCoreSchema = z.object({
    id: z.string(),
    googleKeywordTrackerToolId: z.string(),
    keyword: z.string(),
    createdAt: z.date(),

    // results: z.array(selectGoogleKeywordTrackerResultSchema),
    // googleSerpResults: z.array(selectGoogleSerpResultSchema),
    // tags: z.array(selectGoogleKeywordTrackerKeywordTagSchema),
    // googleAdsKeywordMetrics: z.array(selectGoogleAdsKeywordMetricSchema)
})

export const googleKeywordTrackerKeywordSchema = selectGoogleKeywordTrackerKeywordCoreSchema.pick({
    id: true,
    googleKeywordTrackerToolId: true,
    keyword: true,
    createdAt: true,
});

export type GoogleKeywordTrackerKeyword = z.infer<typeof selectGoogleKeywordTrackerKeywordCoreSchema>;