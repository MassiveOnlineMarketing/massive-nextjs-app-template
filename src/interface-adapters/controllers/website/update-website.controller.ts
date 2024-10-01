import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";
import { formInputUpdateWebsiteSchema, Website } from "@/src/entities/models/website";

import { updateWebsiteUseCase } from "@/src/application/use-cases/website/update-website.use-case";


export async function updateWebsiteController(formData: z.infer<typeof formInputUpdateWebsiteSchema>): Promise<Website> {
  return await startSpan({ name: "updateWebsite Controller" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();

    const { data, error: inputParseError } = formInputUpdateWebsiteSchema.safeParse(formData);

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
      id: data.id,
      websiteName: data.websiteName,
      domainUrl: data.domainUrl,
      gscUrl: gscUrl,
    };

    return await updateWebsiteUseCase(website, user);
  });
}