import { startSpan } from "@sentry/nextjs";
import { signInUseCase } from "@/src/application/use-cases/auth/sign-in.use-case";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export async function signInController(formData: z.infer<typeof loginSchema>) {
  return await startSpan({ name: "signIn Controller" }, async () => {
    const { data, error: inputParseError } = loginSchema.safeParse(formData);

    if (inputParseError) {
      return { error: "Invalid data" };
    }

    return await signInUseCase(data);
  });
}