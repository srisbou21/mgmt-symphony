import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Printer } from "lucide-react";
import { Equipment } from "@/types/equipment";
import { PrintView, handlePrint } from "@/components/shared/PrintView";

interface MaintenanceTableProps {
  equipments: Equipment[];
  onDelete: (equipment: Equipment) => void;
  onEdit: (equipment: Equipment) => void;
}

export function MaintenanceTable({ equipments, onDelete, onEdit }: MaintenanceTableProps) {
  const handlePrintClick = () => {
    const columns = [
      { header: "Nom", accessor: "name" },
      { header: "Type", accessor: "type" },
      { header: "N° Série", accessor: "serialNumbers" },
      { header: "N° Inventaire", accessor: "serialNumbers" },
      { header: "Emplacement", accessor: "location" },
      { header: "Date début", accessor: "maintenanceStartDate" },
      { header: "Date fin prévue", accessor: "maintenanceEndDate" },
      { header: "Raison", accessor: "maintenanceReason" },
    ];

    const printContent = (
      <PrintView
        title="Liste des Équipements en Maintenance"
        data={equipments}
        columns={columns}
      />
    );

    handlePrint(printContent);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrintClick}
          className="gap-2"
        >
          <Printer className="h-4 w-4" />
          Imprimer
        </Button>
      </div>

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
              <TableCell>{equipment.serialNumbers.map(sn => sn.number).join(', ')}</TableCell>
              <TableCell>{equipment.serialNumbers.map(sn => sn.inventoryNumber).join(', ')}</TableCell>
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
    </div>
  );
}