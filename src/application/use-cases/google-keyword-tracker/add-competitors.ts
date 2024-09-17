import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { User } from "@/src/entities/models/user";

export async function addCompetitorsUseCase(
  googleKeywordTrackerId: string,
  competitors: string[],
  user: User
): Promise<any> {
  return await startSpan(
    { name: "addCompetitors Use Case" },
    async () => {
      const googleKeywordTrackerRepository = getInjection(
        "IGoogleKeywordTrackerRepository"
      );

      return await googleKeywordTrackerRepository.addCompetitors(
        googleKeywordTrackerId,
        competitors
      );
    }
  );
}