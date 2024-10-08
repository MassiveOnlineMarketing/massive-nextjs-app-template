'use client';

import React from 'react'
import { Table } from '@tanstack/react-table';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/app/_components/ui/dropdown-menu";

import {
  ArrowDownTrayIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";

import downloadKeywordsToExcel from '@/app/_lib/xlsx';

import { PlusIcon } from "@heroicons/react/20/solid";
import ResultAddKeywordsModal from './ResultAddKeywordsModal';

function ResultTableActions<TData>({ table, data }: { table: Table<TData>, data: TData[] }) {
  return (
    <div className='h-10 ml-4 rounded-[8px] border theme-b-p flex '>
      <TooltipProvider delayDuration={0}>
        {/* Add keyword */}
        <Tooltip>
          <TooltipTrigger >
            <ResultAddKeywordsModal className='px-4 py-[10px]'>
              <PlusIcon className="w-5 h-5 theme-t-t group-hover:text-green-500" />
            </ResultAddKeywordsModal>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Keyword</p>
          </TooltipContent>
        </Tooltip>

        <Divider />

        {/* Download to Excel */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="px-4 py-[10px]"
              onClick={() => downloadKeywordsToExcel(data)}
            >
              <ArrowDownTrayIcon className="w-5 h-5 theme-t-t" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download Excel</p>
          </TooltipContent>
        </Tooltip>

        <Divider />

        {/* Toggle visable colums */}
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenu>
              <DropdownMenuTrigger asChild >
                <div className="px-4 py-[10px]">
                  <ViewColumnsIcon className="w-5 h-5 theme-t-t" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent>
            <p>Show Columns</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

const Divider = () => {
  return <div className="h-5 w-[1px] my-[10px] bg-theme-light-stroke dark:bg-theme-night-stroke"></div>
}

export default ResultTableActions