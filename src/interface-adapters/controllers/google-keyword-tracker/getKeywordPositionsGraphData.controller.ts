"use server";

import { getInjection } from "@/di/container";
import { db } from "@/prisma";
import { extractHostname } from "@/src/utils/url.utils";
import { startSpan } from "@sentry/nextjs";
import { format as formatDate, subDays } from "date-fns";

export interface GroupedData {
  [date: string]: { [url: string]: number | null };
}

// Helper functions
const format = (date: Date) => formatDate(date, "yyyy-MM-dd");

export async function getKeywordPositionsGraphDataController(
  keywordId: string
) {
  return await startSpan(
    { name: "getKeywordPositionsGraphData Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");

      const { user } = await authenticationService.validateSession();

      try {
        const sevenDaysAgo = subDays(new Date(), 7);

        // Get competitor and user results
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

        // Combine competitor and user results
        const combinedData = [
          ...competitorResultsRes.map((result) => ({
            ...result,
            url: extractHostname(result.googleKeywordTrackerCompetitor.domainUrl),
          })),
          ...userResultsRes.map((result) =>
            result.url
              ? { ...result, url: extractHostname(result.url) }
              : result
          ),
        ];

        // Group data by date
        const groupedData = combinedData.reduce<GroupedData>((acc, item) => {
          const date = format(item.createdAt);
          if (!acc[date]) acc[date] = {};
          if (item.url) acc[date][item.url] = item.position;
          return acc;
        }, {});

        // Format data for graph
        let result = Object.entries(groupedData)
          .map(([date, data]) => ({ date, ...data }))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        // Fill in missing dates
        while (result.length < 7) {
          const date = format(subDays(new Date(result[0].date), 1));
          result.unshift({ date });
        }

        return { success: true, data: result };
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
