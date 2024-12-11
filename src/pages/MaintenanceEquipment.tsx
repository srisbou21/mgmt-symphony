import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MaintenanceHeader } from "@/components/maintenance/MaintenanceHeader";
import { MaintenanceFilters } from "@/components/maintenance/MaintenanceFilters";
import { MaintenanceTable } from "@/components/maintenance/MaintenanceTable";
import { MaintenanceDialogs } from "@/components/maintenance/MaintenanceDialogs";
import { useMaintenanceData } from "@/hooks/useMaintenanceData";
import { MaintenanceFormData } from "@/types/maintenance";

const MaintenanceEquipment = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    inventoryNumber: "",
    location: "all",
    type: "all",
  });

  const {
    maintenanceEquipments,
    selectedEquipment,
    setSelectedEquipment,
    maintenanceToEdit,
    setMaintenanceToEdit,
    handleAddMaintenance,
    handleDeleteMaintenance,
    confirmDelete
  } = useMaintenanceData();

  const locations = [
    { id: 1, name: "Atelier informatique" },
    { id: 2, name: "Salle de reprographie" },
    { id: 3, name: "Cuisine" },
    { id: 4, name: "Bureau 201" },
    { id: 5, name: "Salle de réunion" }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredEquipments = maintenanceEquipments.filter((equipment) => {
    const matchInventoryNumber = !filters.inventoryNumber || 
      equipment.serialNumbers.some(sn => sn.inventoryNumber?.toLowerCase().includes(filters.inventoryNumber.toLowerCase()));
    const matchLocation = filters.location === "all" || 
      equipment.location === filters.location;
    const matchType = filters.type === "all" || 
      equipment.type === filters.type;
    
    return matchInventoryNumber && matchLocation && matchType;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (values: MaintenanceFormData) => {
    handleAddMaintenance(values);
    setIsDialogOpen(false);
    setSelectedEquipment(null);
    setMaintenanceToEdit(null);
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
            onEdit={(equipment) => {
              setSelectedEquipment(equipment);
              setMaintenanceToEdit({
                equipmentId: equipment.id,
                maintenanceReason: equipment.maintenanceReason || "",
                maintenanceStartDate: equipment.maintenanceStartDate || "",
                maintenanceEndDate: equipment.maintenanceEndDate || "",
                location: equipment.location,
                notes: equipment.observation || "",
              });
              setIsDialogOpen(true);
            }}
          />
        </Card>

        <MaintenanceDialogs
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          selectedEquipment={selectedEquipment}
          maintenanceToEdit={maintenanceToEdit}
          onSubmit={handleSubmit}
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