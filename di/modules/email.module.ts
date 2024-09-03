import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { IEmailService } from "@/src/application/services/email.service.interface";
import { EmailService } from "@/src/infrastructure/services/email.service";


const initializeServiceModule = (bind: interfaces.Bind) => {
  bind<IEmailService>(DI_SYMBOLS.IEmailService).to(EmailService);

  // if (process.env.NODE_ENV === "test") {
  //   bind<ITokenService>(DI_SYMBOLS.ITokenService).to(MocktokenSerTokenService);
  // } else {
  //   bind<ITokenService>(DI_SYMBOLS.ITokenService).to(tokenSerTokenService);
  // }
};

export const EmailServiceModule = new ContainerModule(initializeServiceModule);
