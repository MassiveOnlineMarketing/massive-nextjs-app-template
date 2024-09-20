import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { User } from "@/src/entities/models/user";
import { injectable } from "inversify";
import bcrypt from "bcryptjs";
import { Account } from "@prisma/client";


@injectable()
export class MockUsersRepository implements IUsersRepository {
  private _users: User[];
  private _initialized: Promise<void>;

  constructor() {
    this._users = [];
    this._initialized = this.initializeUsers();
  }

  private async initializeUsers() {
    const users: User[] = [
      {
        id: "1",
        name: 'Test user 1',
        email: "test1@test.nl",
        emailVerified: new Date(),
        image: null,
        password: "123456",
        role: "USER",
        loginProvider: 'credentials',
        createdAt: new Date(),
        updatedAt: new Date(),
        credits: 10
      },
      {
        id: "2",
        name: 'Test admin 2',
        email: "test2@test.nl",
        emailVerified: new Date(),
        image: null,
        password: "123456",
        role: "ADMIN",
        loginProvider: 'credentials',
        createdAt: new Date(),
        updatedAt: new Date(),
        credits: 10
      }
    ];

    for (const user of users) {
      if (!user.password) {
        throw new Error('Password is required');
      }
      user.password = await bcrypt.hash(user.password, 10);
      this._users.push(user);
    }
  }

  async create(email: string, password: string, name: string): Promise<User> {
    await this._initialized;
    const user: User = {
      id: (this._users.length + 1).toString(),
      name,
      email,
      emailVerified: new Date(),
      image: null,
      password: await bcrypt.hash(password, 10),
      role: "USER",
      loginProvider: 'credentials',
      createdAt: new Date(),
      updatedAt: new Date(),
      credits: 10
    };

    this._users.push(user);

    return user;
  }

  async findAccountByUserId(userId: string): Promise<Account | null> {
    throw new Error('Method not implemented.');
    await this._initialized;
    return null;
  }


  async deductCredits(userId: string, credits: number): Promise<void> {
    await this._initialized;
    const user = this._users.find(user => user.id === userId);
    if (user) {
      user.credits -= credits;
    } else {
      throw new Error('User not found');
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    await this._initialized;
    return this._users.find(user => user.email === email) || null;
  }

  async getById(id: string): Promise<User | null> {
    await this._initialized;
    return this._users.find(user => user.id === id) || null;
  }

  async updateEmailVerified(id: string, email: string): Promise<void> {
    await this._initialized;
    const user = this._users.find(user => user.id === id);
    if (user) {
      user.emailVerified = new Date();
      user.email = email;
    }
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this._initialized;
    const user = this._users.find(user => user.id === id);
    if (user) {
      user.password = await bcrypt.hash(password, 10);
    }
  }

  async update(data: any, userId: string): Promise<User> {
    await this._initialized;
    const user = this._users.find(user => user.id === userId);
    if (user) {
      return Object.assign(user, data);
    }
    throw new Error('User not found');
  }
}