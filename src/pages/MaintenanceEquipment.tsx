import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Equipment } from "@/types/equipment";
import { MaintenanceHeader } from "@/components/maintenance/MaintenanceHeader";
import { MaintenanceFilters } from "@/components/maintenance/MaintenanceFilters";
import { MaintenanceTable } from "@/components/maintenance/MaintenanceTable";
import { MaintenanceDialogs } from "@/components/maintenance/MaintenanceDialogs";
import { MaintenanceFormData } from "@/types/maintenance";

const MaintenanceEquipment = () => {
  const { toast } = useToast();
  const [maintenanceEquipments, setMaintenanceEquipments] = useState<Equipment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [maintenanceToEdit, setMaintenanceToEdit] = useState<MaintenanceFormData | null>(null);
  const [filters, setFilters] = useState({
    inventoryNumber: "",
    location: "all",
    type: "all",
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

    if (maintenanceToEdit) {
      // Update existing maintenance
      setMaintenanceEquipments(maintenanceEquipments.map(eq => 
        eq.id === selectedEquipment?.id ? updatedEquipment : eq
      ));
      toast({
        title: "Maintenance mise à jour",
        description: "Les informations de maintenance ont été mises à jour avec succès.",
      });
    } else {
      // Add new maintenance
      setMaintenanceEquipments([...maintenanceEquipments, updatedEquipment]);
      toast({
        title: "Maintenance ajoutée",
        description: "L'équipement a été mis en maintenance avec succès.",
      });
    }

    setIsDialogOpen(false);
    setSelectedEquipment(null);
    setMaintenanceToEdit(null);
  };

  const handleEditMaintenance = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setMaintenanceToEdit({
      equipmentId: equipment.id,
      maintenanceReason: equipment.maintenanceReason || "",
      maintenanceStartDate: equipment.maintenanceStartDate || "",
      maintenanceEndDate: equipment.maintenanceEndDate || "",
      location: equipment.location,
      notes: "",
    });
    setIsDialogOpen(true);
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
        <MaintenanceHeader 
          onAddClick={() => setIsDialogOpen(true)}
          onPrintClick={handlePrint}
        />
        
        <MaintenanceFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          locations={locations}
        />

        <Card className="overflow-hidden">
          <MaintenanceTable
            equipments={filteredEquipments}
            onDelete={handleDeleteMaintenance}
            onEdit={handleEditMaintenance}
          />
        </Card>

        <MaintenanceDialogs
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          selectedEquipment={selectedEquipment}
          maintenanceToEdit={maintenanceToEdit}
          onSubmit={handleAddMaintenance}
          onCancel={() => {
            setIsDialogOpen(false);
            setSelectedEquipment(null);
            setMaintenanceToEdit(null);
          }}
          onConfirmDelete={confirmDelete}
          locations={locations}
        />
      </motion.div>
    </div>
  );
};

export default MaintenanceEquipment;