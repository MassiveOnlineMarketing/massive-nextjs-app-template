import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

import { createWebsiteUseCase } from "@/src/application/use-cases/website/create-website.user-case";


export const websiteInputSchema = z.object({
  websiteName: z.string().min(1, {
    message: "Website name is required",
  }),
  domainUrl: z.string().min(1, {
    message: "Domain URL is required",
  }),
  gscUrl: z.string().optional(),
});

export async function createWebsiteController(formData: z.infer<typeof websiteInputSchema>) {
  return await startSpan({ name: "createWebsite Controller" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();

    const { data, error: inputParseError } = websiteInputSchema.safeParse(formData);

    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }

    if (!data) {
      throw new InputParseError("Invalid data");
    }

    return await createWebsiteUseCase(data, user);
  });
}