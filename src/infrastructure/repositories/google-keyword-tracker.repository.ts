import { injectable } from "inversify";
import { db } from "@/prisma";
import { captureException, startSpan } from "@sentry/nextjs";

import { IGoogleKeywordTrackerRepository } from "@/src/application/repositories/google-keyword-tracker.repository.interface";

import {
  SerpApiPeopleAsloAsk,
  SerpApiRelatedSearches,
  SiteLinks,
} from "@/src/application/api/serper.api.types";

import {
  GoogleKeywordTracker,
  GoogleKeywordTrackerWithCompetitors,
  GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation,
  GoogleKeywordTrackerWithWebsite,
} from "@/src/entities/models/google-keyword-tracker";
import { GoogleKeywordTrackerKeyword } from "@/src/entities/models/google-keyword-tracker/keyword";
import { GoogleKeywordTrackerResult } from "@/src/entities/models/google-keyword-tracker/result";

@injectable()
export class GoogleKeywordTrackerRepository
  implements IGoogleKeywordTrackerRepository
{
  async insert(inputSchema: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async update(updateSchema: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<GoogleKeywordTracker | null> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > findById",
      },
      async () => {
        try {
          const googleKeywordTracker =
            await db.googleKeywordTrackerTool.findUnique({
              where: {
                id,
              },
            });

          return googleKeywordTracker;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async findByIdWithWebsite(
    id: string
  ): Promise<GoogleKeywordTrackerWithWebsite | null> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > findByIdWithWebsite",
      },
      async () => {
        try {
          const googleKeywordTracker =
            await db.googleKeywordTrackerTool.findUnique({
              where: {
                id,
              },
              include: {
                website: true,
              },
            });

          return googleKeywordTracker;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async findByIdWithCompetitors(
    id: string
  ): Promise<GoogleKeywordTrackerWithCompetitors | null> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > findByIdWithCompetitors",
      },
      async () => {
        try {
          const googleKeywordTracker =
            await db.googleKeywordTrackerTool.findUnique({
              where: {
                id,
              },
              include: {
                competitors: true,
              },
            });

          return googleKeywordTracker;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async findByIdWithCompetitorsWebsiteAndLocation(
    id: string
  ): Promise<GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation | null> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > findByIdWithCompetitorsWebsiteAndLocation",
      },
      async () => {
        try {
          const googleKeywordTracker =
            await db.googleKeywordTrackerTool.findUnique({
              where: {
                id,
              },
              include: {
                competitors: true,
                location: true,
                website: true,
              },
            });

          return googleKeywordTracker;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async findAllWithCompetitorsWebsiteAndLocation(): Promise<
    GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation[]
  > {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > findAllWithCompetitorsWebsiteAndLocation",
      },
      async () => {
        try {
          const googleKeywordTracker =
            await db.googleKeywordTrackerTool.findMany({
              include: {
                competitors: true,
                location: true,
                website: true,
              },
            });

          return googleKeywordTracker;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async findKeywordsByToolId(
    googleKeywordTrackerId: string
  ): Promise<GoogleKeywordTrackerKeyword[]> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > findKeywordsByToolId",
      },
      async () => {
        try {
          const keywords = await db.googleKeywordTrackerKeyword.findMany({
            where: {
              googleKeywordTrackerToolId: googleKeywordTrackerId,
            },
          });

          return keywords;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async findLatestResultsByKeywordIds(
    keywordIds: string[]
  ): Promise<GoogleKeywordTrackerResult[]> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > findLatestResultsByKeywordIds",
      },
      async () => {
        try {
          const results = await db.googleKeywordTrackerResult.findMany({
            where: {
              keywordId: {
                in: keywordIds,
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          });

          const formattedResults = results.map((result) => ({
            ...result,
            relatedSearches:
              typeof result.relatedSearches === "string"
                ? (JSON.parse(
                    result.relatedSearches
                  ) as SerpApiRelatedSearches[])
                : null,
            peopleAlsoAsk:
              typeof result.peopleAlsoAsk === "string"
                ? (JSON.parse(result.peopleAlsoAsk) as SerpApiPeopleAsloAsk[])
                : null,
            siteLinks:
              typeof result.siteLinks === "string"
                ? (JSON.parse(result.siteLinks) as SiteLinks[])
                : null,
          }));

          return formattedResults;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async addKeywords(
    googleKeywordTrackerId: string,
    keywords: string[]
  ): Promise<GoogleKeywordTrackerKeyword[]> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > addKeywords",
      },
      async () => {
        try {
          const keywordObjects = keywords.map((keyword) => ({
            keyword,
            googleKeywordTrackerToolId: googleKeywordTrackerId,
          }));

          const createdKeywords =
            await db.googleKeywordTrackerKeyword.createManyAndReturn({
              data: keywordObjects,
            });

          return createdKeywords;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }
}
