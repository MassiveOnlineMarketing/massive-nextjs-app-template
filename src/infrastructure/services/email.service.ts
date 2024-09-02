
import { IEmailService } from "@/application/services/email.service.interface";
import { Resend } from "resend";

const domain = process.env.WEBSITE_URL;

export default class EmailRepository implements IEmailService {
  sendVerificationEmail = async (email: string, token: string): Promise<void> => {
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
  };
  
  sendPasswordResetEmail = async (email: string, token: string) => {
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
  };

  sendTwoFactorTokenEmail = async (email: string, token: string) => {
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
}