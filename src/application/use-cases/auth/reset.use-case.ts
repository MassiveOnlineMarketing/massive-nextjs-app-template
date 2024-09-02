import { getInjection } from "@/di/container";
import { AuthenticationError } from "@/src/entities/errors/auth";


export async function resetUseCase(input: { email: string }) {
  const userRepository = getInjection("IUsersRepository");
  const tokenService = getInjection("ITokenService");
  const emailRepository = getInjection("IEmailService");

  const existingUser = await userRepository.getByEmail(input.email);
  if (!existingUser) {
    throw new AuthenticationError("User does not exist!");
  }

  const passwordResetToken = await tokenService.generatePasswordResetToken(input.email);
  const h = emailRepository.sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: "Reset email sent!" };
}