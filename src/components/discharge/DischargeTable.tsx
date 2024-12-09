import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Equipment } from "@/types/equipment";
import { Discharge } from "@/types/discharge";
import { format } from "date-fns";

interface DischargeTableProps {
  equipments: Equipment[];
  onDischargeSelect: (discharge: Discharge) => void;
  onEdit?: (discharge: Discharge) => void;
  onDelete?: (id: number) => void;
}

export const DischargeTable = ({ 
  equipments, 
  onDischargeSelect,
  onEdit,
  onDelete 
}: DischargeTableProps) => {
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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipments.map((equipment) => {
            const discharge: Discharge = {
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
            };

            return (
              <TableRow 
                key={equipment.id} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onDischargeSelect(discharge)}
              >
                <TableCell className="font-medium">Acquisition</TableCell>
                <TableCell>{format(new Date(), "dd/MM/yyyy")}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{equipment.name}</TableCell>
                <TableCell>{equipment.location}</TableCell>
                <TableCell className="text-right space-x-2">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(discharge);
                      }}
                      className="hover:bg-blue-100"
                    >
                      <Pencil className="h-4 w-4 text-blue-600" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(equipment.id);
                      }}
                      className="hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};