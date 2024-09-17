import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";
import { getGoogleKeywordTrackerWithCompetitorsUseCase } from "@/src/application/use-cases/google-keyword-tracker/get-google-keyword-tracker-with-competitors.use-case";
import { GoogleKeywordTrackerWithCompetitors } from "@/src/entities/models/google-keyword-tracker";

export async function getGoogleKeywordTrackerWithCompetitorsController(
  id: string
): Promise<GoogleKeywordTrackerWithCompetitors> {
  return await startSpan(
    { name: "getGoogleKeywordTrackerWithCompetitors Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();

      return await getGoogleKeywordTrackerWithCompetitorsUseCase(id, user);
    }
  );
}
