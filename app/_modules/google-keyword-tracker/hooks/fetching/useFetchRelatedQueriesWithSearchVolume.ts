'use client';

import { useQuery } from "@tanstack/react-query";
import { getRelatedQueriesWithSearchVolumeController } from "@/src/interface-adapters/controllers/google-keyword-tracker/from-hooks/getRelatedQueriesWithSearchVolume";

import { SerpApiRelatedSearches } from "@/src/application/api/serper.api.types";
import { Location } from "@/src/entities/models/location";

function useFetchRelatedQueriesWithSearchVolume(relatedSearches: SerpApiRelatedSearches[] | null, location: Location | null | undefined) {
    return useQuery({
        queryKey: ["getRelatedQueriesWithSearchVolume", relatedSearches, location],
        queryFn: async () => {
            if (!location) {
                throw new Error("Location not found");
            }
            return getRelatedQueriesWithSearchVolumeController(relatedSearches, location);
        },
        staleTime: 10 * 60 * 10000, // 100 minutes
    })
}

export default useFetchRelatedQueriesWithSearchVolume;