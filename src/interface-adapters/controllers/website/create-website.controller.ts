import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

import { createWebsiteUseCase } from "@/src/application/use-cases/website/create-website.use-case";
import { formInputCreateWebsiteSchema } from "@/src/entities/models/website";

export async function createWebsiteController(formData: z.infer<typeof formInputCreateWebsiteSchema>) {
  return await startSpan({ name: "createWebsite Controller" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();

    const { data, error: inputParseError } = formInputCreateWebsiteSchema.safeParse(formData);

    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }

    if (!data) {
      throw new InputParseError("Invalid data");
    }

    let gscUrl = data.gscUrl;

    if (gscUrl === "noWebsite") {
      gscUrl = null;
    }

    const website = {
      websiteName: data.websiteName,
      domainUrl: data.domainUrl,
      gscUrl: gscUrl,
    };

    return await createWebsiteUseCase(website, user);
  });
}