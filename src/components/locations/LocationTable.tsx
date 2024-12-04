import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Printer } from "lucide-react";
import { Location } from "@/types/equipment";
import { PrintView, handlePrint } from "@/components/shared/PrintView";

interface LocationTableProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (id: number) => void;
}

export const LocationTable = ({ locations, onEdit, onDelete }: LocationTableProps) => {
  const handlePrintClick = () => {
    const columns = [
      { header: "Nom", accessor: "name" },
      { header: "Description", accessor: "description" },
      { header: "Bâtiment", accessor: "building" },
      { header: "Étage", accessor: "floor" },
    ];

    const printContent = (
      <PrintView
        title="Liste des Emplacements"
        data={locations}
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
            <TableHead>Description</TableHead>
            <TableHead>Bâtiment</TableHead>
            <TableHead>Étage</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow key={location.id}>
              <TableCell className="font-medium">{location.name}</TableCell>
              <TableCell>{location.description || "-"}</TableCell>
              <TableCell>{location.building || "-"}</TableCell>
              <TableCell>{location.floor || "-"}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(location)}
                  className="hover:bg-blue-100"
                >
                  <Pencil className="h-4 w-4 text-blue-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(location.id)}
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
};