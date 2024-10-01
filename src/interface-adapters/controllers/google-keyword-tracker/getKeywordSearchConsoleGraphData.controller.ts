'use server';

import { getInjection } from "@/di/container";
import { GoogleTokenError } from "@/src/entities/errors/auth";
import { startSpan } from "@sentry/nextjs";
import { formatDate, subDays } from "date-fns";

// Helper functions
const format = (date: Date) => formatDate(date, "yyyy-MM-dd");

export async function getKeywordSearchConsoleGraphDataController(
  siteProperty: string,
  keyword: string,
  url: string | null,
  range: number
) {
  return await startSpan(
    { name: "getKeywordSearchConsoleGraphData Controller" },
    async () => {
      console.log('siteProperty',siteProperty, 'keyword',keyword, 'url',url, 'range',range);
      if (!url) {
        return {
          success: false,
          error: "Something happend please try again later",
        };
      }

      const authenticationService = getInjection("IAuthenticationService");
      const searchConsoleApi = getInjection("ISearchConsoleApi");
      const { user } = await authenticationService.validateSession();

      try {
        const refreshTokens =
          await authenticationService.getGoogleRefreshTokenForService(
            user.id,
            "search-console"
          );
        const data = await searchConsoleApi.fetchKeywordData(
          refreshTokens,
          siteProperty,
          keyword,
          url,
          format(subDays(new Date(), range)),
          format(new Date())
        );
// console.log('data.data',data);
        return {
          success: true,
          data
        }
      } catch (error) {
        if (error instanceof GoogleTokenError) {
          console.log("Error fetching search consosle data: ", error.message);
        } else {
          console.error("Error fetching search console data: ", error);
        }
        return {
          success: false,
          error: "Something happend please try again later",
        };
      }
    }
  );
}
