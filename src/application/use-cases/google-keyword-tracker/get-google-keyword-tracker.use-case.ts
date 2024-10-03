import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { GoogleKeywordTracker } from "@/src/entities/models/google-keyword-tracker";
import { User } from "@/src/entities/models/user";

import { NotFoundError } from "@/src/entities/errors/common";

/**
 * Retrieves a Google Keyword Tracker and checks if the use has access to the tool.
 *
 * @param id - The unique identifier of the Google Keyword Tracker.
 * @param user - The user requesting access to the Google Keyword Tracker.
 * @returns A promise that resolves to the Google Keyword Tracker.
 * @throws NotFoundError - If the Google Keyword Tracker is not found.
 */
export async function getGoogleKeywordTrackerUseCase(
  id: string,
  user: User
): Promise<GoogleKeywordTracker> {
  return await startSpan(
    { name: "getGoogleKeywordTrackerWithCompetitors Use Case" },
    async () => {
      const googleKeywordTrackerRepository = getInjection(
        "IGoogleKeywordTrackerRepository"
      );
      const authService = getInjection("IAuthenticationService");

      const googleKeywordTracker =
        await googleKeywordTrackerRepository.findById(id);

      if (!googleKeywordTracker) {
        throw new NotFoundError("Google Keyword Tracker not found");
      }

      await authService.isAllowedToAccessTool(user.id, googleKeywordTracker.locationId);

      return googleKeywordTracker;
    }
  );
}
