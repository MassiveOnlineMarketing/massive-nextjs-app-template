import { z } from "zod";

import { googleKeywordTrackerResultSchema } from "./result";
import { googleKeywordTrackerKeywordTagSchema } from "./tag";

export const selectGoogleKeywordTrackerKeywordCoreSchema = z.object({
  id: z.string(),
  googleKeywordTrackerToolId: z.string(),
  keyword: z.string(),
  createdAt: z.date(),
})

export const googleKeywordTrackerKeywordSchema = selectGoogleKeywordTrackerKeywordCoreSchema.pick({
  id: true,
  googleKeywordTrackerToolId: true,
  keyword: true,
  createdAt: true,
});

export type GoogleKeywordTrackerKeyword = z.infer<typeof googleKeywordTrackerKeywordSchema>;


// Backend operation schemas
export const selectGoogleKeywordTrackerKeywordWithResultsQuery = selectGoogleKeywordTrackerKeywordCoreSchema.extend({
  tags: z.lazy(() => z.array(googleKeywordTrackerKeywordTagSchema)),
  results: z.lazy(() => z.array(googleKeywordTrackerResultSchema)),
  // googleAdsKeywordMetrics: z.lazy(() => z.array(selectGoogleAdsKeywordMetricSchema)),
});
export type GoogleKeywordTrackerKeywordWithResultsQuery = z.infer<typeof selectGoogleKeywordTrackerKeywordWithResultsQuery>;