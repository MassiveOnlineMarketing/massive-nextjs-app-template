import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { GoogleAdsApi } from "@/src/infrastructure/api/google-ads.api";
import { IGoogleAdsApi } from "@/src/application/api/google-ads.api.interface";
// import { MockGoogleAdsApi } from "@/src/infrastructure/api/serper.api.mock";


const initializeModule = (bind: interfaces.Bind) => {
  bind<IGoogleAdsApi>(DI_SYMBOLS.IGoogleAdsApi).to(GoogleAdsApi);

  // if (process.env.NODE_ENV === "test") {
  //   bind<IGoogleAdsApi>(DI_SYMBOLS.IGoogleAdsApi).to(MockGoogleAdsApi);
  // } else {
  //   bind<IGoogleAdsApi>(DI_SYMBOLS.IGoogleAdsApi).to(GoogleAdsApi);
  // }
};

export const GoogleAdsApiModule = new ContainerModule(initializeModule);
