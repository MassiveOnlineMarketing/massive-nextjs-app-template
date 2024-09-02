import { signInUseCase } from "@/application/use-cases/auth/sign-in.use-case";
import { InputParseError } from "@/entities/errors/common";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export async function signInController(formData: z.infer<typeof LoginSchema>, callbackUrl?: string | null) {
  const { data, error: inputParseError } = LoginSchema.safeParse(formData);

  if (inputParseError) {
    throw new InputParseError("Invalid data", { cause: inputParseError });
  }

  const signIn = await signInUseCase(data, callbackUrl);
}