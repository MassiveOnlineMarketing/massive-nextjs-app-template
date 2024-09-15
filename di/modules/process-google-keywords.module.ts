import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { IProcessGoogleKeywordsService } from "@/src/application/services/process-google-keywords.service.interface";
import { ProcessGoogleKeywordsService } from "@/src/infrastructure/services/process-google-keywords.service";



// import { MockUsersRepository } from "@/src/infrastructure/repositories/users.repository.mock";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IProcessGoogleKeywordsService>(DI_SYMBOLS.IProcessGoogleKeywordsService).to(ProcessGoogleKeywordsService);

};

export const ProcessGoogleKeywordServiceModule = new ContainerModule(initializeModule);
