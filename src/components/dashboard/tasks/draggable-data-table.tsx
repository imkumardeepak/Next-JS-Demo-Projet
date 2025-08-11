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
  type ColumnDef,
} from "@tanstack/react-table";
import { GripVertical } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

const defaultTasks: Task[] = [
  { id: "task-1", title: "Setup project repository", status: "done", priority: "high" },
  { id: "task-2", title: "Develop login page UI", status: "in-progress", priority: "high" },
  { id: "task-3", title: "Integrate authentication", status: "in-progress", priority: "medium" },
  { id: "task-4", title: "Create dashboard layout", status: "todo", priority: "medium" },
  { id: "task-5", title: "Implement pass purchase flow", status: "todo", priority: "low" },
  { id: "task-6", title: "Design QR code display", status: "todo", priority: "low" },
];

const columns: ColumnDef<Task>[] = [
  {
    id: "drag-handle",
    header: () => null,
    cell: () => (
      <button className="cursor-grab">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Task["status"];
      const variant = {
        done: "default",
        "in-progress": "secondary",
        todo: "outline",
      }[status] as "default" | "secondary" | "outline";
      return <Badge variant={variant} className="capitalize">{status.replace('-', ' ')}</Badge>;
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
        const priority = row.getValue("priority") as Task["priority"];
         const variant = {
            high: "destructive",
            medium: "secondary",
            low: "outline",
        }[priority]  as "default" | "destructive" | "secondary" | "outline";
        return <Badge variant={variant} className="capitalize">{priority}</Badge>;
    }
  },
];

export function DraggableDataTable() {
  const [data, setData] = useState(defaultTasks);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
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
    <DndProvider backend={HTML5Backend}>
      <Card>
        <CardHeader>
          <CardTitle>Project Tasks</CardTitle>
          <CardDescription>
            A list of tasks for the project. Drag and drop to reorder.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
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
        </CardContent>
      </Card>
    </DndProvider>
  );
}
