import { injectable } from "inversify";
import { db } from "@/prisma";
import { captureException, startSpan } from "@sentry/nextjs";

import { IGoogleKeywordTrackerRepository } from "@/src/application/repositories/google-keyword-tracker.repository.interface";

import {
  GoogleKeywordTracker,
  GoogleKeywordTrackerInsert,
  GoogleKeywordTrackerStatus,
  GoogleKeywordTrackerUpdate,
  GoogleKeywordTrackerWithCompetitors,
  GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation,
  GoogleKeywordTrackerWithWebsite,
} from "@/src/entities/models/google-keyword-tracker";

@injectable()
export class GoogleKeywordTrackerRepository
  implements IGoogleKeywordTrackerRepository
{
  async insert(
    inputSchema: GoogleKeywordTrackerInsert
  ): Promise<GoogleKeywordTracker> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > insert",
      },
      async () => {
        try {
          const googleKeywordTracker = await db.googleKeywordTrackerTool.create(
            {
              data: {
                ...inputSchema,
              },
            }
          );

          // Attach the keyword tracker to the location --> also see 'delete' website in the website.repository.ts
          await db.location.update({
            where: {
              id: inputSchema.locationId,
            },
            data: {
              keywordTrackerToolId: googleKeywordTracker.id,
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

  async update(
    updateSchema: GoogleKeywordTrackerUpdate,
    id: string
  ): Promise<GoogleKeywordTracker> {
    return await startSpan(
      { name: "GoogleKeywordTrackerRepository > update" },
      async () => {
        try {
          const updatedGoogleKeywordTracker =
            await db.googleKeywordTrackerTool.update({
              where: {
                id,
              },
              data: {
                ...updateSchema,
              },
            });

          return updatedGoogleKeywordTracker;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async delete(id: string): Promise<GoogleKeywordTracker> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > delete",
      },
      async () => {
        try {
          const deletedGoogleKeywordTracker =
            await db.googleKeywordTrackerTool.delete({
              where: {
                id,
              },
            });

          return deletedGoogleKeywordTracker;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async addCompetitors(
    googleKeywordTrackerId: string,
    competitors: string[]
  ): Promise<any> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > addCompetitors",
      },
      async () => {
        try {
          const competitorObjects = competitors.map((competitor) => ({
            domainUrl: competitor,
            googleKeywordTrackerToolId: googleKeywordTrackerId,
          }));

          const createdCompetitors =
            await db.googleKeywordTrackerCompetitor.createManyAndReturn({
              data: competitorObjects,
            });

          return createdCompetitors;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async removeCompetitors(competitorIds: string[]): Promise<any> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > removeCompetitors",
      },
      async () => {
        try {
          const deletedCompetitors =
            await db.googleKeywordTrackerCompetitor.deleteMany({
              where: {
                id: {
                  in: competitorIds,
                },
              },
            });

          return deletedCompetitors;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async updateStatus(id: string, status: GoogleKeywordTrackerStatus): Promise<GoogleKeywordTracker> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerRepository > updateStatus",
      },
      async () => {
        try {
          const updatedGoogleKeywordTracker =
            await db.googleKeywordTrackerTool.update({
              where: {
                id,
              },
              data: {
                status,
              },
            });

          return updatedGoogleKeywordTracker;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
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
                // Get the count of keywords, used in the updateGoogleKeywordsToTracker action to display the current count of keywords, not added to schema
                _count: {
                  select: {
                    keywords: true,
                  },
                },
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
}
