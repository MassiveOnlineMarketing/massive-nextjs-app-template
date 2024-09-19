import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";
import { z } from "zod";

import { User } from "@prisma/client";
import { ExtendedUser } from "@/next-auth";

import { InputParseError } from "@/src/entities/errors/common";

import { updateUserDetailsUseCase } from "@/src/application/use-cases/auth/update-user-details.use-case";


export const updateUserDetailtsSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  currentPassword: z
    .string()
    .min(6, {
      message: "Password is required",
    })
    .optional().nullable(),
  password: z
    .string()
    .min(6, {
      message: "Password is required",
    })
    .optional().nullable(),
  passwordConfirmation: z
    .string()
    .min(6, {
      message: "Password is required",
    })
    .optional().nullable(),
});

function presenter(user: User) {
  return startSpan({ name: "updateUserDetails Presenter", op: "serialize" }, () => ({
    id: user.id,
    email: user.email,
    image: user.image,
    loginProvider: user.loginProvider,
    name: user.name,
    credits: user.credits,
    role: user.role,
  }));
}

export async function updateUserDetailsController(formData: z.infer<typeof updateUserDetailtsSchema>): Promise<{ user: ExtendedUser } | { success: string }> {
  return await startSpan({ name: "updateUserDetails Controller" }, async () => {

    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();

    const { data, error: inputParseError } = updateUserDetailtsSchema.safeParse(formData);

    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }

    if (!data) {
      throw new InputParseError("Invalid data");
    }

    const input = {
      name: data.name,
      email: data.email,
      currentPassword: data.currentPassword || undefined,
      password: data.password || undefined,
      passwordConfirmation: data.passwordConfirmation || undefined,
    };

    const updatedUser = await updateUserDetailsUseCase(input, user);

    if ('user' in updatedUser) {
      return { user: presenter(updatedUser.user) };
    }

    if (updatedUser.success) {
      return { success: updatedUser.success };
    }

    throw new Error("Unexpected error updating user details");
  });
}