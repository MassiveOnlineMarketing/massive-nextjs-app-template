import { afterEach, beforeEach, expect, it } from "vitest";
import { destroyContainer, initializeContainer } from "@/di/container";

import { DatabaseOperationError, InputParseError } from "@/src/entities/errors/common";

import { updateWebsiteController } from "@/src/interface-adapters/controllers/website/update-website.controller";


beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it("updates website", async () => {
  expect(
    updateWebsiteController({ id: '1', websiteName: "test", domainUrl: "test.com", gscUrl: null })
  ).resolves.toMatchObject({
    id: '1',
    userId: '1',
    websiteName: "test",
    domainUrl: "test.com",
    gscUrl: null,
    location: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
  })
});

it("throws error when invalid data is passed", async () => {
  expect(
    updateWebsiteController({ id: '1', websiteName: "", domainUrl: "test.com", gscUrl: null })
  ).rejects.toBeInstanceOf(
    InputParseError
  );

  expect(
    updateWebsiteController({ id: '1', websiteName: "test", domainUrl: "", gscUrl: null })
  ).rejects.toBeInstanceOf(
    InputParseError
  );
});

it("throws error when website not found", async () => {
  expect(
    updateWebsiteController({ id: '', websiteName: "test", domainUrl: "test.com", gscUrl: "test.com" })
  ).rejects.toBeInstanceOf(
    DatabaseOperationError
  );
});