import { destroyContainer, getInjection, initializeContainer } from "@/di/container";
import { getWebsitesByUser } from "@/src/application/use-cases/website/get-websites-by-user.use-case";
import { afterEach, beforeEach, expect, it } from "vitest";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it("gets websites by user", async () => {
  const authenticationService = getInjection("IAuthenticationService");
  const { user } = await authenticationService.validateSession(); 

  expect(
    getWebsitesByUser(user.id)
  ).resolves.toMatchObject([{
    id: '1',
    userId: '1',
    websiteName: "test",
    domainUrl: "test.com",
    gscUrl: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
  }])
});

