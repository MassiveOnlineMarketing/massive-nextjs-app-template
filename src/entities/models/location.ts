import { LOCATION_COUNTRY_OPTIONS, LocationCountryOption } from "@/src/constants/locationCountries";
import { LOCATION_LANGUAGE_OPTIONS, LocationLanguageOption } from "@/src/constants/locationLanguages";
import { LOCATION_LOCATION_OPTIONS, LocationLocationOptions } from "@/src/constants/locationLocations";
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


// Back-end opperation schemas
const insertLocationSchema = selectLocationSchema.pick({
  websiteId: true,
  language: true,
  languageCode: true,
  country: true,
  location: true,
  locationCode: true,
});
export type LocationInsert = z.infer<typeof insertLocationSchema>;

const updateLocationSchema = selectLocationSchema.pick({
  id: true,
  websiteId: true,
  language: true,
  languageCode: true,
  country: true,
  location: true,
  locationCode: true,
});
export type LocationUpdate = z.infer<typeof updateLocationSchema>;

// Front-end form input schema
const languageSchema = z.object({
  countryCode: z.string(),
  name: z.string(),
  googleId: z.number(), 
})
const locationSchema = z.object({
  name: z.string(),
  canonicalName: z.string(),
  googleId: z.number(),
  countryCode: z.string(),
  targetType: z.string(),
})
const countrySchema = z.object({
  countryCode: z.string(),
  name: z.string(),
  googleId: z.number(),
})

export const formInputCreateLocationSchema = selectLocationSchema.extend({
  location: locationSchema.optional(),
  country: countrySchema || locationSchema,
  language: languageSchema,
}).pick({
  websiteId: true,
  location: true,
  country: true,
  language: true,
})

export const formInputUpdateLocationSchema = selectLocationSchema.extend({
  location: locationSchema.optional(),
  country: countrySchema || locationSchema,
  language: languageSchema,
}).pick({
  id: true,
  websiteId: true,
  location: true,
  country: true,
  language: true,
})