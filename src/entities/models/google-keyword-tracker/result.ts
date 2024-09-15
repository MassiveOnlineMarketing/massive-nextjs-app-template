import { z } from "zod";

export const selectGoogleKeywordTrackerResultCoreSchema = z.object({
  id: z.string(),
  keywordId: z.string(),
  keywordName: z.string(),
  position: z.number().nullable(),
  url: z.string().nullable(),
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  firstPosition: z.number().nullable(),
  bestPosition: z.number().nullable(),
  latestChange: z.number().nullable(),
  createdAt: z.date(),

  relatedSearches: z.array(z.object({ query: z.string() })).nullable(),
  peopleAlsoAsk: z.array(
    z.object({
      link: z.string(),
      title: z.string(),
      snippet: z.string(),
      question: z.string(),
    })
  ).nullable(),
  siteLinks: z.array(
    z.object({
      link: z.string(),
      title: z.string(),
    })
  ).nullable(),
});


export const googleKeywordTrackerResultSchema = selectGoogleKeywordTrackerResultCoreSchema.pick({
  id: true,
  keywordId: true,
  keywordName: true,
  position: true,
  url: true,
  metaTitle: true,
  metaDescription: true,
  firstPosition: true,
  bestPosition: true,
  latestChange: true,
  createdAt: true,
  relatedSearches: true,
  peopleAlsoAsk: true,
  siteLinks: true,
});

export type GoogleKeywordTrackerResult = z.infer<typeof googleKeywordTrackerResultSchema>;


// Backend data transfer objects
const googleKeywordTrackerResultTransferDTO = selectGoogleKeywordTrackerResultCoreSchema.pick({
  keywordId: true,
  keywordName: true,
  position: true,
  url: true,
  metaTitle: true,
  metaDescription: true,
  relatedSearches: true,
  peopleAlsoAsk: true,
  siteLinks: true,
});
export type GoogleKeywordTrackerResultTransferDTO = z.infer<typeof googleKeywordTrackerResultTransferDTO>;


// Backend operation schemas
const insertGoogleKeywordTrackerResultSchema = selectGoogleKeywordTrackerResultCoreSchema.pick({
  keywordId: true,
  keywordName: true,
  position: true,
  url: true,
  metaTitle: true,
  metaDescription: true,
  firstPosition: true,
  bestPosition: true,
  latestChange: true,
  relatedSearches: true,
  peopleAlsoAsk: true,
  siteLinks: true,
});
export type GoogleKeywordTrackerResultInsert = z.infer<typeof insertGoogleKeywordTrackerResultSchema>;


