"use client";

import React from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Button } from "../button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="mt-6 px-2 flex items-center justify-between  dark:text-dark-text-light">
      <div className="flex-1 max-w-[50%] text-xs text-muted-foreground ">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <div className="flex-1 flex items-center justify-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            variant='outline'
            className="hidden h-8 w-8 p-0 lg:flex rounded-md"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            variant='outline'
            className="h-8 w-8 p-0 flex rounded-md"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {/* Pagination */}
          <div className="flex w-fit px-2 items-center justify-center text-xs font-medium">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </div>

          <Button
            variant='outline'
            className="h-8 w-8 p-0 flex rounded-md"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant='outline'
            className="hidden h-8 w-8 p-0 lg:flex rounded-md"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Rows per page  */}
      <div className="flex-1 max-w-[50%] flex items-center space-x-2">
        {/* <p className="text-sm font-medium">Rows per page</p> */}
        <Select
          className="ml-auto"
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px] heme-t-t hover:theme-t-s   bg-white dark:bg-base-950 border theme-b-p ring-base-100 dark:ring-theme-night-background-secondary ring-0 hover:ring-4 focus:ring-4   shadow-none">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top" className="w-[70px]">
            {[10, 20, 30, 40, 50, 100, 200, 300, 400, 500].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default DataTablePagination;