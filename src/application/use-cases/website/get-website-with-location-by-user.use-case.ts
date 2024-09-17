import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { ForbiddenError } from "@/src/entities/errors/auth";
import { NotFoundError } from "@/src/entities/errors/common";

import { User } from "@/src/entities/models/user";
import { WebsiteWithLocation } from "@/src/entities/models/website";

/**
 * Retrieves websites with location information for a specific user.
 * 
 * @param userId - The ID of the user.
 * @param user - The user object.
 * @returns A promise that resolves to an array of WebsiteWithLocation objects.
 * @throws {NotFoundError} If the website is not found.
 * @throws {ForbiddenError} If the user does not have permission to access the website.
 */
export function getWebsiteWithLocationByUserUseCase(userId: string, user: User): Promise<WebsiteWithLocation[]> {
  return startSpan({ name: "getWebsiteWithLocationByUser Use Case", op: "function" }, async () => {
    const websiteRepository = getInjection("IWebsiteRepository");

    const websites = await websiteRepository.getByUserIdWithLocation(userId);

    if (!websites) {
      throw new NotFoundError("Website not found");
    }

    // TODO: check if the user is the owner of the website/ allowed to access the website
    if (websites[0].userId !== user.id) {
      throw new ForbiddenError("You don't have permission to access this website");
    }

    return websites;
  });
}