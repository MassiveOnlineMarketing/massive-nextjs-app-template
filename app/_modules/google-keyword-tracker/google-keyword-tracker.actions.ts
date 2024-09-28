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

import { ConnectedGscProperties } from "@/src/application/api/search-console.api.types";
import { getConnectedGscPropertiesController } from "@/src/interface-adapters/controllers/search-console-api/get-connected-gsc-properties.controller";
import { getTopPerformingQueriesController } from "@/src/interface-adapters/controllers/search-console-api/get-top-performing-queries.controller";

/**
 * Retrieves the connected Google Search Console (GSC) properties for the authenticated user.
 *
 * @returns A promise that resolves to an object containing either an error message or the connected GSC properties.
 *
 * @throws {UnauthenticatedError} If the user is not authenticated.
 * @throws {ForbiddenError} If the user does not have the necessary permissions.ected error occurs.
 */
export async function getConnectedGscProperties(): Promise<{
  error?: string;
  properties?: ConnectedGscProperties[];
}> {
  return await withServerActionInstrumentation(
    "getConnectedGscProperties",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return {
          error: "Must be logged in to retrieve connected properties",
        };
      }

      try {
        const connectedGscProperties =
          await getConnectedGscPropertiesController(session.user.id);

        return { properties: connectedGscProperties };
      } catch (error) {
        if (error instanceof UnauthenticatedError) {
          return {
            error: "Must be logged in to retrieve connected properties",
          };
        } else if (error instanceof ForbiddenError) {
          return { error: "Unauthorized access" };
        } else if (error instanceof NotFoundError) {
          return { error: "No connected properties found" };
        }
        console.error("getConnectedGscProperties error", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}

/**
 * Fetches the top performing google search console queries for a given site property.
 *
 * @param siteProperty - The site property for which to fetch the top performing queries.
 * @param amountOfKeywords - The number of top performing keywords to fetch.
 * @param country - The country for which to fetch the top performing queries.
 * @returns A promise that resolves to an object containing either the keywords or an error message.
 *
 * @throws {UnauthenticatedError} If the user is not authenticated.
 * @throws {ForbiddenError} If the user has not authenticated Google Search Console.
 * @throws {NotFoundError} If no connected properties are found.
 * @throws {Error} If an unexpected error occurs.
 */
export async function getTopPerformingQueries(
  siteProperty: string,
  amountOfKeywords: string,
  country: string
): Promise<{ keywords?: string[]; error?: string }> {
  return await withServerActionInstrumentation(
    "getConnectedGscProperties",
    { recordResponse: true },
    async () => {
      const session = await auth();
      if (!session?.user || !session?.user.id) {
        return {
          error: "Must be logged in to fetch queries",
        };
      }

      try {
        const keywords = await getTopPerformingQueriesController(
          siteProperty,
          amountOfKeywords,
          country
        );
        return { keywords };
      } catch (error) {
        if (error instanceof UnauthenticatedError) {
          return {
            error: "Must be logged in to fetch queries",
          };
        } else if (error instanceof ForbiddenError) {
          return { error: "Please authenticate Google Search Console first" };
        } else if (error instanceof NotFoundError) {
          return { error: "No connected properties found" };
        }
        console.error("getConnectedGscProperties error", error);
        captureException(error);
        return {
          error:
            "An error happened. The developers have been notified. Please try again later.",
        };
      }
    }
  );
}
