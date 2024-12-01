import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import type { Equipment } from "@/types/equipment";
import { EquipmentTable } from "@/components/equipment/EquipmentTable";
import { EquipmentFilters } from "@/components/equipment/EquipmentFilters";
import { EquipmentHeader } from "@/components/equipment/EquipmentHeader";
import { EquipmentDialogs } from "@/components/equipment/EquipmentDialogs";

const Equipment = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<number | null>(null);
  const [equipmentToEdit, setEquipmentToEdit] = useState<Equipment | null>(null);
  const [filters, setFilters] = useState<Partial<Equipment>>({});
  const [equipments, setEquipments] = useState<Equipment[]>([
    {
      id: 1,
      name: "Ordinateur portable Dell XPS",
      type: "Informatique",
      status: "En service",
      location: "Bureau 201",
      lastMaintenance: "2024-01-15",
      supplier: "Dell",
      serialNumber: "XPS-2024-001",
      inventoryNumber: "INV-2024-001",
      observation: "RAS",
      availableQuantity: 5,
      minQuantity: 2,
    },
    {
      id: 2,
      name: "Imprimante HP LaserJet",
      type: "Informatique",
      status: "En maintenance",
      location: "Salle de reprographie",
      lastMaintenance: "2024-02-01",
      supplier: "HP",
      serialNumber: "HP-2024-001",
      inventoryNumber: "INV-2024-002",
      observation: "",
      availableQuantity: 1,
      minQuantity: 1,
    },
    {
      id: 3,
      name: "Bureau ergonomique",
      type: "Mobilier",
      status: "En service",
      location: "Bureau 305",
      lastMaintenance: "2023-12-10",
      supplier: "Steelcase",
      serialNumber: "ST-2023-001",
      inventoryNumber: "INV-2023-001",
      observation: "",
      availableQuantity: 3,
      minQuantity: 2,
    },
  ]);

  const handleFilterChange = (key: keyof Equipment, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredEquipments = equipments.filter(equipment => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value || value === "_all") return true;
      const equipmentValue = equipment[key as keyof Equipment];
      return String(equipmentValue).toLowerCase().includes(String(value).toLowerCase());
    });
  });

  const handleAddEquipment = (values: Omit<Equipment, "id" | "lastMaintenance">) => {
    const newEquipment: Equipment = {
      ...values,
      id: Math.max(0, ...equipments.map((e) => e.id)) + 1,
      lastMaintenance: new Date().toISOString().split('T')[0],
    };
    setEquipments([...equipments, newEquipment]);
    
    if (newEquipment.availableQuantity <= newEquipment.minQuantity) {
      toast({
        title: "Alerte stock",
        description: `Le stock de ${newEquipment.name} est bas (${newEquipment.availableQuantity}/${newEquipment.minQuantity})`,
        variant: "destructive",
      });
    }
    
    toast({
      title: "Équipement ajouté",
      description: "L'équipement a été ajouté avec succès.",
    });
    setIsDialogOpen(false);
  };

  const handleEditEquipment = (values: Equipment) => {
    setEquipments(equipments.map(eq => eq.id === values.id ? { ...values, lastMaintenance: eq.lastMaintenance } : eq));
    
    if (values.availableQuantity <= values.minQuantity) {
      toast({
        title: "Alerte stock",
        description: `Le stock de ${values.name} est bas (${values.availableQuantity}/${values.minQuantity})`,
        variant: "destructive",
      });
    }
    
    toast({
      title: "Équipement modifié",
      description: "L'équipement a été modifié avec succès.",
    });
    setIsDialogOpen(false);
    setEquipmentToEdit(null);
  };

  const handleDeleteEquipment = (id: number) => {
    setEquipmentToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (equipmentToDelete) {
      setEquipments(equipments.filter(eq => eq.id !== equipmentToDelete));
      toast({
        title: "Équipement supprimé",
        description: "L'équipement a été supprimé avec succès.",
      });
    }
    setIsDeleteDialogOpen(false);
    setEquipmentToDelete(null);
  };

  const openEditDialog = (equipment: Equipment) => {
    setEquipmentToEdit(equipment);
    setIsDialogOpen(true);
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
        <EquipmentFilters filters={filters} onFilterChange={handleFilterChange} />
        
        <Card className="overflow-hidden">
          <EquipmentTable 
            equipments={filteredEquipments} 
            onEdit={openEditDialog}
            onDelete={handleDeleteEquipment}
          />
        </Card>

        <EquipmentDialogs 
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          equipmentToEdit={equipmentToEdit}
          onSubmit={equipmentToEdit ? handleEditEquipment : handleAddEquipment}
          onCancel={() => {
            setIsDialogOpen(false);
            setEquipmentToEdit(null);
          }}
          onConfirmDelete={confirmDelete}
        />
      </motion.div>
    </div>
  );
};

export default Equipment;
