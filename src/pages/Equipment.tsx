import { useState } from "react";
import { motion } from "framer-motion";
import { Equipment } from "@/types/equipment";
import { EquipmentHeader } from "@/components/equipment/EquipmentHeader";
import { EquipmentTable } from "@/components/equipment/EquipmentTable";
import { EquipmentDialogs } from "@/components/equipment/EquipmentDialogs";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Equipment = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<number | null>(null);
  const [equipmentToEdit, setEquipmentToEdit] = useState<Equipment | null>(null);
  const [equipments, setEquipments] = useState<Equipment[]>([
    {
      id: 1,
      name: "Ordinateur portable Dell XPS",
      type: "Informatique",
      category: "Matériel",
      status: "En service",
      location: "Bureau 201",
      lastMaintenance: "2024-01-15",
      supplier: "Dell",
      serialNumber: "XPS-2024-001",
      inventoryNumber: "INV-2024-001",
      observation: "RAS",
      availableQuantity: 1,
      minQuantity: 1,
    },
    {
      id: 2,
      name: "Imprimante HP LaserJet",
      type: "Informatique",
      category: "Matériel",
      status: "En maintenance",
      location: "Salle de reprographie",
      lastMaintenance: "2024-02-01",
      supplier: "HP",
      serialNumber: "HP-2024-001",
      inventoryNumber: "INV-2024-002",
      observation: "Maintenance préventive",
      availableQuantity: 1,
      minQuantity: 1,
      maintenanceReason: "Maintenance préventive",
      maintenanceStartDate: "2024-02-01",
    },
    {
      id: 3,
      name: "Bureau ergonomique",
      type: "Mobilier",
      category: "Matériel",
      status: "En service",
      location: "Bureau 305",
      lastMaintenance: "2024-01-20",
      supplier: "Office Pro",
      serialNumber: "DESK-2024-001",
      inventoryNumber: "INV-2024-003",
      observation: "",
      availableQuantity: 1,
      minQuantity: 1,
    },
  ]);

  const handleSubmit = (values: Equipment) => {
    if (values.id) {
      setEquipments(equipments.map(e => (e.id === values.id ? values : e)));
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
        
        <Card className="overflow-hidden">
          <EquipmentTable
            equipments={equipments}
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
          suppliers={[]}
        />
      </motion.div>
    </div>
  );
};

export default Equipment;
