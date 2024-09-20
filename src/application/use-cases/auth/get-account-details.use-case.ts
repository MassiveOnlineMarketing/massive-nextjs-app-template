import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { NotFoundError } from "@/src/entities/errors/common";

import { Account } from "@prisma/client";
import { User } from "@/src/entities/models/user";

export async function getAccountDetailsUseCase(user: User): Promise<Account> {
  return await startSpan(
    { name: "getAccountDetails Use Case" },
    async () => {
      const users = getInjection("IUsersRepository");

      const account = await users.findAccountByUserId(user.id);

      if (!account) {
        throw new NotFoundError("entity not found");
      }

      return account;
    }
  );
}