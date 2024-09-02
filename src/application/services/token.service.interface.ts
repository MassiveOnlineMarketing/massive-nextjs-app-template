import { PasswordResetToken, VerificationToken } from "@prisma/client";

export interface ITokenService {
  generateVerificationToken(email: string, userId?: string): Promise<VerificationToken>;
  generatePasswordResetToken(email: string): Promise<PasswordResetToken>;
}