import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";

import { AuthError } from "next-auth";
import { signIn } from "@/app/api/auth/[...nextauth]/_nextAuth";


/**
 * Sign in use case.
 * 
 * @param input - The input object containing email and password.
 * @throws {AuthError} if the user does not exist.
 * @returns A promise that resolves to an object with either a success or error message.
 */
export async function signInUseCase(input: { email: string, password: string }) {
  return startSpan({ name: "signIn Use Case", op: "function" }, async () => {
    const usersRepository = getInjection('IUsersRepository')
    const tokenService = getInjection('ITokenService')
    const emailRepository = getInjection('IEmailService')

    const existingUser = await usersRepository.getByEmail(input.email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exist!" };
    }

    if (!existingUser.emailVerified) {

      const verificationToken = await tokenService.generateVerificationToken(input.email, existingUser.id);

      const h = emailRepository.sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );

      return { success: "Confirmation email sent! Please verify" };
    }

    const lowerCaseEmail = input.email.toLowerCase();

    try {
      await signIn("credentials", {
        email: lowerCaseEmail,
        password: input.password,
        redirect: false,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        console.log('error.type', error.type)
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials!" };
          case "CallbackRouteError":
            return { error: "Invalid credentials!" };
          default:
            return { error: "Something went wrong!" };
        }
      }

      throw error;
    }

    return { success: "Login successful!" };
  });
}