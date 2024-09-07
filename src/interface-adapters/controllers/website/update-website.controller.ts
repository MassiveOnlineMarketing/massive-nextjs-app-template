import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

import { updateWebsiteUseCase } from "@/src/application/use-cases/website/update-website.use-case";


export const updateWebsiteInputSchema = z.object({
  websiteName: z.string().min(1, {
    message: "Website name is required",
  }),
  domainUrl: z.string().min(1, {
    message: "Domain URL is required",
  }),
  gscUrl: z.string().optional(),
});

export async function updateWebsiteController(formData: z.infer<typeof updateWebsiteInputSchema>, id: string) {
  return await startSpan({ name: "updateWebsite Controller" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();

    const { data, error: inputParseError } = updateWebsiteInputSchema.safeParse(formData);

    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }

    if (!data) {
      throw new InputParseError("Invalid data");
    }

    return await updateWebsiteUseCase(data, id, user);
  });
}