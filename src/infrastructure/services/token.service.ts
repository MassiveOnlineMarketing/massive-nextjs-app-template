import { v4 as uuidv4 } from "uuid";

import tokenRepository from "@/infrastructure/repositories/token.repository";
import { ITokenService } from "@/application/services/token.service.interface";
import { PasswordResetToken, VerificationToken } from "@prisma/client";


export class TokenService implements ITokenService {
  async generateVerificationToken(email: string, userId?: string): Promise<VerificationToken> {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingVerificationToken = await tokenRepository.getVerificationTokenByEmail(email);

    if (existingVerificationToken) {
      await tokenRepository.deleteVerificationToken(existingVerificationToken.id);
    }

    const verificationToken = tokenRepository.createVerificationToken(email, token, expires, userId);
  
    return verificationToken;
  }

  async generatePasswordResetToken(email: string): Promise<PasswordResetToken> {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingPasswordResetToken = await tokenRepository.getPasswordResetTokenByEmail(email);
    if (existingPasswordResetToken) {
      await tokenRepository.deletePasswordResetToken(existingPasswordResetToken.id);
    }

    const passwordResetToken = tokenRepository.createPasswordResetToken(email, token, expires);

    return passwordResetToken;
  }
}