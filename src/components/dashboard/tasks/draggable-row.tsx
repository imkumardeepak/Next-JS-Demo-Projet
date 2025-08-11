"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, type Row } from "@tanstack/react-table";
import type { Task } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DraggableRowProps {
  row: Row<Task>;
}

export function DraggableRow({ row }: DraggableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.original.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative'
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "bg-accent")}
      data-state={row.getIsSelected() && "selected"}
    >
      {row.getVisibleCells().map((cell) => {
        const isHiddenOnMobile = ["status", "priority"].includes(cell.column.id);
        return (
          <TableCell key={cell.id} className={isHiddenOnMobile ? "hidden sm:table-cell" : ""}>
            {cell.column.id === "drag-handle" ? (
               <span {...attributes} {...listeners}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
               </span>
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
