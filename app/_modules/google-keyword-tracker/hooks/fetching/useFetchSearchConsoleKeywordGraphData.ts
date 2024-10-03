"use client";

import { useQuery } from "@tanstack/react-query";
import { getKeywordSearchConsoleGraphDataController } from "@/src/interface-adapters/controllers/google-keyword-tracker/from-hooks/getKeywordSearchConsoleGraphData.controller";

function useFetchSearchConsoleKeywordGraphData(
  keyword: string,
  url: string | null,
  range: number = 7,
  siteProperty?: string | null
) {
  return useQuery({
    queryKey: ["getKeywordSearchConsoleGraphData", keyword, range],
    queryFn: async () => {
      if (!siteProperty) {
        return Promise.reject(new Error("No GSC URL"));
      }
      return getKeywordSearchConsoleGraphDataController(
        siteProperty,
        keyword,
        url,
        range
      );
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export default useFetchSearchConsoleKeywordGraphData;
