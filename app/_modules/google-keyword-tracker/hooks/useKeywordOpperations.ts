"use client";

import { useToast } from "@/app/_components/ui/toast/use-toast";
import { useMemo } from "react";
import { useGoogleKeywordTrackerStore } from "../stores/useGoogleKeywordTrackerStore";

import {
  addTagToGoogleKeywords,
  deleteGoogleKeywords,
  removeTagFromGoogleKeywords,
} from "../../actions/keyword.actions";

import { GoogleKeywordTrackerKeywordTag } from "@/src/entities/models/google-keyword-tracker/tag";
import { LatestGoogleKeywordResultsDto } from "@/src/interface-adapters/presenters/latest-google-keyword-results.presenter";
import { useWebsiteDetailsStore } from "@/app/_stores/useWebsiteDetailsStore";

/**
 * Custom hook for managing Google keyword operations.
 *
 * This hook provides functions to add, delete, and manage tags for Google keywords.
 * It also provides a memoized list of unique tags from the keyword results.
 *
 * @returns {Object} An object containing the following functions and properties:
 * - `addNewGoogleKeyword`: Adds new Google keywords to the tracker tool.
 * - `deleteKeywords`: Deletes keywords based on the provided keyword IDs.
 * - `addTag`: Adds a tag to the specified Google keywords.
 * - `removeTag`: Removes a tag from the specified Google keywords.
 * - `uniqueTags`: A memoized array of unique tags from the keyword results.
 */
