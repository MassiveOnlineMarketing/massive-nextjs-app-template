import { injectable } from "inversify";
import 'reflect-metadata'
import { Resend } from "resend";

import { IEmailService } from "@/src/application/services/email.service.interface";
import { startSpan } from "@sentry/nextjs";

const domain = process.env.NEXT_PUBLIC_WEBSITE_URL;

// TODO: Add try catch blocks
@injectable()
export class EmailService implements IEmailService {
  sendVerificationEmail = async (email: string, token: string): Promise<void> => {
    return await startSpan(
      { name: "EmailService > sendVerificationEmail" },
      async () => {
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
          throw new Error("RESEND_API_KEY environment variable is not set.");
        }
        const resend = new Resend(resendApiKey);

        const confirmLink = `${domain}/auth/new-verification?token=${token}`;

        await resend.emails.send({
          from: "noreply@massiveonlinemarketing.nl",
          to: email,
          subject: "Confirm your email",
          html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
        });
      }
    );
  };


  sendPasswordResetEmail = async (email: string, token: string) => {
    return await startSpan(
      { name: "EmailService > sendPasswordResetEmail" },
      async () => {
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
          throw new Error("RESEND_API_KEY environment variable is not set.");
        }
        const resend = new Resend(resendApiKey);

        const resetLink = `${domain}/auth/new-password?token=${token}`;

        await resend.emails.send({
          from: "noreply@massiveonlinemarketing.nl",
          to: email,
          subject: "Reset your password",
          html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
        });
      }
    );
  };

  sendTwoFactorTokenEmail = async (email: string, token: string) => {
    return await startSpan(
      { name: "EmailService > sendTwoFactorTokenEmail" },
      async () => {
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
          throw new Error("RESEND_API_KEY environment variable is not set.");
        }
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: "noreply@massiveonlinemarketing.nl",
          to: email,
          subject: "2FA Code",
          html: `<p>Your 2FA code: ${token}</p>`,
        });
      }
    );
  }
}