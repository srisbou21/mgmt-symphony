import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Service } from "@/types/service";

interface ServiceTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
}

export const ServiceTable = ({ services, onEdit, onDelete }: ServiceTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom du service</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell className="font-medium">{service.name}</TableCell>
            <TableCell>{service.description || "-"}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(service)}
                className="hover:bg-blue-100"
              >
                <Pencil className="h-4 w-4 text-blue-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(service.id)}
                className="hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};