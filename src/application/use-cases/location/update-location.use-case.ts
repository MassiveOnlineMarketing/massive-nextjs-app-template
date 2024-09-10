import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { Location } from "@/src/entities/models/location";
import { User } from "@/src/entities/models/user";


export async function updateLocationUseCase(input: {
  id: string,
  websiteId: string,
  language: string,
  languageCode: string,
  country: string,
  location: string | null,
  locationCode: string,
}, user: User): Promise<Location> {
  return await startSpan({ name: "updateLocation Use Case" }, async () => {
    const locationRepository = getInjection("ILocationRepository");

    // TODO: check if the user is the owner of the website/ allowed to update the location

    const location = await locationRepository.update(input);

    return location;
  });
}