import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { NotFoundError } from "@/src/entities/errors/common";
import { ForbiddenError } from "@/src/entities/errors/auth";

import { User } from "@/src/entities/models/user";
import { ConnectedGscProperties } from "../../api/search-console.api.types";

export async function getConnectedGscPropertiesUseCase(
  userId: string,
  user: User
): Promise<ConnectedGscProperties[]> {
  return await startSpan(
    { name: "getConnectedGscProperties Use Case" },
    async () => {
      const searchConsoleApi = getInjection("ISearchConsoleApi");
      const authenticationService = getInjection("IAuthenticationService");

      if (userId !== user.id) {
        throw new ForbiddenError("unauthorized access");
      }

      const refreshToken = await authenticationService.getGoogleRefreshTokenForService(
        user.id,
        "search-console"
      );

      const connectedGoogleSearchConsoleProperties = await searchConsoleApi.fetchConnectedSites(refreshToken);

      if (!connectedGoogleSearchConsoleProperties) {
        throw new NotFoundError(
          "connectedGoogleSearchConsoleProperties not found"
        );
      }

      return connectedGoogleSearchConsoleProperties;
    }
  );
}
