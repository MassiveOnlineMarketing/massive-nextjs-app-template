import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { ForbiddenError } from "@/src/entities/errors/auth";
import { NotFoundError } from "@/src/entities/errors/common";

import { WebsiteWithLocation } from "@/src/entities/models/website";
import { User } from "@/src/entities/models/user";

/**
 * Retrieves a website with its location based on the provided ID and user.
 * 
 * @param id - The ID of the website to retrieve.
 * @param user - The user object representing the user making the request.
 * @returns A promise that resolves to the website with its location.
 * @throws {NotFoundError} If the website with the provided ID is not found.
 * @throws {ForbiddenError} If the user does not have permission to access the website.
 */
export async function getWebsiteWithLocationUseCase(id: string, user: User): Promise<WebsiteWithLocation> {
  return await startSpan({ name: "getWebsiteWithLocation Use Case", op: "function" }, async () => {
    const websiteRepository = getInjection("IWebsiteRepository");

    const website = await websiteRepository.getByIdWithLocation(id);

    if (!website) {
      throw new NotFoundError("Website not found");
    }

    // TODO: check if the user is the owner of the website/ allowed to access the website
    if (website.userId !== user.id) {
      throw new ForbiddenError("You don't have permission to access this website");
    }

    return website;
  });
}