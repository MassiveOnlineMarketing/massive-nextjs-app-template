import { startSpan } from "@sentry/nextjs";
import { InputParseError } from "@/src/entities/errors/common";
import { signUpUseCase } from "@/src/application/use-cases/auth/sign-up.use-case";
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export async function signUpController(formData: z.infer<typeof registerSchema>) {
  return await startSpan({ name: "signUp Controller" }, async () => {
  const { data, error: inputParseError } = registerSchema.safeParse(formData);

  if (inputParseError) {
    throw new InputParseError("Invalid data", { cause: inputParseError });
  }

  return await signUpUseCase(data);
})
}