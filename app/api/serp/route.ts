import { auth } from "@/app/_modules/auth/_nextAuth";
import { captureException } from "@sentry/nextjs";

import {
  InputParseError,
  NotFoundError,
} from "@/src/entities/errors/common";
import { InsufficientCreditsError } from "@/src/entities/errors/credits";
import { processNewGoogleKeywordsController } from "@/src/interface-adapters/controllers/google-keyword-tracker/process-new-google-keywords.controller";

export const maxDuration = 300;

export async function POST(req: Request) {
  const data = await req.json();
  console.log("Data on serp route", data);

  const { keywordsString, googleKeywordTrackerToolId } = data;

  const session = await auth();
  if (!session?.user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const res = await processNewGoogleKeywordsController(
      keywordsString,
      googleKeywordTrackerToolId
    );
    console.log("res", res);

    if (res === 0) {
      return new Response(
        JSON.stringify({ message: "Failed to process new keywords" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ message: res }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to process new keywords", error);
    if (error instanceof InputParseError) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    } else if (error instanceof InsufficientCreditsError) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 402,
        headers: { "Content-Type": "application/json" },
      });
    } else if (error instanceof NotFoundError) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.error("createWebsite error: ", error);
    captureException(error);
    return new Response(
      JSON.stringify({
        message:
          "An error happened. The developers have been notified. Please try again later.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
