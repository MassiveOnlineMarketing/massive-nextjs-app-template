'use server';
// import { LOCATION_LOCATION_OPTIONS } from "@/src/constants/locationLocations";


import { LOCATION_LANGUAGE_OPTIONS } from "@/src/constants/locationLanguages";
import { LOCATION_COUNTRY_OPTIONS } from "@/src/constants/locationCountries";

export async function getLocation(location: string | null) {
    const { LOCATION_LOCATION_OPTIONS } = await import('@/src/constants/locationLocations');
    return LOCATION_LOCATION_OPTIONS.find(l => l.canonicalName === location);
}

export async function getLanguage(languageCode: string | null) {
    return LOCATION_LANGUAGE_OPTIONS.find(l => l.googleId.toString() === languageCode);
}

export async function getCountry(country: string | null) {
    return LOCATION_COUNTRY_OPTIONS.find(c => c.countryCode === country);
}

// utils/loadLocationOptions.ts
export const loadLocationOptions = async () => {
    const { LOCATION_LOCATION_OPTIONS } = await import('@/src/constants/locationLocations');
    return LOCATION_LOCATION_OPTIONS;
  };