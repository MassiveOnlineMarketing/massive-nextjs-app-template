import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { AuthenticationService } from "@/src/infrastructure/services/auth.service";


const initializeServiceModule = (bind: interfaces.Bind) => {
  bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(AuthenticationService);
};

export const AuthenticationServiceModule = new ContainerModule(initializeServiceModule);