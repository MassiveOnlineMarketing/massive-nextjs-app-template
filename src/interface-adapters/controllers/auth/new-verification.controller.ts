import { newVerificationUseCase } from "@/src/application/use-cases/auth/new-verification.use-case";
import { startSpan } from "@sentry/nextjs";

export async function newVerificationController(token: string) {
  return await startSpan({ name: "newVerification Controller" }, async () => {
    return await newVerificationUseCase(token);
  });
}