import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";

import { UsersRepository } from "@/src/infrastructure/repositories/users.repository";
import { MockUsersRepository } from "@/src/infrastructure/repositories/users.repository.mock";

const initializeModule = (bind: interfaces.Bind) => {
 
  if (process.env.NODE_ENV === "test") {
    bind<IUsersRepository>(DI_SYMBOLS.IUsersRepository).to(MockUsersRepository);
  } else {
    bind<IUsersRepository>(DI_SYMBOLS.IUsersRepository).to(UsersRepository);
  }
};

export const UsersRepositoryModule = new ContainerModule(initializeModule);
