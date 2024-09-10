'use server';

import { captureException, withServerActionInstrumentation } from "@sentry/nextjs";
import { revalidatePath } from "next/cache";

import { ForbiddenError, UnauthenticatedError } from "@/src/entities/errors/auth";
import { DatabaseOperationError, InputParseError, NotFoundError, ValidationError } from "@/src/entities/errors/common";

import { z } from "zod";
import { formInputUpdateWebsiteSchema, formInputCreateWebsiteSchema, Website, WebsiteWithLocation } from "@/src/entities/models/website";

import { createWebsiteController } from "@/src/interface-adapters/controllers/website/create-website.controller";
import { updateWebsiteController } from "@/src/interface-adapters/controllers/website/update-website.controller";
import { deleteWebsiteController } from "@/src/interface-adapters/controllers/website/delete-website.controller";
import { getWebsiteWithLocationController } from "@/src/interface-adapters/controllers/website/get-website-with-location.controller";

import { auth } from "@/app/api/auth/[...nextauth]/_nextAuth";
import { getWebsiteWithLocationByUserController } from "@/src/interface-adapters/controllers/website/get-website-with-location-by-user.controller";
import { getWebsitesByUserController } from "@/src/interface-adapters/controllers/website/get-websites-by-user.controller";

export async function createWebsite(formData: z.infer<typeof formInputCreateWebsiteSchema>): Promise<{ createdWebsite?: WebsiteWithLocation, error?: string }> {
  return await withServerActionInstrumentation(
    'createWebsite',
    { recordResponse: true },
    async () => {
      try {
        const createdWebsite = await createWebsiteController(formData);
        return { createdWebsite: { location: null, ...createdWebsite } };
      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Invalid data" };
        } else if (error instanceof ValidationError) {
          return { error: error.message };
        } else if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to create a website" };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error creating website" };
        }
        console.log('createWebsite error: ', error)
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    }
  )
}

export async function updateWebsite(formData: z.infer<typeof formInputUpdateWebsiteSchema>, id: string): Promise<{ updatedWebsite?: WebsiteWithLocation, error?: string }> {
  return await withServerActionInstrumentation(
    'updateWebsite',
    { recordResponse: true },
    async () => {
      try {
        const updatedWebsite = await updateWebsiteController(formData);
        revalidatePath(`/app/settings/website/${id}`);
        return { updatedWebsite: { location: null, ...updatedWebsite } };
      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Invalid data" };
        } else if (error instanceof ValidationError) {
          return { error: error.message };
        } else if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to update a website" };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error updating website" };
        }
        console.log('updateWebsite error: ', error)
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    }
  )
}

export async function deleteWebsite(id: string): Promise<{ deletedWebsite?: Website, error?: string }> {
  return await withServerActionInstrumentation(
    'deleteWebsite',
    { recordResponse: true },
    async () => {

      console.log('deleteWebsite id: ', id)

      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return { error: "Must be logged in to delete a website" };
      }

      try {
        const deletedWebsite = await deleteWebsiteController(id);
        return { deletedWebsite };
      } catch (error) {
        if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to delete a website" };
        } else if (error instanceof NotFoundError) {
          return { error: "Website not found" };
        } else if (error instanceof ForbiddenError) {
          return { error: "You don't have permission to access this website" };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error deleting website" };
        }
        console.log('deleteWebsite error: ', error)
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    }
  )
}

/**
 * Retrieves websites by user ID.
 * 
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an object containing the retrieved websites or an error message.
 */
export async function getWebsitesByUser(userId: string): Promise<{ websites?: Website[], error?: string }> {
  return await withServerActionInstrumentation(
    'getWebsitesByUser',
    { recordResponse: true },
    async () => {

      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return { error: "Must be logged in to get websites" };
      }

      try {
        const websites = await getWebsitesByUserController(userId);
        return { websites };
      } catch (error) {
        if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to get websites" };
        } else if (error instanceof NotFoundError) {
          return { error: "Website not found" };
        } else if (error instanceof ForbiddenError) {
          return { error: "You don't have permission to access this website" };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error getting websites" };
        }
        console.log('getWebsitesByUser error: ', error)
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    }
  )
}

/**
 * Retrieves a website with location information for a given user.
 * 
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an object containing the retrieved website or an error message.
 */
export async function getWebsiteWithLocationByUser(userId: string): Promise<{ website?: WebsiteWithLocation[], error?: string }> {
  return await withServerActionInstrumentation(
    'getWebsiteWithLocationByUser',
    { recordResponse: true },
    async () => {

      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return { error: "Must be logged in to get a website" };
      }

      try {
        const website = await getWebsiteWithLocationByUserController(userId);
        return { website };
      } catch (error) {
        if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to get a website" };
        } else if (error instanceof NotFoundError) {
          return { error: "Website not found" };
        } else if (error instanceof ForbiddenError) {
          return { error: "You don't have permission to access this website" };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error getting website" };
        }
        console.log('getWebsiteWithLocationByUser error: ', error)
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    }
  )
}

export async function getWebsiteWithLocation(id: string): Promise<{ website?: WebsiteWithLocation, error?: string }> {
  return await withServerActionInstrumentation(
    'getWebsiteWithLocation',
    { recordResponse: true },
    async () => {

      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return { error: "Must be logged in to get a website" };
      }

      try {
        const website = await getWebsiteWithLocationController(id);
        return { website };
      } catch (error) {
        if (error instanceof UnauthenticatedError) {
          return { error: "Must be logged in to get a website" };
        } else if (error instanceof NotFoundError) {
          return { error: "Website not found" };
        } else if (error instanceof ForbiddenError) {
          return { error: "You don't have permission to access this website" };
        } else if (error instanceof DatabaseOperationError) {
          return { error: "Error getting website" };
        }
        console.log('getWebsiteWithLocation error: ', error)
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    }
  )
}