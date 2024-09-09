import { startSpan } from "@sentry/nextjs";

import { z } from "zod";
import { formInputSignInSchema } from "@/src/entities/models/user";

import { signInUseCase } from "@/src/application/use-cases/auth/sign-in.use-case";

/**
 * Sign in controller function.
 * 
 * @param formData - The form data for signing in.
 * @returns A promise that resolves to the result of the sign in use case.
 */
export async function signInController(formData: z.infer<typeof formInputSignInSchema>) {
  return await startSpan({ name: "signIn Controller" }, async () => {
    const { data, error: inputParseError } = formInputSignInSchema.safeParse(formData);

    // Leave this here for now, but we should handle this error in the actions.
    if (inputParseError) {
      return { error: "Invalid data" };
    }

    return await signInUseCase(data);
  });
}