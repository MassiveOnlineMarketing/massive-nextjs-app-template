import {
  destroyContainer,
  getInjection,
  initializeContainer,
} from "@/di/container";
import { createLocationUseCase } from "@/src/application/use-cases/location/create-location.use-case";
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


describe("createLocationUseCase", () => {
  it("should create a location", async () => {
    const authService = getInjection("IAuthenticationService");
    const { user } = await authService.validateSession();

    expect(
      createLocationUseCase(
        {
          websiteId: "1",
          language: "nl",
          languageCode: "1010",
          country: "NL",
          location: "Amsterdam",
          locationCode: "10000",
        },
        user
      )
    ).resolves.toMatchObject({
      id: expect.any(String),
      websiteId: "1",
      language: "nl",
      languageCode: "1010",
      country: "NL",
      location: "Amsterdam",
      locationCode: "10000",
      keywordTrackerToolId: null,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should throw an not found error if website does not exist", async () => {
    const authService = getInjection("IAuthenticationService");
    const { user } = await authService.validateSession();

    expect(
      createLocationUseCase(
        {
          websiteId: "999",
          language: "nl",
          languageCode: "1010",
          country: "NL",
          location: "Amsterdam",
          locationCode: "10000",
        },
        user
      )
    ).rejects.toThrowError("Website not found");

    expect(
      createLocationUseCase(
        {
          websiteId: "999",
          language: "nl",
          languageCode: "1010",
          country: "NL",
          location: "Amsterdam",
          locationCode: "10000",
        },
        user
      )
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should throw an forbidden error if user does not own the website", async () => {
    expect(
      createLocationUseCase(
        {
          websiteId: "2",
          language: "nl",
          languageCode: "1010",
          country: "NL",
          location: "Amsterdam",
          locationCode: "10000",
        },
        mockUser as User
      )
    ).rejects.toThrowError("User does not own this website");

    expect(
      createLocationUseCase(
        {
            websiteId: "2",
            language: "nl",
            languageCode: "1010",
            country: "NL",
            location: "Amsterdam",
            locationCode: "10000",
          },
          mockUser as User
        )
      ).rejects.toBeInstanceOf(ForbiddenError);
  });
});
