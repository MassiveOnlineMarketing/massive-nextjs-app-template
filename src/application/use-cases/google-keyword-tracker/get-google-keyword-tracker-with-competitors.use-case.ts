import { getInjection } from "@/di/container";
import { NotFoundError } from "@/src/entities/errors/common";
import { GoogleKeywordTrackerWithCompetitors } from "@/src/entities/models/google-keyword-tracker";
import { User } from "@/src/entities/models/user";
import { startSpan } from "@sentry/nextjs";

export async function getGoogleKeywordTrackerWithCompetitorsUseCase(
  id: string,
  user: User
): Promise<GoogleKeywordTrackerWithCompetitors> {
  return await startSpan(
    { name: "getGoogleKeywordTrackerWithCompetitors Use Case" },
    async () => {
      const googleKeywordTrackerRepository = getInjection(
        "IGoogleKeywordTrackerRepository"
      );

      const googleKeywordTracker =
        await googleKeywordTrackerRepository.findByIdWithCompetitors(id);

      if (!googleKeywordTracker) {
        throw new NotFoundError("Google Keyword Tracker not found");
      }

      return googleKeywordTracker;
    }
  );
}
