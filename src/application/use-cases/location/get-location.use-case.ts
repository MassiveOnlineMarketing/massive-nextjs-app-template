import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { NotFoundError } from "@/src/entities/errors/common";
import { ForbiddenError } from "@/src/entities/errors/auth";

import { Location } from "@/src/entities/models/location";
import { User } from "@/src/entities/models/user";


/**
 * Retrieves a location by its ID and ensures the user has access to it.
 *
 * @param id - The ID of the location to retrieve.
 * @param user - The user attempting to retrieve the location.
 * @returns A promise that resolves to the location if found and accessible by the user.
 * @throws {NotFoundError} If the location or associated website is not found.
 * @throws {ForbiddenError} If the user does not own the website associated with the location.
 */
export async function getLocationUseCase(id: string, user: User): Promise<Location> {
  return await startSpan(
    { name: "getLocation Use Case" },
    async () => {
      const locationRepository = getInjection("ILocationRepository");
      const websiteRepository = getInjection("IWebsiteRepository");

      const location = await locationRepository.getById(id);

      if (!location) {
        throw new NotFoundError("Location not found");
      }

      const website = await websiteRepository.getById(location.websiteId);

      if (!website) {
        throw new NotFoundError("Website not found");
      }

      if (website.userId !== user.id) {
        throw new ForbiddenError("User does not own this website location");
      }

      return location;
    }
  );
}