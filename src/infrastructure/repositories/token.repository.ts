import { injectable } from "inversify";
import 'reflect-metadata'
import { db } from "@/prisma";
import { PasswordResetToken, VerificationToken } from "@prisma/client";

import { ITokenRepository } from "@/src/application/repositories/token.service.interface";
import { captureException, startSpan } from "@sentry/nextjs";
import { DatabaseOperationError } from "@/src/entities/errors/common";

// TODO: Add try catch blocks with db errors
@injectable()
export class TokenRepository implements ITokenRepository {
  // Verification Token
  async createVerificationToken(email: string, token: string, expires: Date, userId?: string): Promise<VerificationToken> {
    return await startSpan(
      { name: "TokenRepository > createVerificationToken" },
      async () => {
        try {
          const verificationToken = await db.verificationToken.create({
            data: {
              email,
              token,
              expires,
              userId,
            },
          });

          if (verificationToken) {
            return verificationToken;
          } else {
            throw new DatabaseOperationError("Verification token not created");
          }
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async deleteVerificationToken(id: string): Promise<void> {
    return await startSpan(
      { name: "TokenRepository > deleteVerificationToken" },
      async () => {
        try {
          const res = await db.verificationToken.delete({
            where: { id },
          });

          if (res) {
            return
          } else {
            throw new DatabaseOperationError("Verification token not found");
          }
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async getVerificationTokenByEmail(email: string): Promise<VerificationToken | null> {
    return await startSpan(
      { name: "TokenRepository > getVerificationTokenByEmail" },
      async () => {
        try {
          const verificationToken = await db.verificationToken.findFirst({
            where: { email },
          });

          return verificationToken;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async getVerificationTokenByToken(token: string): Promise<VerificationToken | null> {
    return await startSpan(
      { name: "TokenRepository > getVerificationTokenByToken" },
      async () => {
        try {
          const verificationToken = await db.verificationToken.findFirst({
            where: { token },
          });

          return verificationToken;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }


  // Password Reset Token
  async createPasswordResetToken(email: string, token: string, expires: Date): Promise<PasswordResetToken> {
    return await startSpan(
      { name: "TokenRepository > createPasswordResetToken" },
      async () => {
        try {
          const passwordResetToken = await db.passwordResetToken.create({
            data: {
              email,
              token,
              expires,
            },
          });

          return passwordResetToken;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async deletePasswordResetToken(id: string): Promise<void> {
    return await startSpan(
      { name: "TokenRepository > deletePasswordResetToken" },
      async () => {
        try {
          await db.passwordResetToken.delete({
            where: { id },
          });
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async getPasswordResetTokenByEmail(token: string): Promise<PasswordResetToken | null> {
    return await startSpan(
      { name: "TokenRepository > getPasswordResetTokenByEmail" },
      async () => {
        try {
          const passwordResetToken = await db.passwordResetToken.findFirst({
            where: { token },
          });

          return passwordResetToken;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }
}