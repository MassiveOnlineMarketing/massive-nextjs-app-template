"use server";
import {
  captureException,
  withServerActionInstrumentation,
} from "@sentry/nextjs";
import { redirect } from "next/navigation";

import {
  AuthenticationError,
  UnauthenticatedError,
} from "@/src/entities/errors/auth";
import {
  InputParseError,
  NotFoundError,
  ValidationError,
} from "@/src/entities/errors/common";
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_SIGNIN_ROUTE } from "@/routes";

import { z } from "zod";
import {
  updateUserDetailsController,
  updateUserDetailtsSchema,
} from "@/src/interface-adapters/controllers/auth/update-user-details.controller";
import { signInController } from "@/src/interface-adapters/controllers/auth/sign-in.controller";
import { signUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import { newPasswordController } from "@/src/interface-adapters/controllers/auth/new-password.controller";
import { newVerificationController } from "@/src/interface-adapters/controllers/auth/new-verification.controller";
import { resetController } from "@/src/interface-adapters/controllers/auth/reset.controller";
import { getAccountDetailsController } from "@/src/interface-adapters/controllers/auth/get-account-details.controller";

import { Account } from "@prisma/client";
import { auth, signOut } from "@/app/_modules/auth/_nextAuth";
import { ExtendedUser } from "@/next-auth";
import {
  formInputSignUpSchema,
  formInputSignInSchema,
  formInputNewPasswordSchema,
} from "@/src/entities/models/user";
import { getConnectedGscPropertiesController } from "@/src/interface-adapters/controllers/search-console-api/get-connected-gsc-properties.controller";
import { ConnectedGscProperties } from "@/src/application/api/search-console.api.types";

export const logout = async () => {
  await signOut();
  redirect(DEFAULT_SIGNIN_ROUTE);
};

export const isAuthenticated = async () => {
  const session = await auth();
  if (!session?.user || !session?.user.id) {
    redirect(DEFAULT_SIGNIN_ROUTE)
  }

  return { user: session.user }
};

export interface UpdateUserDetailsResponse {
  user?: ExtendedUser;
  success?: string;
  error?: string;
}
export async function updateUserDetails(
  formData: z.infer<typeof updateUserDetailtsSchema>
): Promise<UpdateUserDetailsResponse> {
  return await withServerActionInstrumentation(
    "updateUserDetails",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return {
          error: "Must be logged in to update your profile information",
        };
      }
      try {
        return await updateUserDetailsController(formData);
      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Incorrect username or password" };
        } else if (error instanceof ValidationError) {
          return { error: error.message };
        } else if (error instanceof AuthenticationError) {
          return { error: "Email does not exist!" };
        }
        console.error("error", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

export async function signIn(
  formData: z.infer<typeof formInputSignInSchema>,
  callbackUrl?: string | null
) {
  return await withServerActionInstrumentation(
    "signIn",
    { recordResponse: true },
    async () => {
      const signIn = await signInController(formData);

      if (signIn.error) {
        return { error: signIn.error };
      }
      console.log("redirecting to", callbackUrl || DEFAULT_LOGIN_REDIRECT);
      redirect(callbackUrl || DEFAULT_LOGIN_REDIRECT);
    }
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

export async function signUp(
  formData: z.infer<typeof formInputSignUpSchema>
): Promise<{ error: string } | { success: string }> {
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
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

export async function newPassword(
  formData: z.infer<typeof formInputNewPasswordSchema>,
  token?: string | null
) {
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
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
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
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
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
        console.error("reset error", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

export async function getAccountDetails(): Promise<{
  account?: Account;
  error?: string;
}> {
  return await withServerActionInstrumentation(
    "getAccount",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return {
          error: "Must be logged in to retrieve your account details",
        };
      }
      try {
        const account = await getAccountDetailsController();

        return { account };
      } catch (error) {
        if (error instanceof UnauthenticatedError) {
          return {
            error: "Must be logged in to update your profile information",
          };
        } else if (error instanceof NotFoundError) {
          return { error: "Email does not exist!" };
        }
        console.error("getAccount error", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

export async function getConnectedGscProperties(): Promise<{error?: string;  properties?: ConnectedGscProperties[]} > {
  return await withServerActionInstrumentation(
    "getConnectedGscProperties",
    { recordResponse: true },
    async () => {
     const session = await auth();
      if (!session?.user || !session?.user.id) {
        return {
          error: "Must be logged in to retrieve your account details",
        };
      }

      try {
        const connectedGscProperties = await getConnectedGscPropertiesController(session.user.id);

        return { properties: connectedGscProperties };
      } catch (error) {
        
        if (error instanceof UnauthenticatedError) {
          return {
            error: "Must be logged in to update your profile information",
          };
        } else if (error instanceof NotFoundError) {
          return { error: "Email does not exist!" };
        }
        console.error("getConnectedGscProperties error", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}