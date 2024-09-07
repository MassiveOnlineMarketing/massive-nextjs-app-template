import { z } from "zod";


// Back-end schema

export const selectWebsiteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  websiteName: z.string().min(3),
  domainUrl: z.string().min(3),
  gscUrl: z.union([z.string(), z.null()]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Website = z.infer<typeof selectWebsiteSchema>;

const insetWebsiteSchema = selectWebsiteSchema.pick({
  userId: true,
  websiteName: true,
  domainUrl: true,
  gscUrl: true,
});

export type WebsiteInsert = z.infer<typeof insetWebsiteSchema>;

const updateWebsiteSchema = selectWebsiteSchema.pick({
  id: true,
  websiteName: true,
  domainUrl: true,
  gscUrl: true,
});

export type WebsiteUpdate = z.infer<typeof updateWebsiteSchema>;