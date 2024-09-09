import { startSpan } from "@sentry/nextjs";
import { InputParseError } from "@/src/entities/errors/common";

import { newPasswordUseCase } from "@/src/application/use-cases/auth/new-password.use-case";

import { z } from "zod";
import { formInputNewPasswordSchema } from "@/src/entities/models/user";

/**
 * Handles the logic for the newPasswordController function.
 *
 * @param formData - The form data for the new password.
 * @param token - The token for the new password.
 * @throws Error if the token is invalid.
 * @throws InputParseError if the form data is invalid.
 * @returns The new password.
 */
export async function newPasswordController(formData: z.infer<typeof formInputNewPasswordSchema>, token?: string | null
) {
  return await startSpan({ name: "newPassword Controller" }, async () => {

    if (!token) {
      throw new Error("Invalid token");
    }

    const { data, error: inputParseError } = formInputNewPasswordSchema.safeParse(formData);

    if (inputParseError) {
      throw new InputParseError("Invalid data");
    }

    const newPassword = await newPasswordUseCase(data, token);

    return newPassword;
  });
}
