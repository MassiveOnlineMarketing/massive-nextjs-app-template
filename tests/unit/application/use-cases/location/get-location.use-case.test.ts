import {
  destroyContainer,
  getInjection,
  initializeContainer,
} from "@/di/container";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { getLocationUseCase } from "@/src/application/use-cases/location/get-location.use-case";
import { NotFoundError } from "@/src/entities/errors/common";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

describe("get location by user > use case", () => {
  it("should return websites associated with a specific user", async () => {
    const authService = getInjection("IAuthenticationService");
    const { user } = await authService.validateSession();

    expect(getLocationUseCase("1", user)).resolves.toMatchObject({
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

    expect(getLocationUseCase("999", user)).rejects.toThrowError(
      "Location not found"
    );

    expect(getLocationUseCase("999", user)).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});
