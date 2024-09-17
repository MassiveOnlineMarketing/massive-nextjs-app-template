import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";

import { removeTagFromGoogleKeywordsUseCase } from "@/src/application/use-cases/google-keyword-tracker/keyword/remove-tag-from-google-keyword.use-case";

export async function removeTagFromGoogleKeywordsController(
  keywordIds: string[] | string,
  tagId: string
): Promise<void> {
  return await startSpan(
    { name: "controllerFunction Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();

      const keywordIdsArray = Array.isArray(keywordIds)
        ? keywordIds
        : [keywordIds];

      return await removeTagFromGoogleKeywordsUseCase(
        {
          ids: keywordIdsArray,
          tagId,
        },
        user
      );
    }
  );
}
