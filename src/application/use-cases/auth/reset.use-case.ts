import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";

import { AuthenticationError } from "@/src/entities/errors/auth";

/**
 * Resets the password for a user.
 *
 * @param input - The input object containing the user's email.
 * @throws {AuthenticationError} If the user does not exist.
 * @returns A promise that resolves to an object with a success message if the reset email is sent successfully.
 */
export async function resetUseCase(input: { email: string }) {
  return startSpan({ name: "reset Use Case", op: "function" }, async () => {
    const userRepository = getInjection("IUsersRepository");
    const tokenService = getInjection("ITokenService");
    const emailRepository = getInjection("IEmailService");

    const existingUser = await userRepository.getByEmail(input.email);
    if (!existingUser) {
      throw new AuthenticationError("User does not exist!");
    }

    const passwordResetToken = await tokenService.generatePasswordResetToken(input.email);
    const h = emailRepository.sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Reset email sent!" };
  });
}