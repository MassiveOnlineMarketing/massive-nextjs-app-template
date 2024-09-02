import { getInjection } from "@/di/container";
import { AuthenticationError } from "@/src/entities/errors/auth";

export async function newVerificationUseCase(token: string) {
  const tokenRepository = getInjection("ITokenRepository");
  const userRepository = getInjection("IUsersRepository");

  const existingtoken = await tokenRepository.getVerificationTokenByToken(token);
  if (!existingtoken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingtoken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  if (existingtoken.userId !== null) {
    const existingUser = await userRepository.getById(existingtoken.userId);
    if (!existingUser) {
      throw new AuthenticationError("User does not exist!");
    }

    await userRepository.updateEmailVerified(existingUser.id, existingtoken.email);
    await tokenRepository.deleteVerificationToken(existingtoken.id);

    return { success: "Email updated!" };
  }

  const existingUser = await userRepository.getByEmail(existingtoken.email);
  if (!existingUser) {
    throw new AuthenticationError("User does not exist!");
  }

  await userRepository.updateEmailVerified(existingUser.id, existingtoken.email);
  await tokenRepository.deleteVerificationToken(existingtoken.id);

  return { success: "Email verified!" };
}