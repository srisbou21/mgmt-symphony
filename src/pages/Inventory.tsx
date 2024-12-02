import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Equipment } from "@/types/equipment";

const Inventory = () => {
  const { toast } = useToast();
  const [inventoryItems, setInventoryItems] = useState<Equipment[]>([]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Inventaire des Emplacements</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body>
            <div class="p-8">
              <h1 class="text-2xl font-bold mb-6">Inventaire des Emplacements</h1>
              <table class="w-full border-collapse">
                <thead>
                  <tr>
                    <th class="border p-2">Nom</th>
                    <th class="border p-2">Type</th>
                    <th class="border p-2">Catégorie</th>
                    <th class="border p-2">N° Série</th>
                    <th class="border p-2">N° Inventaire</th>
                    <th class="border p-2">Emplacement</th>
                  </tr>
                </thead>
                <tbody>
                  ${inventoryItems.map(item => `
                    <tr>
                      <td class="border p-2">${item.name}</td>
                      <td class="border p-2">${item.type}</td>
                      <td class="border p-2">${item.category}</td>
                      <td class="border p-2">${item.serialNumber}</td>
                      <td class="border p-2">${item.inventoryNumber}</td>
                      <td class="border p-2">${item.location}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <div class="mt-8 text-right">
                <p>Signature :</p>
                <div class="mt-4 border-t border-gray-300 w-48 ml-auto"></div>
              </div>
            </div>
            <script>
              window.onload = () => window.print();
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Package className="w-4 h-4 mr-2" />
            Inventaire des Emplacements
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-dmg-dark">
              Inventaire
            </h1>
            <div className="space-x-4">
              <Button onClick={handlePrint} variant="outline" className="gap-2">
                <Printer className="w-4 h-4" />
                Imprimer
              </Button>
            </div>
          </div>
          <p className="text-dmg-muted text-lg mb-6">
            Gérez l'inventaire des emplacements
          </p>
        </header>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>N° Série</TableHead>
                <TableHead>N° Inventaire</TableHead>
                <TableHead>Emplacement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.serialNumber}</TableCell>
                  <TableCell>{item.inventoryNumber}</TableCell>
                  <TableCell>{item.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </div>
  );
};

export default Inventory;