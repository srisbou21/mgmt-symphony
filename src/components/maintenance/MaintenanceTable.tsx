import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Equipment } from "@/types/equipment";

interface MaintenanceTableProps {
  equipments: Equipment[];
  onDelete: (equipment: Equipment) => void;
  onEdit: (equipment: Equipment) => void;
}

export function MaintenanceTable({ equipments, onDelete, onEdit }: MaintenanceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>N° Série</TableHead>
          <TableHead>N° Inventaire</TableHead>
          <TableHead>Emplacement</TableHead>
          <TableHead>Date début</TableHead>
          <TableHead>Date fin prévue</TableHead>
          <TableHead>Raison</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equipments.map((equipment) => (
          <TableRow key={equipment.id}>
            <TableCell className="font-medium">{equipment.name}</TableCell>
            <TableCell>{equipment.type}</TableCell>
            <TableCell>{equipment.serialNumber}</TableCell>
            <TableCell>{equipment.inventoryNumber}</TableCell>
            <TableCell>{equipment.location}</TableCell>
            <TableCell>{equipment.maintenanceStartDate || '-'}</TableCell>
            <TableCell>{equipment.maintenanceEndDate || '-'}</TableCell>
            <TableCell>{equipment.maintenanceReason || '-'}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(equipment)}
                className="hover:bg-blue-100"
              >
                <Pencil className="h-4 w-4 text-blue-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(equipment)}
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
}