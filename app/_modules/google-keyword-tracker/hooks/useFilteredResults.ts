'use client';

import { useMemo } from "react";
import { useGoogleKeywordTrackerStore } from "../stores/useGoogleKeywordTrackerStore";

const useFilteredKeywordResults = () => {
  const keywordResults = useGoogleKeywordTrackerStore(
    (state) => state.keywordResults,
  );
  const selectedTags = useGoogleKeywordTrackerStore((state) => state.selectedTags);

  const filteredResults = useMemo(() => {
    if (selectedTags.length === 0) return keywordResults;
    return keywordResults.filter((result) =>
      result.tags?.some((tag) => selectedTags.includes(tag.name)),
    );
  }, [keywordResults, selectedTags]);

  return filteredResults;
};

export default useFilteredKeywordResults;