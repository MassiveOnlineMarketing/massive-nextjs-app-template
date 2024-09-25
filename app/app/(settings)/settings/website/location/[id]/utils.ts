"use server";

import { LOCATION_LANGUAGE_OPTIONS } from "@/src/constants/locationLanguages";
import { LOCATION_COUNTRY_OPTIONS } from "@/src/constants/locationCountries";
import { LocationLocationOptions } from "@/src/constants/locationLocations";

export async function getLocation(location: string | null) {
  const response = await fetch("https://api.serper.dev/locations");
  const LOCATION_LOCATION_OPTIONS: LocationLocationOptions[] =
    await response.json();
  return LOCATION_LOCATION_OPTIONS.find((l) => l.canonicalName === location);
}

export async function getLanguage(languageCode: string | null) {
  return LOCATION_LANGUAGE_OPTIONS.find(
    (l) => l.googleId.toString() === languageCode
  );
}

export async function getCountry(country: string | null) {
  return LOCATION_COUNTRY_OPTIONS.find((c) => c.countryCode === country);
}

// utils/loadLocationOptions.ts
export const loadLocationOptions = async (): Promise<LocationLocationOptions[]> =>  {
  const response = await fetch("https://api.serper.dev/locations");
  const LOCATION_LOCATION_OPTIONS = await response.json();
  return LOCATION_LOCATION_OPTIONS;
};
