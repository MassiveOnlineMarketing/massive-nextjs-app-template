"use server";

import {
  captureException,
  withServerActionInstrumentation,
} from "@sentry/nextjs";
import { auth } from "../auth/_nextAuth";

import {
  ForbiddenError,
  UnauthenticatedError,
} from "@/src/entities/errors/auth";
import { NotFoundError } from "@/src/entities/errors/common";

import { addTagToGoogleKeywordsController } from "@/src/interface-adapters/controllers/google-keyword-tracker/add-tag-to-google-keywords.controller";
import { removeTagFromGoogleKeywordsController } from "@/src/interface-adapters/controllers/google-keyword-tracker/remove-tag-from-google-keywords.controller";
import { deleteGoogleKeywordsController } from "@/src/interface-adapters/controllers/google-keyword-tracker/delete-google-keywords.controller";

export async function deleteGoogleKeywords(ids: string[] | string) {
  return await withServerActionInstrumentation(
    "deleteGoogleKeywords",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return { error: "Must be logged in to delete Google Keywords" };
      }

      try {
        await deleteGoogleKeywordsController(ids);
        return { success: true };
      } catch (error) {
        if (error instanceof NotFoundError) {
          return { error: "Keywords not found" };
        } else if (error instanceof ForbiddenError) {
          return { error: "User does not own this Google Keyword Tracker" };
        } else if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to delete Keywords" };
        }
        console.error("deleteGoogleKeywords error: ", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

export async function addTagToGoogleKeywords(
  keywordIds: string[] | string,
  tagName?: string,
  tagId?: string
): Promise<{ success?: boolean; error?: string }> {
  return await withServerActionInstrumentation(
    "addTagToGoogleKeywords",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return { error: "Must be logged in to add a tag to Keywords" };
      }

      try {
        await addTagToGoogleKeywordsController(keywordIds, tagName, tagId);
        return { success: true };
      } catch (error) {
        if (error instanceof NotFoundError) {
          return { error: "Tag not found" };
        } else if (error instanceof ForbiddenError) {
          return { error: "User does not own this Google Keyword Tracker" };
        } else if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to add a tag to Keywords" };
        }
        console.error("addTagToGoogleKeywords error: ", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

export async function removeTagFromGoogleKeywords(
  keywordIds: string[] | string,
  tagId: string
) {
  return await withServerActionInstrumentation(
    "removeTagFromGoogleKeywords",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return {
          error: "Must be logged in to remove a tag from Keywords",
        };
      }

      try {
        await removeTagFromGoogleKeywordsController(keywordIds, tagId);
        return { success: true };
      } catch (error) {
        if (error instanceof NotFoundError) {
          return { error: "Tag not found" };
        } else if (error instanceof ForbiddenError) {
          return { error: "User does not own this Google Keyword Tracker" };
        } else if (error instanceof UnauthenticatedError) {
          return {
            error: "Must be logged in to remove a tag from Keywords",
          };
        }
        console.error("removeTagFromGoogleKeywords error: ", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}
