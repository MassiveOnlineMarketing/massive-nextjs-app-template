import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { NotFoundError } from "@/src/entities/errors/common";
import { ForbiddenError } from "@/src/entities/errors/auth";

import { Website } from "@/src/entities/models/website";
import { User } from "@/src/entities/models/user";

/**
 * Retrieves websites by user ID.
 * 
 * @param userId - The ID of the user.
 * @param user - The user object.
 * @throws {NotFoundError} If the website is not found.
 * @throws {ForbiddenError} If the user does not have permission to access the website.
 * @returns A promise that resolves to an array of websites.
 */
export function getWebsitesByUserUseCase(userId: string, user: User): Promise<Website[]> {
  return startSpan({ name: "getWebsiteByUser Use Case", op: "function" }, async () => {
    const websiteRepository = getInjection("IWebsiteRepository");

    const websites = await websiteRepository.getByUserId(userId);

    if (!websites) {
      throw new NotFoundError("Website not found");
    }

    if (websites[0].userId !== user.id) {
      throw new ForbiddenError("You don't have permission to access this website");
    }

    return websites;
  });
}