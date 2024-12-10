import { useState } from "react";
import { motion } from "framer-motion";
import type { Equipment } from "@/types/equipment";
import { EquipmentHeader } from "@/components/equipment/EquipmentHeader";
import { EquipmentTable } from "@/components/equipment/EquipmentTable";
import { EquipmentDialogs } from "@/components/equipment/EquipmentDialogs";
import { EquipmentFilters } from "@/components/equipment/EquipmentFilters";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useEquipmentData } from "@/hooks/useEquipmentData";

const Equipment = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<number | null>(null);
  const [equipmentToEdit, setEquipmentToEdit] = useState<Equipment | null>(null);
  const { equipments, setEquipments, filteredEquipments, handleFilterChange, filters } = useEquipmentData();

  const handleSubmit = (values: Equipment) => {
    if (equipmentToEdit) {
      setEquipments(equipments.map(e => e.id === equipmentToEdit.id ? { ...values, id: equipmentToEdit.id } : e));
      toast({
        title: "Équipement modifié",
        description: "L'équipement a été mis à jour avec succès.",
      });
    } else {
      const newEquipment = { ...values, id: Math.max(0, ...equipments.map(e => e.id)) + 1 };
      setEquipments([...equipments, newEquipment]);
      toast({
        title: "Équipement ajouté",
        description: "L'équipement a été ajouté avec succès.",
      });
    }
    setIsDialogOpen(false);
    setEquipmentToEdit(null);
  };

  const handleDelete = () => {
    if (equipmentToDelete !== null) {
      setEquipments(equipments.filter(e => e.id !== equipmentToDelete));
      toast({
        title: "Équipement supprimé",
        description: "L'équipement a été supprimé avec succès.",
      });
      setEquipmentToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <EquipmentHeader onAddClick={() => setIsDialogOpen(true)} />
        
        <EquipmentFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          locations={[
            { id: 1, name: "Bureau 201" },
            { id: 2, name: "Salle de réunion" },
            { id: 3, name: "Atelier" }
          ]}
        />

        <Card className="overflow-hidden">
          <EquipmentTable
            equipments={filteredEquipments}
            onEdit={(equipment) => {
              setEquipmentToEdit(equipment);
              setIsDialogOpen(true);
            }}
            onDelete={(id) => {
              setEquipmentToDelete(id);
              setIsDeleteDialogOpen(true);
            }}
          />
        </Card>

        <EquipmentDialogs
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          equipmentToEdit={equipmentToEdit}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsDialogOpen(false);
            setEquipmentToEdit(null);
          }}
          onConfirmDelete={handleDelete}
          suppliers={[
            { id: 1, name: "Dell" },
            { id: 2, name: "HP" },
            { id: 3, name: "Office Pro" }
          ]}
          locations={[
            { id: 1, name: "Bureau 201" },
            { id: 2, name: "Salle de réunion" },
            { id: 3, name: "Atelier" }
          ]}
          services={[
            { id: 1, name: "Service Informatique" },
            { id: 2, name: "Service Reprographie" },
            { id: 3, name: "Service Administratif" }
          ]}
        />
      </motion.div>
    </div>
  );
};

export default Equipment;