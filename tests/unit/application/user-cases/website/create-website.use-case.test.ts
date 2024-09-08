
import { signIn } from "@/app/(auth)/actions";
import { destroyContainer, getInjection, initializeContainer } from "@/di/container";
import { createWebsiteUseCase } from "@/src/application/use-cases/website/create-website.use-case";
import { afterEach, beforeEach, expect, it } from "vitest";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it("creates website", async () => {
  const authenticationService = getInjection("IAuthenticationService");

  const { user } = await authenticationService.validateSession(); 

  expect(
    createWebsiteUseCase({ websiteName: "test", domainUrl: "test.com" }, user)
  ).resolves.toMatchObject({
    id: expect.any(String),
    userId: '1',
    websiteName: "test",
    domainUrl: "test.com",
    gscUrl: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
  })
})