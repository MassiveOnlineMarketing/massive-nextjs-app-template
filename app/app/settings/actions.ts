'use server';

import { captureException, withServerActionInstrumentation } from "@sentry/nextjs";
import { z } from "zod";

import { UnauthenticatedError } from "@/src/entities/errors/auth";
import { DatabaseOperationError, InputParseError, ValidationError } from "@/src/entities/errors/common";

import { createWebsiteController, websiteInputSchema } from "@/src/interface-adapters/controllers/website/create-website.controller";


export async function createWebsite(formData: z.infer<typeof websiteInputSchema>){
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
        console.log('error', error)
        captureException(error);
        return { error: "An error happened. The developers have been notified. Please try again later." };
      }
    }
  )
}