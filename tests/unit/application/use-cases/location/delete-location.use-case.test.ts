import {
  destroyContainer,
  getInjection,
  initializeContainer,
} from "@/di/container";
import { deleteLocationUseCase } from "@/src/application/use-cases/location/delete-location.use-case";
import { NotFoundError } from "@/src/entities/errors/common";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

describe("deleteLocationUseCase", () => {
  it("should delete a location", async () => {
    const authService = getInjection("IAuthenticationService");
    const { user } = await authService.validateSession();

    expect(deleteLocationUseCase("1", user)).resolves.toMatchObject({
      id: "1",
      websiteId: "1",
      keywordTrackerToolId: null,
      language: "en",
      languageCode: "1000",
      country: "DE",
      location: "Berlin,Berlin,Germany",
      locationCode: "1003854",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should throw an error if location does not exist", async () => {
    const authService = getInjection("IAuthenticationService");
    const { user } = await authService.validateSession();

    expect(deleteLocationUseCase("999", user)).rejects.toThrowError(
      "Location not found"
    );

    expect(deleteLocationUseCase("999", user)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});
