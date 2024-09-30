import { FetchConnectedSitesResponseGoogleSearchApi, SearchConsoleApiFetchKeywordDataSuccessResponse } from "./search-console.api.types";

export interface ISearchConsoleApi {
  fetchConnectedSites: (refreshToken: string) => Promise<FetchConnectedSitesResponseGoogleSearchApi[]>
  fetchTopQueriesByCountry: (refreshToken: string, siteProperty: string, amountOfKeywords: string, countryCode: string) => Promise<string[]>
  fetchKeywordData: (refreshToken: string, siteProperty: string, keyword: string, url: string, startDate: string, endData: string) => Promise<SearchConsoleApiFetchKeywordDataSuccessResponse>
}