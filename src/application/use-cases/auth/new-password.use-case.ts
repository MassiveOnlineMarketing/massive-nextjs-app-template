import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";

import { AuthenticationError } from "@/src/entities/errors/auth";
import bcrypt from "bcryptjs";

/**
 * Updates the password for a user using a password reset token.
 * 
 * @param input - The input object containing the new password.
 * @param token - The password reset token.
 * @throws {AuthenticationError} if the email does not exist.
 * @returns A promise that resolves to an object indicating the success or error status of the password update.
 */
export async function newPasswordUseCase(input: { password: string }, token: string) {
  return startSpan({ name: "newPassword Use Case", op: "function" }, async () => {
    const tokenRepository = getInjection("ITokenRepository");
    const userRepository = getInjection("IUsersRepository");


    const existingToken = await tokenRepository.getPasswordResetTokenByEmail(token);
    if (!existingToken) {
      return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return { error: "Token has expired!" };
    }

    const existingUser = await userRepository.getByEmail(existingToken.email);
    if (!existingUser) {
      throw new AuthenticationError("Email does not exist!");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    await userRepository.updatePassword(existingUser.id, hashedPassword);
    await tokenRepository.deletePasswordResetToken(existingToken.id);

    return { success: "Password updated!" };
  });
}