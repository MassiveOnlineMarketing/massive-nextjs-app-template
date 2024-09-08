'use server';

import { captureException, withServerActionInstrumentation } from "@sentry/nextjs";
import { z } from "zod";

import { ForbiddenError, UnauthenticatedError } from "@/src/entities/errors/auth";
import { DatabaseOperationError, InputParseError, NotFoundError, ValidationError } from "@/src/entities/errors/common";

import { createWebsiteController } from "@/src/interface-adapters/controllers/website/create-website.controller";
import { updateWebsiteController } from "@/src/interface-adapters/controllers/website/update-website.controller";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/api/auth/[...nextauth]/_nextAuth";
import { getWebsiteWithLocationController } from "@/src/interface-adapters/controllers/website/get-website-with-location.controller";
import { formInputUpdateWebsiteSchema, formInputCreateWebsiteSchema,  Website, WebsiteWithLocation } from "@/src/entities/models/website";
import { deleteWebsiteController } from "@/src/interface-adapters/controllers/website/delete-website.controller";

export async function createWebsite(formData: z.infer<typeof formInputCreateWebsiteSchema>) {
  return await withServerActionInstrumentation(
    'createWebsite',
    { recordResponse: true },
    async () => {
      try {
        const createdWebsite = await createWebsiteController(formData);
        return { createdWebsite };
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

export async function updateWebsite(formData: z.infer<typeof formInputUpdateWebsiteSchema>, id: string) {
  return await withServerActionInstrumentation(
    'updateWebsite',
    { recordResponse: true },
    async () => {
      try {
        const updatedWebsite = await updateWebsiteController(formData, id);
        revalidatePath(`/app/settings/website/${id}`);
        return { updatedWebsite };
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

// TODO: Implement getWebsite
// export async function getWebsite(id: string){
//   return await withServerActionInstrumentation(
//     'getWebsite',
//     { recordResponse: true },
//     async () => {

//       throw new Error('getWebsite not implemented yet')

//       try {
//         const website = await getWebsiteController(id);
//         return { website };
//       } catch (error) {
//         if (error instanceof UnauthenticatedError) {
//           return { error: "Must be logged in to get a website" };
//         } else if (error instanceof DatabaseOperationError) {
//           return { error: "Error getting website" };
//         }
//         console.log('getWebsite error: ', error)
//         captureException(error);
//         return { error: "An error happened. The developers have been notified. Please try again later." };
//       }
//     }
//   )
// }

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