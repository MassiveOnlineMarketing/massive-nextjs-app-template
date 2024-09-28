import { FetchConnectedSitesResponseGoogleSearchApi } from "./search-console.api.types";

export interface ISearchConsoleApi {
  fetchConnectedSites: (refreshToken: string) => Promise<FetchConnectedSitesResponseGoogleSearchApi[]>
  fetchTopQueriesByCountry: (refreshToken: string, siteProperty: string, amountOfKeywords: string, countryCode: string) => Promise<string[]>
}