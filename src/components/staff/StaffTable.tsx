import { ResizableTable } from "@/components/shared/ResizableTable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Staff } from "@/types/staff";

interface StaffTableProps {
  staff: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (id: number) => void;
}

export const StaffTable = ({ staff, onEdit, onDelete }: StaffTableProps) => {
  const columns = [
    { key: "lastName", header: "Nom", width: 150 },
    { key: "firstName", header: "Prénom", width: 150 },
    { key: "service", header: "Service", width: 150 },
    { key: "position", header: "Poste", width: 150 },
    { key: "email", header: "Email", width: 200 },
    { key: "phone", header: "Téléphone", width: 150 },
    { key: "actions", header: "Actions", width: 100,
      render: (person: Staff) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(person)}
            className="hover:bg-blue-100"
          >
            <Pencil className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(person.id)}
            className="hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <ResizableTable
      columns={columns}
      data={staff}
      fileName="personnel"
    />
  );
};