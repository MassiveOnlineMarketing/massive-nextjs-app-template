import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { fetchTopQueriesByCountryUseCase } from "@/src/application/use-cases/search-console-api/fetch-top-queries-by-country.use-case";

export async function getTopPerformingQueriesController(
  siteProperty: string,
  amountOfKeywords: string,
  country: string
): Promise<string[]> {
  return await startSpan(
    { name: "getConnectedGscProperties Con/.1troller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();

      return await fetchTopQueriesByCountryUseCase(
        {
          siteProperty,
          amountOfKeywords,
          country,
        },
        user
      );
    }
  );
}
