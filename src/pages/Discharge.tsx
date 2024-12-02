import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Equipment } from "@/types/equipment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Discharge = () => {
  const { toast } = useToast();
  const [dischargedEquipments, setDischargedEquipments] = useState<Equipment[]>([
    {
      id: 1,
      name: "Ordinateur portable Dell XPS",
      type: "Informatique",
      status: "Déchargé",
      location: "Bureau 201",
      supplier: "Dell",
      serialNumber: "XPS-2024-001",
      inventoryNumber: "INV-2024-001",
      observation: "RAS",
      availableQuantity: 0,
      minQuantity: 0,
    },
    {
      id: 2,
      name: "Imprimante HP LaserJet",
      type: "Informatique",
      status: "Déchargé",
      location: "Salle de reprographie",
      supplier: "HP",
      serialNumber: "HP-2024-001",
      inventoryNumber: "INV-2024-002",
      observation: "",
      availableQuantity: 0,
      minQuantity: 0,
    },
  ]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Inventaire des Décharges</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body>
            <div class="p-8">
              <h1 class="text-2xl font-bold mb-6">Inventaire des Décharges</h1>
              <table class="w-full border-collapse">
                <thead>
                  <tr>
                    <th class="border p-2">Nom</th>
                    <th class="border p-2">Type</th>
                    <th class="border p-2">N° Série</th>
                    <th class="border p-2">N° Inventaire</th>
                    <th class="border p-2">Emplacement</th>
                  </tr>
                </thead>
                <tbody>
                  ${dischargedEquipments.map(equipment => `
                    <tr>
                      <td class="border p-2">${equipment.name}</td>
                      <td class="border p-2">${equipment.type}</td>
                      <td class="border p-2">${equipment.serialNumber}</td>
                      <td class="border p-2">${equipment.inventoryNumber}</td>
                      <td class="border p-2">${equipment.location}</td>
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
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-4">
            <Package className="w-4 h-4 mr-2" />
            Décharges de Matériel
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-dmg-dark">
              Décharges
            </h1>
            <Button onClick={() => {}} className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une décharge
            </Button>
            <Button onClick={handlePrint} variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              Imprimer
            </Button>
          </div>
          <p className="text-dmg-muted text-lg mb-6">
            Gérez les décharges de vos équipements
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {dischargedEquipments.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell className="font-medium">{equipment.name}</TableCell>
                  <TableCell>{equipment.type}</TableCell>
                  <TableCell>{equipment.serialNumber}</TableCell>
                  <TableCell>{equipment.inventoryNumber}</TableCell>
                  <TableCell>{equipment.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </div>
  );
};

export default Discharge;
