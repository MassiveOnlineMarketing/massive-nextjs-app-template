import { inject, injectable } from "inversify";
import { startSpan } from "@sentry/nextjs";
import { DI_SYMBOLS } from "@/di/types";
import 'reflect-metadata';

import { UnauthenticatedError } from "@/src/entities/errors/auth";

import { Session } from "next-auth";
import { ExtendedUser } from "@/next-auth";
import { User } from "@/src/entities/models/user";

import { auth } from "@/app/api/auth/[...nextauth]/_nextAuth";

import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import type { IUsersRepository } from "@/src/application/repositories/users.repository.interface";


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

}