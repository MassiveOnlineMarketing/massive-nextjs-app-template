import { FetchConnectedSitesResponseGoogleSearchApi } from "./search-console.api.types";

export interface ISearchConsoleApi {

    fetchConnectedSites: (refreshToken: string) => Promise<FetchConnectedSitesResponseGoogleSearchApi[]>
}