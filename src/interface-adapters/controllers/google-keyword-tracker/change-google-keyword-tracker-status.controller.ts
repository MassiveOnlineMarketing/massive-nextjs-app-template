import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import {
  GoogleKeywordTracker,
  GoogleKeywordTrackerStatus,
} from "@/src/entities/models/google-keyword-tracker";

import { changeGoogleKeywordTrackerStatusUseCase } from "@/src/application/use-cases/google-keyword-tracker/change-google-keyword-tracker-status.use-case";

export async function changeGoogleKeywordTrackerStatusController(
  id: string,
  status: GoogleKeywordTrackerStatus
): Promise<GoogleKeywordTracker> {
  return await startSpan(
    { name: "changeGoogleKeywordTrackerStatusController Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();

      return await changeGoogleKeywordTrackerStatusUseCase(
        { id, status },
        user
      );
    }
  );
}
