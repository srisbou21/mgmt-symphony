import { ResizableTable } from "@/components/shared/ResizableTable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Equipment } from "@/types/equipment";

interface EquipmentTableProps {
  equipments: Equipment[];
  onEdit: (equipment: Equipment) => void;
  onDelete: (id: number) => void;
}

export const EquipmentTable = ({ equipments, onEdit, onDelete }: EquipmentTableProps) => {
  const columns = [
    { key: "name", header: "Nom", width: 200 },
    { key: "type", header: "Type", width: 150 },
    { key: "serialNumbers", header: "N° Série", width: 150, 
      render: (equipment: Equipment) => equipment.serialNumbers.map(sn => sn.number).join(', ') },
    { key: "status", header: "Statut", width: 120,
      render: (equipment: Equipment) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          equipment.status === "En service"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {equipment.status}
        </span>
      )
    },
    { key: "location", header: "Emplacement", width: 150 },
    { key: "service", header: "Service", width: 150 },
    { key: "availableQuantity", header: "Qté Dispo", width: 100 },
    { key: "actions", header: "Actions", width: 100,
      render: (equipment: Equipment) => (
        <div className="flex space-x-2">
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
        </div>
      )
    }
  ];

  return (
    <ResizableTable
      columns={columns}
      data={equipments}
      fileName="equipements"
    />
  );
};