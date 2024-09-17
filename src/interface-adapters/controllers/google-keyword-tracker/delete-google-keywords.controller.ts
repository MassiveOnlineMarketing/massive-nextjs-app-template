import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";

import { deleteGoogleKeywordsUseCase } from "@/src/application/use-cases/google-keyword-tracker/delete-google-keyword-tracker-keywords.use-case";

export async function deleteGoogleKeywordsController(
  id: string[] | string
): Promise<void> {
  return await startSpan(
    { name: "deleteGoogleKeywords Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();

      const inputParam = Array.isArray(id) ? id : [id];

      return await deleteGoogleKeywordsUseCase(inputParam, user);
    }
  );
}
