import { injectable } from "inversify";

import { ISearchConsoleApi } from "@/src/application/api/search-console.api.interface";

import { FetchConnectedSitesResponseGoogleSearchApi } from "@/src/application/api/search-console.api.types";

@injectable()
export class MockSearchConsoleApi implements ISearchConsoleApi {
  async fetchConnectedSites(refreshToken: string): Promise<FetchConnectedSitesResponseGoogleSearchApi[]> {
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
    return ['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'];
  }
}
