import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";

import { formInputCreateGoogleKeywordTrackerSchema, GoogleKeywordTracker } from "@/src/entities/models/google-keyword-tracker";
import { z } from "zod";
import { InputParseError } from "@/src/entities/errors/common";

import { createGoogleKeywordTrackerUseCase } from "@/src/application/use-cases/google-keyword-tracker/create-google-keyword-tracker.use-case";

export async function createGoogleKeywordTrackerController(
  formData: z.infer<typeof formInputCreateGoogleKeywordTrackerSchema>
): Promise<GoogleKeywordTracker> {
  return await startSpan(
    { name: "createGoogleKeywordTracker Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();

      const { data, error: inputParseError } =
        formInputCreateGoogleKeywordTrackerSchema.safeParse(formData);

      if (inputParseError) {
        throw new InputParseError("Invalid data", { cause: inputParseError });
      }

      if (!data) {
        throw new InputParseError("Invalid data");
      }

      return await createGoogleKeywordTrackerUseCase(
        {
          locationId: data.locationId,
          websiteId: data.websiteId,
          refresh: data.refresh,
          addCompetitors: data.addCompetitors,
        },
        user
      );
    }
  );
}
