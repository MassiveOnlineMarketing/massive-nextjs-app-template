import { destroyContainer, getInjection, initializeContainer } from "@/di/container";
import { deleteWebsiteUseCase } from "@/src/application/use-cases/website/delete-website.use-case";
import { ForbiddenError } from "@/src/entities/errors/auth";
import { NotFoundError } from "@/src/entities/errors/common";
import { afterEach, beforeEach, expect, it } from "vitest";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it("deletes website", async () => {
  const authenticationService = getInjection("IAuthenticationService");

  const { user } = await authenticationService.validateSession();

  expect(
    deleteWebsiteUseCase("1", user)
  ).resolves.toMatchObject({
    id: '1',
    userId: '1',
    websiteName: "Test website 1",
    domainUrl: "test1.com",
    gscUrl: null,
    location: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
    })
})


it("throws forbidden error when user is not owner of website", async () => {
  const user = {
    id: '2',
    name: 'asfd ',
    email: 'saf ',
    emailVerified: new Date(),
    role: 'USER' as 'USER',
    image: null,
    password: null,
    loginProvider: 'credentials ',
    createdAt: new Date(),
    updatedAt: new Date(),
    credits: 10
  }
  expect(
    deleteWebsiteUseCase("1", user)
  ).rejects.toBeInstanceOf(
    ForbiddenError
  );
})

it("throws not found error when website is not found", async () => {
  const user = {
    id: '1',
    name: 'asfd ',
    email: 'saf ',
    emailVerified: new Date(),
    role: 'USER' as 'USER',
    image: null,
    password: null,
    loginProvider: 'credentials ',
    createdAt: new Date(),
    updatedAt: new Date(),
    credits: 10
  }
  expect(
    deleteWebsiteUseCase("2000", user)
  ).rejects.toBeInstanceOf(
    NotFoundError
  );
})