'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGoogleKeywordTrackerStore } from "../stores/useGoogleKeywordTrackerStore";
import { LatestGoogleKeywordResultsDto } from "@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller";
import { useWebsiteDetailsStore } from "@/app/_stores/useWebsiteDetailsStore";


/**
 * Hook for the Google Keyword Tracker.
 * Sets the initial state of the keyword operations.
 * Automatically redirects to the keyword tracker page when a new location is selected.
 * 
 * @returns An object containing the function to set the new state of the keyword results.
 */
function useGoogleKeywordTracker() {
  const location = useWebsiteDetailsStore((state) => state.selectedLocation);

  const resetResults = useGoogleKeywordTrackerStore((state) => state.resetLatestResults);
  const resetSelectedTags = useGoogleKeywordTrackerStore((state) => state.resetSelectedTags);
  const setResults = useGoogleKeywordTrackerStore((state) => state.setLatestResults);

  const router = useRouter();

  useEffect(() => {
    if (!location) return;
    router.push(`/app/google-keyword-tracker/${location.keywordTrackerToolId}`);
    console.log('🟢 Pushing new route');
  }, [location]);


  /**
 * Sets the initial state of the keyword operations.
 * 
 * @param serpResults - The latest keyword results from Google search.
 */
  const setNewSerpResultState = (serpResults: LatestGoogleKeywordResultsDto[]) => {
    resetResults();
    resetSelectedTags();

    console.log('🟢 setting new keyword results');
    console.log('googleSearchLatestSerpResult', serpResults);
    setResults(serpResults);;
  }

  return { setNewSerpResultState };
}

export default useGoogleKeywordTracker;