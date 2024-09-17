import {
  destroyContainer,
  getInjection,
  initializeContainer,
} from "@/di/container";
import { InputParseError } from "@/src/entities/errors/common";
import { formInputCreateLocationSchema } from "@/src/entities/models/location";
import { createLocationController } from "@/src/interface-adapters/controllers/location/create-location.controller";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { z } from "zod";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

describe("Verify create location input data controller ", () => {
  it("should create location", async () => {
    expect(
      createLocationController({
        websiteId: "1",
        language: { countryCode: "nl", name: "Dutch", googleId: 1010 },
        country: { countryCode: "NL", name: "Netherlands", googleId: 2528 },
        location: undefined,
      })
    ).resolves.toMatchObject({
      id: expect.any(String),
      websiteId: "1",
      keywordTrackerToolId: null,
      language: "nl",
      languageCode: "1010",
      country: "NL",
      location: null,
      locationCode: "2528",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should create location with location proparty", async () => {
    expect(
      createLocationController({
        websiteId: "1",
        language: { countryCode: "nl", name: "Dutch", googleId: 1010 },
        country: { countryCode: "NL", name: "Netherlands", googleId: 2528 },
        location: {
          name: "Zeewolde",
          canonicalName: "Zeewolde,Zeewolde,Flevoland,Netherlands",
          googleId: 1010325,
          countryCode: "NL",
          targetType: "City",
        },
      })
    ).resolves.toMatchObject({
      id: expect.any(String),
      websiteId: "1",
      keywordTrackerToolId: null,
      language: "nl",
      languageCode: "1010",
      country: "NL",
      location: "Zeewolde,Zeewolde,Flevoland,Netherlands",
      locationCode: "1010325",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should throw error when invalid data is passed", async () => {
    expect(
      createLocationController({
        websiteId: "1",
        language: { countryCode: "nl", name: "Dutch", googleId: 1010 },
        location: {
          name: "Zeewolde",
          canonicalName: "Zeewolde,Zeewolde,Flevoland,Netherlands",
          googleId: 789,
          countryCode: "NL",
          targetType: "City",
        }
      } as z.infer<typeof formInputCreateLocationSchema>)
    ).rejects.toBeInstanceOf(InputParseError);
  });
});
