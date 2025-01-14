import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye } from "lucide-react";

interface Column {
  id: string;
  label: string;
  width?: number;
}

interface TableColumnToggleProps {
  columns: Column[];
  visibleColumns: string[];
  onToggleColumn: (columnId: string) => void;
  onColumnResize?: (columnId: string, width: number) => void;
}

export function TableColumnToggle({
  columns,
  visibleColumns,
  onToggleColumn,
  onColumnResize,
}: TableColumnToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <Eye className="mr-2 h-4 w-4" />
          Colonnes visibles
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Visibilité des colonnes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={visibleColumns.includes(column.id)}
            onCheckedChange={() => onToggleColumn(column.id)}
          >
            {column.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}