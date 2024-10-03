"use server";

import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

export async function getTopTenSerpResultsController(keywordId: string) {
  return await startSpan(
    { name: "getTopTenSerpResults Controller" },
    async () => {
      const authService = getInjection("IAuthenticationService");
      const keywordTrackerKeywordsRepository = getInjection(
        "IGoogleKeywordTrackerKeywordsRepository"
      );

      await authService.validateSession();

      const topTenSerpResults =
        await keywordTrackerKeywordsRepository.findTopTenSerpResultsByKeywordId(
          keywordId
        );

      return topTenSerpResults;
    }
  );
}
