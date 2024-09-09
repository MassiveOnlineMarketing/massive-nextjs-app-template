import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";

import { AuthenticationError } from "@/src/entities/errors/auth";
import bcrypt from "bcryptjs";


/**
 * Sign up use case.
 *
 * @param input - The input object containing email, password, and name.
 * @throws {AuthenticationError} If the email already exists.
 * @returns A promise that resolves to an object with a success message.
 */
export async function signUpUseCase(input: { email: string, password: string, name: string }) {
  return startSpan({ name: "signUp Use Case", op: "function" }, async () => {
    const userRepository = getInjection("IUsersRepository");
    const tokenService = getInjection("ITokenService");
    const emailRepository = getInjection("IEmailService");

    const existingUser = await userRepository.getByEmail(input.email);
    if (existingUser) {
      throw new AuthenticationError("Email already exists!");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const lowerCaseEmail = input.email.toLowerCase();

    await userRepository.create(lowerCaseEmail, hashedPassword, input.name);

    //? Send verification email
    const verificationToken = await tokenService.generateVerificationToken(input.email);
    const h = emailRepository.sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!" };
  });
}