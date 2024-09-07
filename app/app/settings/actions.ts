'use server';

import { captureException, withServerActionInstrumentation } from "@sentry/nextjs";
import { z } from "zod";

import { UnauthenticatedError } from "@/src/entities/errors/auth";
import { DatabaseOperationError, InputParseError, ValidationError } from "@/src/entities/errors/common";

import { createWebsiteController, createWebsiteInputSchema } from "@/src/interface-adapters/controllers/website/create-website.controller";
import { updateWebsiteController, updateWebsiteInputSchema } from "@/src/interface-adapters/controllers/website/update-website.controller";
import { revalidatePath } from "next/cache";
      // TODO: Add update website action


export async function createWebsite(formData: z.infer<typeof createWebsiteInputSchema>){
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
          return { error: error.message};
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

export async function updateWebsite(formData: z.infer<typeof updateWebsiteInputSchema>, id: string){
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
          return { error: error.message};
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