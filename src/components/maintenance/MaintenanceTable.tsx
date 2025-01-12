import { ResizableTable } from "@/components/shared/ResizableTable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Equipment } from "@/types/equipment";
import { format } from "date-fns";

interface MaintenanceTableProps {
  equipments: Equipment[];
  onDelete: (equipment: Equipment) => void;
  onEdit: (equipment: Equipment) => void;
}

export function MaintenanceTable({ equipments, onDelete, onEdit }: MaintenanceTableProps) {
  const columns = [
    { key: "name", header: "Nom", width: 200 },
    { key: "type", header: "Type", width: 150 },
    { key: "serialNumbers", header: "N° Série", width: 150,
      render: (equipment: Equipment) => equipment.serialNumbers.map(sn => sn.number).join(', ') },
    { key: "location", header: "Emplacement", width: 150 },
    { key: "maintenanceStartDate", header: "Date début", width: 150,
      render: (equipment: Equipment) => equipment.maintenanceStartDate ? 
        format(new Date(equipment.maintenanceStartDate), "dd/MM/yyyy") : "-"
    },
    { key: "maintenanceEndDate", header: "Date fin prévue", width: 150,
      render: (equipment: Equipment) => equipment.maintenanceEndDate ? 
        format(new Date(equipment.maintenanceEndDate), "dd/MM/yyyy") : "-"
    },
    { key: "maintenanceReason", header: "Raison", width: 200 },
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
            onClick={() => onDelete(equipment)}
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
      fileName="maintenance"
    />
  );
}