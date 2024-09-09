'use server';
import { captureException, withServerActionInstrumentation } from "@sentry/nextjs";
import { redirect } from "next/navigation";

import { AuthenticationError } from "@/src/entities/errors/auth";
import { InputParseError, ValidationError } from "@/src/entities/errors/common";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { z } from "zod";
import { updateUserDetailsController, updateUserDetailtsSchema } from "@/src/interface-adapters/controllers/auth/update-user-details.controller";
import { loginSchema, signInController } from "@/src/interface-adapters/controllers/auth/sign-in.controller";
import { registerSchema, signUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import { newPasswordSchema, newPasswordController } from "@/src/interface-adapters/controllers/auth/new-password.controller";
import { newVerificationController } from "@/src/interface-adapters/controllers/auth/new-verification.controller";
import { resetController } from "@/src/interface-adapters/controllers/auth/reset.controller";

import { auth, signOut } from "@/app/api/auth/[...nextauth]/_nextAuth";
import { ExtendedUser } from "@/next-auth";

export const logout = async () => {
  await signOut();
};


export interface UpdateUserDetailsResponse {
  user?: ExtendedUser;
  success?: string;
  error?: string;
}
export async function updateUserDetails(formData: z.infer<typeof updateUserDetailtsSchema >): Promise<UpdateUserDetailsResponse> {
  return await withServerActionInstrumentation(
    "updateUserDetails",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return { error: "Must be logged in to update your profile information" };
      }
      try {
        return await updateUserDetailsController(formData);

      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Incorrect username or password" };
        } else if (error instanceof ValidationError) {
          return { error: error.message};
        } else if (error instanceof AuthenticationError) {
          return { error: "Email does not exist!" };
        }
        console.log('error', error)
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    },
  );
}



export async function signIn(formData: z.infer<typeof loginSchema>, callbackUrl?: string | null) {
  return await withServerActionInstrumentation(
    "signIn",
    { recordResponse: true },
    async () => {

      const signIn = await signInController(formData);

      if (signIn.error) {
        return { error: signIn.error };
      }
      console.log('redirecting to', callbackUrl || DEFAULT_LOGIN_REDIRECT);
      redirect(callbackUrl || DEFAULT_LOGIN_REDIRECT);
    },
  );



  // TODO: when in a try catch block, the redirect from next auth throws a NEXT_REDIRECT error
  // try {
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
  return await withServerActionInstrumentation(
    "signUp",
    { recordResponse: true },
    async () => {
      try {
        return await signUpController(formData);

      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Incorrect username or password" };
        } else if (error instanceof AuthenticationError) {
          return { error: "Email already exist!" };
        }
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    },
  );
}

export async function newPassword(formData: z.infer<typeof newPasswordSchema>, token?: string | null) {
  return await withServerActionInstrumentation(
    "newPassword",
    { recordResponse: true },
    async () => {
      try {
        return await newPasswordController(formData, token);

      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Incorrect username or password" };
        } else if (error instanceof AuthenticationError) {
          return { error: "Email does not exist!" };
        }
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    },
  );
}

export async function newVerification(token: string) {
  return await withServerActionInstrumentation(
    "newVerification",
    { recordResponse: true },
    async () => {
      try {
        return await newVerificationController(token);

      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Incorrect username or password" };
        } else if (error instanceof AuthenticationError) {
          return { error: "Email does not exist!" };
        }
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    },
  );
}

export async function reset(formData: { email: string }) {
  return await withServerActionInstrumentation(
    "reset",
    { recordResponse: true },
    async () => {
      try {
        return await resetController(formData);

      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Incorrect username or password" };
        } else if (error instanceof AuthenticationError) {
          return { error: "Email does not exist!" };
        }
        console.error('reset error', error)
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    },
  );
}