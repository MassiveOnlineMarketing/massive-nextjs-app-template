import { injectable } from "inversify";
import 'reflect-metadata'
import { db } from "@/prisma";
import { PasswordResetToken, VerificationToken } from "@prisma/client";

import { ITokenRepository } from "@/src/application/repositories/token.service.interface";
import { startSpan } from "@sentry/nextjs";

// TODO: Add try catch blocks with db errors
@injectable()
export class TokenRepository implements ITokenRepository {
  // Verification Token
  async createVerificationToken(email: string, token: string, expires: Date, userId?: string): Promise<VerificationToken> {
    return await startSpan(
      { name: "TokenRepository > createVerificationToken" },
      async () => {
        const verificationToken = await db.verificationToken.create({
          data: {
            email,
            token,
            expires,
            userId,
          },
        });

        return verificationToken;
      }
    );
  }

  async deleteVerificationToken(id: string): Promise<void> {
    return await startSpan(
      { name: "TokenRepository > deleteVerificationToken" },
      async () => {
        await db.verificationToken.delete({
          where: { id },
        });
      }
    );
  }


  async getVerificationTokenByEmail(email: string): Promise<VerificationToken | null> {
    return await startSpan(
      { name: "TokenRepository > getVerificationTokenByEmail" },
      async () => {
        const verificationToken = await db.verificationToken.findFirst({
          where: { email },
        });

        return verificationToken;
      }
    );
  }

  async getVerificationTokenByToken(token: string): Promise<VerificationToken | null> {
    return await startSpan(
      { name: "TokenRepository > getVerificationTokenByToken" },
      async () => {
        const verificationToken = await db.verificationToken.findFirst({
          where: { token },
        });

        return verificationToken;
      }
    );
  }


  // Password Reset Token
  async createPasswordResetToken(email: string, token: string, expires: Date): Promise<PasswordResetToken> {
    return await startSpan(
      { name: "TokenRepository > createPasswordResetToken" },
      async () => {
        const passwordResetToken = await db.passwordResetToken.create({
          data: {
            email,
            token,
            expires,
          },
        });

        return passwordResetToken;
      }
    );
  }

  async deletePasswordResetToken(id: string): Promise<void> {
    return await startSpan(
      { name: "TokenRepository > deletePasswordResetToken" },
      async () => {
        await db.passwordResetToken.delete({
          where: { id },
        });
      }
    );
  }

  async getPasswordResetTokenByEmail(token: string): Promise<PasswordResetToken | null> {
    return await startSpan(
      { name: "TokenRepository > getPasswordResetTokenByEmail" },
      async () => {
        const passwordResetToken = await db.passwordResetToken.findFirst({
          where: { token },
        });

        return passwordResetToken;
      }
    );
  }
}