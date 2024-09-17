import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { NotFoundError } from "@/src/entities/errors/common";
import { GoogleKeywordTracker } from "@/src/entities/models/google-keyword-tracker";
import { User } from "@/src/entities/models/user";

/**
 * Deletes a GoogleKeywordTracker.
 * @param id - The ID of the GoogleKeywordTracker to delete.
 * @param user - The user performing the delete operation.
 * @throws {NotFoundError} if the GoogleKeywordTracker is not found.
 * @returns A Promise that resolves to the deleted GoogleKeywordTracker.
 */
export async function deleteGoogleKeywordTrackerUseCase(
  id: string,
  user: User
): Promise<GoogleKeywordTracker> {
  return await startSpan(
    { name: "deleteGoogleKeywordTrackerUseCase Use Case", op: "function" },
    async () => {
      const googleKeywordTrackerRepository = getInjection("IGoogleKeywordTrackerRepository");   

      const googleKeywordTracker = await googleKeywordTrackerRepository.findById(id);

      if (!googleKeywordTracker) {
        throw new NotFoundError("GoogleKeywordTracker not found");
      }

      // TODO: check if the user is the owner of the GoogleKeywordTracker/ allowed to access the GoogleKeywordTracker

      return await googleKeywordTrackerRepository.delete(id);
    }
  );
}