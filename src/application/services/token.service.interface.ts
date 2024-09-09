import { PasswordResetToken, VerificationToken } from "@prisma/client";

/**
 * Interface for the Token Service.
 */
export interface ITokenService {
  /**
   * Generates a verification token and inserts into the database for the specified email and user ID.
   * @param email - The email associated with the token.
   * @param userId - The ID of the user associated with the token.
   * @returns A promise that resolves to the generated verification token.
   */
  generateVerificationToken(email: string, userId?: string): Promise<VerificationToken>;
  /**
   * Generates a password reset token and inserts into the database for the specified email.
   * @param email - The email associated with the token.
   * @returns A promise that resolves to the generated password reset token.
   */
  generatePasswordResetToken(email: string): Promise<PasswordResetToken>;
}