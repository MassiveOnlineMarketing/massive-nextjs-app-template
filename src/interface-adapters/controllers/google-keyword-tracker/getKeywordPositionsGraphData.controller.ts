"use server";

import { getInjection } from "@/di/container";
import { db } from "@/prisma";
import { GoogleTokenError } from "@/src/entities/errors/auth";
import { extractHostname } from "@/src/utils/url.utils";
import { startSpan } from "@sentry/nextjs";
import { format as formatDate, subDays } from "date-fns";

export interface GroupedData {
  [date: string]: { [url: string]: number | null };
}

const DATE_RANGE = 7;

// Helper functions
const format = (date: Date) => formatDate(date, "yyyy-MM-dd");

async function fetchResults(keywordId: string, sevenDaysAgo: Date) {
  const [competitorResultsRes, userResultsRes] = await Promise.all([
    db.googleKeywordTrackerCompetitorResult.findMany({
      where: { keywordId, createdAt: { gte: sevenDaysAgo } },
      select: {
        position: true,
        createdAt: true,
        googleKeywordTrackerCompetitor: { select: { domainUrl: true } },
      },
      orderBy: { createdAt: "asc" },
    }),
    db.googleKeywordTrackerResult.findMany({
      where: { keywordId, createdAt: { gte: sevenDaysAgo } },
      select: { position: true, createdAt: true, url: true },
    }),
  ]);

  return { competitorResultsRes, userResultsRes };
}

function formatCompetitorResults(competitorResultsRes: any[]) {
  const combinedData = [
    ...competitorResultsRes.map((result) => ({
      ...result,
      url: extractHostname(result.googleKeywordTrackerCompetitor.domainUrl),
    })),
  ];

  return formatResults(combinedData);
}

function formatUserResults(userResultsRes: any[]) {
  const data = [
    ...userResultsRes.map((result) =>
      result.url ? { ...result, url: extractHostname(result.url) } : result
    ),
  ];

  return formatResults(data);
}
export interface FormattedResult {
  date: string;
  [url: string]: string | null;
}

function formatResults(data: any[]): FormattedResult[] {
  const groupedData = data.reduce<GroupedData>((acc, item) => {
    const date = format(item.createdAt);
    if (!acc[date]) acc[date] = {};
    if (item.url) acc[date][item.url] = item.position;
    return acc;
  }, {});

  let result = Object.entries(groupedData)
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return result;
}

function fillMissingDates(result: any[], dateRange: number) {
  if (!result.length) return [];

  while (result.length < dateRange) {
    const date = format(subDays(new Date(result[0].date), 1));
    result.unshift({ date });
  }
  return result;
}

export async function getKeywordPositionsGraphDataController(
  keywordId: string,
  siteProperty: string,
  keyword: string,
  url: string | null,
  range: number
) {
  return await startSpan(
    { name: "getKeywordPositionsGraphData Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const searchConsoleApi = getInjection("ISearchConsoleApi");

      const { user } = await authenticationService.validateSession();

      try {
        const sevenDaysAgo = subDays(new Date(), range);

        const { competitorResultsRes, userResultsRes } = await fetchResults(
          keywordId,
          sevenDaysAgo
        );

        let competitorResult = formatCompetitorResults(competitorResultsRes);
        competitorResult = fillMissingDates(competitorResult, range);

        let userResult = formatUserResults(userResultsRes);
        userResult = fillMissingDates(userResult, range);

        const combinedData = combineResults(userResult, competitorResult);

        let searchConsoleData = null;
        if (url) {
          try {
            const refreshTokens =
              await authenticationService.getGoogleRefreshTokenForService(
                user.id,
                "search-console"
              );
            searchConsoleData = await searchConsoleApi.fetchKeywordData(
              refreshTokens,
              siteProperty,
              keyword,
              url,
              format(subDays(new Date(), range)),
              format(new Date())
            );
          } catch (error) {
            if (error instanceof GoogleTokenError) {
              console.log("Error fetching search consosle data: ", error.message);
            } else {
              console.error("Error fetching search console data: ", error);
            }
          }
        }

        return {
          success: true,
          userResult,
          competitorResult,
          combinedData,
          searchConsoleData: searchConsoleData?.data,
        };
      } catch (error) {
        console.error(
          "Error getting competitor graph data keywordId: ",
          keywordId,
          error
        );
        return {
          success: false,
          error: "Something happend please try again later",
        };
      }
    }
  );
}

function combineResults(array1: FormattedResult[], array2: FormattedResult[]): FormattedResult[] {
  // Convert array1 to a map for easier merging by date
  const map = new Map<string, FormattedResult>();

  array1.forEach((item) => {
    map.set(item.date, { ...item });
  });

  // Merge array2 into the map, adding the URL data to the correct date
  array2.forEach((item) => {
    const existingEntry = map.get(item.date);
    if (existingEntry) {
      // Merge URLs from array2 into the existing entry
      Object.assign(existingEntry, item);
    } else {
      // If no existing entry for the date, add the new entry
      map.set(item.date, { ...item });
    }
  });

  // Convert the map back into an array
  return Array.from(map.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}