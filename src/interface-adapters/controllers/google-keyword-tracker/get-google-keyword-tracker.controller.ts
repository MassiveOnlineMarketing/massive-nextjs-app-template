import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { getGoogleKeywordTrackerUseCase } from "@/src/application/use-cases/google-keyword-tracker/get-google-keyword-tracker.use-case";
import { GoogleKeywordTracker } from "@/src/entities/models/google-keyword-tracker";

export async function getGoogleKeywordTrackerController(
  id: string
): Promise<GoogleKeywordTracker> {
  return await startSpan(
    { name: "getGoogleKeywordTracker Controller" },
    async () => {
      const authService = getInjection("IAuthenticationService");

      const { user } = await authService.validateSession();

      return getGoogleKeywordTrackerUseCase(id, user);
    }
  );
}
