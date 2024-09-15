import { z } from "zod";

export const selectGoogleKeywordTrackerStatsCoreSchema = z.object({
    id: z.string(),
    googleKeywordTrackerToolId: z.string(),
    improved: z.number(),
    worsened: z.number(),
    total: z.number(),
    topThree: z.number(),
    topTen: z.number(),
    topHundred: z.number(),
    noChange: z.number(),
    notFound: z.number(),
    averagePosition: z.number(),
    createdAt: z.date(),
})

export const googleKeywordTrackerStatsSchema = selectGoogleKeywordTrackerStatsCoreSchema.pick({
    id: true,
    googleKeywordTrackerToolId: true,
    improved: true,
    worsened: true,
    total: true,
    topThree: true,
    topTen: true,
    topHundred: true,
    noChange: true,
    notFound: true,
    averagePosition: true,
    createdAt: true,
});

export type GoogleKeywordTrackerStats = z.infer<typeof selectGoogleKeywordTrackerStatsCoreSchema>;

const googleKeywordTrackerStatsInsertSchema = selectGoogleKeywordTrackerStatsCoreSchema.pick({
    googleKeywordTrackerToolId: true,
    improved: true,
    worsened: true,
    total: true,
    topThree: true,
    topTen: true,
    topHundred: true,
    noChange: true,
    notFound: true,
    averagePosition: true,
})
export type GoogleKeywordTrackerStatsInsert = z.infer<typeof googleKeywordTrackerStatsInsertSchema>;