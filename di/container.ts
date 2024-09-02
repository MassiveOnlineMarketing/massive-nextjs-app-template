import { Container } from "inversify";
// import { startSpan } from "@sentry/nextjs";
import "reflect-metadata";

import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";

import { UsersRepositoryModule } from "./modules/users.module";
import { TokenRepositoryModule, TokenServiceModule } from "./modules/token.module";
import { EmailServiceModule } from "./modules/email.module";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = () => {
  ApplicationContainer.load(UsersRepositoryModule);
  ApplicationContainer.load(TokenServiceModule);
  ApplicationContainer.load(TokenRepositoryModule);
  ApplicationContainer.load(EmailServiceModule);  
};

export const destroyContainer = () => {
  ApplicationContainer.unload(UsersRepositoryModule);
  ApplicationContainer.unload(TokenServiceModule);
  ApplicationContainer.unload(TokenRepositoryModule);
  ApplicationContainer.unload(EmailServiceModule);
};

if (process.env.NODE_ENV !== "test") {
  initializeContainer();
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
  //   {
  //     name: "(di) getInjection",
  //     op: "function",
  //     attributes: { symbol: symbol.toString() },
  //   },
  //   () => ApplicationContainer.get(DI_SYMBOLS[symbol]),
  // );
}

export { ApplicationContainer };
