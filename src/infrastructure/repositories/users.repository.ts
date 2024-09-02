import { injectable } from 'inversify';
import "reflect-metadata";

import { db } from '@/prisma';
import { IUsersRepository } from '@/src/application/repositories/users.repository.interface';
import { Account, User } from '@prisma/client';

import "reflect-metadata";
@injectable()
export class UsersRepository implements IUsersRepository {
  async create(email: string, password: string, name: string): Promise<User> {
    const user = await db.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: { email },
    });

    return user;
  }

  async getById(id: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: { id },
    });

    return user;
  }

  async getAccountById(id: string): Promise<Account | null> {
    const user = await db.account.findFirst({
      where: { userId: id },
    });
    
    return user;
  }

  async updateEmailVerified(id: string, email: string): Promise<void> {
    await db.user.update({
      where: { id },
      data: { emailVerified: new Date(), email },
    });
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await db.user.update({
      where: { id },
      data: { password },
    });
  }

  async update(data: any, userId: string): Promise<User> {
    const user = await db.user.update({
      where: { id: userId },
      data: { ...data },
    });

    return user;
  }
}