import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { WebsiteWithLocation } from "@/src/entities/models/website";

import { getWebsiteWithLocationUseCase } from "@/src/application/use-cases/website/get-website-with-location.use-case";

export async function getWebsiteWithLocationController(id: string): Promise<WebsiteWithLocation> {
  return await startSpan({ name: "getWebsite Controller" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();

    const website = await getWebsiteWithLocationUseCase(id, user);

    // TODO: website presenter
    return website;
  });
}