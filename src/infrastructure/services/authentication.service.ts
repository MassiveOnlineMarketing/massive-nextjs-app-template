import { inject, injectable } from "inversify";
import { startSpan } from "@sentry/nextjs";
import { DI_SYMBOLS } from "@/di/types";
import 'reflect-metadata';

import { ForbiddenError, UnauthenticatedError } from "@/src/entities/errors/auth";

import { Session } from "next-auth";
import { ExtendedUser } from "@/next-auth";
import { User } from "@/src/entities/models/user";

import { auth } from "@/app/_modules/auth/_nextAuth";

import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import type { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { NotFoundError } from "@/src/entities/errors/common";


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
    private _usersRespository: IUsersRepository
  ) {
    this._usersRespository = _usersRespository;
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
          throw new UnauthenticatedError("User not found");
        }


        if (!account.scope){
          throw new UnauthenticatedError("Scope not found");
        }

        const hasAcces = account.scope.includes(SCOPE_URLS[scope]);
        if (!hasAcces){
          throw new ForbiddenError("User does not have access");
        }

        if (!account.refresh_token){
          throw new NotFoundError("Refresh token not found");
        }

        return account.refresh_token;
      }
    )
  }
}