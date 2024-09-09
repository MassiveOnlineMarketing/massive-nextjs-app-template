import { getInjection } from "@/di/container";
import bcrypt from "bcryptjs";

import { User } from "@prisma/client";
import { ValidationError } from "@/src/entities/errors/common";
import { startSpan } from "@sentry/nextjs";


/**
 * Updates the user details.
 * 
 * @param input - The input object containing the user details to be updated.
 * @param user - The user object to be updated.
 * @throws {ValidationError} if the new password does not match the confirmation password.
 * @returns A promise that resolves to an object containing the updated user or a success message.
 */
export async function updateUserDetailsUseCase(
  input:
    {
      name: string,
      email: string,
      currentPassword?: string | undefined,
      password?: string | undefined,
      passwordConfirmation?: string | undefined,
    },
  user: User
): Promise<{ user: User } | { success: string }> {
  return startSpan({ name: "updateUserDetails Use Case", op: "function" }, async () => {
    const userRepository = getInjection("IUsersRepository");
    const tokenService = getInjection("ITokenService");
    const emailRepository = getInjection("IEmailService");

    let data = {
      name: input.name || undefined,
      email: input.email || undefined,
      password: input.password || undefined,
    };


    if (input.email && input.email !== user.email) {
      const verificationToken = await tokenService.generateVerificationToken(input.email, user.id);
      emailRepository.sendVerificationEmail(input.email, verificationToken.token);

      return { success: "Confirmation email sent!" };
    }

    if (
      input.currentPassword &&
      input.password &&
      input.passwordConfirmation &&
      user.password
    ) {

      if (input.password !== input.passwordConfirmation) {
        throw new ValidationError("New passwords do not match.");
      }

      const doesCurrentPasswordMatch = await bcrypt.compare(
        input.currentPassword,
        user.password,
      );

      if (!doesCurrentPasswordMatch) {
        throw new ValidationError("Current and new password do not match.");
      }

      data.password = await bcrypt.hash(input.password, 10);
    }

    const updatedUser = await userRepository.update(data, user.id as string);

    return { user: updatedUser };
  });
}