import { injectable } from "inversify";
import { db } from "@/prisma";
import { IGoogleKeywordTrackerRepository } from "@/src/application/repositories/google-keyword-tracker.repository.interface";

import { SerpApiPeopleAsloAsk, SerpApiRelatedSearches, SiteLinks } from "@/src/application/api/serper.api.types";

import { GoogleKeywordTracker, GoogleKeywordTrackerWithCompetitors, GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation, GoogleKeywordTrackerWithWebsite } from "@/src/entities/models/google-keyword-tracker";
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
    try {
      const googleKeywordTracker = await db.googleKeywordTrackerTool.findUnique(
        {
          where: {
            id,
          },
        }
      );

      return googleKeywordTracker;
    } catch (error) {
      throw error;
    }
  }

  async findByIdWithWebsite(id: string): Promise<GoogleKeywordTrackerWithWebsite | null> {
    try {
      const googleKeywordTracker = await db.googleKeywordTrackerTool.findUnique({
        where: {
          id,
        },
        include: {
          website: true,
        },
      });
      
      return googleKeywordTracker;
    } catch (error) {
      throw error;
    }
  }

  async findByIdWithCompetitors(id: string): Promise<GoogleKeywordTrackerWithCompetitors | null> {
    try {
      const googleKeywordTracker = await db.googleKeywordTrackerTool.findUnique({
        where: {
          id,
        },
        include: {
          competitors: true,
        },
      });

      return googleKeywordTracker;
    } catch (error) {
      throw error;
    }
  }

  async findByIdWithCompetitorsWebsiteAndLocation(id: string): Promise<GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation | null> {
    try {
      const googleKeywordTracker = await db.googleKeywordTrackerTool.findUnique({
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
      throw error;
    }
  }

  async findAllWithCompetitorsWebsiteAndLocation(): Promise<GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation[]> {
    try {
      const googleKeywordTracker = await db.googleKeywordTrackerTool.findMany({
        include: {
          competitors: true,
          location: true,
          website: true,
        },
      });

      return googleKeywordTracker;
    } catch (error) {
      throw error
    };
  }

  async findKeywordsByToolId(
    googleKeywordTrackerId: string
  ): Promise<GoogleKeywordTrackerKeyword[]> {
    try {
      const keywords = await db.googleKeywordTrackerKeyword.findMany({
        where: {
          googleKeywordTrackerToolId: googleKeywordTrackerId,
        },
      });

      return keywords;
    } catch (error) {
      throw error;
    }
  }




  async findLatestResultsByKeywordIds(keywordIds: string[]): Promise<GoogleKeywordTrackerResult[]> {
    try {
      const results = await db.googleKeywordTrackerResult.findMany({
        where: {
          keywordId: {
            in: keywordIds,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      const formattedResults = results.map(result => ({
        ...result,
        relatedSearches: typeof result.relatedSearches === 'string' ? JSON.parse(result.relatedSearches) as SerpApiRelatedSearches[] : null,
        peopleAlsoAsk: typeof result.peopleAlsoAsk === 'string' ? JSON.parse(result.peopleAlsoAsk) as SerpApiPeopleAsloAsk[] : null,
        siteLinks: typeof result.siteLinks === 'string' ? JSON.parse(result.siteLinks) as SiteLinks[] : null,
      }));

      return formattedResults;
    } catch (error) {
      throw error;
    }
  }
  
  async addKeywords(
    googleKeywordTrackerId: string,
    keywords: string[]
  ): Promise<GoogleKeywordTrackerKeyword[]> {
    try {
      const keywordObjects = keywords.map((keyword) => ({
        keyword,
        googleKeywordTrackerToolId: googleKeywordTrackerId,
      }));

      const createdKeywords = await db.googleKeywordTrackerKeyword.createManyAndReturn({
        data: keywordObjects,
      });

      return createdKeywords;
    } catch (error) {
      throw error;
    }
  }
}
