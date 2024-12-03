import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Plus, Printer, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Equipment } from "@/types/equipment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AddMaintenanceForm } from "@/components/maintenance/AddMaintenanceForm";
import { MaintenanceFilters } from "@/components/maintenance/MaintenanceFilters";
import { MaintenanceFormData } from "@/types/maintenance";

const MaintenanceEquipment = () => {
  const { toast } = useToast();
  const [maintenanceEquipments, setMaintenanceEquipments] = useState<Equipment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [filters, setFilters] = useState({
    inventoryNumber: "",
    location: "all",
    type: "all", // Added the missing type property
  });
  const [locations] = useState([
    { id: 1, name: "Bureau 201" },
    { id: 2, name: "Salle de réunion" },
    { id: 3, name: "Atelier" },
  ]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredEquipments = maintenanceEquipments.filter((equipment) => {
    const matchInventoryNumber = !filters.inventoryNumber || 
      equipment.inventoryNumber.toLowerCase().includes(filters.inventoryNumber.toLowerCase());
    const matchLocation = filters.location === "all" || 
      equipment.location === filters.location;
    const matchType = filters.type === "all" || 
      equipment.type === filters.type;
    return matchInventoryNumber && matchLocation && matchType;
  });

  const handleAddMaintenance = (values: MaintenanceFormData) => {
    const updatedEquipment: Equipment = {
      ...selectedEquipment!,
      status: "En maintenance",
      maintenanceReason: values.maintenanceReason,
      maintenanceStartDate: values.maintenanceStartDate,
      maintenanceEndDate: values.maintenanceEndDate,
      location: values.location,
    };

    setMaintenanceEquipments([...maintenanceEquipments, updatedEquipment]);
    setIsDialogOpen(false);
    setSelectedEquipment(null);

    toast({
      title: "Maintenance ajoutée",
      description: "L'équipement a été mis en maintenance avec succès.",
    });
  };

  const handleDeleteMaintenance = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEquipment) {
      setMaintenanceEquipments(maintenanceEquipments.filter(eq => eq.id !== selectedEquipment.id));
      toast({
        title: "Maintenance terminée",
        description: "L'équipement a été retiré de la maintenance avec succès.",
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedEquipment(null);
  };

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
                    <th class="border p-2">Date début</th>
                    <th class="border p-2">Date fin prévue</th>
                    <th class="border p-2">Raison</th>
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
                      <td class="border p-2">${equipment.maintenanceStartDate || '-'}</td>
                      <td class="border p-2">${equipment.maintenanceEndDate || '-'}</td>
                      <td class="border p-2">${equipment.maintenanceReason || '-'}</td>
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
            Équipements en maintenance
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-dmg-dark">
              Maintenance
            </h1>
            <div className="space-x-4">
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Ajouter
              </Button>
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

        <MaintenanceFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          locations={locations}
        />

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>N° Série</TableHead>
                <TableHead>N° Inventaire</TableHead>
                <TableHead>Emplacement</TableHead>
                <TableHead>Date début</TableHead>
                <TableHead>Date fin prévue</TableHead>
                <TableHead>Raison</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipments.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell className="font-medium">{equipment.name}</TableCell>
                  <TableCell>{equipment.type}</TableCell>
                  <TableCell>{equipment.serialNumber}</TableCell>
                  <TableCell>{equipment.inventoryNumber}</TableCell>
                  <TableCell>{equipment.location}</TableCell>
                  <TableCell>{equipment.maintenanceStartDate || '-'}</TableCell>
                  <TableCell>{equipment.maintenanceEndDate || '-'}</TableCell>
                  <TableCell>{equipment.maintenanceReason || '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteMaintenance(equipment)}
                      className="hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter une maintenance</DialogTitle>
            </DialogHeader>
            {selectedEquipment && (
              <AddMaintenanceForm 
                onSubmit={handleAddMaintenance}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setSelectedEquipment(null);
                }}
                equipmentId={selectedEquipment.id}
                locations={locations}
              />
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Terminer la maintenance ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cet équipement sera retiré de la liste des maintenances. Cette action ne peut pas être annulée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>
                Confirmer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </div>
  );
};

export default MaintenanceEquipment;