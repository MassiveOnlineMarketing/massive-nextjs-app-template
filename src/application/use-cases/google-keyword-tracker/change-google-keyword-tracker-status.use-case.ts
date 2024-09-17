import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { NotFoundError } from "@/src/entities/errors/common";

import {
  GoogleKeywordTracker,
  GoogleKeywordTrackerStatus,
} from "@/src/entities/models/google-keyword-tracker";
import { User } from "@/src/entities/models/user";

export function changeGoogleKeywordTrackerStatusUseCase(
  input: {
    id: string;
    status: GoogleKeywordTrackerStatus;
  },
  user: User
): Promise<GoogleKeywordTracker> {
  return startSpan(
    { name: "changeGoogleKeywordTrackerStatus Use Case" },
    async () => {
      const googleKeywordTrackerRepository = getInjection(
        "IGoogleKeywordTrackerRepository"
      );

      const googleKeywordTracker =
        await googleKeywordTrackerRepository.findById(input.id);

      if (!googleKeywordTracker) {
        throw new NotFoundError("GoogleKeywordTracker not found");
      }

      return await googleKeywordTrackerRepository.updateStatus(
        input.id,
        input.status
      );
    }
  );
}
