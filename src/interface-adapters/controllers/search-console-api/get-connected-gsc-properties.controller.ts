import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { getConnectedGscPropertiesUseCase } from "@/src/application/use-cases/search-console-api/get-connected-gsc-properties.use-case";
import { ConnectedGscProperties } from "@/src/application/api/search-console.api.types";

export async function getConnectedGscPropertiesController(userId: string): Promise<ConnectedGscProperties[]> {
  return await startSpan(
    { name: "getConnectedGscProperties Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();

      return await getConnectedGscPropertiesUseCase(userId, user);
    }
  );
}