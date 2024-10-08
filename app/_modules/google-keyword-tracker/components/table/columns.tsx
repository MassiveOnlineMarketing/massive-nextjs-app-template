"use client";

import { LatestGoogleKeywordResultsDto } from "@/src/interface-adapters/presenters/latest-google-keyword-results.presenter";

import KeywordRowActionsDropdown from "./KeywordRowActions";

import { ColumnDef, Row, SortingFn } from "@tanstack/react-table";
import { DateRowCell, StandardHeaderCell, StandardRowCell, TrendingIndicatorRowCell, UrlRowCell } from "@/app/_components/ui/table";

import { Checkbox } from "@/app/_components/ui/checkbox";


const urlSortingFn: SortingFn<LatestGoogleKeywordResultsDto> = (
  rowA: Row<LatestGoogleKeywordResultsDto>,
  rowB: Row<LatestGoogleKeywordResultsDto>,
  columnId,
) => {
  const valueA = (rowA.getValue(columnId) as string) || "";
  const valueB = (rowB.getValue(columnId) as string) || "";

  if (valueA && !valueB) return -1;
  if (!valueA && valueB) return 1;
  return valueA.localeCompare(valueB);
};

const positionSortingFn: SortingFn<LatestGoogleKeywordResultsDto> = (
  rowA: Row<LatestGoogleKeywordResultsDto>,
  rowB: Row<LatestGoogleKeywordResultsDto>,
  columnId,
) => {
  const valueA = (rowA.getValue(columnId) as number) || null;
  const valueB = (rowB.getValue(columnId) as number) || null;

  if (valueA === null && valueB !== null) return 1;
  if (valueB === null && valueA !== null) return -1;
  if (valueA === null && valueB === null) return 0;

  // Add a null check for valueA and valueB before subtraction
  if (valueA !== null && valueB !== null) {
    return valueA - valueB;
  } else {
    // Decide what to return when either valueA or valueB is null
    return 0;
  }
};

export const columns = (domainUrl?: string): ColumnDef<LatestGoogleKeywordResultsDto>[] => [
  // * Select column
  {
    id: "select",
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="rounded-[4px] border-[1.5px] theme-b-p"
      />
    ),
    cell: ({ row }) => (
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="rounded-[4px] border-[1.5px] theme-b-p"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // * Name
  {
    accessorKey: "keywordName",
    id: "keywordName",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Keyword" />
    ),
    cell: ({ row: { original: { keywordName } } }) => (
      <StandardRowCell value={keywordName} highlight={true} />
    ),
  },
  // * Url
  {
    accessorKey: "url",
    id: "url",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Url" />
    ),
    cell: ({ row: {original: {url}} }) => (
      <UrlRowCell value={url} domainUrl={domainUrl} />
    ),
    sortingFn: urlSortingFn,
  },
  // * Position
  {
    accessorKey: "position",
    id: "position",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Pos" />
    ),
    cell: ({ row: { original: { position } } }) => (
      <StandardRowCell value={position} highlight={true} />
    ),
    sortingFn: positionSortingFn,
  },
  // * First Position
  {
    accessorKey: "firstPosition",
    id: "firstPosition",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="First" />
    ),
    cell: ({ row: { original: { firstPosition } } }) => (
      <StandardRowCell value={firstPosition} />
    ),
    sortingFn: positionSortingFn,
  },
  // * Best Position
  {
    accessorKey: "bestPosition",
    id: "bestPosition",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Best" />
    ),
    cell: ({ row: { original: { bestPosition } } }) => (
      <StandardRowCell value={bestPosition} />
    ),
    sortingFn: positionSortingFn,
  },
  // * Latest Change
  {
    accessorKey: "latestChange",
    id: "latestChange",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Change" />
    ),
    cell: ({ row: { original: { latestChange } } }) => (
      <TrendingIndicatorRowCell value={latestChange} />
    ),
    sortingFn: positionSortingFn,
  },
  // * Avg Monthly Searches
  {
    accessorKey: "avgMonthlySearches",
    id: "avgMonthlySearches",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Volume" />
    ),
    cell: ({ row: { original: {avgMonthlySearches} } }) => (
      <StandardRowCell value={avgMonthlySearches} />
    ),
    sortingFn: positionSortingFn,
  },
  // * Tags
  {
    accessorKey: "tags",
    id: "tags",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Tags" />
    ),
    cell: ({ row: { original: { tags } } }) => (
      <div className="flex flex-wrap gap-2 max-w-[200px]">
        {
          tags.map((tag) => (
            // TODO: design van tags pill
            <p key={tag.id} className="text-xs bg-white dark:bg-dark-bg-light text-gray-600 dark:text-dark-text-dark px-2 py-1 rounded-full text-nowrap">
              {tag.name}
            </p>
          ))
        }
      </div>
    ),
  },
  // * Competition
  {
    accessorKey: "competition",
    id: "competition",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Comp" />
    ),
    cell: ({ row: { original: {competition} } }) => (
      <StandardRowCell value={competition} />
    ),
  },
  // * Competition Index
  {
    accessorKey: "competitionIndex",
    id: "competitionIndex",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Comp Index" />
    ),
    cell: ({ row: { original: {competitionIndex} } }) => (
      <StandardRowCell value={competitionIndex} />
    ),
  },
  // * High Top Of Page Bid
  {
    accessorKey: "highTopOfBidPage",
    id: "highTopOfBidPage",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="HTOPB" />
    ),
    cell: ({ row: { original: {highTopOfPageBid} } }) => (
      <StandardRowCell value={highTopOfPageBid} />
    ),
    sortingFn: positionSortingFn,
  },
  // * Low Top Of Page Bid
  {
    accessorKey: "lowTopOfBidPage",
    id: "lowTopOfBidPage",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="LTOPB" />
    ),
    cell: ({ row: { original: {lowTopOfPageBid} } }) => (
      <StandardRowCell value={lowTopOfPageBid} />
    ),
    sortingFn: positionSortingFn,
  },
  // * Date Retrieved
  {
    accessorKey: "createdAt",
    id: "createdAt",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Updated" />
    ),
    cell: ({ row: { original: {createdAt}} }) => (
      <DateRowCell value={createdAt} />
    )
  },
  // * Actions
  {
    accessorKey: "actions",
    id: "actions",
    header: ({ column }) => (
      <p className="text-sm leading-5 font-medium theme-t-n">Actions</p>
    ),
    cell: ({ row }) => {
      const result = row.original;
      return <KeywordRowActionsDropdown result={result} />;
    },
  },
];
