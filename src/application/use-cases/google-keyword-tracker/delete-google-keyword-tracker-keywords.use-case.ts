import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { NotFoundError } from "@/src/entities/errors/common";
import { User } from "@/src/entities/models/user";

/**
 * Deletes a GoogleKeywordTrackerKeyword.
 * @param id - The IDs of the GoogleKeywordTrackerKeyword to delete.
 * @param user - The user performing the delete operation.t found.
 * @returns A Promise that resolves to the deleted GoogleKeywordTrackerKeyword.
 */
export async function deleteGoogleKeywordsUseCase(
  ids: string[],
  user: User
): Promise<void> {
  return await startSpan(
    { name: "deleteGoogleKeywordsUseCase Use Case", op: "function" },
    async () => {
      const googleKeywordTrackerKeywordsRepository = getInjection(
        "IGoogleKeywordTrackerKeywordsRepository"
      );

      const googleKeyword =
        await googleKeywordTrackerKeywordsRepository.findMany(ids);

      if (!googleKeyword) {
        throw new NotFoundError("GoogleKeywordTrackerKeyword not found");
      }

      // TODO: check if the user is the owner of the GoogleKeywordTrackerKeyword/ allowed to access the GoogleKeywordTrackerKeyword

      return await googleKeywordTrackerKeywordsRepository.deleteMany(ids);
    }
  );
}
