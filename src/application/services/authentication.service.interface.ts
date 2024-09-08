import { ExtendedUser } from "@/next-auth";
import { User } from "@prisma/client";
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
   * Validates the current session and returns the user and session.
   * @returns The user and session.
   * 
   * @throws {UnauthenticatedError} Thrown if the user is not authenticated.
   * @throws {UnauthenticatedError} Thrown if the user does not exist.
   */
  validateSession(): Promise<{user: User, session: Session}>
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