import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Equipment } from "@/types/equipment";
import { Discharge } from "@/types/discharge";
import { format } from "date-fns";

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
            <TableHead>État</TableHead>
            <TableHead>Date décharge</TableHead>
            <TableHead>Date restitution</TableHead>
            <TableHead>Équipements</TableHead>
            <TableHead>Destination</TableHead>
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
                  dischargeNumber: Math.floor(Math.random() * 10000),
                  staffId: 1,
                  status: "Acquisition",
                  dischargeDate: new Date().toISOString(),
                  items: [{
                    equipmentId: equipment.id,
                    quantity: 1,
                    serialNumber: equipment.serialNumber,
                    inventoryNumber: equipment.inventoryNumber,
                  }],
                });
              }}
            >
              <TableCell className="font-medium">Acquisition</TableCell>
              <TableCell>{format(new Date(), "dd/MM/yyyy")}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>{equipment.name}</TableCell>
              <TableCell>{equipment.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};