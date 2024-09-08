import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { WebsiteWithLocation } from "@/src/entities/models/website";
import { getWebsiteWithLocationByUserUseCase } from "@/src/application/use-cases/website/get-website-with-location-by-user.use-case";


/**
 * Retrieves websites with locations for a given user.
 * 
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of `WebsiteWithLocation` objects.
 */
export async function getWebsiteWithLocationByUserController(userId: string): Promise<WebsiteWithLocation[]> {
  return await startSpan({ name: "getWebsiteWithLocationByUser Controller" }, async () => { 
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();

    const websites = await getWebsiteWithLocationByUserUseCase(userId, user);

    // TODO: website presenter
    return websites;
  });
}