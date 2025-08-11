
"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, type Row } from "@tanstack/react-table";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DraggableRowProps<TData extends {id: string}> {
  row: Row<TData>;
}

export function DraggableRow<TData extends {id: string}>({ row }: DraggableRowProps<TData>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.original.id, disabled: row.getIsSelected() });

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
        return (
          <TableCell key={cell.id}>
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
