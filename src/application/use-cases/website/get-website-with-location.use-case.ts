import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { ForbiddenError } from "@/src/entities/errors/auth";
import { NotFoundError } from "@/src/entities/errors/common";

import { ExtendedUser } from "@/next-auth";
import { WebsiteWithLocation } from "@/src/entities/models/website";

export async function getWebsiteWithLocationUseCase(id: string, user: ExtendedUser): Promise<WebsiteWithLocation> {
  return await startSpan({ name: "getWebsiteWithLocationUseCase" }, async () => {
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