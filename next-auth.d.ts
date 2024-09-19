import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  // Overwrite the default next-auth user object to match schema the user object in the database
  id: string;
  name: string;
  email: string;

  // Aditional fields
  credits: number;
  role: UserRole;
  loginProvider: string | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
