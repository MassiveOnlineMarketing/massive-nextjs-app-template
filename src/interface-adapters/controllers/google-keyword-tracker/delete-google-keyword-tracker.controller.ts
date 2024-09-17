import { startSpan } from "@sentry/nextjs";
import { getInjection } from "@/di/container";
import { deleteGoogleKeywordTrackerUseCase } from "@/src/application/use-cases/google-keyword-tracker/delete-google-keyword-tracker.use-case";
import { GoogleKeywordTracker } from "@/src/entities/models/google-keyword-tracker";

export async function deleteGoogleKeywordTrackerController(
  id: string
): Promise<GoogleKeywordTracker> {
  return await startSpan(
    { name: "deleteGoogleKeywordTrackerController Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();

      return await deleteGoogleKeywordTrackerUseCase(id, user);
    }
  );
}