export function useKeywordOpperations() {
  const { toast } = useToast();
  const { results, setLatestResults, updateLatestResults } = useGoogleKeywordTrackerStore(state => ({
    results: state.keywordResults,
    setLatestResults: state.setLatestResults,
    updateLatestResults: state.updateLatestResults
  }));
  const selectedLocation  = useWebsiteDetailsStore((state) => state.setSelectedLocation)

    /**
   * Adds new Google keywords to the tracker tool.
   *
   * @param keywordsString - A string or an array of strings representing the keywords to be added.
   * @param googleKeywordTrackerToolId - The ID of the Google Keyword Tracker Tool.
   * @param streamResults - A boolean indicating whether to stream results or not. Defaults to false.
   * @returns An object indicating the success or failure of the operation.
   *
   * @example
   * ```typescript
   * const result = await addNewGoogleKeyword("example keyword", "tool-id-123", true);
   * if (result.success) {
   *   console.log("Keywords added successfully");
   * } else {
   *   console.error("Failed to add keywords");
   * }
   * ```
   */
  async function addNewGoogleKeyword(
    keywordsString: string | string[],
    googleKeywordTrackerToolId: string,
    streamResults: boolean = false
  ) {
    
    const res = await AddNewGoogleKeywordHandler(keywordsString, googleKeywordTrackerToolId, streamResults);
   
    if (res.error) {
      toast({
        title: "Failed to add keywords",
        description: res.error,
        variant: "destructive",
      });

      return { success: false };
    }

    if (res.success) {
      if (res.data && Array.isArray(res.data)) {
        const data = res.data as LatestGoogleKeywordResultsDto[];

        // TODO: Check if the keyword tracker tool ID matches the current tool ID
        // if (selectedLocation?.keywordTrackerToolId === googleKeywordTrackerToolId) {
        updateLatestResults(data);
      }

      toast({
        title: "Keywords added successfully",
        variant: "success",
      });

      return { success: true };
    }  
  }

    /**
   * Deletes keywords based on the provided keyword IDs.
   *
   * @param {string[] | string} keywordIds - An array of keyword IDs or a single keyword ID to be deleted.
   * @returns {Promise<{ success: boolean }>} - An object indicating the success status of the operation.
   *
   * @example
   * ```typescript
   * const result = await deleteKeywords(['keyword1', 'keyword2']);
   * if (result.success) {
   *   console.log('Keywords deleted successfully');
   * } else {
   *   console.log('Failed to delete keywords');
   * }
   * ```
   */
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
      // Filter the keywords from the keyword results in the store
      const keywordIdsArray = Array.isArray(keywordIds)
        ? keywordIds
        : [keywordIds];

      const updatedResults = results.filter(
        (result) => !keywordIdsArray.includes(result.keywordId)
      );

      setLatestResults(updatedResults);
    }
  }

  
  /**
   * Adds a tag to the specified Google keywords.
   *
   * @param {string[] | string} keywordIds - The IDs of the keywords to which the tag should be added.
   * @param {string} [tagName] - The name of the tag to be added (optional).
   * @param {string} [tagId] - The ID of the tag to be added (optional).
   * @returns {Promise<{ success: boolean }>} - An object indicating whether the operation was successful.
   *
   * @example
   * const result = await addTag(['keywordId1', 'keywordId2'], 'New Tag');
   * if (result.success) {
   *   console.log('Tag added successfully');
   * } else {
   *   console.log('Failed to add tag');
   * }
   */
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
      const tag = res.tag;

      const keywordIdsArray = Array.isArray(keywordIds)
        ? keywordIds
        : [keywordIds];

      keywordIdsArray.forEach((keywordId) => {
        const keyword = results.find(
          (result) => result.keywordId === keywordId
        );

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

  /**
   * Removes a tag from the specified Google keywords.
   *
   * @param {string[] | string} keywordIds - The IDs of the keywords from which the tag should be removed.
   * @param {string} tagId - The ID of the tag to be removed.
   * @returns {Promise<{ success: boolean }>} - An object indicating whether the operation was successful.
   *
   * @example
   * ```typescript
   * const result = await removeTag(['keyword1', 'keyword2'], 'tag1');
   * if (result.success) {
   *   console.log('Tag removed successfully');
   * } else {
   *   console.log('Failed to remove tag');
   * }
   * ```
   */
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
      const keywordIdsArray = Array.isArray(keywordIds)
        ? keywordIds
        : [keywordIds];

      // Assuming `results` is available in the scope
      const updatedResults = results.map((result) => {
        if (keywordIdsArray.includes(result.keywordId)) {
          result.tags = result.tags.filter((tag) => tag.id !== tagId);
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

  /**
   * A memoized function that extracts unique tags from the `results` array.
   * 
   * @returns {GoogleKeywordTrackerKeywordTag[]} An array of unique tags, each containing an `id` and `name`.
   * 
   * @remarks
   * This function uses `useMemo` to optimize performance by memoizing the result.
   * It iterates over the `results` array, and for each result, it checks if the tag is already present in the accumulator.
   * If the tag is not present, it adds the tag to the accumulator.
   * 
   * @param {GoogleKeywordTrackerKeywordTag[]} results - The array of results from which tags are extracted.
   */
  // const uniqueTags = useMemo(() => {
  //   const allTags = results.reduce(
  //     (acc: GoogleKeywordTrackerKeywordTag[], result) => {
  //       result.tags?.forEach((tag: GoogleKeywordTrackerKeywordTag) => {
  //         if (
  //           tag &&
  //           !acc.some((existingTag) => existingTag.name === tag.name)
  //         ) {
  //           acc.push({ id: tag.id, name: tag.name });
  //         }
  //       });
  //       return acc;
  //     },
  //     []
  //   );
  //   return allTags;
  // }, [results]);

  const uniqueTags = results.reduce(
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

  return { addNewGoogleKeyword, deleteKeywords, uniqueTags, addTag, removeTag };
}

/**
 * Handles the addition of new Google keywords by sending a POST request to the server.
 * 
 * @param keywordsString - A single keyword or an array of keywords to be tracked.
 * @param googleKeywordTrackerToolId - The ID of the Google Keyword Tracker Tool.
 * @param streamResults - A boolean indicating whether to stream results or not. Defaults to `false`.
 * @returns A promise that resolves to an object containing:
 * - `success` (optional): A boolean indicating if the operation was successful.
 * - `error` (optional): A string containing the error message if the operation failed.
 * - `data` (optional): An array of `LatestGoogleKeywordResultsDto` or a number, depending on the `streamResults` flag.
 */
async function AddNewGoogleKeywordHandler(
  keywordsString: string | string[],
  googleKeywordTrackerToolId: string,
  streamResults: boolean = false
): Promise<{ success?: boolean; error?: string; data?: LatestGoogleKeywordResultsDto[] | number }> {
  const res = await fetch("/api/serp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keywordsString,
      googleKeywordTrackerToolId,
      streamResults,
    }),
  });

  const status = res.status;
  const data = await res.json();

  if (status === 200) {
    const resData: LatestGoogleKeywordResultsDto[] | number =
      data.message;
    // TODO: Deduct display credits

    if (streamResults) {
      const data = resData as LatestGoogleKeywordResultsDto[];
      const credutsToDeduct = data.length;

      return { success: true, data: data };
    } else {
      const data = resData as number;
      const creditsToDeduct = data;

      return { success: true };
    }
  }

  return { error: data.message as string };
}