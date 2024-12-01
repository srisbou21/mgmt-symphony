import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Printer } from "lucide-react";
import { Staff } from "@/types/staff";

interface StaffTableProps {
  staff: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (id: number) => void;
}

export const StaffTable = ({ staff, onEdit, onDelete }: StaffTableProps) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const styles = `
      <style>
        table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f5f5f5; }
        .print-header { margin-bottom: 20px; }
        .signature { text-align: right; margin-top: 50px; }
        @media print {
          body { font-size: 12px; }
        }
      </style>
    `;

    const tableHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Liste du Personnel</title>
          ${styles}
        </head>
        <body>
          <div class="print-header">
            <h1>Liste du Personnel</h1>
            <p>Date d'impression: ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Service</th>
                <th>Poste</th>
                <th>Email</th>
                <th>Téléphone</th>
              </tr>
            </thead>
            <tbody>
              ${staff.map(person => `
                <tr>
                  <td>${person.lastName}</td>
                  <td>${person.firstName}</td>
                  <td>${person.service}</td>
                  <td>${person.position}</td>
                  <td>${person.email}</td>
                  <td>${person.phone}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="signature">
            <p>Signature: _________________</p>
          </div>
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
            <TableHead>Prénom</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.lastName}</TableCell>
              <TableCell>{person.firstName}</TableCell>
              <TableCell>{person.service}</TableCell>
              <TableCell>{person.position}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.phone}</TableCell>
              <TableCell className="text-right space-x-2">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};