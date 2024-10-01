'use client';

import { useQuery } from "@tanstack/react-query";
import { getKeywordPositionsGraphDataController } from "@/src/interface-adapters/controllers/google-keyword-tracker/getKeywordPositionsGraphData.controller";


function useFetchKeywordPositionsGraphData(keywordId: string, keyword: string, url: string | null, range: number = 7, siteProperty?: string | null) {
  return useQuery({
    queryKey: ['googleSearchCompetitorGraphData', keywordId, range],
    queryFn: async () => {
      if (!siteProperty) {
        return Promise.reject(new Error('No GSC URL'));
      }  
      return getKeywordPositionsGraphDataController(keywordId, siteProperty, keyword, url, range)
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export default useFetchKeywordPositionsGraphData;