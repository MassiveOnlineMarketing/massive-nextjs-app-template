import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  customField?: string;
  loginProvider?: string;

  credits: number;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    email?: string;
  }
}
