import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { Location } from "@/src/entities/models/location";

import { getLocationUseCase } from "@/src/application/use-cases/location/get-location.use-case";


/**
 * Controller function to handle the retrieval of a location by its ID.
 * 
 * @param {string} id - The ID of the location to retrieve.
 * @returns {Promise<Location>} A promise that resolves to the location data.
 */
export async function getLocationController(id: string): Promise<Location> { 
  return await startSpan({ name: "getLocation Controller" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();

    const location = await getLocationUseCase(id, user);

    // TODO: location presenter
    return location;
  });

}