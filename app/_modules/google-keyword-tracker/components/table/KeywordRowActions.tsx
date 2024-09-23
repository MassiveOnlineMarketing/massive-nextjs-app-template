"use client";

import React from "react";

import { LatestGoogleKeywordResultsDto } from "@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller";
import { useKeywordOpperations } from "@/app/_modules/google-keyword-tracker/hooks/useKeywordOpperations";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { buttonVariants } from "@/app/_components/ui/button";

import { cn } from "@/app/_components/utils";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";


const KeywordRowActionsDropdown = ({ result }: { result: LatestGoogleKeywordResultsDto }) => {
  const { deleteKeywords, removeTag, addTag, uniqueTags } = useKeywordOpperations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <div className="p-2 border theme-b-p theme-bg-w rounded-[8px] ">
          <span className="sr-only">Open menu</span>
          <EllipsisHorizontalIcon className="w-4 h-4 theme-t-s" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="relative" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation()
            if (result.url) {
              navigator.clipboard.writeText(result.url)
            }
          }}
        >
          Copy url
        </DropdownMenuItem>

        {/* Remove tags */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Delete tag</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {result.tags.length === 0 && (
                <DropdownMenuItem disabled>No tags to delete</DropdownMenuItem>
              )}
              {result.tags.map((tag) => (
                <DropdownMenuItem
                  key={tag.id}
                  className="cursor-pointer"
                  onClick={() => removeTag(result.keywordId, tag.id)}
                >
                  {tag.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        {/* Add Tag */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Add existing tag</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {uniqueTags.length === 0 && (
                <DropdownMenuItem disabled>No existing tags</DropdownMenuItem>
              )}
              {uniqueTags.map((tag) => (
                <DropdownMenuItem
                  key={tag.id}
                  className=" cursor-pointer"
                  onClick={() => addTag(result.keywordId, undefined, tag.id)}
                >
                  {tag.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        {/* Delete Keyword */}

        <DropdownMenuItem
          onClick={(event) => {
            // Stop the event from bubbling up to the parent
            event.stopPropagation();
            // Prevent close on click
            event.preventDefault();
            deleteKeywords(result.keywordId);
          }}
          className={cn(
            buttonVariants({
              variant: "destructive",
              size: 'sm',
              className: "w-full cursor-pointer rounded-md"
            })
          )}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default KeywordRowActionsDropdown;
