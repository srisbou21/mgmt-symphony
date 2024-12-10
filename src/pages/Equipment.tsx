import { useState } from "react";
import { motion } from "framer-motion";
import type { Equipment, EquipmentTypeValue } from "@/types/equipment";
import { EquipmentHeader } from "@/components/equipment/EquipmentHeader";
import { EquipmentTable } from "@/components/equipment/EquipmentTable";
import { EquipmentDialogs } from "@/components/equipment/EquipmentDialogs";
import { EquipmentFilters } from "@/components/equipment/EquipmentFilters";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Equipment = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<number | null>(null);
  const [equipmentToEdit, setEquipmentToEdit] = useState<Equipment | null>(null);
  const [filters, setFilters] = useState<Partial<Equipment>>({
    name: "",
    type: undefined,
    category: undefined,
    location: ""
  });

  const [equipments, setEquipments] = useState<Equipment[]>([
    {
      id: 1,
      name: "Ordinateur portable Dell XPS",
      type: "Informatique",
      category: "Matériel",
      status: "En service",
      location: "Bureau 201",
      service: "Service Informatique",
      lastMaintenance: "2024-01-15",
      supplier: "Dell",
      serialNumbers: [{
        id: 1,
        number: "XPS-2024-001",
        inventoryNumber: "INV-2024-001",
        isAvailable: true,
        equipmentId: 1
      }],
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
      service: "Service Reprographie",
      lastMaintenance: "2024-02-01",
      supplier: "HP",
      serialNumbers: [{
        id: 2,
        number: "HP-2024-001",
        inventoryNumber: "INV-2024-002",
        isAvailable: true,
        equipmentId: 2
      }],
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
      service: "Service Administratif",
      lastMaintenance: "2024-01-20",
      supplier: "Office Pro",
      serialNumbers: [{
        id: 3,
        number: "DESK-2024-001",
        inventoryNumber: "INV-2024-003",
        isAvailable: true,
        equipmentId: 3
      }],
      observation: "",
      availableQuantity: 1,
      minQuantity: 1,
    },
  ]);

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

  const handleFilterChange = (key: keyof Equipment, value: string) => {
    if (key === 'type') {
      setFilters({ ...filters, [key]: value === 'all' ? undefined : value as EquipmentTypeValue });
    } else {
      setFilters({ ...filters, [key]: value === 'all' ? undefined : value });
    }
  };

  const filteredEquipments = equipments.filter(equipment => {
    const matchName = !filters.name || 
      equipment.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchType = !filters.type || 
      equipment.type === filters.type;
    const matchCategory = !filters.category || 
      equipment.category === filters.category;
    const matchSerialNumber = !filters.serialNumbers || 
      equipment.serialNumbers.some(sn => sn.number.toLowerCase().includes(filters.serialNumbers?.[0]?.number.toLowerCase() || ''));
    const matchLocation = !filters.location || 
      equipment.location === filters.location;
    
    return matchName && matchType && matchCategory && matchSerialNumber && matchLocation;
  });

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