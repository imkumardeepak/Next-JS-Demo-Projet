
"use client";

import type { Table } from "@tanstack/react-table";
import { PlusCircle, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumn: string;
  addLabel?: string;
  onAddClick?: () => void;
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  addLabel,
  onAddClick,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter by ${searchColumn}...`}
          value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
        {addLabel && onAddClick && (
            <Button size="sm" className="h-8" onClick={onAddClick}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {addLabel}
            </Button>
        )}
      </div>
    </div>
  );
}
