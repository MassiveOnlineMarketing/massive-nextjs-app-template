"use client";

import { useToast } from "@/app/_components/ui/toast/use-toast";
import {
  addTagToGoogleKeywords,
  deleteGoogleKeywords,
  removeTagFromGoogleKeywords,
} from "../../actions/keyword.actions";
import { GoogleKeywordTrackerKeywordTag } from "@/src/entities/models/google-keyword-tracker/tag";
import { useGoogleKeywordTrackerStore } from "../stores/useGoogleKeywordTrackerStore";
import { useMemo } from "react";

export function useKeywordOpperations() {
  const { toast } = useToast();
  const results = useGoogleKeywordTrackerStore((state) => state.keywordResults);
  const setLatestResults = useGoogleKeywordTrackerStore(
    (state) => state.setLatestResults
  );

  async function addNewGoogleKeyword(
    keywordsString: string | string[],
    googleKeywordTrackerToolId: string
  ) {
    const res = await fetch("/api/serp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keywordsString,
        googleKeywordTrackerToolId,
      }),
    });

    const status = res.status;
    const data = await res.json();

    if (status === 200) {
      // TODO: Deduct display credits
      const creditsToDeduct = data.message;

      toast({
        title: "Keywords added",
        variant: "success",
      });

      return { success: true };
    }

    toast({
      title: "Failed to add keywords",
      description: data.message,
      variant: "destructive",
    });

    return { success: false };
  }

  async function deleteKeywords(keywordIds: string[] | string) {
    const res = await deleteGoogleKeywords(keywordIds);

    if (res.error) {
      toast({
        title: "Failed to delete keywords",
        description: res.error,
        variant: "destructive",
      });

      return { success: false };
    }

    if (res.success) {
      // Remove the keywords from the keyword results in the store

      const keywordIdsArray = Array.isArray(keywordIds)
        ? keywordIds
        : [keywordIds];
        
      const updatedResults = results.filter(
        (result) => !keywordIdsArray.includes(result.keywordId)
      );

      setLatestResults(updatedResults);
    }
  }

  async function addTag(
    keywordIds: string[] | string,
    tagName?: string,
    tagId?: string
  ) {
    const res = await addTagToGoogleKeywords(keywordIds, tagName, tagId);

    if (res.error) {
      toast({
        title: "Failed to add tag",
        description: res.error,
        variant: "destructive",
      });

      return { success: false };
    }

    if (res.tag) {
      // Add the tag to the keyword results in the store
      // TODO: Refaction into keyword tracker store actions
      const tag = res.tag;

      const keywordIdsArray = Array.isArray(keywordIds)
        ? keywordIds
        : [keywordIds];

      keywordIdsArray.forEach((keywordId) => {
        const keyword = results.find((result) => result.keywordId === keywordId);

        if (keyword) {
          keyword.tags.push(tag);
        }
      });
      setLatestResults(results);

      toast({
        title: "Tag added",
        variant: "success",
      });

      return { success: true };
    }

    return { success: false };
  }

  async function removeTag(keywordIds: string[] | string, tagId: string) {
    const res = await removeTagFromGoogleKeywords(keywordIds, tagId);

    if (res.error) {
      toast({
        title: "Failed to remove tag",
        description: res.error,
        variant: "destructive",
      });

      return { success: false };
    }

    if (res.success) {
      // Remove the tag from the keyword results in the store
      // TODO: Refaction into keyword tracker store actions
      const keywordIdsArray = Array.isArray(keywordIds) ? keywordIds : [keywordIds];

      // Assuming `results` is available in the scope
      const updatedResults = results.map(result => {
        if (keywordIdsArray.includes(result.keywordId)) {
          result.tags = result.tags.filter(tag => tag.id !== tagId);
        }
        return result;
      });

      setLatestResults(updatedResults);

      toast({
        title: "Tag removed",
        variant: "success",
      });

      return { success: true };
    }
  }

  const uniqueTags = useMemo(() => {
    const allTags = results.reduce(
      (acc: GoogleKeywordTrackerKeywordTag[], result) => {
        result.tags?.forEach((tag: GoogleKeywordTrackerKeywordTag) => {
          if (
            tag &&
            !acc.some((existingTag) => existingTag.name === tag.name)
          ) {
            acc.push({ id: tag.id, name: tag.name });
          }
        });
        return acc;
      },
      []
    );
    return allTags;
  }, [results]);

  return { addNewGoogleKeyword, deleteKeywords, uniqueTags, addTag, removeTag };
}
