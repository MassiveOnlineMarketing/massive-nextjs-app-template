import { getInjection } from "@/di/container";
import { User } from "@/src/entities/models/user";
import { startSpan } from "@sentry/nextjs";

export async function fetchTopQueriesByCountryUseCase(
  input: {
    siteProperty: string,
    amountOfKeywords: string,
    country: string
  },
  user: User
): Promise<string[]> {
  return await startSpan(
    { name: "fetchTopQueriesByCountry Use Case" },
    async () => {
      const searchConsoleApi = getInjection("ISearchConsoleApi");
      const authenticationService = getInjection("IAuthenticationService");

      const refreshToken = await authenticationService.getGoogleRefreshTokenForService(
        user.id,
        "search-console"
      );

      const topQueriesByCountry =
        await searchConsoleApi.fetchTopQueriesByCountry(
          refreshToken,
          input.siteProperty,
          input.amountOfKeywords,
          input.country
        );

      return topQueriesByCountry;
    }
  );
}
