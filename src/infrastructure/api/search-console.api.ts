import { captureException, startSpan } from "@sentry/nextjs";
import { injectable } from "inversify";
import axios from "axios";

import { ISearchConsoleApi } from "@/src/application/api/search-console.api.interface";

import {
  FetchConnectedSitesResponseGoogleSearchApi,
  SearchConsoleApiFetchKeywordDataSuccessResponse,
} from "@/src/application/api/search-console.api.types";
import { SearchConsoleFetchError } from "@/src/entities/errors/search-console";

@injectable()
export class SearchConsoleApi implements ISearchConsoleApi {
  async fetchConnectedSites(
    refreshToken: string
  ): Promise<FetchConnectedSitesResponseGoogleSearchApi[]> {
    return await startSpan(
      { name: "SearchConsoleApi > fetchConnectedSites" },
      async () => {
        try {
          const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/search-console/get_sites?refresh_token=${refreshToken}`;
          // TODO: check of ook met react query kan
          const res = await axios(url);

          if (res.data.status === "error") {
            throw new SearchConsoleFetchError(res.data.message);
          }

          return res.data.data.siteEntry;
        } catch (error) {
          console.error("🔴 Error fetching Gsc sites: ", error);
          captureException(error);
          throw error;
        }
      }
    );
  }

  async fetchTopQueriesByCountry(
    refreshToken: string,
    siteProperty: string,
    amountOfKeywords: string,
    countryCode: string
  ) {
    return await startSpan(
      { name: "SearchConsoleApi > fetchTopQueriesByCountry" },
      async () => {
        try {
          const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/search-console/import_keywords?site-url=${siteProperty}&amount-of-keywords=${amountOfKeywords}&refresh-token=${refreshToken}&country=${countryCode}`;
          console.log(url);
          const res = await axios(url);

          if (res.data.status === "error") {
            throw new SearchConsoleFetchError(res.data.message);
          }

          return res.data.data;
        } catch (error) {
          console.error("🔴 Error fetching Gsc top querries: ", error);
          captureException(error);
          throw error;
        }
      }
    );
  }

  async fetchKeywordData(
    refreshToken: string,
    siteProperty: string,
    keyword: string,
    url: string,
    startDate: string,
    endData: string
  ): Promise<SearchConsoleApiFetchKeywordDataSuccessResponse> {
    return await startSpan(
      { name: "SearchConsoleApi > fetchKeywordData" },
      async () => {

        const cleanUrl = (url: string): string => {
          try {
            const urlObj = new URL(url);
            urlObj.search = '';
            return urlObj.toString();
          } catch (error) {
            console.error("🔴 Error cleaning URL: ", error);
            captureException(error);
            throw error;
          }
        };

        url = cleanUrl(url);

        try {
          const reqUrl = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/search-console/query_data?site-url=${siteProperty}&keyword=${keyword}&url=${url}&start-date=${startDate}&end-date=${endData}&refresh-token=${refreshToken}`;
          console.log('SearchConsoleApi > fetchKeywordData', reqUrl);
          const res = await axios(reqUrl);

          if (res.data.status === "error") {
            throw new SearchConsoleFetchError(res.data.message);
          }

          return res.data;
        } catch (error) {
          console.error("🔴 Error fetching Gsc keyword data: ", error);
          captureException(error);
          throw error;
        }
      }
    );
  }
}
