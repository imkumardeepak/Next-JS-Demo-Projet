import { DraggableDataTable } from "@/components/dashboard/tasks/draggable-data-table";

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-4">
      <DraggableDataTable />
    </div>
  );
}
