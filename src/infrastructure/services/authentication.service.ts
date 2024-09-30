import { inject, injectable } from "inversify";
import { startSpan } from "@sentry/nextjs";
import { DI_SYMBOLS } from "@/di/types";
import 'reflect-metadata';

import { ForbiddenError, GoogleTokenError, UnauthenticatedError } from "@/src/entities/errors/auth";

import { Session } from "next-auth";
import { ExtendedUser } from "@/next-auth";
import { User } from "@/src/entities/models/user";

import { auth } from "@/app/_modules/auth/_nextAuth";

import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { NotFoundError } from "@/src/entities/errors/common";
import { Website } from "@/src/entities/models/website";

import type { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import type { IWebsiteRepository } from "@/src/application/repositories/website.repository.interface";
import type { ILocationRepository } from "@/src/application/repositories/location.repository.interface";


export type GoogleScopeOptions = "search-console" | "ads" | "account";

export const SCOPE_URLS: Record<GoogleScopeOptions, string> = {
  "account": "openid email profile",
  "search-console": "https://www.googleapis.com/auth/webmasters.readonly",
  'ads': "https://www.googleapis.com/auth/adwords",
};


@injectable()
export class AuthenticationService implements IAuthenticationService {

  constructor(
    @inject(DI_SYMBOLS.IUsersRepository)
    private _usersRespository: IUsersRepository,
    @inject(DI_SYMBOLS.IWebsiteRepository)
    private _websiteRepository: IWebsiteRepository,
    @inject(DI_SYMBOLS.ILocationRepository)
    private _locationRepository: ILocationRepository,
  ) {
    this._usersRespository = _usersRespository;
    this._websiteRepository = _websiteRepository;
    this._locationRepository = _locationRepository;
  }

  async session(): Promise<Session | null> {
    return auth()
  }

  async validateSession(): Promise<{user: User, session: Session}> {
    return await startSpan(
      { name: "AuthenticationService > validateSession" },
      async () => {
        const session = await auth();

        if (!session || !session.user.id) {
          throw new UnauthenticatedError("Unauthenticated");
        }
    
        const user = await this._usersRespository.getById(session.user.id);

        if (!user) {
          throw new UnauthenticatedError("User doesn't exist");
        }
    
        return {user: user , session};
      }
    )
  }

  async currentUser(): Promise<ExtendedUser | null> {
    const session = await auth();
    const user = session?.user as ExtendedUser;

    return user || null
  }

  async isAdmin() {
    const session = await auth();
    const user = session?.user as ExtendedUser;

    return user.role === "ADMIN";
  }

  async getGoogleRefreshTokenForService(userId: string, scope: GoogleScopeOptions): Promise<string> {
    return await startSpan(
      {name: "AuthenticationService > getGoogleRefreshTokenForService"},
      async () => {
        const account = await this._usersRespository.findAccountByUserId(userId);

        if (!account) {
          throw new GoogleTokenError('UnauthenticatedError', "User not found");
        }


        if (!account.scope){
          throw new GoogleTokenError('UnauthenticatedError',"Scope not found");
        }

        const hasAcces = account.scope.includes(SCOPE_URLS[scope]);
        if (!hasAcces){
          throw new GoogleTokenError('ForbiddenError',"User does not have access");
        }

        if (!account.refresh_token){
          throw new GoogleTokenError('NotFoundError', "Refresh token not found");
        }

        return account.refresh_token;
      }
    )
  }

  private async checkWebsiteAccess(userId: string, websiteId: string): Promise<Website> {
    const website = await this._websiteRepository.getById(websiteId);

    if (!website) {
      throw new ForbiddenError("Website not found");
    }

    if (website.userId !== userId) {
      throw new ForbiddenError("User does not have access to this website");
    }

    return website;
  }


  async isAllowedToAccessWebsite(userId: string, website: Website): Promise<void> {
    return await startSpan(
      {name: "AuthenticationService > isAllowedToAccessWebsite"},
      async () => {
        if (website.userId !== userId) {
          throw new ForbiddenError("User does not have access to this website");
        }
      }
    )
  }

  async isAllowedToAccessLocation(userId: string, websiteId: string): Promise<void> {
    return await startSpan(
      {name: "AuthenticationService > isAllowedToAccessLocation"},
      async () => {
        await this.checkWebsiteAccess(userId, websiteId);
      }
    )
  }

  async isAllowedToAccessTool(userId: string, locationId: string): Promise<void> {
    return await startSpan(
      {name: "AuthenticationService > isAllowedToAccessTool"},
      async () => {
        const location = await this._locationRepository.getById(locationId);

        if (!location) {
          throw new ForbiddenError("location not found");
        }

        await this.checkWebsiteAccess(userId, location.websiteId);
      }
    )
  }
}