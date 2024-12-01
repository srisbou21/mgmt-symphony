import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Equipment } from "@/types/equipment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MaintenanceEquipment = () => {
  const { toast } = useToast();
  const [maintenanceEquipments, setMaintenanceEquipments] = useState<Equipment[]>([]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Liste des Équipements en Maintenance</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body>
            <div class="p-8">
              <h1 class="text-2xl font-bold mb-6">Liste des Équipements en Maintenance</h1>
              <table class="w-full border-collapse">
                <thead>
                  <tr>
                    <th class="border p-2">Nom</th>
                    <th class="border p-2">Type</th>
                    <th class="border p-2">N° Série</th>
                    <th class="border p-2">N° Inventaire</th>
                    <th class="border p-2">Emplacement</th>
                    <th class="border p-2">Date début maintenance</th>
                    <th class="border p-2">Observation</th>
                  </tr>
                </thead>
                <tbody>
                  ${maintenanceEquipments.map(equipment => `
                    <tr>
                      <td class="border p-2">${equipment.name}</td>
                      <td class="border p-2">${equipment.type}</td>
                      <td class="border p-2">${equipment.serialNumber}</td>
                      <td class="border p-2">${equipment.inventoryNumber}</td>
                      <td class="border p-2">${equipment.location}</td>
                      <td class="border p-2">${equipment.lastMaintenance}</td>
                      <td class="border p-2">${equipment.observation || '-'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
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
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-4">
            <Package className="w-4 h-4 mr-2" />
            Équipements en maintenance
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-dmg-dark">
              Maintenance
            </h1>
            <div className="space-x-4">
              <Button onClick={handlePrint} variant="outline" className="gap-2">
                <Printer className="w-4 h-4" />
                Imprimer
              </Button>
            </div>
          </div>
          <p className="text-dmg-muted text-lg mb-6">
            Gérez les équipements actuellement en maintenance
          </p>
        </header>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>N° Série</TableHead>
                <TableHead>N° Inventaire</TableHead>
                <TableHead>Emplacement</TableHead>
                <TableHead>Date début maintenance</TableHead>
                <TableHead>Observation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceEquipments.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell className="font-medium">{equipment.name}</TableCell>
                  <TableCell>{equipment.type}</TableCell>
                  <TableCell>{equipment.serialNumber}</TableCell>
                  <TableCell>{equipment.inventoryNumber}</TableCell>
                  <TableCell>{equipment.location}</TableCell>
                  <TableCell>{equipment.lastMaintenance}</TableCell>
                  <TableCell>{equipment.observation || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </div>
  );
};

export default MaintenanceEquipment;