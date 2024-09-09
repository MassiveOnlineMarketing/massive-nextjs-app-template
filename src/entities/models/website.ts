import { z } from "zod";
import { selectLocationSchema } from "./location";
import { selectUserCoreSchema } from "./user"; // Import the lightweight user schema

// Core schema (without user relation)
const selectWebsiteCoreSchema = z.object({
  id: z.string(),
  userId: z.string(),
  websiteName: z.string().min(1, {
    message: "Website name is required",
  }),
  domainUrl: z.string().min(1, {
    message: "Domain URL is required",
  }),
  gscUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  
  location: z.array(selectLocationSchema),
});

// Main schema
export const websiteSchema = selectWebsiteCoreSchema.pick({
  id: true,
  userId: true,
  websiteName: true,
  domainUrl: true,
  gscUrl: true,
  createdAt: true,
  updatedAt: true,
});
export type Website = z.infer<typeof websiteSchema>;


// Back-end opperation schemas
const insetWebsiteSchema = selectWebsiteCoreSchema.pick({
  userId: true,
  websiteName: true,
  domainUrl: true,
  gscUrl: true,
});
export type WebsiteInsert = z.infer<typeof insetWebsiteSchema>;

const updateWebsiteSchema = selectWebsiteCoreSchema.pick({
  id: true,
  websiteName: true,
  domainUrl: true,
  gscUrl: true,
});
export type WebsiteUpdate = z.infer<typeof updateWebsiteSchema>;


// Use z.lazy to defer the evaluation of the user schema
export const selectWebsiteWithUserSchema = selectWebsiteCoreSchema.extend({
  user: z.lazy(() => selectUserCoreSchema), // Use core user schema without circular reference
});
export type WebsiteWithUser = z.infer<typeof selectWebsiteWithUserSchema>;

const selectWebsiteWithLocationSchema = selectWebsiteCoreSchema.extend({
  location:  z.lazy(() => z.array(selectLocationSchema)).nullable(),
});
export type WebsiteWithLocation = z.infer<typeof selectWebsiteWithLocationSchema>;



// Front-end schema
export const formInputCreateWebsiteSchema = selectWebsiteCoreSchema.pick({
  websiteName: true,
  domainUrl: true,
  gscUrl: true,
});

export const formInputUpdateWebsiteSchema = selectWebsiteCoreSchema.pick({
  id: true,
  websiteName: true,
  domainUrl: true,
  gscUrl: true,
});