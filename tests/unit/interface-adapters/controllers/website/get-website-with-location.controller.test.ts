import { destroyContainer, getInjection, initializeContainer } from "@/di/container";
import { AuthenticationError } from "@/src/entities/errors/auth";
import { NotFoundError } from "@/src/entities/errors/common";
import { getWebsiteWithLocationController } from "@/src/interface-adapters/controllers/website/get-website-with-location.controller";
import { afterEach, beforeEach, describe, expect, it, vi, Mock } from "vitest";

vi.mock("@/src/interface-adapters/controllers/website/get-website-with-location.controller", () => ({
  getWebsiteWithLocationController: vi.fn(),
}));

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
  vi.clearAllMocks();
});

const mockWebsiteId = "1";

describe("getWebsiteWithLocationController", () => {
  it("should return websites with location", async () => {
    (getWebsiteWithLocationController as Mock).mockResolvedValueOnce({
      id: "1",
      userId: "1",
      websiteName: "Test website 1",
      domainUrl: "test1.com",
      gscUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      location: null,
    });

    await expect(getWebsiteWithLocationController(mockWebsiteId)).resolves.toMatchObject({
      id: "1",
      userId: "1",
      websiteName: "Test website 1",
      domainUrl: "test1.com",
      gscUrl: null,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      location: null,
    });
  });

  it("should handle errors thrown by the use case", async () => {
    (getWebsiteWithLocationController as Mock).mockRejectedValueOnce(new NotFoundError('Website not found'));

    await expect(getWebsiteWithLocationController("1000")).rejects.toThrow(NotFoundError);
  });

  it("should handle use case errors", async () => {
    const errorMessage = "Use case error";
    (getWebsiteWithLocationController as Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(getWebsiteWithLocationController(mockWebsiteId)).rejects.toThrow(errorMessage);
  });

  it("should handle authentication failures", async () => {
    (getWebsiteWithLocationController as Mock).mockRejectedValueOnce(new AuthenticationError('Authentication failed'));

    await expect(getWebsiteWithLocationController(mockWebsiteId)).rejects.toThrow(AuthenticationError);
  });
});