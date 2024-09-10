'use server';

import { captureException, withServerActionInstrumentation } from "@sentry/nextjs";

import { ForbiddenError, UnauthenticatedError } from "@/src/entities/errors/auth";
import { DatabaseOperationError, InputParseError, NotFoundError, ValidationError } from "@/src/entities/errors/common";

import { z } from "zod";
import { Location, formInputCreateLocationSchema, formInputUpdateLocationSchema } from "@/src/entities/models/location";

import { createLocationController } from "@/src/interface-adapters/controllers/location/create-location.controller";
import { updateLocationController } from "@/src/interface-adapters/controllers/location/update-location.controller";
import { auth } from "../api/auth/[...nextauth]/_nextAuth";
import { getLocationController } from "@/src/interface-adapters/controllers/location/get-location.controller";
import { revalidatePath } from "next/cache";



export async function createLocation(formData: z.infer<typeof formInputCreateLocationSchema>): Promise<{ createdLocation?: Location, error?: string }> {
  return await withServerActionInstrumentation(
    'createLocation',
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
        console.log('createLocation error: ', error)
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    }
  )
}

export async function updateLocation(formData: z.infer<typeof formInputUpdateLocationSchema>): Promise<{ updatedLocation?: Location, error?: string }> {
  return await withServerActionInstrumentation(
    'updateLocation',
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
        console.log('updateLocation error: ', error)
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    }
  )
}

export async function getLocation(id: string): Promise<{ location?: Location, error?: string }> {
  return await withServerActionInstrumentation(
    'getLocation',
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
        } else if (error instanceof ForbiddenError){
          return { error: "User does not own this website location" };
        } else if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to get a location" };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error getting location" };
        }
        console.log('getLocation error: ', error)
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    }
  )
}