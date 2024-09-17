import {
  destroyContainer,
  getInjection,
  initializeContainer,
} from "@/di/container";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { getLocationController } from "@/src/interface-adapters/controllers/location/get-location.controller";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

describe("Verify delete location input data controller ", () => {
  it("should delete location", async () => {
    expect(getLocationController("1")).resolves.toMatchObject({
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
    expect(getLocationController("999")).rejects.toThrowError(
      "Location not found"
    );
  });
});
