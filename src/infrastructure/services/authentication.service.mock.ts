import { DI_SYMBOLS } from "@/di/types";
import { ExtendedUser } from "@/next-auth";
import type { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { User } from "@/src/entities/models/user";
import { inject, injectable } from "inversify";
import { Session } from "next-auth";


@injectable()
export class MockAuthenticationService implements IAuthenticationService {

  constructor(
    @inject(DI_SYMBOLS.IUsersRepository)
    private _usersRespository: IUsersRepository
  ) {
    this._usersRespository = _usersRespository;
  }

  async session(): Promise<Session | null> {
    const user = await this._usersRespository.getById('1');

    if (!user) {
      throw new Error('User not found');
    }

    const session = {
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
        id: user.id,
        role: user.role
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    } as Session;
    
    return  session;
  }

  async validateSession(): Promise<{user: User, session: Session}> {
    const user = await this._usersRespository.getById('1');

    if (!user) {
      throw new Error('User not found');
    }

    const session = {
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
        id: user.id,
        role: user.role
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    } as Session;
    
    return {user, session};
  }

  async currentUser(): Promise<ExtendedUser | null> {
    const session = await this.session();
    const user = session?.user as ExtendedUser;

    return user;
  }

  async isAdmin() {
    const session = await this.session();
    const user = session?.user as ExtendedUser;

    return user.role === "ADMIN";
  }
}