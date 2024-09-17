import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  destroyContainer,
  initializeContainer,
} from "@/di/container";
import { getWebsitesByUserController } from "@/src/interface-adapters/controllers/website/get-websites-by-user.controller";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
  vi.clearAllMocks();
});

describe("getWebsitesByUserController", () => {
  it("should return websites associated with a specific user", async () => {
    await expect(getWebsitesByUserController("1")).resolves.toMatchObject([
      {
        id: "1",
        userId: "1",
        websiteName: "Test website 1",
        domainUrl: "test1.com",
        gscUrl: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      {
        id: "2",
        userId: "1",
        websiteName: "Test website 2",
        domainUrl: "test2.com",
        gscUrl: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);
  });   
});
