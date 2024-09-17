import { getInjection } from "@/di/container";
import {
  DayOfWeek,
  GoogleKeywordTracker,
} from "@/src/entities/models/google-keyword-tracker";
import { User } from "@/src/entities/models/user";
import { startSpan } from "@sentry/nextjs";
import { addCompetitorsUseCase } from "./add-competitors";

export async function createGoogleKeywordTrackerUseCase(
  input: {
    locationId: string;
    websiteId: string;
    refresh: DayOfWeek[];
    addCompetitors?: string[] | undefined;
  },
  user: User
): Promise<GoogleKeywordTracker> {
  return await startSpan(
    { name: "createGoogleKeywordTracker Use Case", op: "function" },
    async () => {
      const googleKeywordTrackerRepository = getInjection(
        "IGoogleKeywordTrackerRepository"
      );
      
      const createdGoogleKeywordTracker =
        await googleKeywordTrackerRepository.insert({
          locationId: input.locationId,
          websiteId: input.websiteId,
          refresh: input.refresh,
        });

      if (input.addCompetitors) {
        addCompetitorsUseCase(
          createdGoogleKeywordTracker.id,
          input.addCompetitors,
          user
        );
      }

      return createdGoogleKeywordTracker;
    }
  );
}
