import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { DayOfWeek } from "@/src/entities/models/google-keyword-tracker";
import { User } from "@/src/entities/models/user";
import { GoogleKeywordTrackerCompetitor } from "@/src/entities/models/google-keyword-tracker/competitor";

import { addCompetitorsUseCase } from "./add-competitors";
import { removeCompetitorsUseCase } from "./remove-competitors";

export async function updateGoogleKeywordTrackerUseCase(
  input: {
    id: string;
    refresh: DayOfWeek[];
    addCompetitors?: string[] | undefined;
    removeCompetitors?: GoogleKeywordTrackerCompetitor[] | null;
    keywords?: string | undefined;
  },
  user: User
) {
  return await startSpan(
    { name: " updateGoogleKeywordTracker Use Case" },
    async () => {
      const googleKeywordTrackerRepository = getInjection(
        "IGoogleKeywordTrackerRepository"
      );
      const { refresh } = input;
      const updatedKeywordTracker = await googleKeywordTrackerRepository.update(
        { refresh },
        input.id
      );

      if (input.addCompetitors) {
        addCompetitorsUseCase(input.id, input.addCompetitors, user);
      }

      if (input.removeCompetitors) {
        removeCompetitorsUseCase(input.id, input.removeCompetitors, user);
      }

      return updatedKeywordTracker;
    }
  );
}
