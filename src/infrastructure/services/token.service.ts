import { v4 as uuidv4 } from "uuid";
import { inject, injectable } from "inversify";
import 'reflect-metadata'
import { DI_SYMBOLS } from "@/di/types";
import { PasswordResetToken, VerificationToken } from "@prisma/client";

import type { ITokenRepository } from "@/src/application/repositories/token.repository.interface";
import { ITokenService } from "@/src/application/services/token.service.interface";
import { startSpan } from "@sentry/nextjs";

@injectable()
export class TokenService implements ITokenService {
  constructor(
    @inject(DI_SYMBOLS.ITokenRepository)
    private _tokenRepository: ITokenRepository,
  ) {
    this._tokenRepository = _tokenRepository;
  }

  async generateVerificationToken(email: string, userId?: string): Promise<VerificationToken> {
    return await startSpan(
      { name: "TokenService > generateVerificationToken" },
      async () => {
        const token = uuidv4();
        const expires = new Date(new Date().getTime() + 3600 * 1000);

        const existingVerificationToken = await this._tokenRepository.getVerificationTokenByEmail(email);

        if (existingVerificationToken) {
          await this._tokenRepository.deleteVerificationToken(existingVerificationToken.id);
        }

        const verificationToken = this._tokenRepository.createVerificationToken(email, token, expires, userId);

        return verificationToken;
      }
    );
  }

  async generatePasswordResetToken(email: string): Promise<PasswordResetToken> {
    return await startSpan(
      { name: "TokenService > generatePasswordResetToken" },
      async () => {
        const token = uuidv4();
        const expires = new Date(new Date().getTime() + 3600 * 1000);

        const existingPasswordResetToken = await this._tokenRepository.getPasswordResetTokenByEmail(email);
        if (existingPasswordResetToken) {
          await this._tokenRepository.deletePasswordResetToken(existingPasswordResetToken.id);
        }

        const passwordResetToken = this._tokenRepository.createPasswordResetToken(email, token, expires);

        return passwordResetToken;
      }
    );
  }
}