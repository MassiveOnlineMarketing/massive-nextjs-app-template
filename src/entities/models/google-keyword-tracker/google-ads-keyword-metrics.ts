import { z } from "zod";

const selectGoogleAdsKeywordMetricCoreSchema = z.object({
    id: z.string(),
    keywordId: z.string(),
    avgMonthlySearches: z.string().nullable(),
    monthlySearchVolumes: z.array(z.object({
        month: z.string(),
        monthly_searches: z.string(),
        year: z.string(),
    })).nullable(),
    competition: z.string().nullable(),
    competitionIndex: z.string().nullable(),
    highTopOfPageBid: z.string().nullable(),
    lowTopOfPageBid: z.string().nullable(),
    createdAt: z.date(),
})

export const googleAdsKeywordMetricsSchema = selectGoogleAdsKeywordMetricCoreSchema.pick({
    id: true,
    keywordId: true,
    avgMonthlySearches: true,
    monthlySearchVolumes: true,
    competition: true,
    competitionIndex: true,
    highTopOfPageBid: true,
    lowTopOfPageBid: true,
    createdAt: true,
});
export type GoogleAdsKeywordMetrics = z.infer<typeof googleAdsKeywordMetricsSchema>;


// Backend operation schemas
const insertGoogleAdsKeywordMetricSchema = selectGoogleAdsKeywordMetricCoreSchema.pick({
    keywordId: true,
    avgMonthlySearches: true,
    monthlySearchVolumes: true,
    competition: true,
    competitionIndex: true,
    highTopOfPageBid: true,
    lowTopOfPageBid: true,
});
export type GoogleAdsKeywordMetricsInsert = z.infer<typeof insertGoogleAdsKeywordMetricSchema>;