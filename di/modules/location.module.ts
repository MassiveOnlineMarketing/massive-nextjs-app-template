import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { ILocationRepository } from "@/src/application/repositories/location.repository.interface";
import { LocationRepository } from "@/src/infrastructure/repositories/location.repository";
import { MockLocationRepository } from "@/src/infrastructure/repositories/location.repository.mock";


const initializeServiceModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === "test") {
    bind<ILocationRepository>(DI_SYMBOLS.ILocationRepository).to(MockLocationRepository);
  } else {
    bind<ILocationRepository>(DI_SYMBOLS.ILocationRepository).to(LocationRepository);
  }
};

export const LocationRepositoryModule = new ContainerModule(initializeServiceModule);
