import { startSpan } from "@sentry/nextjs";
import { InputParseError } from "@/src/entities/errors/common";

import { z } from "zod";
import { formInputSignUpSchema } from "@/src/entities/models/user";

import { signUpUseCase } from "@/src/application/use-cases/auth/sign-up.use-case";

/**
 * Sign up controller function.
 * 
 * @param formData - The form data for signing up.
 * @throws {InputParseError} If the form data is invalid.
 * @returns A promise that resolves to the result of the sign up use case.
 */
export async function signUpController(formData: z.infer<typeof formInputSignUpSchema>) {
  return await startSpan({ name: "signUp Controller" }, async () => {
    const { data, error: inputParseError } = formInputSignUpSchema.safeParse(formData);

    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }

    return await signUpUseCase(data);
  })
}