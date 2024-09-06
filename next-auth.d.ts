import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  name: string;
  email: string;
  role: UserRole;
  loginProvider: string | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
