import { z } from "zod";

export const selectGoogleKeywordTrackerKeywordTagCoreSchema = z.object({
    id: z.string(),
    name: z.string(),
    // keywords: z.array(selectGoogleKeywordTrackerKeywordSchema)
})

export const googleKeywordTrackerKeywordTagSchema = selectGoogleKeywordTrackerKeywordTagCoreSchema.pick({
    id: true,
    name: true,
});

export type GoogleKeywordTrackerKeywordTag = z.infer<typeof selectGoogleKeywordTrackerKeywordTagCoreSchema>;