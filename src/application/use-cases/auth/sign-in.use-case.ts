import usersRepository from "@/infrastructure/repositories/users.repository";
import EmailRepository from "@/infrastructure/services/email.service";
import { TokenService } from "@/infrastructure/services/token.service";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../../../routes";
import { AuthError } from "next-auth";


export async function signInUseCase(input: {email: string, password: string}, callbackUrl?: string | null) {
  const existingUser = await usersRepository.getByEmail(input.email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {

    const verificationToken = await new TokenService().generateVerificationToken(input.email, existingUser.id);

    const h = new EmailRepository().sendVerificationEmail(
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
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log('error', error)
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
}