import { ResizableTable } from "@/components/shared/ResizableTable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, FileText } from "lucide-react";
import type { Supplier } from "@/types/supplier";

export type { Supplier };  // Re-export the Supplier type

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

export const SupplierTable = ({ suppliers, onEdit, onDelete }: SupplierTableProps) => {
  const columns = [
    { key: "name", header: "Nom", width: 200 },
    { key: "contact", header: "Contact", width: 150 },
    { key: "email", header: "Email", width: 200 },
    { key: "phone", header: "Téléphone", width: 150 },
    { key: "address", header: "Adresse", width: 200 },
    { key: "commercialRegister", header: "Registre de commerce", width: 150,
      render: (supplier: Supplier) => supplier.commercialRegister ? (
        <a
          href={supplier.commercialRegister}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <FileText className="h-4 w-4 mr-1" />
          Voir le document
        </a>
      ) : (
        <span className="text-gray-400">Non fourni</span>
      )
    },
    { key: "actions", header: "Actions", width: 100,
      render: (supplier: Supplier) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(supplier)}
            className="hover:bg-blue-100"
          >
            <Pencil className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(supplier.id)}
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
      data={suppliers}
      fileName="fournisseurs"
    />
  );
};