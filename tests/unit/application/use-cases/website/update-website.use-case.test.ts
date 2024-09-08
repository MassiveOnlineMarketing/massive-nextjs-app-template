import { destroyContainer, getInjection, initializeContainer } from "@/di/container";
import { updateWebsiteUseCase } from "@/src/application/use-cases/website/update-website.use-case";
import { afterEach, beforeEach, expect, it } from "vitest";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it("updates website", async () => {
  const authenticationService = getInjection("IAuthenticationService");
  const { user } = await authenticationService.validateSession(); 

  expect(
    updateWebsiteUseCase({ id: '1', websiteName: "test", domainUrl: "test.com" }, user)
  ).resolves.toMatchObject({
    id: '1',
    userId: '1',
    websiteName: "test",
    domainUrl: "test.com",
    gscUrl: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
  })
});