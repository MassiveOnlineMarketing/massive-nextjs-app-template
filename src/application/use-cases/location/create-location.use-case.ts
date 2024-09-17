import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { ForbiddenError } from "@/src/entities/errors/auth";
import { NotFoundError } from "@/src/entities/errors/common";

import { Location } from "@/src/entities/models/location";
import { User } from "@/src/entities/models/user";


export async function createLocationUseCase(input: {
  websiteId: string,
  language: string,
  languageCode: string,
  country: string,
  location: string | null,
  locationCode: string,
}, user: User): Promise<Location> {
  return await startSpan({ name: "createLocation Use Case", op: "function" }, async () => {
    const locationRepository = getInjection("ILocationRepository");
    const websiteRepository = getInjection("IWebsiteRepository");

    const website = await websiteRepository.getById(input.websiteId);
    
    if (!website) {
      throw new NotFoundError("Website not found");
    }

    if (website.userId !== user.id) {
      throw new ForbiddenError("User does not own this website");
    }

    const location = await locationRepository.create({
      ...input
    });

    return location;
  });
}