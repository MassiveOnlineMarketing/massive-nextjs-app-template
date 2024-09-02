/**
 * Represents an email service that is responsible for sending emails.
 */
export interface IEmailService {
  /**
   * Sends a verification email to the specified email address with the given token.
   * @param email - The email address to send the verification email to.
   * @param token - The verification token to include in the email.
   * @returns A promise that resolves when the email is sent.
   */
  sendVerificationEmail(email: string, token: string): Promise<void>;

  /**
   * Sends a password reset email to the specified email address with the given token.
   * @param email - The email address to send the password reset email to.
   * @param token - The password reset token to include in the email.
   * @returns A promise that resolves when the email is sent.
   */
  sendPasswordResetEmail(email: string, token: string): Promise<void>;

  /**
   * Sends a two-factor authentication token email to the specified email address with the given token.
   * @param email - The email address to send the two-factor authentication token email to.
   * @param token - The two-factor authentication token to include in the email.
   * @returns A promise that resolves when the email is sent.
   */
  sendTwoFactorTokenEmail(email: string, token: string): Promise<void>;
}