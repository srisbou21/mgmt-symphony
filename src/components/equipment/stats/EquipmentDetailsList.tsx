import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EquipmentTypeStats } from "@/types/equipment";

interface EquipmentDetailsListProps {
  stats: EquipmentTypeStats[];
}

export function EquipmentDetailsList({ stats }: EquipmentDetailsListProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Détails par type</h2>
      <div className="overflow-auto max-h-[400px]">
        {stats.map((stat) => (
          <div key={stat.type} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{stat.type}</h3>
              <span className="text-sm text-gray-600">Total: {stat.count}</span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Emplacement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stat.equipments.map((equipment) => (
                  <TableRow key={equipment.id}>
                    <TableCell>{equipment.name}</TableCell>
                    <TableCell>{equipment.availableQuantity}</TableCell>
                    <TableCell>{equipment.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </Card>
  );
}