'use client';

import { Table } from "@tanstack/react-table";

import { InputFieldAppWithIcon } from '@/app/_modules/settings/components/form'
import ResultBulkActions from "./ResultBulkActions";
import ResultBulkDelete from "./ResultBulkDelete";
import ResultTagSelection from "./ResultTagSelection";
import ResultTableActions from "./ResultTableActions";


import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface TopBarProps<TData> {
  table: Table<TData>;
  data: TData[];
  deselectAllRows: () => void;
}

function ResultsDataTableTopBar<TData>({
  table,
  data,
  deselectAllRows
}: TopBarProps<TData>) {
  return (
    <div className="flex items-center ">
      {/* Search bar */}
      <InputFieldAppWithIcon
        placeholder="Search by keyword name..."
        value={
          (table.getColumn("keywordName")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("keywordName")?.setFilterValue(event.target.value)
        }
        Icon={MagnifyingGlassIcon}
      />

      {/* Bulk actions */}
      {table.getSelectedRowModel().rows.length > 0 && (
        <div className="flex items-center">
          <ResultBulkActions table={table} deselectAllRows={deselectAllRows} />
          <ResultBulkDelete selectedRows={table.getSelectedRowModel()} onActionFinished={deselectAllRows} />
        </div>
      )}

      {/* Tag selection */}
      <ResultTagSelection />

      {/* Table actions */}
      <ResultTableActions table={table} data={data} />
    </div>
  )
}

export default ResultsDataTableTopBar;