import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";

import { Website } from "@/src/entities/models/website";
import { getWebsitesByUserUseCase } from "@/src/application/use-cases/website/get-websites-by-user.use-case";

/**
 * Retrieves websites associated with a specific user.
 * 
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of Website objects.
 */
export async function getWebsitesByUserController(userId: string): Promise<Website[]> {
  return startSpan({ name: "getWebsitesByUser Controller", op: "function" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();

    const websites = await getWebsitesByUserUseCase(userId, user);

    // TODO: website presenter
    return websites;
  });
}