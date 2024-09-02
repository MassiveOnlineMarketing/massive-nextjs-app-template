'use server';

import { AuthenticationError } from "@/src/entities/errors/auth";
import { InputParseError } from "@/src/entities/errors/common";

import { z } from "zod";
import { loginSchema, signInController } from "@/src/interface-adapters/controllers/auth/sign-in.controller";
import { registerSchema, signUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import { newPasswordSchema, newPasswordController } from "@/src/interface-adapters/controllers/auth/new-password.controller";
import { newVerificationController } from "@/src/interface-adapters/controllers/auth/new-verification.controller";
import { resetController } from "@/src/interface-adapters/controllers/auth/reset.controller";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function signIn(formData: z.infer<typeof loginSchema>, callbackUrl?: string | null) {

  // try {
    const signIn = await signInController(formData);

    if (signIn.error) {
      return { error: signIn.error };
    }

    console.log('redirecting to', callbackUrl || DEFAULT_LOGIN_REDIRECT);
    redirect(callbackUrl || DEFAULT_LOGIN_REDIRECT);

    // TODO: when in a try catch block, the redirect from next auth throws a NEXT_REDIRECT error
  // } catch (error) {
  //   if (
  //     error instanceof InputParseError
  //   ) {
  //     return { error: "Incorrect username or password"};
  //   } else if (error instanceof AuthenticationError) {
  //     return { error: "Email does not exist!"};
  //   }
  //   // console.error(error);
  //   return { error: "An error happened. The developers have been notified. Please try again later."};
  // }
}

export async function signUp(formData: z.infer<typeof registerSchema>) {
  try {
    return await signUpController(formData);

  } catch (error) {
    if (
      error instanceof InputParseError
    ) {
      return { error: "Incorrect username or password"};
    
    } else if (
      error instanceof AuthenticationError
    ) {
      return { error: "Email already exist!"};
    }
    console.error(error);
    return { error: "An error happened. The developers have been notified. Please try again later."};
  }
}

export async function newPassword(formData: z.infer<typeof newPasswordSchema>, token?: string | null) {
  try {
    return await newPasswordController(formData, token);

  } catch (error) {
    if (
      error instanceof InputParseError
    ) {
      return { error: "Incorrect username or password"};
    } else if (error instanceof AuthenticationError) {
      return { error: "Email does not exist!"};
    }
    console.error(error);
    return { error: "An error happened. The developers have been notified. Please try again later."};
  }
}

export async function newVerification(token: string) {
  try {
    return await newVerificationController(token);

  } catch (error) {
    if (
      error instanceof InputParseError
    ) {
      return { error: "Incorrect username or password"};
    } else if (error instanceof AuthenticationError) {
      return { error: "Email does not exist!"};
    }
    console.error(error);
    return { error: "An error happened. The developers have been notified. Please try again later."};
  }
}

export async function reset(formData: {email: string}) {
  try {
    return await resetController(formData);

  } catch (error) {
    if (
      error instanceof InputParseError
    ) {
      return { error: "Incorrect username or password"};
    } else if (error instanceof AuthenticationError) {
      return { error: "Email does not exist!"};
    }
    console.error(error);
    return { error: "An error happened. The developers have been notified. Please try again later."};
  }
}