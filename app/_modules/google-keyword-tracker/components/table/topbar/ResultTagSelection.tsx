'use client';

import React from "react";

import { useKeywordOpperations } from "@/app/_modules/google-keyword-tracker/hooks/useKeywordOpperations";
import { useGoogleKeywordTrackerStore } from "@/app/_modules/google-keyword-tracker/stores/useGoogleKeywordTrackerStore";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/app/_components/ui/command";
import { Button } from "@/app/_components/ui/button";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/app/_components/utils";


const ResultTagSelection = () => {
  const { uniqueTags } = useKeywordOpperations();

  const updateSelectedTags = useGoogleKeywordTrackerStore((state) => state.setSelectedTags);
  const selectedTags = useGoogleKeywordTrackerStore((state) => state.selectedTags);

  const toggleTag = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    updateSelectedTags(newSelectedTags);
  };

  const clearTags = () => updateSelectedTags([]);

  let tagSting = selectedTags.join(", ");
  if (tagSting.length > 24) {
    tagSting = tagSting.slice(0, 24) + "...";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className="w-[250px] ml-auto">
          <span className="mr-[6px] theme-t-n">Tags:</span>
          {tagSting ? (
            <span className="theme-t-t">{tagSting}</span>
          ) : (
            <span className="theme-t-t">All Keywords</span>
          )}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder={uniqueTags.length > 0 ? "Search tag..." : "No existing tags"} />
          <CommandList>
            {uniqueTags.length > 0 ? (
              <CommandGroup>
                <CommandItem value="" onSelect={() => clearTags()} >
                  <div className="flex items-center">
                    <CheckIcon className={cn("h-4 w-4 mr-2", selectedTags.length > 0 ? "text-gray-200" : "text-base-500")} />
                    <span>All Keywords</span>
                  </div>
                </CommandItem>
                {uniqueTags.map((tag) => (
                  <CommandItem key={tag.id} onSelect={() => toggleTag(tag.name)}>
                    <div className="flex items-center">
                      <CheckIcon className={cn("h-4 w-4 mr-2", selectedTags.includes(tag.name) ? "text-base-500" : "text-gray-200")} />
                      <span>{tag.name}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandGroup>
                <CommandItem value="" onSelect={() => clearTags()} >
                  All Keywords
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ResultTagSelection;