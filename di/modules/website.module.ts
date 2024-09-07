import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { IWebsiteRepository } from "@/src/application/repositories/website.repository.interface";
import { WebsiteRepository } from "@/src/infrastructure/repositories/website.repository";


const initializeModule = (bind: interfaces.Bind) => {
  bind<IWebsiteRepository>(DI_SYMBOLS.IWebsiteRepository).to(WebsiteRepository);
};

export const WebsiteRepositoryModule = new ContainerModule(initializeModule);
