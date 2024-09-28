"use server";

import {
  captureException,
  withServerActionInstrumentation,
} from "@sentry/nextjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/_modules/auth/_nextAuth";

import {
  ForbiddenError,
  UnauthenticatedError,
} from "@/src/entities/errors/auth";
import {
  DatabaseOperationError,
  InputParseError,
  NotFoundError,
  ValidationError,
} from "@/src/entities/errors/common";

import { z } from "zod";
import {
  Location,
  formInputCreateLocationSchema,
  formInputUpdateLocationSchema,
  formSetupLocationSchema,
} from "@/src/entities/models/location";

import { setupLocationController } from "@/src/interface-adapters/controllers/location/setup-location.controller";
import { createLocationController } from "@/src/interface-adapters/controllers/location/create-location.controller";
import { updateLocationController } from "@/src/interface-adapters/controllers/location/update-location.controller";
import { deleteLocationController } from "@/src/interface-adapters/controllers/location/delete-location.controller";
import { getLocationController } from "@/src/interface-adapters/controllers/location/get-location.controller";

export async function setupLocation(
  formData: z.infer<typeof formSetupLocationSchema>
): Promise<{ createdLocation?: Location; error?: string }> {
  return await withServerActionInstrumentation(
    'setupLocation',
    { recordResponse: true },
    async () => {

      const session = await auth();
      if (!session) {
        return { error: "Must be logged in to setup a location" };
      }

      try {
        const createdLocation = await setupLocationController(formData);

        return { createdLocation };
      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Invalid data" };
        } else if (error instanceof ValidationError) {
          return { error: error.message };
        } else if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to create a location" };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error creating location" };
        }
        console.error("createLocation error: ", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  )
}

export async function createLocation(
  formData: z.infer<typeof formInputCreateLocationSchema>
): Promise<{ createdLocation?: Location; error?: string }> {
  return await withServerActionInstrumentation(
    "createLocation",
    { recordResponse: true },
    async () => {
      try {
        const createdLocation = await createLocationController(formData);
        return { createdLocation };
      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Invalid data" };
        } else if (error instanceof ValidationError) {
          return { error: error.message };
        } else if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to create a location" };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error creating location" };
        }
        console.error("createLocation error: ", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

export async function updateLocation(
  formData: z.infer<typeof formInputUpdateLocationSchema>
): Promise<{ updatedLocation?: Location; error?: string }> {
  return await withServerActionInstrumentation(
    "updateLocation",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session) {
        return { error: "Must be logged in to update a location" };
      }
      try {
        const updatedLocation = await updateLocationController(formData);
        revalidatePath(`/app/settings/website/location/${formData.id}`);
        return { updatedLocation };
      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Invalid data" };
        } else if (error instanceof ValidationError) {
          return { error: error.message };
        } else if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to update a location" };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error updating location" };
        }
        console.error("updateLocation error: ", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

export async function deleteLocation(
  id: string
): Promise<{ deletedLocation?: Location; error?: string }> {
  return await withServerActionInstrumentation(
    "deleteLocation",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session) {
        return { error: "Must be logged in to delete a location" };
      }
      try {
        const deletedLocation = await deleteLocationController(id);
        revalidatePath(`/app/settings/website/${deletedLocation.websiteId}`);
        return { deletedLocation };
      } catch (error) {
        if (error instanceof NotFoundError) {
          return { error: "Location not found" };
        } else if (error instanceof ForbiddenError) {
          return { error: "User does not own this website location" };
        } else if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to delete a location" };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error deleting location" };
        }
        console.error("deleteLocation error: ", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

export async function getLocation(
  id: string
): Promise<{ location?: Location; error?: string }> {
  return await withServerActionInstrumentation(
    "getLocation",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session) {
        return { error: "Must be logged in to get a location" };
      }
      try {
        const location = await getLocationController(id);
        return { location };
      } catch (error) {
        if (error instanceof NotFoundError) {
          return { error: "Location not found" };
        } else if (error instanceof ForbiddenError) {
          return { error: "User does not own this website location" };
        } else if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to get a location" };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error getting location" };
        }
        console.error("getLocation error: ", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}
