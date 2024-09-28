import { captureException, startSpan } from "@sentry/nextjs";
import { injectable } from "inversify";
import axios from "axios";

import { ISearchConsoleApi } from "@/src/application/api/search-console.api.interface";

import { FetchConnectedSitesResponseGoogleSearchApi } from "@/src/application/api/search-console.api.types";

@injectable()
export class SearchConsoleApi implements ISearchConsoleApi {
  async fetchConnectedSites(
    refreshToken: string
  ): Promise<FetchConnectedSitesResponseGoogleSearchApi[]> {
    return await startSpan(
      { name: "SearchConsoleApi > fetchConnectedSites" },
      async () => {
        try {
          const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/get_sites?refresh_token=${refreshToken}`;
          // TODO: check of ook met react query kan
          const res = await axios(url);

          return res.data.siteEntry;
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
          const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/import_keywords?site-url=${siteProperty}&amount-of-keywords=${amountOfKeywords}&refresh-token=${refreshToken}&country=${countryCode}`;
          console.log(url);
          const res = await axios(url);

          return res.data;
        } catch (error) {
          console.error("🔴 Error fetching Gsc top querries: ", error);
          captureException(error);
          throw error;
        }
      }
    );
  }
}
