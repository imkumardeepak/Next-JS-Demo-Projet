
"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { GripVertical, MoreHorizontal, Pencil, PlusCircle, Trash2 } from "lucide-react";

import type { Task } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { TaskForm } from "@/components/dashboard/tasks/task-form";

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


export default function TasksPage() {
  const [tasks, setTasks] = React.useState(defaultTasks);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTask) {
        setTasks(tasks.filter(task => task.id !== selectedTask.id));
    }
    setIsDeleteAlertOpen(false);
    setSelectedTask(null);
  }

  const handleFormSubmit = (taskData: Omit<Task, 'id'>) => {
     if (selectedTask) {
        // Update existing task
        setTasks(tasks.map(task => task.id === selectedTask.id ? { ...task, ...taskData } : task));
     } else {
        // Add new task
        const newTask: Task = {
            id: `task-${tasks.length + 1}`,
            ...taskData
        };
        setTasks([...tasks, newTask]);
     }
     setIsFormOpen(false);
     setSelectedTask(null);
  };
  
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
        done: "success",
        "in-progress": "secondary",
        todo: "outline",
      }[status] as "success" | "secondary" | "outline";
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
            medium: "warning",
            low: "outline",
        }[priority]  as "destructive" | "warning" | "outline";
        return <Badge variant={variant} className="capitalize">{priority}</Badge>;
    },
     filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEditTask(task)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteTask(task)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

  return (
    <>
      <div className="flex flex-col gap-4">
          <DataTable
              data={tasks}
              setData={setTasks}
              columns={columns}
              pageTitle="Project Tasks"
              pageDescription="A list of tasks for the project. Drag and drop to reorder."
              searchColumn="title"
          >
             <Button size="sm" className="h-8" onClick={handleAddTask}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Task
              </Button>
          </DataTable>
      </div>

       <TaskForm 
          isOpen={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleFormSubmit}
          task={selectedTask}
       />
      
       <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the task.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setSelectedTask(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
       </AlertDialog>
    </>
  );
}
