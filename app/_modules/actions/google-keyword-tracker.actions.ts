"use server";

import {
  captureException,
  withServerActionInstrumentation,
} from "@sentry/nextjs";
import { auth } from "../auth/_nextAuth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

import {
  DatabaseOperationError,
  InputParseError,
  NotFoundError,
  ValidationError,
} from "@/src/entities/errors/common";

import {
  ForbiddenError,
  UnauthenticatedError,
} from "@/src/entities/errors/auth";

import {
  formInputCreateGoogleKeywordTrackerSchema,
  formInputUpdateGoogleKeywordTrackerSchema,
  GoogleKeywordTracker,
  GoogleKeywordTrackerStatus,
  GoogleKeywordTrackerWithCompetitors,
} from "@/src/entities/models/google-keyword-tracker";

import { updateGoogleKeywordTrackerController } from "@/src/interface-adapters/controllers/google-keyword-tracker/update-google-keyword-tracker.controller";
import { createGoogleKeywordTrackerController } from "@/src/interface-adapters/controllers/google-keyword-tracker/create-google-keyword-tracker.controller";
import { deleteGoogleKeywordTrackerController } from "@/src/interface-adapters/controllers/google-keyword-tracker/delete-google-keyword-tracker.controller";
import { getGoogleKeywordTrackerWithCompetitorsController } from "@/src/interface-adapters/controllers/google-keyword-tracker/get-google-keyword-tracker-with-competitors.controller";
import { changeGoogleKeywordTrackerStatusController } from "@/src/interface-adapters/controllers/google-keyword-tracker/change-google-keyword-tracker-status.controller";

export async function createGoogleKeywordTracker(
  formData: z.infer<typeof formInputCreateGoogleKeywordTrackerSchema>
): Promise<{ error?: string; googleKeywordTracker?: GoogleKeywordTracker }> {
  return await withServerActionInstrumentation(
    "createGoogleKeywordTracker",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return {
          error: "Must be logged in to create a Google Keyword Tracker",
        };
      }

      try {
        const googleKeywordTracker = await createGoogleKeywordTrackerController(
          formData
        );
        revalidatePath(
          `/app/settings/website/location/${googleKeywordTracker.locationId}`
        );
        return { googleKeywordTracker };
      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Invalid data" };
        } else if (error instanceof ValidationError) {
          return { error: error.message };
        } else if (error instanceof UnauthenticatedError) {
          return {
            error: "Must be logged in to create a Google Keyword Tracker",
          };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error creating Google Keyword Tracker" };
        }
        console.error("createGoogleKeywordTracker error: ", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

export async function updateGoogleKeywordsTracker(
  formData: z.infer<typeof formInputUpdateGoogleKeywordTrackerSchema>
): Promise<{
  error?: string;
  updatedGoogleKeywordTracker?: GoogleKeywordTracker;
}> {
  return await withServerActionInstrumentation(
    "updateGoogleKeywordsToTracker",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return {
          error: "Must be logged in to update a Google Keyword Tracker",
        };
      }

      try {
        const updatedGoogleKeywordTracker =
          await updateGoogleKeywordTrackerController(formData);
        revalidatePath(
          `/app/settings/website/location/${updatedGoogleKeywordTracker.locationId}`
        );
        return { updatedGoogleKeywordTracker };
      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Invalid data" };
        } else if (error instanceof ValidationError) {
          return { error: error.message };
        } else if (error instanceof UnauthenticatedError) {
          return {
            error: "Must be logged in to update a Google Keyword Tracker",
          };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error updating Google Keyword Tracker" };
        }
        console.error("updateGoogleKeywordsToTracker error: ", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

export async function changeGoogleKeywordTrackerStatus(
  id: string,
  status: GoogleKeywordTrackerStatus
): Promise<{ error?: string; googleKeywordTracker?: GoogleKeywordTracker }> {
  return await withServerActionInstrumentation(
    'changeGoogleKeywordTrackerStatus',
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return { error: 'Must be logged in to change Keyword Tracker status' };
      }

      try {
        const googleKeywordTracker = await changeGoogleKeywordTrackerStatusController(
          id,
          status
        );
        revalidatePath(
          `/app/settings/website/location/${googleKeywordTracker.locationId}`
        );
        return { googleKeywordTracker };
      } catch (error) {
        if (error instanceof NotFoundError) {
          return { error: 'Google Keyword Tracker not found' };
        } else if (error instanceof ForbiddenError) {
          return { error: 'User does not own this Google Keyword Tracker' };
        } else if (error instanceof UnauthenticatedError) {
          return { error: 'Must be logged in to change Keyword Tracker status' };
        }
        console.error('changeGoogleKeywordTrackerStatus error: ', error);
        captureException(error);
        return {
          error:
            'An error happened. The developers have been notified. Please try again later.',
        };
      }
    }
  )
}

export async function deleteGoogleKeywordTracker(
  id: string
): Promise<{ error?: string; googleKeywordTracker?: GoogleKeywordTracker }> {
  return await withServerActionInstrumentation(
    "deleteGoogleKeywordTracker",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return {
          error: "Must be logged in to delete a Google Keyword Tracker",
        };
      }

      try {
        const googleKeywordTracker = await deleteGoogleKeywordTrackerController(
          id
        );
        revalidatePath(
          `/app/settings/website/location/${googleKeywordTracker.locationId}`
        );
        return { googleKeywordTracker };
      } catch (error) {
        if (error instanceof NotFoundError) {
          return { error: "Google Keyword Tracker not found" };
        } else if (error instanceof ForbiddenError) {
          return { error: "User does not own this Google Keyword Tracker" };
        } else if (error instanceof UnauthenticatedError) {
          return {
            error: "Must be logged in to delete a Google Keyword Tracker",
          };
        }
        console.error("deleteGoogleKeywordTracker error: ", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

export async function getGoogleKeywordTrackerWithCompetitors(
  id: string | null
): Promise<{
  error?: string;
  googleKeywordTracker?: GoogleKeywordTrackerWithCompetitors;
}> {
  return await withServerActionInstrumentation(
    "getGoogleKeywordTrackerWithCompetitors",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return { error: "Must be logged in to get a Google Keyword Tracker" };
      }

      if (!id) {
        return { error: "Google Keyword Tracker ID is required" };
      }

      try {
        const googleKeywordTracker =
          await getGoogleKeywordTrackerWithCompetitorsController(id);

        return { googleKeywordTracker };
      } catch (error) {
        if (error instanceof NotFoundError) {
          return { error: "Google Keyword Tracker not found" };
        } else if (error instanceof ForbiddenError) {
          return { error: "User does not own this Google Keyword Tracker" };
        } else if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to get a Google Keyword Tracker" };
        }
        console.error("getGoogleKeywordTrackerWithCompetitors error: ", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}
