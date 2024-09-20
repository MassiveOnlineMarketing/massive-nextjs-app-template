// Services
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { IEmailService } from "@/src/application/services/email.service.interface";
import { ITokenService } from "@/src/application/services/token.service.interface";
import { IProcessGoogleKeywordsService } from "@/src/application/services/process-google-keywords.service.interface";

// Repositories
import { ITokenRepository } from "@/src/application/repositories/token.repository.interface";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IWebsiteRepository } from "@/src/application/repositories/website.repository.interface";
import { ILocationRepository } from "@/src/application/repositories/location.repository.interface";
import { IGoogleKeywordTrackerRepository } from "@/src/application/repositories/google-keyword-tracker.repository.interface";
import { IGoogleKeywordTrackerKeywordsRepository } from "@/src/application/repositories/google-keyword-tracker-keywords.repository.interface";

// Api
import { ISerperApi } from "@/src/application/api/serper.api.interface";
import { ISearchConsoleApi } from "@/src/application/api/search-console.api.interface";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  ITokenService: Symbol.for("ITokenService"),
  IEmailService: Symbol.for("IEmailService"),
  IProcessGoogleKeywordsService: Symbol.for("IProcessGoogleKeywordsService"),

  // Repositories
  IUsersRepository: Symbol.for("IUsersRepository"),
  ITokenRepository: Symbol.for("ITokenRepository"),
  IWebsiteRepository: Symbol.for("IWebsiteRepository"),
  ILocationRepository: Symbol.for("ILocationRepository"),
  IGoogleKeywordTrackerRepository: Symbol.for("IGoogleLKeywordTrackerRepository"),
  IGoogleKeywordTrackerKeywordsRepository: Symbol.for("IGoogleKeywordTrackerKeywordsRepository"),

  // Api
  ISerperApi: Symbol.for("ISerperApi"),
  ISearchConsoleApi: Symbol.for("ISearchConsoleApi"),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;
  ITokenService: ITokenService;
  IEmailService: IEmailService;
  IProcessGoogleKeywordsService: IProcessGoogleKeywordsService;

  // Repositories
  IUsersRepository: IUsersRepository;
  ITokenRepository: ITokenRepository;
  IWebsiteRepository: IWebsiteRepository;
  ILocationRepository: ILocationRepository;
  IGoogleKeywordTrackerRepository: IGoogleKeywordTrackerRepository;
  IGoogleKeywordTrackerKeywordsRepository: IGoogleKeywordTrackerKeywordsRepository;

  // Api
  ISerperApi: ISerperApi;
  ISearchConsoleApi: ISearchConsoleApi;
}
