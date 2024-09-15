import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { captureException, startSpan } from "@sentry/nextjs";
import { db } from "@/prisma";
import { Prisma } from "@prisma/client";

import { DatabaseOperationError } from "@/src/entities/errors/common";

import type { ISerperApi } from "@/src/application/api/serper.api.interface";
import { IProcessGoogleKeywordsService } from "@/src/application/services/process-google-keywords.service.interface";

// Models
import { GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation } from "@/src/entities/models/google-keyword-tracker";
import { GoogleKeywordTrackerKeyword } from "@/src/entities/models/google-keyword-tracker/keyword";
import {
  GoogleKeywordTrackerResult,
  GoogleKeywordTrackerResultInsert,
  GoogleKeywordTrackerResultTransferDTO,
} from "@/src/entities/models/google-keyword-tracker/result";
import { GoogleKeywordTrackerSerpResultInsert } from "@/src/entities/models/google-keyword-tracker/serp-result";
import { GoogleKeywordTrackerCompetitorResultInsert } from "@/src/entities/models/google-keyword-tracker/competitor-result";
import { GoogleKeywordTrackerStatsInsert } from "@/src/entities/models/google-keyword-tracker/stats";

import {
  SerpApiPeopleAsloAsk,
  SerpApiRelatedSearches,
  SerperApiSerpResult,
  SiteLinks,
  SuccessfulSerpApiFetches,
} from "@/src/application/api/serper.api.types";

import { SerpResultMapper } from "@/src/interface-adapters/mappers/serp-result.mapper";

@injectable()
export class ProcessGoogleKeywordsService
  implements IProcessGoogleKeywordsService
{
  constructor(
    @inject(DI_SYMBOLS.ISerperApi)
    private _serperApi: ISerperApi
  ) {
    this._serperApi = _serperApi;
  }

  async execute(
    tool: GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation,
    keywords: GoogleKeywordTrackerKeyword[]
  ): Promise<GoogleKeywordTrackerResultTransferDTO[]> {
    return await startSpan(
      {
        name: "ProcessGoogleKeywordsService > execute",
        op: "ProccessGoogleKeyword",
      },
      async () => {
        console.log("🟡 Processing google keywords service");

        const serperApiResponse = await this._serperApi.fetchSerpData(
          keywords,
          tool.location.country,
          tool.location.language,
          tool.location.location
        );
        if (!serperApiResponse) {
          throw new Error("🔴  Failed to fetch serp data");
        }
        const userSerpResultsDTO: GoogleKeywordTrackerResultTransferDTO[] = [];
        const topTenSerpResultsDTO: GoogleKeywordTrackerSerpResultInsert[] = [];
        const competitorsSerpResultsDTO: GoogleKeywordTrackerCompetitorResultInsert[] =
          [];

        // Map over each keyword and find the position in the serp data
        serperApiResponse.map((serp) => {
          const keyword = serp.keyword;

          const usersSerpPosition = this.findPositionInSerpData(
            serp,
            tool.website.domainUrl
          );

          userSerpResultsDTO.push(
            SerpResultMapper.toUserSerpResultDTO(
              keyword,
              usersSerpPosition,
              serp.relatedSearches,
              serp.peopleAlsoAsk
            )
          );

          const topTenPositions = this.topTenPositions(serp);
          topTenSerpResultsDTO.push(
            ...SerpResultMapper.toSerpResultInsertDTO(topTenPositions, keyword)
          );

          const competitorsSerpResults = tool.competitors.map((competitor) => {
            const competitorSerpPosition = this.findPositionInSerpData(
              serp,
              competitor.domainUrl
            );
            return SerpResultMapper.toCompetitorSerpResultInsertDTO(
              competitorSerpPosition,
              competitor.id,
              keyword.id
            );
          });
          competitorsSerpResultsDTO.push(...competitorsSerpResults);
        });

        await this.insertTopTenResults(topTenSerpResultsDTO);
        await this.insertCompetitorResult(competitorsSerpResultsDTO);

        return userSerpResultsDTO;
      }
    );
  }

  findPositionInSerpData(
    serp: SuccessfulSerpApiFetches,
    userDomain: string
  ): SerperApiSerpResult | undefined {
    return startSpan(
      { name: "ProcessGoogleKeywordsService > findPositionInSerpData" },
      () => {
        return serp.organic.find((result) => result.link.includes(userDomain));
      }
    );
  }

  topTenPositions(serp: SuccessfulSerpApiFetches): SerperApiSerpResult[] {
    return startSpan(
      { name: "ProcessGoogleKeywordsService > topTenPositions" },
      () => {
        return serp.organic.slice(0, 10);
      }
    );
  }

  async insertUserResult(
    results: GoogleKeywordTrackerResultInsert[]
  ): Promise<GoogleKeywordTrackerResult[] | undefined> {
    return await startSpan(
      { name: "ProcessGoogleKeywordsService > insertUserResult" },
      async () => {
        const formattedResults = results.map((result) => ({
          ...result,
          relatedSearches: result.relatedSearches
            ? JSON.stringify(result.relatedSearches)
            : Prisma.JsonNull,
          peopleAlsoAsk: result.peopleAlsoAsk
            ? JSON.stringify(result.peopleAlsoAsk)
            : Prisma.JsonNull,
          siteLinks: result.siteLinks
            ? JSON.stringify(result.siteLinks)
            : Prisma.JsonNull,
        }));

        try {
          const results =
            await db.googleKeywordTrackerResult.createManyAndReturn({
              data: formattedResults,
            });

          if (!results) {
            throw new DatabaseOperationError(
              "🔴 Failed to insert user results"
            );
          }

          const returnResult = results.map((result) => ({
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

          return returnResult;
        } catch (error) {
          captureException(error);
          console.error("🔴 Error inserting user results", error);
          // Can't throw an error here as it will stop the process sice we dont catch it
        }
      }
    );
  }

  async insertCompetitorResult(
    results: GoogleKeywordTrackerCompetitorResultInsert[]
  ): Promise<void> {
    return await startSpan(
      { name: "ProcessGoogleKeywordsService > insertCompetitorResult" },
      async () => {
        try {
          await db.googleKeywordTrackerCompetitorResult.createMany({
            data: results,
          });
        } catch (error) {
          captureException(error);
          console.error("🔴 Error inserting competitor results", error);
          throw new DatabaseOperationError(
            "Error inserting competitor results"
          );
        }
      }
    );
  }
  async insertTopTenResults(
    results: GoogleKeywordTrackerSerpResultInsert[]
  ): Promise<void> {
    return await startSpan(
      { name: "ProcessGoogleKeywordsService > insertTopTenResults" },
      async () => {
        try {
          await db.googleKeywordTrackerSerpResult.createMany({
            data: results,
          });
        } catch (error) {
          captureException(error);
          console.error("🔴 Error inserting top ten results", error);
          throw new DatabaseOperationError("Error inserting top ten results");
        }
      }
    );
  }
  async insertStats(stats: GoogleKeywordTrackerStatsInsert): Promise<void> {
    return await startSpan(
      { name: "ProcessGoogleKeywordsService > insertStats" },
      async () => {
        try {
          await db.googleKeywordTrackerProjectStats.create({
            data: stats,
          });
        } catch (error) {
          captureException(error);
          console.error("🔴 Error inserting stats", error);
          // Can't throw an error here as it will stop the process sice we dont catch it
        }
      }
    );
  }
}
