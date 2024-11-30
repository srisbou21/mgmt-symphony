import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Equipment = {
  id: number;
  name: string;
  type: string;
  status: string;
  location: string;
  lastMaintenance: string;
};

interface EquipmentTableProps {
  equipments: Equipment[];
}

export const EquipmentTable = ({ equipments }: EquipmentTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Emplacement</TableHead>
          <TableHead>Dernière maintenance</TableHead>
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
            <TableCell>{equipment.lastMaintenance}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};