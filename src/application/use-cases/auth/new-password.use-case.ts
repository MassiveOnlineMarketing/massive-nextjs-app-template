import { getInjection } from "@/di/container";
import { AuthenticationError } from "@/src/entities/errors/auth";
import bcrypt from "bcryptjs";

export async function newPasswordUseCase(input: { password: string}, token: string) {
  const tokenRepository = getInjection("ITokenRepository");
  const userRepository = getInjection("IUsersRepository");


  const existingToken = await tokenRepository.getPasswordResetTokenByEmail(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await userRepository.getByEmail(existingToken.email);
  if (!existingUser) {
    throw new AuthenticationError("Email does not exist!");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  await userRepository.updatePassword(existingUser.id, hashedPassword);
  await tokenRepository.deletePasswordResetToken(existingToken.id);

  return { success: "Password updated!" };
}