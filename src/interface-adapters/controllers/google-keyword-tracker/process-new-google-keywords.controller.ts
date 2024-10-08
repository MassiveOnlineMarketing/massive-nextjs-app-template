import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { InputParseError } from "@/src/entities/errors/common";

import { LatestGoogleKeywordResultsDto } from "../../presenters/latest-google-keyword-results.presenter";
import { processNewGoogleKeywordUseCase } from "@/src/application/use-cases/google-keyword-tracker/process-new-google-keywords.use-case";

import { splitAndTrimKeywords } from "@/src/utils/string.utils";

export async function processNewGoogleKeywordsController(
  keywordsSting: string | string[],
  googleKeywordTrackerToolId: string
): Promise<LatestGoogleKeywordResultsDto[]> {
  return await startSpan(
    { name: "processNewGoogleKeywords Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");

      const { user } = await authenticationService.validateSession();

      // Split and trim keywords
      let stingsArray: string[];
      if (typeof keywordsSting === "string") {
        stingsArray = splitAndTrimKeywords(keywordsSting);
      } else {
        stingsArray = keywordsSting;
      }

      // Format keywords to lower case
      const keywords = stingsArray.map((keyword) => keyword.toLowerCase());

      // Check if keywords are not empty
      if (keywords.length === 0) {
        throw new InputParseError("Keywords array is empty");
      }

      const result = await processNewGoogleKeywordUseCase(
        googleKeywordTrackerToolId,
        keywords,
        user
      );

      return result;
    }
  );
}
