import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { IWebsiteRepository } from "@/src/application/repositories/website.repository.interface";
import { WebsiteRepository } from "@/src/infrastructure/repositories/website.repository";
import { MockWebsiteRepository } from "@/src/infrastructure/repositories/website.repository.mock";


const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === "test") {
    bind<IWebsiteRepository>(DI_SYMBOLS.IWebsiteRepository).to(MockWebsiteRepository);
  } else {
    bind<IWebsiteRepository>(DI_SYMBOLS.IWebsiteRepository).to(WebsiteRepository);
  }
};

export const WebsiteRepositoryModule = new ContainerModule(initializeModule);
