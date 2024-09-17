import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { z } from "zod";
import { formInputUpdateGoogleKeywordTrackerSchema } from "@/src/entities/models/google-keyword-tracker";

import { InputParseError } from "@/src/entities/errors/common";

import { updateGoogleKeywordTrackerUseCase } from "@/src/application/use-cases/google-keyword-tracker/update-google-keyword-tracker.use-case";

export async function updateGoogleKeywordTrackerController(
  formData: z.infer<typeof formInputUpdateGoogleKeywordTrackerSchema>
) {
  return await startSpan(
    { name: "updateGoogleKeywordTracker Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();

      const { data, error: inputParseError } =
        formInputUpdateGoogleKeywordTrackerSchema.safeParse(formData);

      if (inputParseError) {
        throw new InputParseError("Invalid data", { cause: inputParseError });
      }

      if (!data) {
        throw new InputParseError("Invalid data");
      }

      return await updateGoogleKeywordTrackerUseCase(data, user);
    }
  );
}
