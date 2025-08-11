
"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";

import type { Task } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

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


export default function TasksPage() {
  const [tasks, setTasks] = React.useState(defaultTasks);

  const handleAddTask = () => {
    // In a real app, you'd likely open a dialog/modal to create a new task.
    console.log("Add new task button clicked!");
    const newTask: Task = {
        id: `task-${tasks.length + 1}`,
        title: "New Task",
        status: "todo",
        priority: "low",
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <div className="flex flex-col gap-4">
        <DataTable
            data={tasks}
            setData={setTasks}
            columns={columns}
            pageTitle="Project Tasks"
            pageDescription="A list of tasks for the project. Drag and drop to reorder."
            searchColumn="title"
            addLabel="Add Task"
            onAddClick={handleAddTask}
        />
    </div>
  );
}
