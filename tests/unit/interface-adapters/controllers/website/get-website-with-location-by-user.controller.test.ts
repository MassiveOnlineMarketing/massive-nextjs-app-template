import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  destroyContainer,
  initializeContainer,
} from "@/di/container";

import { getWebsiteWithLocationByUserController } from "@/src/interface-adapters/controllers/website/get-website-with-location-by-user.controller";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

const mockUserId = "1";
const mockUserId2 = "10";

describe("getWebsiteWithLocationByUserController", () => {
  it("should return websites with location", async () => {
    expect(
      getWebsiteWithLocationByUserController(mockUserId)
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
      }]
    );
  });

  // TODO: Fix this test
  // it("should handle errors thrown by the use case", async () => {
  //   await expect(
  //     getWebsiteWithLocationByUserController(mockUserId2)
  //   ).rejects.toBeInstanceOf([]);
  // });
});
