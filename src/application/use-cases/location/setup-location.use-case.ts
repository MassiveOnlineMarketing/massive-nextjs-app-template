import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { NotFoundError } from "@/src/entities/errors/common";

import { DayOfWeek } from "@/src/entities/models/google-keyword-tracker";
import { User } from "@/src/entities/models/user";
import { Location } from "@/src/entities/models/location";

import { addCompetitorsUseCase } from "../google-keyword-tracker/add-competitors";

/**
 * Sets up a location and its associated Google Keyword Tracker.
 *
 * @param locationInput - The input data for the location.
 * @param locationInput.websiteId - The ID of the website.
 * @param locationInput.language - The language of the location.
 * @param locationInput.languageCode - The language code of the location.
 * @param locationInput.country - The country of the location.
 * @param locationInput.location - The name of the location (can be null).
 * @param locationInput.locationCode - The code of the location.
 * 
 * @param keywordTrackerInput - The input data for the keyword tracker.
 * @param keywordTrackerInput.refresh - The days of the week to refresh the keyword tracker.
 * @param keywordTrackerInput.addCompetitors - Optional array of competitor IDs to add.
 * 
 * @param user - The user performing the setup.
 * 
 * @returns A promise that resolves to the created location with the associated keyword tracker tool ID.
 * 
 * @throws NotFoundError - If the website is not found.
 */
export async function setupLocationUseCase(
  locationInput: {
    websiteId: string;
    language: string;
    languageCode: string;
    country: string;
    location: string | null;
    locationCode: string;
  },
  keywordTrackerInput: {
    refresh: DayOfWeek[];
    addCompetitors?: string[] | undefined;
  },
  user: User
): Promise<Location> {
  return await startSpan(
    { name: "setupLocation Use Case", op: "function" },
    async () => {
      const locationRepository = getInjection("ILocationRepository");
      const websiteRepository = getInjection("IWebsiteRepository");
      const googleKeywordTrackerRepository = getInjection('IGoogleKeywordTrackerRepository');
      const authenticationService = getInjection("IAuthenticationService");

      // Validate if website exists and if user has access to it
      const website = await websiteRepository.getById(locationInput.websiteId);
      if (!website) {
        throw new NotFoundError("Website not found");
      }
      await authenticationService.isAllowedToAccessWebsite(user.id, website);

      // Create location
      const createdLocation = await locationRepository.insert({
        ...locationInput,
      });

      // Create Google Keyword Tracker
      const createdGoogleKeywordTracker = await googleKeywordTrackerRepository.insert({
        locationId: createdLocation.id,
        websiteId: website.id,
        refresh: keywordTrackerInput.refresh,
      });

      // Add competitors to Google Keyword Tracker
      if (keywordTrackerInput.addCompetitors) {
        await addCompetitorsUseCase(
          createdGoogleKeywordTracker.id,
          keywordTrackerInput.addCompetitors,
          user
        );
      }

      // Return created location with keyword tracker tool ID
      return {
        ...createdLocation,
        keywordTrackerToolId: createdGoogleKeywordTracker.id,
      };
    }
  );
}
