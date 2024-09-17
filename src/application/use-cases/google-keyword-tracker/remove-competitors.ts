import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { GoogleKeywordTrackerCompetitor } from "@/src/entities/models/google-keyword-tracker/competitor";
import { User } from "@/src/entities/models/user";

export async function removeCompetitorsUseCase(
  googleKeywordTrackerId: string,
  competitors: GoogleKeywordTrackerCompetitor[],
  user: User
): Promise<any> {
  return await startSpan(
    { name: "removeCompetitors Use Case" },
    async () => {
      const googleKeywordTrackerRepository = getInjection(
        "IGoogleKeywordTrackerRepository"
      );

      const competitorsIds = competitors.map((competitor) => competitor.id);

      return await googleKeywordTrackerRepository.removeCompetitors(
        competitorsIds
      );
    }
  );
}