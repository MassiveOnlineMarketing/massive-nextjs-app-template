import {
  destroyContainer,
  getInjection,
  initializeContainer,
} from "@/di/container";
import { getWebsiteWithLocationByUserUseCase } from "@/src/application/use-cases/website/get-website-with-location-by-user.use-case";
import { ForbiddenError } from "@/src/entities/errors/auth";
import { NotFoundError } from "@/src/entities/errors/common";
import { User } from "@/src/entities/models/user";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

const mockUser = {
    id: "10",
    name: "Test User",
    email: "testuser@example.com",
    emailVerified: new Date(),
    image: "https://example.com/image.png",
    password: "hashedpassword",
    role: "USER",
    loginProvider: "google",
    credits: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

describe("getWebsiteWithLocationByUserUseCase", () => {
  it("gets websites by user", async () => {
    const authenticationService = getInjection("IAuthenticationService");
    const { user } = await authenticationService.validateSession();

    await expect(
      getWebsiteWithLocationByUserUseCase(user.id, user)
    ).resolves.toMatchObject([
      {
        id: "1",
        userId: "1",
        websiteName: "Test website 1",
        domainUrl: "test1.com",
        gscUrl: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        location: null,
      },
      {
        id: "2",
        userId: "1",
        websiteName: "Test website 2",
        domainUrl: "test2.com",
        gscUrl: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        location: null,
      },
    ]);
  });

  it("should handle forbiden error thrown by the use case", async () => {
    await expect(
      getWebsiteWithLocationByUserUseCase("1", mockUser as User)
    ).rejects.toBeInstanceOf(ForbiddenError);
  });
});
