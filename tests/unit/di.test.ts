import "reflect-metadata";

import {
  destroyContainer,
  getInjection,
  initializeContainer,
} from "@/di/container";
import { afterEach, beforeEach, expect, it } from "vitest";

import { MockAuthenticationService } from "@/src/infrastructure/services/authentication.service.mock";
import { MockUsersRepository } from "@/src/infrastructure/repositories/users.repository.mock";
import { MockWebsiteRepository } from "@/src/infrastructure/repositories/website.repository.mock";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it("should use Mock versions of repos and services", async () => {
  const authService = getInjection("IAuthenticationService");
  expect(authService).toBeInstanceOf(MockAuthenticationService);

  const usersRepository = getInjection("IUsersRepository");
  expect(usersRepository).toBeInstanceOf(MockUsersRepository);

  const websiteRepository = getInjection("IWebsiteRepository");
  expect(websiteRepository).toBeInstanceOf(MockWebsiteRepository);
});
