"use server";

import { getInjection } from "@/di/container";
import { startSpan } from "@sentry/nextjs";

import { NotFoundError } from "@/src/entities/errors/common";

import { Location } from "@/src/entities/models/location";
import { SerpApiRelatedSearches } from "@/src/application/api/serper.api.types";

export async function getRelatedQueriesWithSearchVolumeController(
  relatedSearches: SerpApiRelatedSearches[] | null,
  location: Location | null
) {
  return await startSpan(
    { name: "getRelatedQueriesWithSearchVolume controller" },
    async () => {
      if (!location) {
        throw new NotFoundError("Location not found");
      }
      if (!relatedSearches) {
        throw new NotFoundError("Related searches not found");
      }

      const authService = getInjection("IAuthenticationService");
      const googleAdsApi = getInjection("IGoogleAdsApi");

      await authService.validateSession();

      const queries = relatedSearches.map((relatedSearch) => relatedSearch.query);

      return await googleAdsApi.generateHistoricalMetrics(
        location.locationCode,
        location.languageCode,
        queries
      );
    }
  );
}
