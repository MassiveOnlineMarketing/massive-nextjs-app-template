import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { User } from "@/src/entities/models/user";

/**
* Use Case to remove a tag from a list of Google Keywords
* @param input - The input object containing the ids of the Google Keywords and the tagId
* @param user - The user object
* @returns void
**/
export async function removeTagFromGoogleKeywordsUseCase(
  input: {
    ids: string[];
    tagId: string;
  },
  user: User
): Promise<void> {
  return await startSpan(
    { name: "removeTagFromGoogleKeywords Use Case", op: "function" },
    async () => {
      const googleKeywordTrackerKeywordsRepository = getInjection(
        "IGoogleKeywordTrackerKeywordsRepository"
      );

      // TODO: check if the user is the owner of the Entity/ allowed to access the Entity

      return await googleKeywordTrackerKeywordsRepository.removeTag(input.tagId, input.ids);
    }
  );
}
