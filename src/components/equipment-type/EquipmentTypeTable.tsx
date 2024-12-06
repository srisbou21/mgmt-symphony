import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { EquipmentType } from "@/types/equipment";

interface EquipmentTypeTableProps {
  equipmentTypes: EquipmentType[];
  onEdit: (type: EquipmentType) => void;
  onDelete: (id: number) => void;
}

export const EquipmentTypeTable = ({ equipmentTypes, onEdit, onDelete }: EquipmentTypeTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom du type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equipmentTypes.map((type) => (
          <TableRow key={type.id}>
            <TableCell className="font-medium">{type.name}</TableCell>
            <TableCell>{type.description || "-"}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(type)}
                className="hover:bg-blue-100"
              >
                <Pencil className="h-4 w-4 text-blue-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(type.id)}
                className="hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};