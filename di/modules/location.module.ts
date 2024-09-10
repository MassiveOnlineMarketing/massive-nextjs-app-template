import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { ILocationRepository } from "@/src/application/repositories/location.repository.interface";
import { LocationRepository } from "@/src/infrastructure/repositories/location.repository";


const initializeServiceModule = (bind: interfaces.Bind) => {
  bind<ILocationRepository>(DI_SYMBOLS.ILocationRepository).to(LocationRepository);

  // if (process.env.NODE_ENV === "test") {
  //   bind<ITokenService>(DI_SYMBOLS.ITokenService).to(MocktokenSerTokenService);
  // } else {
  //   bind<ITokenService>(DI_SYMBOLS.ITokenService).to(tokenSerTokenService);
  // }
};

export const LocationRepositoryModule = new ContainerModule(initializeServiceModule);
