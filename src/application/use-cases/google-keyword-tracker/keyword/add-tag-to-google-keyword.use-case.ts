import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { User } from "@/src/entities/models/user";
import { NotFoundError } from "@/src/entities/errors/common";

import { GoogleKeywordTrackerKeywordTag } from "@/src/entities/models/google-keyword-tracker/tag";

export async function addTagToGoogleKeywordsUseCase(
  input: {
    keywordIds: string[];
    tagName?: string;
    tagId?: string;
  },
  user: User
): Promise<GoogleKeywordTrackerKeywordTag> {
  return await startSpan(
    { name: "addTagToGoogleKeywords Use Case" },
    async () => {
      const googleKeywordTrackerKeywordsRepository = getInjection(
        "IGoogleKeywordTrackerKeywordsRepository"
      );

      let tag;

      if (input.tagId) {
        tag = await googleKeywordTrackerKeywordsRepository.findTagByid(input.tagId);
        if (!tag) {
          throw new NotFoundError("Tag not found");
        }
      } else if (input.tagName) {
        tag = await googleKeywordTrackerKeywordsRepository.findTagByName(input.tagName);
        if (!tag) {
          tag = await googleKeywordTrackerKeywordsRepository.insertTag(input.tagName);
        }
      }

      if (!tag) {
        throw new NotFoundError("Tag not found");
      }

      await googleKeywordTrackerKeywordsRepository.addTag(
        tag.id,
        input.keywordIds
      );

      return tag
    }
  );
}
