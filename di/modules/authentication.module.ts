import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { AuthenticationService } from "@/src/infrastructure/services/authentication.service";
import { MockAuthenticationService } from "@/src/infrastructure/services/authentication.service.mock";


const initializeServiceModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === "test") {
    bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(MockAuthenticationService);
  } else {
    bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(AuthenticationService);
  }
};

export const AuthenticationServiceModule = new ContainerModule(initializeServiceModule);