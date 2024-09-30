import { injectable } from "inversify";

import { ISearchConsoleApi } from "@/src/application/api/search-console.api.interface";

import {
  FetchConnectedSitesResponseGoogleSearchApi,
  SearchConsoleApiFetchKeywordDataSuccessResponse,
} from "@/src/application/api/search-console.api.types";

@injectable()
export class MockSearchConsoleApi implements ISearchConsoleApi {
  async fetchConnectedSites(
    refreshToken: string
  ): Promise<FetchConnectedSitesResponseGoogleSearchApi[]> {
    return [
      {
        permissionLevel: "siteFullUser",
        siteUrl: "https://baristart.nl/",
      },
      {
        permissionLevel: "siteOwner",
        siteUrl: "sc-domain:massiveonlinemarketing.nl",
      },
      {
        permissionLevel: "siteFullUser",
        siteUrl: "sc-domain:baristart.nl",
      },
      {
        permissionLevel: "siteFullUser",
        siteUrl: "https://www.fiveelephant.com/",
      },
    ];
  }

  async fetchTopQueriesByCountry(
    refreshToken: string,
    siteProperty: string,
    amountOfKeywords: string,
    countryCode: string
  ) {
    return ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"];
  }

  async fetchKeywordData(
    refreshToken: string,
    siteProperty: string,
    keyword: string,
    url: string,
    startDate: string,
    endData: string
  ): Promise<SearchConsoleApiFetchKeywordDataSuccessResponse> {
    return {
      data: [
        {
          date: "2021-01-01",
          clicks: 1,
          impressions: 2,
          ctr: 3,
          position: 4,
        },
        {
          date: "2021-01-02",
          clicks: 2,
          impressions: 3,
          ctr: 4,
          position: 5,
        },
        {
          date: "2021-01-03",
          clicks: 3,
          impressions: 4,
          ctr: 5,
          position: 6,
        },
        {
          date: "2021-01-04",
          clicks: 4,
          impressions: 5,
          ctr: 6,
          position: 7,
        },
        {
          date: "2021-01-05",
          clicks: 5,
          impressions: 6,
          ctr: 7,
          position: 8,
        },
      ],
      status: "success",
    };
  }
}
