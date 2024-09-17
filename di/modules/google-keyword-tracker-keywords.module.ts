import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { IGoogleKeywordTrackerKeywordsRepository } from "@/src/application/repositories/google-keyword-tracker-keywords.repository.interface";
import { GoogleKeywordTrackerKeywordsRepository } from "@/src/infrastructure/repositories/google-keyword-tracker-keywords.repository";



// import { MockUsersRepository } from "@/src/infrastructure/repositories/users.repository.mock";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IGoogleKeywordTrackerKeywordsRepository>(DI_SYMBOLS.IGoogleKeywordTrackerKeywordsRepository).to(GoogleKeywordTrackerKeywordsRepository);

};

export const GoogleKeywordTrackerKeywordsRepositoryModule = new ContainerModule(initializeModule);
