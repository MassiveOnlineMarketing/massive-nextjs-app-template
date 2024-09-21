import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { GoogleKeywordTrackerKeywordWithResultsQuery } from "@/src/entities/models/google-keyword-tracker/keyword";
import { NotFoundError } from "@/src/entities/errors/common";
import { ForbiddenError } from "@/src/entities/errors/auth";
import { User } from "@/src/entities/models/user";

export async function getLatestGoogleKeywordResultsUseCase(
  googleKeywordTrackerToolId: string,
  user: User
): Promise<GoogleKeywordTrackerKeywordWithResultsQuery[]> {
  return await startSpan(
    { name: "getLatestGoogleKeywordResults Use Case" },
    async () => {
      const googleKeywordTrackerKeywordsRepositor = getInjection(
        "IGoogleKeywordTrackerKeywordsRepository"
      );

      const authenticationService = getInjection("IAuthenticationService");
      const googleKeywordTrackerRepository = getInjection(
        "IGoogleKeywordTrackerRepository"
      );

      const tool = await googleKeywordTrackerRepository.findById(
        googleKeywordTrackerToolId
      );

      if (!tool) {
        throw new NotFoundError("Keyword Tracker not found");
      }

      await authenticationService.isAllowedToAccessTool(
        user.id,
        tool.locationId
      );

      const results =
        await googleKeywordTrackerKeywordsRepositor.getKeywordsWithResultsByToolId(
          googleKeywordTrackerToolId
        );

      return results;
    }
  );
}
