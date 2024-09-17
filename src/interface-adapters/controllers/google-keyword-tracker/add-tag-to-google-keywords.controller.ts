import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";
import { addTagToGoogleKeywordsUseCase } from "@/src/application/use-cases/google-keyword-tracker/keyword/add-tag-to-google-keyword.use-case";

export async function addTagToGoogleKeywordsController(
  keywordIds: string[] | string,
  tagName?: string,
  tagId?: string
): Promise<void> {
  return await startSpan(
    { name: "addTagToGoogleKeywords Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();

      const keywordIdsArray = Array.isArray(keywordIds)
        ? keywordIds
        : [keywordIds];

      return await addTagToGoogleKeywordsUseCase(
        {
          keywordIds: keywordIdsArray,
          tagName,
          tagId,
        },
        user
      );
    }
  );
}
