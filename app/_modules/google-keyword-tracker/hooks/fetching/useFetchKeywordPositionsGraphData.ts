'use client';

import { useQuery } from "@tanstack/react-query";
import { getKeywordPositionsGraphDataController } from "@/src/interface-adapters/controllers/google-keyword-tracker/from-hooks/getKeywordPositionsGraphData.controller";


function useFetchKeywordPositionsGraphData(keywordId: string, range: number = 7) {
  return useQuery({
    queryKey: ['googleSearchCompetitorGraphData', keywordId, range],
    queryFn: () => getKeywordPositionsGraphDataController(keywordId, range),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export default useFetchKeywordPositionsGraphData;