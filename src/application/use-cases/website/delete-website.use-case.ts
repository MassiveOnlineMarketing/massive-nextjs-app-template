import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { ForbiddenError } from "@/src/entities/errors/auth";
import { NotFoundError } from "@/src/entities/errors/common";

import { User } from "@/src/entities/models/user";
import { Website } from "@/src/entities/models/website";


/**
 * Deletes a website.
 * 
 * @param id - The ID of the website to be deleted.
 * @param user - The user performing the deletion.
 * @throws {NotFoundError} If the website with the given ID is not found.
 * @throws {ForbiddenError} If the user does not have permission to delete the website.
 * @returns A promise that resolves to the deleted website.
 */
export async function deleteWebsiteUseCase(id: string, user: User): Promise<Website> {
  return await startSpan({ name: "deleteWebsite Use Case", op: "function" }, async () => {
    const websiteRepository = getInjection("IWebsiteRepository");

    const website = await websiteRepository.getById(id);

    if (!website) {
      throw new NotFoundError('Website not found');
    }

    // TODO: check if the user is the owner of the website/ allowed to access the website
    if (website.userId !== user.id) {
      throw new ForbiddenError('You don\'t have permission to delete this website');
    }
    
    await websiteRepository.delete(id);

    return website;
  });
}