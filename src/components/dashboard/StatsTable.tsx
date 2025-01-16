import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EquipmentTypeValue } from "@/types/equipment";

interface EquipmentTypeStats {
  type: EquipmentTypeValue;
  count: string;
}

interface StatsTableProps {
  typeStats: EquipmentTypeStats[];
}

export const StatsTable = ({ typeStats }: StatsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type d'équipement</TableHead>
          <TableHead>Nombre total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {typeStats.map((stat, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{stat.type}</TableCell>
            <TableCell>{stat.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};