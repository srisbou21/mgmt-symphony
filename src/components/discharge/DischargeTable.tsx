import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Equipment } from "@/types/equipment";
import { Discharge } from "@/types/discharge";

interface DischargeTableProps {
  equipments: Equipment[];
  onDischargeSelect: (discharge: Discharge) => void;
}

export const DischargeTable = ({ equipments, onDischargeSelect }: DischargeTableProps) => {
  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>N° Série</TableHead>
            <TableHead>N° Inventaire</TableHead>
            <TableHead>Emplacement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipments.map((equipment) => (
            <TableRow 
              key={equipment.id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => {
                onDischargeSelect({
                  id: equipment.id,
                  equipmentId: equipment.id,
                  staffId: 1,
                  type: "Équipement",
                  quantity: 1,
                  date: new Date().toISOString(),
                  serialNumber: equipment.serialNumber,
                  inventoryNumber: equipment.inventoryNumber,
                  category: "Matériel",
                });
              }}
            >
              <TableCell className="font-medium">{equipment.name}</TableCell>
              <TableCell>{equipment.type}</TableCell>
              <TableCell>{equipment.serialNumber}</TableCell>
              <TableCell>{equipment.inventoryNumber}</TableCell>
              <TableCell>{equipment.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};