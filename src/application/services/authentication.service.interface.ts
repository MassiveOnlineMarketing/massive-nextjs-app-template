import { ExtendedUser } from "@/next-auth";
import { User } from "@/src/entities/models/user";
import { Website } from "@/src/entities/models/website";
import { GoogleScopeOptions } from "@/src/infrastructure/services/authentication.service";
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
  validateSession(): Promise<{ user: User; session: Session }>;
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

  getGoogleRefreshTokenForService(
    userId: string,
    scope: GoogleScopeOptions
  ): Promise<string>;

  /**
   * Checks if the user is allowed to access the specified website.
   *
   * @param userId - The ID of the user attempting to access the website.
   * @param website - The website object containing the userId of the owner.
   * @returns A promise that resolves if the user is allowed to access the website, otherwise it throws a ForbiddenError.
   * @throws {ForbiddenError} If the user does not have access to the website.
   */
  isAllowedToAccessWebsite(userId: string, website: Website): Promise<void>;

  /**
   * Checks if a user is allowed to access a specific location on a website.
   *
   * @param userId - The ID of the user attempting to access the location.
   * @param websiteId - The ID of the website being accessed.
   * @returns A promise that resolves if the user is allowed to access the location, otherwise it throws a ForbiddenError.
   * @throws {ForbiddenError} - If the website is not found or the user does not have access to the location.
   */
  isAllowedToAccessLocation(userId: string, websiteId: string): Promise<void>;

  /**
   * Checks if a user is allowed to access a specific tool based on their user ID and location ID.
   *
   * @param userId - The ID of the user attempting to access the tool.
   * @param locationId - The ID of the location where the tool is located.
   * @returns A promise that resolves if the user is allowed to access the tool, otherwise it throws a ForbiddenError.
   * @throws {ForbiddenError} - If the location is not found, the website is not found, or the user does not have access to the location.
   */
  isAllowedToAccessTool(userId: string, locationId: string): Promise<void>;
}
