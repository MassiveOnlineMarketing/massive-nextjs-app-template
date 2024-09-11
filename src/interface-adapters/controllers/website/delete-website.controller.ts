import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { Website } from "@/src/entities/models/website";

import { deleteWebsiteUseCase } from "@/src/application/use-cases/website/delete-website.use-case";

/**
 * Deletes a website.
 *
 * @param id - The ID of the website to delete.
 * @returns A promise that resolves to the deleted website.
 */
export async function deleteWebsiteController(id: string): Promise<Website> {
  return await startSpan({ name: "deleteWebsite Controller" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();
    
    return await deleteWebsiteUseCase(id, user);
  });
}