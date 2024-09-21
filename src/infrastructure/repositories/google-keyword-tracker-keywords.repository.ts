import { captureException, startSpan } from "@sentry/nextjs";
import { injectable } from "inversify";
import { db } from "@/prisma";

import { IGoogleKeywordTrackerKeywordsRepository } from "@/src/application/repositories/google-keyword-tracker-keywords.repository.interface";

import {
  SerpApiPeopleAsloAsk,
  SerpApiRelatedSearches,
  SerperApiSerpResult,
  SiteLinks,
} from "@/src/application/api/serper.api.types";

import {
  GoogleKeywordTrackerKeyword,
  GoogleKeywordTrackerKeywordWithResultsQuery,
} from "@/src/entities/models/google-keyword-tracker/keyword";
import { GoogleKeywordTrackerResult } from "@/src/entities/models/google-keyword-tracker/result";
import { GoogleKeywordTrackerKeywordTag } from "@/src/entities/models/google-keyword-tracker/tag";

@injectable()
export class GoogleKeywordTrackerKeywordsRepository
  implements IGoogleKeywordTrackerKeywordsRepository
{
  async getKeywordsWithResultsByToolId(
    toolId: string
  ): Promise<GoogleKeywordTrackerKeywordWithResultsQuery[]> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerKeywordsRepository > getKeywordsWithResultsByToolId",
      },
      async () => {
        try {
          const keywords = await db.googleKeywordTrackerKeyword.findMany({
            where: {
              googleKeywordTrackerToolId: toolId,
            },
            include: {
              results: {
                orderBy: {
                  createdAt: "desc",
                },
                take: 1,
              },
              tags: true,
              googleAdsKeywordMetrics: {
                orderBy: {
                  createdAt: "desc",
                },
                take: 1,
              },
            },
          });

          return keywords.map((keyword) => ({
            ...keyword,
            results: keyword.results.map((result) => ({
              ...result,
              relatedSearches:
                typeof result.relatedSearches === "string"
                  ? (JSON.parse(result.relatedSearches) as SerpApiRelatedSearches[])
                  : null,
              peopleAlsoAsk:
                typeof result.peopleAlsoAsk === "string"
                  ? (JSON.parse(result.peopleAlsoAsk) as SerperApiSerpResult[])
                  : null,
              siteLinks:
                typeof result.siteLinks === "string"
                  ? (JSON.parse(result.siteLinks) as SiteLinks[])
                  : null,
            })),
          })) as GoogleKeywordTrackerKeywordWithResultsQuery[];

        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async insertMany(
    googleKeywordTrackerId: string,
    keywords: string[]
  ): Promise<GoogleKeywordTrackerKeyword[]> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerKeywordsRepository > insertMany",
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

  async deleteMany(ids: string[]): Promise<void> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerKeywordsRepository > deleteMany",
      },
      async () => {
        try {
          await db.googleKeywordTrackerKeyword.deleteMany({
            where: {
              id: {
                in: ids,
              },
            },
          });
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async findMany(ids: string[]): Promise<GoogleKeywordTrackerKeyword[]> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerKeywordsRepository > findMany",
      },
      async () => {
        try {
          const keywords = await db.googleKeywordTrackerKeyword.findMany({
            where: {
              id: {
                in: ids,
              },
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

  // async findByToolId(
  //   googleKeywordTrackerId: string
  // ): Promise<GoogleKeywordTrackerKeyword[]> {
  //   return await startSpan(
  //     {
  //       name: "GoogleKeywordTrackerKeywordsRepository > findByToolId",
  //     },
  //     async () => {
  //       try {
  //         const keywords = await db.googleKeywordTrackerKeyword.findMany({
  //           where: {
  //             googleKeywordTrackerToolId: googleKeywordTrackerId,
  //           },
  //         });

  //         return keywords;
  //       } catch (error) {
  //         captureException(error);
  //         throw error;
  //       }
  //     }
  //   );
  // }

  async findLatestResultsByKeywordIds(
    keywordIds: string[]
  ): Promise<GoogleKeywordTrackerResult[]> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerKeywordsRepository > findLatestResultsByKeywordIds",
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

  async insertTag(name: string): Promise<GoogleKeywordTrackerKeywordTag> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerKeywordsRepository > insertTag",
      },
      async () => {
        try {
          const tag = await db.googleKeywordTrackerKeywordTag.create({
            data: {
              name,
            },
          });

          return tag;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async removeTag(tag: string, keywordIds: string[]): Promise<void> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerKeywordsRepository > removeTag",
      },
      async () => {
        try {
          await db.googleKeywordTrackerKeywordTag.update({
            where: {
              name: tag,
            },
            data: {
              keywords: {
                disconnect: keywordIds.map((id) => ({
                  id,
                })),
              },
            },
          });
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async addTag(id: string, keywordIds: string[]): Promise<void> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerKeywordRepository > addTag",
      },
      async () => {
        try {
          await db.googleKeywordTrackerKeywordTag.update({
            where: {
              id,
            },
            data: {
              keywords: {
                connect: keywordIds.map((id) => ({
                  id,
                })),
              },
            },
          });
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async findTagByid(
    id: string
  ): Promise<GoogleKeywordTrackerKeywordTag | null> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerKeywordsRepository > findTagByid",
      },
      async () => {
        try {
          const tag = await db.googleKeywordTrackerKeywordTag.findUnique({
            where: {
              id,
            },
          });

          return tag;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }

  async findTagByName(
    name: string
  ): Promise<GoogleKeywordTrackerKeywordTag | null> {
    return await startSpan(
      {
        name: "GoogleKeywordTrackerKeywordsRepository > findTagByName",
      },
      async () => {
        try {
          const tag = await db.googleKeywordTrackerKeywordTag.findUnique({
            where: {
              name,
            },
          });

          return tag;
        } catch (error) {
          captureException(error);
          throw error;
        }
      }
    );
  }
}
