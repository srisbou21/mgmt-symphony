import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Printer, FileDown } from "lucide-react";
import { Equipment } from "@/types/equipment";
import { EquipmentPrintView } from "./EquipmentPrintView";
import { exportToExcel } from "@/utils/excelExport";

interface EquipmentTableProps {
  equipments: Equipment[];
  onEdit: (equipment: Equipment) => void;
  onDelete: (id: number) => void;
}

export const EquipmentTable = ({ equipments, onEdit, onDelete }: EquipmentTableProps) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Liste des Équipements</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body>
            <div id="print-content">
              ${document.getElementById('equipment-print-view')?.innerHTML}
            </div>
            <script>
              window.onload = () => window.print();
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleExportExcel = () => {
    const dataToExport = equipments.map(equipment => ({
      Nom: equipment.name,
      Type: equipment.type,
      'Numéros de série': equipment.serialNumbers.map(sn => sn.number).join(', '),
      'Numéros d\'inventaire': equipment.serialNumbers.map(sn => sn.inventoryNumber).join(', '),
      Statut: equipment.status,
      Emplacement: equipment.location,
      Service: equipment.service,
      'Quantité disponible': equipment.availableQuantity,
      'Quantité minimale': equipment.minQuantity,
      Observation: equipment.observation || '',
      Fournisseur: equipment.supplier || '',
      'Dernière maintenance': equipment.lastMaintenance || ''
    }));
    
    exportToExcel(dataToExport, 'equipements');
  };

  return (
    <>
      <div className="flex justify-end mb-4 space-x-2">
        <Button onClick={handleExportExcel} variant="outline" className="gap-2">
          <FileDown className="h-4 w-4" />
          Exporter Excel
        </Button>
        <Button onClick={handlePrint} variant="outline" className="gap-2">
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
            <TableHead>Statut</TableHead>
            <TableHead>Emplacement</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Qté Dispo</TableHead>
            <TableHead>Qté Min</TableHead>
            <TableHead>Observation</TableHead>
            <TableHead>Fournisseur</TableHead>
            <TableHead>Dernière maintenance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipments.map((equipment) => {
            const defaultSerialNumber = equipment.serialNumbers[0];
            return (
              <TableRow key={equipment.id}>
                <TableCell className="font-medium">{equipment.name}</TableCell>
                <TableCell>{equipment.type}</TableCell>
                <TableCell>{equipment.serialNumbers.map(sn => sn.number).join(', ')}</TableCell>
                <TableCell>{equipment.serialNumbers.map(sn => sn.inventoryNumber).join(', ')}</TableCell>
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
                <TableCell>{equipment.service}</TableCell>
                <TableCell>{equipment.availableQuantity}</TableCell>
                <TableCell>{equipment.minQuantity}</TableCell>
                <TableCell>{equipment.observation || "-"}</TableCell>
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
            );
          })}
        </TableBody>
      </Table>
      <div id="equipment-print-view" className="hidden">
        <EquipmentPrintView equipments={equipments} />
      </div>
    </>
  );
};