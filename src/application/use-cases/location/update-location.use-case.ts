import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { Location } from "@/src/entities/models/location";
import { User } from "@/src/entities/models/user";


/**
 * Updates a location with the given input parameters.
 *
 * @param input - The input parameters for updating the location.
 * @param input.id - The ID of the location to update.
 * @param input.websiteId - The ID of the website associated with the location.
 * @param input.language - The language of the location.
 * @param input.languageCode - The language code of the location.
 * @param input.country - The country of the location.
 * @param input.location - The new location value, or null if not updating.
 * @param input.locationCode - The location code.
 * @param user - The user performing the update.
 * @returns A promise that resolves to the updated location.
 */
export async function updateLocationUseCase(input: {
  id: string,
  websiteId: string,
  language: string,
  languageCode: string,
  country: string,
  location: string | null,
  locationCode: string,
}, user: User): Promise<Location> {
  return await startSpan({ name: "updateLocation Use Case" }, async () => {
    const locationRepository = getInjection("ILocationRepository");

    // TODO: check if the user is the owner of the website/ allowed to update the location

    const location = await locationRepository.update(input);

    return location;
  });
}