import { UserRole } from "@prisma/client";
import { z } from "zod";

// Core user schema (without website relation)
export const selectUserCoreSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
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
