import { afterEach, beforeEach, expect, it } from "vitest";
import { destroyContainer, initializeContainer } from "@/di/container";

import { InputParseError } from "@/src/entities/errors/common";

import { deleteWebsiteController } from "@/src/interface-adapters/controllers/website/delete-website.controller";


beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it("deletes website", async () => {
  expect(
    deleteWebsiteController("1")
  ).resolves.toMatchObject({
    id: '1',
    userId: '1',
    websiteName: "Test website 1",
    domainUrl: "test1.com",
    gscUrl: null,
    location: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
  })
});
