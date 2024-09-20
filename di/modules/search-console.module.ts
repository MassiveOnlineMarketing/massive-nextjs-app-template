import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { ISearchConsoleApi } from "@/src/application/api/search-console.api.interface";
import { SearchConsoleApi } from "@/src/infrastructure/api/search-console.api";
import { MockSearchConsoleApi } from "@/src/infrastructure/api/search-console.api.mock";

const initializeServiceModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === "test") {
    bind<ISearchConsoleApi>(DI_SYMBOLS.ISearchConsoleApi).to(MockSearchConsoleApi);
  } else {
    bind<ISearchConsoleApi>(DI_SYMBOLS.ISearchConsoleApi).to(SearchConsoleApi);
  }
}

export const SearchConsoleApiModule = new ContainerModule(initializeServiceModule);