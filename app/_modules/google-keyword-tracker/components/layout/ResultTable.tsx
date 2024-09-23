"use client";

import React, { useState } from "react";
import useColumnOrder from "@/app/_components/ui/table/useColumnOrder";

import { LatestGoogleKeywordResultsDto } from "@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller";

// Components
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/_components/ui/table/table";
import DataTablePagination from "@/app/_components/ui/table/table-pagination";

import ResultsDataTableTopBar from "../table/topbar/ResultsTableTopbar";
import { cn } from "@/app/_components/utils";




interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [rowSelection, setRowSelection] = useState({});

  //* Column order and sorting
  const { columnOrder, setColumnOrder, handleDragStart, handleDrop } = useColumnOrder(columns, 'keywordsTableColumnOrder');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    competition: false,
    competitionIndex: false,
    highTopOfBidPage: false,
    lowTopOfBidPage: false,
  });



  //* Result Details row
  const [selectedRowIndex, setSelectedRowIndex] = useState<string | null>(null);
  const [keywordData, setKeywordData] = useState<LatestGoogleKeywordResultsDto | null>(null);

  const handleClickRow =
    (id: string) => (event: React.MouseEvent<HTMLTableRowElement>) => {
      let index = parseInt(id, 10);

      if (selectedRowIndex === id) {
        setSelectedRowIndex(null);
        return;
      }

      setSelectedRowIndex((prevId) => (prevId === id ? null : id));

      if (!isNaN(index) && index >= 0 && index < data.length) {
        let item = data[index];
        // console.log(item); // Check what the object looks like
        setKeywordData(item as LatestGoogleKeywordResultsDto);
      } else {
        console.log("Invalid index");
      }
    };


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnOrderChange: setColumnOrder,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnOrder
    },
    initialState: {
      pagination: { pageIndex: 0, pageSize: 50 },
    },
    getPaginationRowModel: getPaginationRowModel(),
  });

  const numberOfVisibleColumns = table.getVisibleFlatColumns().length;

  return (

    <div className="pb-10 ">
      <div className="sticky top-[88px] pt-3 pb-6 bg-white dark:bg-base-950">
        <ResultsDataTableTopBar
          table={table}
          data={data}
          deselectAllRows={() => setRowSelection({})}
        />
      </div>

      {/* Keywords Table */}
      <div className="pb-20 ">
        {/* Dit naar Table */}
        <table className="w-full ">
          {/* Weg , overflow hidden*/}
          <TableHeader className="sticky top-[170px] z-20 w-full overflow-hidden   ">
            <tr className="absolute pointer-events-none w-full h-full border theme-b-p rounded-t-lg overflow-hidden z-50"></tr>
            <tr className="absolute pointer-events-none w-[101%] h-full bg-white z-10 -ml-1"></tr>


            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="overflow-hidden rounded-t-lg bg-base-50 dark:bg-base-950 z-40 relative" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, header.id)}
                      onDrop={(e) => handleDrop(e, header.id)}
                      onDragOver={(e) => e.preventDefault()}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 h-[54px]"
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="overflow-y-auto border-x border-b theme-b-p box-content">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    className={cn(
                      "theme-b-p hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 cursor-pointer",
                      selectedRowIndex === row.id ? "" : "border-b"
                    )}
                    // handle click row, open keyword detail
                    onClick={handleClickRow(row.id)}
                    data-state={selectedRowIndex === row.id ? "true" : "false"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* {row.id === selectedRowIndex && (
                    <tr>
                      {keywordData ? (
                        <td className="pt-6" colSpan={numberOfVisibleColumns}>
                          <KeywordDetailsRow
                            keywordData={keywordData}
                            googleSearchCampaign={googleSearchCampaign}
                          />
                        </td>
                      ) : (
                        <td colSpan={numberOfVisibleColumns}>Loading...</td>
                      )}
                    </tr>
                  )} */}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </table>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}




export default DataTable;
