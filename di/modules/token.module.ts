import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { ITokenService } from "@/src/application/services/token.service.interface";
import { TokenService } from "@/src/infrastructure/services/token.service";

import { TokenRepository } from "@/src/infrastructure/repositories/token.repository";
import { ITokenRepository } from "@/src/application/repositories/token.repository.interface";
// import { MocktokenRepository } from "@/src/infrastructure/repositories/users.repository.mock";


const initializeServiceModule = (bind: interfaces.Bind) => {
  bind<ITokenService>(DI_SYMBOLS.ITokenService).to(TokenService);
  
  // if (process.env.NODE_ENV === "test") {
  //   bind<ITokenService>(DI_SYMBOLS.ITokenService).to(MocktokenSerTokenService);
  // } else {
  //   bind<ITokenService>(DI_SYMBOLS.ITokenService).to(tokenSerTokenService);
  // }
};

export const TokenServiceModule = new ContainerModule(initializeServiceModule);


const initializeRepositoryModule = (bind: interfaces.Bind) => {
  bind<ITokenRepository>(DI_SYMBOLS.ITokenRepository).to(TokenRepository);
  
  // if (process.env.NODE_ENV === "test") {
  //   bind<ITokenRepository>(DI_SYMBOLS.ITokenRepository).to(MocktokenRepository);
  // } else {
  //   bind<ITokenRepository>(DI_SYMBOLS.ITokenRepository).to(tokenRepository);
  // }
};

export const TokenRepositoryModule = new ContainerModule(initializeRepositoryModule);

