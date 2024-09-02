import { PasswordResetToken, VerificationToken } from "@prisma/client";


/**
 * Represents a token repository interface.
 */
/**
 * Represents a token repository interface.
 */
export interface ITokenRepository {
  /**
   * Creates a verification token.
   * @param email - The email associated with the token.
   * @param token - The verification token.
   * @param expires - The expiration date of the token.
   * @param userId - The ID of the user associated with the token.
   * @returns A promise that resolves to the created verification token.
   */
  createVerificationToken(email: string, token: string, expires: Date, userId: string): Promise<VerificationToken>;

  /**
   * Deletes a verification token.
   * @param id - The ID of the verification token to delete.
   * @returns A promise that resolves when the token is deleted.
   */
  deleteVerificationToken(id: string): Promise<void>;

  /**
   * Retrieves a verification token by email.
   * @param email - The email associated with the token.
   * @returns A promise that resolves to the retrieved verification token, or null if not found.
   */
  getVerificationTokenByEmail(email: string): Promise<VerificationToken | null>;

  /**
   * Retrieves a verification token by token value.
   * @param token - The verification token.
   * @returns A promise that resolves to the retrieved verification token, or null if not found.
   */
  getVerificationTokenByToken(token: string): Promise<VerificationToken | null>;

  /**
   * Creates a password reset token.
   * @param email - The email associated with the token.
   * @param token - The password reset token.
   * @param expires - The expiration date of the token.
   * @returns A promise that resolves to the created password reset token.
   */
  createPasswordResetToken(email: string, token: string, expires: Date): Promise<PasswordResetToken>;

  /**
   * Deletes a password reset token.
   * @param id - The ID of the password reset token to delete.
   * @returns A promise that resolves when the token is deleted.
   */
  deletePasswordResetToken(id: string): Promise<void>;

  /**
   * Retrieves a password reset token by token value.
   * @param token - The password reset token.
   * @returns A promise that resolves to the retrieved password reset token, or null if not found.
   */
  getPasswordResetTokenByEmail(token: string): Promise<PasswordResetToken | null>;
}