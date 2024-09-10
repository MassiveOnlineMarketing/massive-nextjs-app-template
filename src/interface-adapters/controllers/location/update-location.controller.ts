import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { updateLocationUseCase } from "@/src/application/use-cases/location/update-location.use-case";

import { InputParseError } from "@/src/entities/errors/common";
import { formInputUpdateLocationSchema } from "@/src/entities/models/location";
import { z } from "zod";

export async function updateLocationController(formData: z.infer<typeof formInputUpdateLocationSchema>){
  return startSpan({ name: "updateLocation Controller" }, async () => {
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();

    const { data, error: inputParseError } = formInputUpdateLocationSchema.safeParse(formData);

    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }

    if (!data) {
      throw new InputParseError("Invalid data");
    }

    const insertData = {
      id: formData.id,
      websiteId: formData.websiteId,
      language: formData.language.countryCode,
      languageCode: formData.language.googleId.toString(),
      country: formData.country.countryCode,
      location: formData.location?.canonicalName || null,
      locationCode: formData.location?.googleId.toString() || formData.country.googleId.toString(),
    }

    const location = await updateLocationUseCase(insertData, user);

    // TODO: location presenter
    return location;
  });
}