
"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { GripVertical } from "lucide-react";

import type { Task } from "@/types";
import { Badge } from "@/components/ui/badge";
import { DraggableRow } from "@/components/dashboard/tasks/draggable-row";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import { Checkbox } from "@/components/ui/checkbox";

const defaultTasks: Task[] = [
  { id: "task-1", title: "Setup project repository", status: "done", priority: "high" },
  { id: "task-2", title: "Develop login page UI", status: "in-progress", priority: "high" },
  { id: "task-3", title: "Integrate authentication", status: "in-progress", priority: "medium" },
  { id: "task-4", title: "Create dashboard layout", status: "todo", priority: "medium" },
  { id: "task-5", title: "Implement pass purchase flow", status: "todo", priority: "low" },
  { id: "task-6", title: "Design QR code display", status: "todo", priority: "low" },
  { id: "task-7", title: "Add form validation", status: "done", priority: "high" },
  { id: "task-8", title: "Implement dark mode", status: "in-progress", priority: "medium" },
  { id: "task-9", title: "Setup database schema", status: "todo", priority: "high" },
  { id: "task-10", title: "Deploy to staging", status: "todo", priority: "low" },
];

export function DraggableDataTable() {
  const [data, setData] = useState(defaultTasks);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);


  const columns: ColumnDef<Task>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
    id: "drag-handle",
    header: () => null,
    cell: ({row}) => (
      row.getIsSelected() ? null :
      <button className="cursor-grab">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as Task["status"];
      const variant = {
        done: "default",
        "in-progress": "secondary",
        todo: "outline",
      }[status] as "default" | "secondary" | "outline";
      return <Badge variant={variant} className="capitalize">{status.replace('-', ' ')}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
        const priority = row.getValue("priority") as Task["priority"];
         const variant = {
            high: "destructive",
            medium: "secondary",
            low: "outline",
        }[priority]  as "default" | "destructive" | "secondary" | "outline";
        return <Badge variant={variant} className="capitalize">{priority}</Badge>;
    },
     filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
      <Card>
        <CardHeader>
          <CardTitle>Project Tasks</CardTitle>
          <CardDescription>
            A list of tasks for the project. Drag and drop to reorder.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <DataTableToolbar table={table} />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  <SortableContext
                    items={data.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                       <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                </TableBody>
              </Table>
            </div>
          </DndContext>
          <DataTablePagination table={table} />
        </CardContent>
      </Card>
  );
}
