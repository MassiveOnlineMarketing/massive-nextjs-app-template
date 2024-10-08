import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { getLatestGoogleKeywordResultsUseCase } from "@/src/application/use-cases/google-keyword-tracker/keyword/get-latest-google-keyword-results.use-case";

import { GoogleLatestResultPresenter, LatestGoogleKeywordResultsDto } from "../../presenters/latest-google-keyword-results.presenter";


export async function getLatestGoogleKeywordResultsController(
  id: string
): Promise<LatestGoogleKeywordResultsDto[]> {
  return await startSpan(
    { name: "getLatestGoogleKeywordResults Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();
      

      return await getLatestGoogleKeywordResultsUseCase(id, user).then((res) => GoogleLatestResultPresenter.toLatestKeywordResultDTO(res));
    }
  );
}