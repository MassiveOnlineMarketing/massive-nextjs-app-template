import { newVerificationUseCase } from "@/src/application/use-cases/auth/new-verification.use-case";

export async function newVerificationController(token: string) {
  return await newVerificationUseCase(token);
}