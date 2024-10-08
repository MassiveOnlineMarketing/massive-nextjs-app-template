import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { GoogleKeywordTrackerKeywordWithResultsQuery } from "@/src/entities/models/google-keyword-tracker/keyword";
import { User } from "@/src/entities/models/user";

export async function getLatestGoogleKeywordResultsByKeywordIdsUseCase(
  keywordIds: string[],
  user: User
): Promise<GoogleKeywordTrackerKeywordWithResultsQuery[]> {
  return await startSpan(
    { name: "getLatestGoogleKeywordResultsByKeywordIds Use Case" },
    async () => {
      const googleKeywordTrackerKeywordsRepository = getInjection(
        "IGoogleKeywordTrackerKeywordsRepository"
      );

      const results =
        await googleKeywordTrackerKeywordsRepository.getKeywordsWithResultsByKeywordIds(
          keywordIds
        );

      return results;
    }
  );
}
