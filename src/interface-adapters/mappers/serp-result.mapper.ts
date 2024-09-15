import {
    SerperApiSerpResult,
    SerpApiPeopleAsloAsk,
    SerpApiRelatedSearches,
} from "@/src/application/api/serper.api.types";

import { GoogleKeywordTrackerKeyword } from "@/src/entities/models/google-keyword-tracker/keyword";
import { GoogleKeywordTrackerResult, GoogleKeywordTrackerResultInsert, GoogleKeywordTrackerResultTransferDTO } from "@/src/entities/models/google-keyword-tracker/result";
import { GoogleKeywordTrackerCompetitorResultInsert } from "@/src/entities/models/google-keyword-tracker/competitor-result";
import { GoogleKeywordTrackerSerpResultInsert } from "@/src/entities/models/google-keyword-tracker/serp-result";

export class SerpResultMapper {
  // Mapping SERP result to User Serp Result DTO
  static toUserSerpResultDTO(
    keyword: GoogleKeywordTrackerKeyword,
    serp: SerperApiSerpResult | undefined,
    relatedSearches: SerpApiRelatedSearches[] | undefined,
    peopleAlsoAsk: SerpApiPeopleAsloAsk[] | undefined
  ): GoogleKeywordTrackerResultTransferDTO {
    if (!serp) {
      return {
        keywordId: keyword.id,
        keywordName: keyword.keyword,
        position: null,
        url: null,
        metaTitle: null,
        metaDescription: null,
        relatedSearches: null,
        peopleAlsoAsk: null,
        siteLinks: null,
      };
    }

    return {
      keywordId: keyword.id,
      keywordName: keyword.keyword,
      position: serp.position,
      url: serp.link,
      metaTitle: serp.title,
      metaDescription: serp.snippet,
      relatedSearches: relatedSearches || null,
      peopleAlsoAsk: peopleAlsoAsk || null,
      siteLinks: serp.sitelinks || null,
    };
  }

  static toNewUserSerpResultInsertDTO(
    serp: GoogleKeywordTrackerResultTransferDTO[] | undefined,
  ): GoogleKeywordTrackerResultInsert[] {
    if (!serp) {
      return [];
    }

    return serp.map((result) => ({
      ...result,
      bestPosition: result.position,
      firstPosition: result.position,
      latestChange: null,
    }));
  }

  static toUpdatedUserSerpResultInsertDTO(
    userResult: GoogleKeywordTrackerResultTransferDTO,
    previousResult: GoogleKeywordTrackerResult | undefined
  ): GoogleKeywordTrackerResultInsert {
    if (!previousResult) {
      return {
        ...userResult,
        bestPosition: userResult.position,
        firstPosition: userResult.position,
        latestChange: null,
      };
    }

    return {
      ...userResult,
      firstPosition: previousResult.firstPosition,
      bestPosition: calculateBestPosition(userResult.position, previousResult.bestPosition),
      latestChange: calculateLatestChange(userResult.position, previousResult.position)
    }    
  }

  // Mapping SERP result to Competitor Serp Result Insert DTO
  static toCompetitorSerpResultInsertDTO(
    serp: SerperApiSerpResult | undefined,
    competitorId: string,
    keywordId: string
  ): GoogleKeywordTrackerCompetitorResultInsert {
    if (!serp) {
      return {
        competitorId,
        keywordId,
        position: null,
        url: null,
        metaTitle: null,
        metaDescription: null,
      };
    }

    return {
      competitorId,
      keywordId,
      position: serp.position,
      url: serp.link,
      metaTitle: serp.title,
      metaDescription: serp.snippet,
    };
  }

  // Mapping SERP result to a general Top Ten Serp Result Insert DTO
  static toSerpResultInsertDTO(
    serp: SerperApiSerpResult[],
    keyword: GoogleKeywordTrackerKeyword
  ): GoogleKeywordTrackerSerpResultInsert[] {
    return serp.map((result) => ({
      keywordId: keyword.id,
      position: result.position,
      url: result.link,
      metaTitle: result.title,
      metaDescription: result.snippet,
    }));
  }
}


function calculateBestPosition(
  previousBestPosition: number | null,
  resultPosition: number | null
) {
  if (previousBestPosition && resultPosition) {
    if (previousBestPosition > resultPosition) {
      return resultPosition;
    } else {
      return previousBestPosition;
    }
  } else if (resultPosition && !previousBestPosition) {
    return resultPosition;
  } else {
    return previousBestPosition;
  }
}

function calculateLatestChange(
  previousPosition: number | null,
  resultPosition: number | null
) {
  // If both positions are null, return 0
  if (previousPosition === null && resultPosition === null) {
    return 0;
  }

  // If only previousPosition is null, return 100 - resultPosition
  if (previousPosition === null && resultPosition) {
    return 100 - resultPosition;
  }

  // If only resultPosition is null, return -100 + previousPosition
  if (resultPosition === null && previousPosition) {
    return -100 + previousPosition;
  }

  if (resultPosition) {
    return previousPosition! - resultPosition;
  }

  return 0;
}
