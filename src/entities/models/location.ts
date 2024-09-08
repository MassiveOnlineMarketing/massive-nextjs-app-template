import { z } from "zod";

export const selectLocationSchema = z.object({
  id: z.string(),
  websiteId: z.string(),
  keywordTrackerToolId: z.union([z.string(), z.null()]),
  language: z.string(),
  languageCode: z.string(),
  country: z.string(),
  location: z.union([z.string(), z.null()]),
  locationCode: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Location = z.infer<typeof selectLocationSchema>;