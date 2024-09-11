import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { deleteLocationUseCase } from "@/src/application/use-cases/location/delete-location.use-case";

import { Location } from "@/src/entities/models/location";

/**
 * Deletes a location.
 * 
 * @param id - The ID of the location to delete.
 * @returns A promise that resolves to the deleted location.
 */
export async function deleteLocationController(id: string): Promise<Location> {
  return await startSpan({ name: "deleteLocation Controller" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();
    
    return await deleteLocationUseCase(id, user);
  });
}