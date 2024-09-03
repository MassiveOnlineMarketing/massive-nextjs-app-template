import { startSpan } from "@sentry/nextjs";
import { newPasswordUseCase } from "@/src/application/use-cases/auth/new-password.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export async function newPasswordController(formData: z.infer<typeof newPasswordSchema>, token?: string | null
) {
  return await startSpan({ name: "newPassword Controller" }, async () => {

    if (!token) {
      throw new Error("Invalid token");
    }

    const { data, error: inputParseError } = newPasswordSchema.safeParse(formData);

    if (inputParseError) {
      throw new InputParseError("Invalid data");
    }

    const newPassword = await newPasswordUseCase(data, token);

    return newPassword;
  });
}
