import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";

import { InputParseError } from "@/src/entities/errors/common";

import { formSetupLocationSchema, Location } from "@/src/entities/models/location";
import { z } from "zod";
import { setupLocationUseCase } from "@/src/application/use-cases/location/setup-location.use-case";

/**
 * Sets up a location based on the provided form data.
 *
 * @param formData - The data from the form, validated against the `formSetupLocationSchema`.
 * @returns A promise that resolves to a `Location` object.
 * @throws {InputParseError} If the form data is invalid.
 *
 * This function performs the following steps:
 * 1. Validates the user session using the authentication service.
 * 2. Parses and validates the form data against the `formSetupLocationSchema`.
 * 3. Constructs the `locationInputData` and `keywordTrackerInputData` objects from the form data.
 * 4. Calls the `setupLocationUseCase` with the constructed data and the authenticated user.
 * 5. Returns the resulting `Location` object.
 */
export async function setupLocationController(formData: z.infer<typeof formSetupLocationSchema>): Promise<Location> {
  return await startSpan(
    { name: "setupLocation Controller", op: "function" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();

      const { data, error: inputParseError } = formSetupLocationSchema.safeParse(formData);
      if (inputParseError) {
        throw new InputParseError("Invalid data", { cause: inputParseError });
      }

      if (!data) {
        throw new InputParseError("Invalid data");
      }

      const locationInputData = {
        websiteId: formData.websiteId,
        language: formData.language.countryCode,
        languageCode: formData.language.googleId.toString(),
        country: formData.country.countryCode,
        location: formData.location?.canonicalName || null,
        locationCode: formData.location?.googleId.toString() || formData.country.googleId.toString(),
      }

      const keywordTrackerInputData = {
        refresh: formData.refresh,
        addCompetitors: formData.addCompetitors,
      }

      const location = await setupLocationUseCase(locationInputData, keywordTrackerInputData, user);

      return location;
    }
  );
}
