import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { NotFoundError } from "@/src/entities/errors/common";

import { Location } from "@/src/entities/models/location";
import { User } from "@/src/entities/models/user";


/**
 * Deletes a location.
 * @param id - The ID of the location to delete.
 * @param user - The user performing the delete operation.
 * @throws {NotFoundError} if the location is not found.
 * @returns A Promise that resolves to the deleted location.
 */
export async function deleteLocationUseCase(
  id: string,
  user: User
): Promise<Location> {
  return await startSpan(
    { name: "deleteLocation Use Case", op: "function" },
    async () => {
      const locationRepository = getInjection("ILocationRepository");

      const location = await locationRepository.getById(id);

      if (!location) {
        throw new NotFoundError("Location not found");
      }

      // TODO: check if the user is the owner of the location/ allowed to access the location

      const deletedLocation = await locationRepository.delete(id);

      return deletedLocation;
    }
  );
}
