import { startSpan } from "@sentry/nextjs";
import { resetUseCase } from "@/src/application/use-cases/auth/reset.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

export const resetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export async function resetController(formData: z.infer<typeof resetSchema>) {
  return await startSpan({ name: "reset Controller" }, async () => {
    const { data, error: inputParseError } = resetSchema.safeParse(formData);

    if (inputParseError) {
      throw new InputParseError("Invalid data");
    }

    return await resetUseCase(data);
  });
}
