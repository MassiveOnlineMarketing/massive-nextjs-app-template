import {
  destroyContainer,
  getInjection,
  initializeContainer,
} from "@/di/container";
import { updateLocationUseCase } from "@/src/application/use-cases/location/update-location.use-case";
import { DatabaseOperationError } from "@/src/entities/errors/common";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

describe("Update location details > use case", () => {
  it("should update location details", async () => {
    const authService = getInjection("IAuthenticationService");
    const { user } = await authService.validateSession();

    expect(
      updateLocationUseCase(
        {
          id: "1",
          websiteId: "1",
          language: "pl",
          languageCode: "10000010",
          country: "PL",
          location: "Minsk",
          locationCode: "1230000",
        },
        user
      )
    ).resolves.toMatchObject({
      id: "1",
      websiteId: "1",
      language: "pl",
      languageCode: "10000010",
      country: "PL",
      location: "Minsk",
      locationCode: "1230000",
      keywordTrackerToolId: null,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should throw an error if location does not exist", async () => {
    const authService = getInjection("IAuthenticationService");
    const { user } = await authService.validateSession();

    expect(
      updateLocationUseCase(
        {
          id: "666",
          websiteId: "1",
          language: "pl",
          languageCode: "10000010",
          country: "PL",
          location: "Minsk",
          locationCode: "1230000",
        },
        user
      )
    ).rejects.toThrowError("Location not found");

    expect(
      updateLocationUseCase(
        {
          id: "666",
          websiteId: "1",
          language: "pl",
          languageCode: "10000010",
          country: "PL",
          location: "Minsk",
          locationCode: "1230000",
        },
        user
      )
    ).rejects.toBeInstanceOf(DatabaseOperationError);
  });
});
