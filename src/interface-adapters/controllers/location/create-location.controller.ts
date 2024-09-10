import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { formInputCreateLocationSchema, Location } from "@/src/entities/models/location";
import { z } from "zod";
import { InputParseError } from "@/src/entities/errors/common";
import { createLocationUseCase } from "@/src/application/use-cases/location/create-location.use-case";


export async function createLocationController(formData: z.infer<typeof formInputCreateLocationSchema>): Promise<Location> {
  return await startSpan({ name: "createLocation Controller" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();

    const { data, error: inputParseError } = formInputCreateLocationSchema.safeParse(formData);

    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }

    if (!data) {
      throw new InputParseError("Invalid data");
    }


    const insertData = {
      websiteId: formData.websiteId,
      language: formData.language.countryCode,
      languageCode: formData.language.googleId.toString(),
      country: formData.country.countryCode,
      location: formData.location?.canonicalName || null,
      locationCode: formData.location?.googleId.toString() || formData.country.googleId.toString(),
    }

    const location = await createLocationUseCase(insertData, user);

    // TODO: location presenter
    return location;
  });
}