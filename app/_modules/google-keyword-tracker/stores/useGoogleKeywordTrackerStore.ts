import { LatestGoogleKeywordResultsDto } from "@/src/interface-adapters/presenters/latest-google-keyword-results.presenter";
import { create } from "zustand";

export type GoogleKeywordTrackerActions = {
  setLatestResults: (keywordResults: LatestGoogleKeywordResultsDto[]) => void;
  updateLatestResults: (newKeywordResults: LatestGoogleKeywordResultsDto[]) => void;
  resetLatestResults: () => void;
  setSelectedTags: (tags: string[]) => void;
  removeSelectedTag: (tag: string) => void;

  resetSelectedTags: () => void;
}

export type GoogleKeywordTrackerState = {
  keywordResults: LatestGoogleKeywordResultsDto[] | [];
  selectedTags: string[];
}

export type GoogleKeywordTrackerStore = GoogleKeywordTrackerState & GoogleKeywordTrackerActions;

export const useGoogleKeywordTrackerStore = create<GoogleKeywordTrackerStore>((set) => ({
  keywordResults: [],
  selectedTags: [],

  setLatestResults: (keywordResults: LatestGoogleKeywordResultsDto[]) => {
    set({
      keywordResults: keywordResults,
    });
  },
  updateLatestResults: (newKeywordResults: LatestGoogleKeywordResultsDto[]) => {
    set((state) => ({
      keywordResults: [...state.keywordResults, ...newKeywordResults],
    }));
  },
  resetLatestResults: () => {
    set({
      keywordResults: [],
    });
  },

  setSelectedTags: (tags: string[]) => {
    set({
      selectedTags: tags,
    });
  },

  removeSelectedTag: (tag: string) => {
    set((state) => ({
      selectedTags: state.selectedTags.filter((t) => t !== tag),
    }));
  },

  resetSelectedTags: () => {
    set({
      selectedTags: [],
    });
  },
}));