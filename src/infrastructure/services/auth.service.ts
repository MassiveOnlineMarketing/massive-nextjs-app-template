import { injectable } from "inversify";
import 'reflect-metadata'

import { Session } from "next-auth"
import { ExtendedUser } from "@/next-auth";
;
import { auth } from "@/app/api/auth/[...nextauth]/_nextAuth";

import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  async session(): Promise<Session | null> {
    return auth()
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