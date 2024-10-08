"use client";

import React, { useState, useTransition } from "react";

import { LatestGoogleKeywordResultsDto } from "@/src/interface-adapters/presenters/latest-google-keyword-results.presenter";
import { FetchHistoricalMetricsResponseGoogleAdsApi } from "@/src/application/api/google-ads.api.types";
import { SerpApiRelatedSearches } from "@/src/application/api/serper.api.types";
import { Location } from "@/src/entities/models/location";

// Hooks and Store
import { useKeywordOpperations } from "@/app/_modules/google-keyword-tracker/hooks/useKeywordOpperations";
import useFetchRelatedQueriesWithSearchVolume from "@/app/_modules/google-keyword-tracker/hooks/fetching/useFetchRelatedQueriesWithSearchVolume";

// Components
import { Button } from "@/app/_components/ui/button";
import { Card, CardTitle } from "../Card";
import { LoadingSpinnerSmall } from "@/app/_components/ui/loading-spinner";

// Assets
import { PlusIcon } from "@heroicons/react/24/outline";
import { cn } from "@/app/_components/utils";

const RelatedSearches = ({
  keywordData,
  toolId,
  location
}: {
  keywordData: LatestGoogleKeywordResultsDto;
  toolId: string;
  location: Location | undefined;
}) => {
  // TODO: add loading state
  const { isLoading, data } = useFetchRelatedQueriesWithSearchVolume(keywordData.relatedSearches, location);
  const [isPending, startTransition] = useTransition();

  const [selectedSearches, setSelectedSearches] = useState<string[]>([]);
  const { addNewGoogleKeyword } = useKeywordOpperations();

  // Function to handle checkbox selection
  const handleCheckboxChange = (search: string) => {
    if (selectedSearches.includes(search)) {
      setSelectedSearches(selectedSearches.filter((item) => item !== search));
    } else {
      setSelectedSearches([...selectedSearches, search]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(async () => {
      if (!toolId) return;

      const res = await addNewGoogleKeyword(selectedSearches, toolId)
      if (res.success) {
        setSelectedSearches([]);
      }
    });
  };

  if (isLoading || !data) return

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardTitle title='Related Searches'>
          <Button
            disabled={isPending || selectedSearches.length === 0}
            size="sm"
            type="submit"
            variant="outline"
          >
            {isPending ?
              (
                <LoadingSpinnerSmall className="w-4 h-4" />
              ) : (
                <PlusIcon className="w-4 h-4" />
              )}
            Add
          </Button>
        </CardTitle>
        <div className='space-y-[6px]'>
          {data ? (
            data.map((item) => (
              <CardRowSearchesInput item={item} selectedSearches={selectedSearches} handleCheckboxChange={handleCheckboxChange} key={item.text} />
            ))
          ) : (
            keywordData?.relatedSearches?.map((item) => (
              <CardRowInput item={item} selectedSearches={selectedSearches} handleCheckboxChange={handleCheckboxChange} key={item.query} />
            ))
          )}
        </div>
      </form>
    </Card>
  );
};


interface CardRowSearchesInputProps {
  item: FetchHistoricalMetricsResponseGoogleAdsApi;
  selectedSearches: string[];
  handleCheckboxChange: (query: string) => void;
}

const CardRowSearchesInput = React.forwardRef<HTMLLabelElement, CardRowSearchesInputProps>(({
  item,
  selectedSearches,
  handleCheckboxChange
}, ref) => (
  <label
    className={cn(
      "flex items-center gap-3 px-3 py-2 cursor-pointer text-sm theme-t-s",
      selectedSearches.includes(item.text) && "theme-bg-p rounded-lg"
    )}
    key={item.text}
    ref={ref}
  >
    {/* Label */}
    <span className="ml-auto min-w-10">{item.keyword_metrics.avg_monthly_searches ?? 'N/A'}</span>
    <p className="text-nowrap flex justify-between">
      <span>{item.text}</span>
    </p>
    {/* Divider */}
    <div className="w-full h-[1px] theme-bg-s"></div>
    {/* Checkbox */}
    <input
      type="checkbox"
      name={item.text}
      // CHECK TODO: Styles
      className={cn(
        "h-4 w-4 my-auto rounded",
        "bg-transparent",
        "border border-slate-300 dark:border-dark-stroke mix-blend-multiply dark:mix-blend-plus-lighter focus:ring-p-1100 ",
        // "appearance-none"
      )}
      value={item.text}
      checked={selectedSearches.includes(item.text)}
      onChange={() => handleCheckboxChange(item.text)}
    />
  </label>
));
CardRowSearchesInput.displayName = 'CardRowSearchesInput';



interface CardRowInputProps {
  item: SerpApiRelatedSearches;
  selectedSearches: string[];
  handleCheckboxChange: (query: string) => void;
}

const CardRowInput = React.forwardRef<HTMLLabelElement, CardRowInputProps>(({
  item,
  selectedSearches,
  handleCheckboxChange
}, ref) => (
  <label
    className={cn(
      "flex items-center gap-3 px-3 py-2 cursor-pointer",
      selectedSearches.includes(item.query) && "theme-bg-p rounded-lg"
    )}
    key={item.query}
    ref={ref}
  >
    {/* Label */}
    <p className="text-nowrap flex justify-between text-sm theme-t-s">
      <span>{item.query}</span>
    </p>
    {/* Divider */}
    <div className="w-full h-[1px] theme-bg-s"></div>
    {/* Checkbox */}
    <input
      type="checkbox"
      name={item.query}
      // CHECK TODO: Styles
      className={cn(
        "h-4 w-4 my-auto rounded",
        "bg-transparent",
        "border border-slate-300 dark:border-dark-stroke mix-blend-multiply dark:mix-blend-plus-lighter focus:ring-p-1100 ",
        // "appearance-none"
      )}
      value={item.query}
      checked={selectedSearches.includes(item.query)}
      onChange={() => handleCheckboxChange(item.query)}
    />
  </label>
));
CardRowInput.displayName = 'CardRowInput';

export default RelatedSearches;
