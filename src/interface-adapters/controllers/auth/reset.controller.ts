import { startSpan } from "@sentry/nextjs";
import { InputParseError } from "@/src/entities/errors/common";

import { z } from "zod";
import { formInputResetAccountSchema } from "@/src/entities/models/user";

import { resetUseCase } from "@/src/application/use-cases/auth/reset.use-case";

export async function resetController(formData: z.infer<typeof formInputResetAccountSchema>) {
  return await startSpan({ name: "reset Controller" }, async () => {
    const { data, error: inputParseError } = formInputResetAccountSchema.safeParse(formData);

    if (inputParseError) {
      throw new InputParseError("Invalid data");
    }

    return await resetUseCase(data);
  });
}
