import { ExtendedUser } from "@/next-auth";
import { Session } from "next-auth";

/**
 * Represents an interface for an authentication service.
 */
export interface IAuthenticationService {
 /**
   * Returns the current session.
   * @returns The current session.
   */
  session(): Promise<Session | null>;
  /**
   * Returns the current user.
   * @returns The current user.
   */
  currentUser(): Promise<ExtendedUser | null>;
  /**
   * Returns a value indicating whether the current user is an admin.
   * @returns True if the current user is an admin; otherwise, false.
   */
  isAdmin(): Promise<boolean>;
}