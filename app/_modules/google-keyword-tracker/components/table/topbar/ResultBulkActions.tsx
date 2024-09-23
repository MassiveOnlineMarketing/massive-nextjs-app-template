'use client'

import React, { useState } from 'react'

import { Table } from '@tanstack/react-table';
import { useKeywordOpperations } from '@/app/_modules/google-keyword-tracker/hooks/useKeywordOpperations';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from "@/app/_components/ui/dropdown-menu";
import { Button } from '@/app/_components/ui/button';

import { cn } from '@/app/_components/utils';
import { GoogleKeywordTrackerKeywordTag } from '@/src/entities/models/google-keyword-tracker/tag';

function ResultBulkActions<TData>({ table, deselectAllRows }: { table: Table<TData>, deselectAllRows: () => void; }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='default'
          variant='outline'
          className='ml-2'
        >
          Bulk actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Tag Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <AddTagToKeywords
            selectedRows={table.getSelectedRowModel()}
            onActionFinished={deselectAllRows}
          />
          <DeleteTagFromKeyword
            selectedRows={table.getSelectedRowModel()}
            onActionFinished={deselectAllRows}
          />
          <DropdownMenuSeparator />
          <AddNewTagInput
            selectedRows={table.getSelectedRowModel()}
            onActionFinished={deselectAllRows}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const AddTagToKeywords = ({
  selectedRows,
  onActionFinished,
}: {
  selectedRows: any;
  onActionFinished: () => void;
}) => {
  const { addTag, uniqueTags } = useKeywordOpperations();

  const keywordIds = selectedRows.rows.map(
    (row: any) => row.original.keywordId,
  );

  const handleAddClick = async (tagId: string) => {
    await addTag(keywordIds, undefined, tagId);
    onActionFinished();
  };

  return (
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
              className="cursor-pointer"
              onClick={() => handleAddClick(tag.id)}
            >
              {tag.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

const DeleteTagFromKeyword = ({
  selectedRows,
  onActionFinished,
}: {
  selectedRows: any;
  onActionFinished: () => void;
}) => {
  const { removeTag } = useKeywordOpperations();

  const keywordIds = selectedRows.rows.map(
    (row: any) => row.original.keywordId,
  );

  const tags: GoogleKeywordTrackerKeywordTag[] = selectedRows.rows.reduce(
    (acc: any[], row: any) => {
      row.original.tags?.forEach((tag: any) => {
        if (!acc.some((existingTag) => existingTag.id === tag.id)) {
          acc.push(tag);
        }
      });
      return acc;
    },
    [],
  );

  const handleDeleteClick = async (tagId: string) => {
    await removeTag(keywordIds, tagId);
    onActionFinished();
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Delete tag</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {tags.length === 0 && (
            <DropdownMenuItem disabled>No tags to delete</DropdownMenuItem>
          )}
          {tags.map((tag) => (
            <DropdownMenuItem
              key={tag.id}
              className="cursor-pointer"
              onClick={() => handleDeleteClick(tag.id)}
            >
              {tag.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

const AddNewTagInput = ({
  selectedRows,
  onActionFinished,
}: {
  selectedRows: any;
  onActionFinished: () => void;
}) => {
  const keywordIds = selectedRows.rows.map(
    (row: any) => row.original.keywordId,
  );

  const [inputValue, setInputValue] = useState("");
  const { addTag } = useKeywordOpperations();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const res = await addTag(keywordIds, inputValue, undefined);
    if (res.success) {
      onActionFinished();
      setInputValue("");
    }
  };

  return (
    <div className="overflow-hidden rounded-lg gap-[6px]">
      <form onSubmit={handleSubmit}>
        <div className=" text-sm font-medium leading-5">
          <input
            className="m-1 pl-[12px] pr-[20px] py-[8px] w-[204px] bg-transparent    focus:outline-none ring-base-500 focus:ring-1 focus:ring-ring focus:ring-offset-2   placeholder-theme-light-text-tertiary dark:placeholder-theme-night-text-tertiary"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key.length === 1) {
                e.stopPropagation();
              }
            }
            }
            placeholder="Add new tag"
          />
        </div>
        <button
          className={cn(
            'text-sm font-normal theme-t-p',
            "px-[16px] py-[8px] w-full",
            'hover:bg-base-100 hover:dark:bg-theme-night-background-secondary '
          )}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};


export default ResultBulkActions