import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type Equipment = {
  id: number;
  name: string;
  type: string;
  status: string;
  location: string;
  lastMaintenance: string;
  supplier?: string;
};

interface EquipmentTableProps {
  equipments: Equipment[];
  onEdit: (equipment: Equipment) => void;
  onDelete: (id: number) => void;
}

export const EquipmentTable = ({ equipments, onEdit, onDelete }: EquipmentTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Emplacement</TableHead>
          <TableHead>Fournisseur</TableHead>
          <TableHead>Dernière maintenance</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equipments.map((equipment) => (
          <TableRow key={equipment.id}>
            <TableCell className="font-medium">{equipment.name}</TableCell>
            <TableCell>{equipment.type}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  equipment.status === "En service"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {equipment.status}
              </span>
            </TableCell>
            <TableCell>{equipment.location}</TableCell>
            <TableCell>{equipment.supplier || "-"}</TableCell>
            <TableCell>{equipment.lastMaintenance}</TableCell>
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
                onClick={() => onDelete(equipment.id)}
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