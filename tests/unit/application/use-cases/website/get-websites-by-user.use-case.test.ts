import { destroyContainer, getInjection, initializeContainer } from "@/di/container";
import { getWebsitesByUserUseCase } from "@/src/application/use-cases/website/get-websites-by-user.use-case";
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

  await expect(
    getWebsitesByUserUseCase(user.id, user)
  ).resolves.toMatchObject([{
    id: '1',
    userId: '1',
    websiteName: 'Test website 1',
    domainUrl: 'test1.com',
    gscUrl: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    location: null
  },
  {
    id: '2',
    userId: '1',
    websiteName: 'Test website 2',
    domainUrl: 'test2.com',
    gscUrl: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    location: null
  }]);
});
