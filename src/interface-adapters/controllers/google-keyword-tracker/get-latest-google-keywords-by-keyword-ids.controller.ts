import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { getLatestGoogleKeywordResultsByKeywordIdsUseCase } from "@/src/application/use-cases/google-keyword-tracker/keyword/get-latest-google-keyword-result-by-keyword-ids.use-case";

import { GoogleLatestResultPresenter, LatestGoogleKeywordResultsDto } from "../../presenters/latest-google-keyword-results.presenter";


export async function getLatestGoogleKeywordResultsByKeywordIdsController(
  keywordIds: string[]
): Promise<LatestGoogleKeywordResultsDto[]> {
  return await startSpan(
    { name: "getLatestGoogleKeywordResultsByKeywordIds Controller" },
    async () => {
      const authenticationService = getInjection("IAuthenticationService");
      const { user } = await authenticationService.validateSession();
      

      return await getLatestGoogleKeywordResultsByKeywordIdsUseCase(keywordIds, user).then((res) => GoogleLatestResultPresenter.toLatestKeywordResultDTO(res));
    }
  );
}