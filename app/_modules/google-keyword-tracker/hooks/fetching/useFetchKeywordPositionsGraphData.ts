'use client';

import { useQuery } from "@tanstack/react-query";
import { getKeywordPositionsGraphDataController } from "@/src/interface-adapters/controllers/google-keyword-tracker/getKeywordPositionsGraphData.controller";


function useFetchKeywordPositionsGraphData(keywordId: string) {
  return useQuery({
    queryKey: ['googleSearchCompetitorGraphData', keywordId],
    queryFn: () => getKeywordPositionsGraphDataController(keywordId),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export default useFetchKeywordPositionsGraphData;