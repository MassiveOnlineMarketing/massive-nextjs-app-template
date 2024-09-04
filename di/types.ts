import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { IEmailService } from "@/src/application/services/email.service.interface";
import { ITokenService } from "@/src/application/services/token.service.interface";

import { ITokenRepository } from "@/src/application/repositories/token.service.interface";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  ITokenService: Symbol.for("ITokenService"),
  IEmailService: Symbol.for("IEmailService"),

  // Repositories
  IUsersRepository: Symbol.for("IUsersRepository"),
  ITokenRepository: Symbol.for("ITokenRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;
  ITokenService: ITokenService;
  IEmailService: IEmailService;

  // Repositories
  IUsersRepository: IUsersRepository;
  ITokenRepository: ITokenRepository;
}
