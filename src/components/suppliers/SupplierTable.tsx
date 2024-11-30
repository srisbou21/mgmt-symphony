import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, FileText, Printer } from "lucide-react";

export type Supplier = {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  commercialRegister?: string;
};

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

export const SupplierTable = ({ suppliers, onEdit, onDelete }: SupplierTableProps) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const styles = `
      <style>
        table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f5f5f5; }
        .print-header { margin-bottom: 20px; }
        .no-print { display: none; }
        @media print {
          body { font-size: 12px; }
        }
      </style>
    `;

    const tableHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Liste des Fournisseurs</title>
          ${styles}
        </head>
        <body>
          <div class="print-header">
            <h1>Liste des Fournisseurs</h1>
            <p>Date d'impression: ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Adresse</th>
              </tr>
            </thead>
            <tbody>
              ${suppliers.map(supplier => `
                <tr>
                  <td>${supplier.name}</td>
                  <td>${supplier.contact}</td>
                  <td>${supplier.email}</td>
                  <td>${supplier.phone}</td>
                  <td>${supplier.address}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
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
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Registre de commerce</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell className="font-medium">{supplier.name}</TableCell>
              <TableCell>{supplier.contact}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier.address}</TableCell>
              <TableCell>
                {supplier.commercialRegister ? (
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
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};