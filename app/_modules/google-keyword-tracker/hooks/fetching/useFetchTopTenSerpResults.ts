'use client';

import { useQuery } from "@tanstack/react-query";
import { getTopTenSerpResultsController } from "@/src/interface-adapters/controllers/google-keyword-tracker/from-hooks/getTopTenSerpResults.controller";

function useFetchTopTenSerpResults(
    keywordId: string
){
    return useQuery({
        queryKey: ["getTopTenSerpResults", keywordId],
        queryFn: () => getTopTenSerpResultsController(keywordId),
        staleTime: 10 * 60 * 10000, // 100 minutes
    })
}

export default useFetchTopTenSerpResults;