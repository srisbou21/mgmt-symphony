import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MaintenanceTable } from "@/components/maintenance/MaintenanceTable";
import { AddMaintenanceForm } from "@/components/maintenance/AddMaintenanceForm";
import { useMaintenanceData } from "@/hooks/useMaintenanceData";
import { Equipment } from "@/types/equipment";

const Maintenance = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    maintenanceEquipments,
    handleAddMaintenance,
    handleDeleteMaintenance,
    confirmDelete,
  } = useMaintenanceData();

  const locations = [
    { id: 1, name: "Atelier informatique" },
    { id: 2, name: "Salle de reprographie" },
    { id: 3, name: "Cuisine" },
    { id: 4, name: "Bureau 201" },
    { id: 5, name: "Salle de réunion" }
  ];

  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Maintenance</h1>
            <p className="text-gray-600 mt-2">
              Gérez les équipements en maintenance
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter une maintenance
          </Button>
        </div>

        <MaintenanceTable
          equipments={maintenanceEquipments}
          onDelete={handleDeleteMaintenance}
          onEdit={() => {}}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une maintenance</DialogTitle>
            </DialogHeader>
            <AddMaintenanceForm
              onSubmit={(values) => {
                handleAddMaintenance(values);
                setIsDialogOpen(false);
              }}
              onCancel={() => setIsDialogOpen(false)}
              equipmentId={1}
              locations={locations}
            />
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Maintenance;