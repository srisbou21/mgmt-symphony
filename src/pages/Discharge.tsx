import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Equipment } from "@/types/equipment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddDischargeForm } from "@/components/discharge/AddDischargeForm";
import { Discharge as DischargeType } from "@/types/discharge";
import { Staff } from "@/types/staff";

const Discharge = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDischarge, setSelectedDischarge] = useState<DischargeType | null>(null);
  const [dischargedEquipments, setDischargedEquipments] = useState<Equipment[]>([
    {
      id: 1,
      name: "Ordinateur portable Dell XPS",
      type: "Informatique",
      category: "Matériel",
      status: "En maintenance",
      location: "Bureau 201",
      supplier: "Dell",
      serialNumber: "XPS-2024-001",
      inventoryNumber: "INV-2024-001",
      observation: "RAS",
      availableQuantity: 0,
      minQuantity: 0,
      lastMaintenance: "2024-01-15",
    },
    {
      id: 2,
      name: "Imprimante HP LaserJet",
      type: "Informatique",
      category: "Matériel",
      status: "En maintenance",
      location: "Salle de reprographie",
      supplier: "HP",
      serialNumber: "HP-2024-001",
      inventoryNumber: "INV-2024-002",
      observation: "",
      availableQuantity: 0,
      minQuantity: 0,
      lastMaintenance: "2024-01-15",
    },
  ]);

  const mockStaff: Staff[] = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", phone: "123456789", service: "IT" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", phone: "987654321", service: "HR" },
  ];

  const mockEquipments: Equipment[] = [
    {
      id: 1,
      name: "Ordinateur portable Dell XPS",
      type: "Informatique",
      category: "Matériel",
      status: "En maintenance",
      location: "Bureau 201",
      supplier: "Dell",
      serialNumber: "XPS-2024-001",
      inventoryNumber: "INV-2024-001",
      observation: "RAS",
      availableQuantity: 0,
      minQuantity: 0,
      lastMaintenance: "2024-01-15",
    },
    {
      id: 2,
      name: "Imprimante HP LaserJet",
      type: "Informatique",
      category: "Matériel",
      status: "En maintenance",
      location: "Salle de reprographie",
      supplier: "HP",
      serialNumber: "HP-2024-001",
      inventoryNumber: "INV-2024-002",
      observation: "",
      availableQuantity: 0,
      minQuantity: 0,
      lastMaintenance: "2024-01-15",
    },
  ];

  const handleAddDischarge = (values: Partial<DischargeType>) => {
    console.log("New discharge:", values);
    toast({
      title: "Décharge créée",
      description: "La décharge a été créée avec succès.",
    });
    setIsDialogOpen(false);
  };

  const handleEditDischarge = (values: Partial<DischargeType>) => {
    console.log("Updated discharge:", values);
    toast({
      title: "Décharge modifiée",
      description: "La décharge a été modifiée avec succès.",
    });
    setIsDialogOpen(false);
    setSelectedDischarge(null);
  };

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
            <div className="space-x-4">
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Ajouter une décharge
              </Button>
              <Button onClick={handlePrint} variant="outline" className="gap-2">
                <Printer className="w-4 h-4" />
                Imprimer
              </Button>
            </div>
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
                <TableRow key={equipment.id} className="cursor-pointer hover:bg-gray-50" 
                  onClick={() => {
                    setSelectedDischarge({
                      id: equipment.id,
                      equipmentId: equipment.id,
                      staffId: 1,
                      type: "Équipement",
                      quantity: 1,
                      date: new Date().toISOString(),
                      serialNumber: equipment.serialNumber,
                      inventoryNumber: equipment.inventoryNumber,
                    });
                    setIsDialogOpen(true);
                  }}>
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedDischarge ? "Modifier la décharge" : "Ajouter une décharge"}
              </DialogTitle>
            </DialogHeader>
            <AddDischargeForm
              onSubmit={selectedDischarge ? handleEditDischarge : handleAddDischarge}
              onCancel={() => {
                setIsDialogOpen(false);
                setSelectedDischarge(null);
              }}
              equipments={mockEquipments}
              staff={mockStaff}
              initialData={selectedDischarge || undefined}
            />
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Discharge;
