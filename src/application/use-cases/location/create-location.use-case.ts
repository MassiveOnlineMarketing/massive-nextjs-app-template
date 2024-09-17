import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { ForbiddenError } from "@/src/entities/errors/auth";
import { NotFoundError } from "@/src/entities/errors/common";

import { Location } from "@/src/entities/models/location";
import { User } from "@/src/entities/models/user";


/**
 * Creates a new location for a given website.
 *
 * @param input - The input data for creating the location.
 * @param input.websiteId - The ID of the website to which the location belongs.
 * @param input.language - The language of the location.
 * @param input.languageCode - The language code of the location.
 * @param input.country - The country of the location.
 * @param input.location - The name of the location (can be null).
 * @param input.locationCode - The code of the location.
 * @param user - The user attempting to create the location.
 * @returns A promise that resolves to the created location.
 * @throws {NotFoundError} - If the website is not found.
 * @throws {ForbiddenError} - If the user does not own the website.
 */
export async function createLocationUseCase(input: {
  websiteId: string,
  language: string,
  languageCode: string,
  country: string,
  location: string | null,
  locationCode: string,
}, user: User): Promise<Location> {
  return await startSpan({ name: "createLocation Use Case", op: "function" }, async () => {
    const locationRepository = getInjection("ILocationRepository");
    const websiteRepository = getInjection("IWebsiteRepository");

    const website = await websiteRepository.getById(input.websiteId);
    
    if (!website) {
      throw new NotFoundError("Website not found");
    }

    if (website.userId !== user.id) {
      throw new ForbiddenError("User does not own this website");
    }

    const location = await locationRepository.create({
      ...input
    });

    return location;
  });
}