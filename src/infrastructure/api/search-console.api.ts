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
          console.error("🔴 Error fetching SERP data: ", error);
          captureException(error);
          throw error;
        }
      }
    );
  }
}
