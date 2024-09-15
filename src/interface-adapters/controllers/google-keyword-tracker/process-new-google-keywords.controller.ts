import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { InputParseError } from "@/src/entities/errors/common";

import { processNewGoogleKeywordUseCase } from "@/src/application/use-cases/process-keywords/process-new-google-keywords.use-case";

import { splitAndTrimKeywords } from "@/src/utils/string.utils";

export async function processNewGoogleKeywordsController(
  keywordsSting: string,
  googleKeywordTrackerToolId: string
) {
  return await startSpan(
    { name: "processNewGoogleKeywords Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");

      const { user } = await authenticationService.validateSession();

      // Split and trim keywords
      console.log("keywordsSting", keywordsSting);
      const stingsArray = splitAndTrimKeywords(keywordsSting);
      console.log("stingsArray", stingsArray);

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

      return result.length;
    }
  );
}
