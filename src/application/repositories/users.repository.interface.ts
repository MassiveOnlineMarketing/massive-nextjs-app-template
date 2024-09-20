import { Account, User } from "@prisma/client";

/**
 * Represents a repository for managing user data.
 */
export interface IUsersRepository {
  /**
   * Creates a new user with the specified email, password, and name.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @param name - The name of the user.
   * @throws {DatabaseOperationError} if the user is not created.
   * @returns A promise that resolves to the created user.
   */
  create(email: string, password: string, name: string): Promise<User>;

  /**
   * Finds an account by the user ID.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the found account, or null if not found.
   */
  findAccountByUserId(userId: string): Promise<Account | null>;

  /**
   * Deducts credits from a user.
   * @param userId - The ID of the user.
   * @param credits - The number of credits to deduct.
   * @throws {DatabaseOperationError} if the user is not found.
   * @returns A promise that resolves when the credits are deducted.
   */
  deductCredits(userId: string, credits: number): Promise<void>;

  /**
   * Retrieves a user by their email.
   * @param email - The email of the user.
   * @returns A promise that resolves to the found user, or null if not found.
   */
  getByEmail(email: string): Promise<User | null>;

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user.
   * @returns A promise that resolves to the found user, or null if not found.
   */
  getById(id: string): Promise<User | null>;

  // /**
  //  * Retrieves an account by the user ID.
  //  * @param id - The ID of the user.
  //  * @returns A promise that resolves to the found account, or null if not found.
  //  */
  // getAccountById(id: string): Promise<Account | null>;

  /**
   * Updates the email verification status of a user.
   * @param id - The ID of the user.
   * @param email - The new email of the user.
   * @throws {DatabaseOperationError} if the user is not found or the update fails.
   * @returns A promise that resolves when the update is complete.
   */
  updateEmailVerified(id: string, email: string): Promise<void>;

  /**
   * Updates the password of a user.
   * @param id - The ID of the user.
   * @param password - The new password of the user.
   * @throws {DatabaseOperationError} if the user is not found or the update fails.
   * @returns A promise that resolves when the update is complete.
   */
  updatePassword(id: string, password: string): Promise<void>;

  /**
   * Updates the data of a user.
   * @param data - The updated data for the user.
   * @param userId - The ID of the user.
   * @throws {DatabaseOperationError} if the user is not found or the update fails.
   * @returns A promise that resolves to the updated user.
   */
  update(data: any, userId: string): Promise<User>;
}
