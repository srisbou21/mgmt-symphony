import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Equipment, EquipmentCategory } from "@/types/equipment";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import { Location } from "@/types/equipment";
import { Discharge } from "@/types/discharge";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState<Equipment[]>([]);
  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: "Bureau 101", building: "Bâtiment A" },
    { id: 2, name: "Salle de réunion", building: "Bâtiment B" },
  ]);
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    category: "",
    type: "",
  });

  // Simulate loading discharge data
  useEffect(() => {
    const dischargeData: Discharge[] = [
      {
        id: 1,
        equipmentId: 1,
        staffId: 1,
        type: "Équipement",
        quantity: 1,
        dischargeDate: "2024-03-12",
        serialNumber: "SN001",
        inventoryNumber: "INV001",
        category: "Matériel",
        equipmentName: "Ordinateur portable",
        items: [],
        status: "Acquisition"
      },
    ];

    // Convert discharge data to inventory items
    const items: Equipment[] = dischargeData.map(discharge => ({
      id: discharge.equipmentId || 0,
      name: discharge.equipmentName || "",
      type: "Informatique",
      category: "Matériel" as EquipmentCategory,
      status: "En service",
      location: "Bureau 101",
      serialNumber: discharge.serialNumber || "",
      inventoryNumber: discharge.inventoryNumber || "",
      availableQuantity: discharge.quantity || 0,
      minQuantity: 1,
      lastMaintenance: "2024-03-12"
    }));

    setInventoryItems(items);
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredItems = inventoryItems.filter((item) => {
    return (
      (!filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.location || item.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.type || item.type === filters.type)
    );
  });

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
                  ${filteredItems.map(item => `
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4">
            <Package className="w-4 h-4 mr-2" />
            Inventaire des Emplacements
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Inventaire
            </h1>
            <Button onClick={handlePrint} variant="outline" className="gap-2 bg-white hover:bg-gray-50">
              <Printer className="w-4 h-4" />
              Imprimer
            </Button>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Gérez l'inventaire des emplacements
          </p>
        </header>

        <InventoryFilters 
          filters={filters} 
          onFilterChange={handleFilterChange}
          locations={locations}
        />

        <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>N° Série</TableHead>
                <TableHead>N° Inventaire</TableHead>
                <TableHead>Emplacement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50/50">
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
