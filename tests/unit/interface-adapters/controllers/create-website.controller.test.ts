import { afterEach, beforeEach, expect, it } from "vitest";
import { destroyContainer, initializeContainer } from "@/di/container";

import { InputParseError } from "@/src/entities/errors/common";

import { createWebsiteController } from "@/src/interface-adapters/controllers/website/create-website.controller";


beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it("creates website", async () => {
  expect(
    createWebsiteController({ websiteName: "test", domainUrl: "test.com", gscUrl: null })
  ).resolves.toMatchObject({
    id: expect.any(String),
    userId: '1',
    websiteName: "test",
    domainUrl: "test.com",
    gscUrl: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
  })
});

it("throws error when invalid data is passed", async () => {
  expect(
    createWebsiteController({ websiteName: "", domainUrl: "test.com", gscUrl: null })
  ).rejects.toBeInstanceOf(
    InputParseError
  );

  expect(
    createWebsiteController({ websiteName: "test", domainUrl: "", gscUrl: null })
  ).rejects.toBeInstanceOf(
    InputParseError
  );
});
