import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";
import { Account } from "@prisma/client";
import { getAccountDetailsUseCase } from "@/src/application/use-cases/auth/get-account-details.use-case";

export async function getAccountDetailsController(): Promise<Account> {
  return await startSpan(
    { name: "controllerFunction Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();

      return await getAccountDetailsUseCase(user);
    }
  );
}