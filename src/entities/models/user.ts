import { UserRole } from "@prisma/client";
import { z } from "zod";

// Core user schema (without website relation)
export const selectUserCoreSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  password: z.string().nullable(),
  role: z.nativeEnum(UserRole),
  loginProvider: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Main user schema
export const userSchema = selectUserCoreSchema.pick({
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
  password: true,
  role: true,
  loginProvider: true,
  createdAt: true,
  updatedAt: true,
});
export type User = z.infer<typeof userSchema>;




// Back-end schema with relationships



// Front-end schema
export const formInputNewPasswordSchema = selectUserCoreSchema.extend({
  password: z.string().min(6, { message: "Minimum of 6 characters required" }),
}).pick({
  password: true,
});

export const formInputResetAccountSchema = selectUserCoreSchema.pick({
  email: true,
});

export const formInputSignInSchema = selectUserCoreSchema.extend({
  password: z.string().min(6, { message: "Minimum of 6 characters required" }),
}).pick({
  email: true,
  password: true,
  // code: true,
});

export const formInputSignUpSchema = selectUserCoreSchema.extend({
  password: z.string().min(6, { message: "Minimum of 6 characters required" }),
}).pick({
  email: true,
  name: true,
  password: true,
});
