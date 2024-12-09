import { useState } from "react";
import { Equipment } from "@/types/equipment";
import { MaintenanceFormData } from "@/types/maintenance";
import { useToast } from "@/components/ui/use-toast";

export const useMaintenanceData = () => {
  const { toast } = useToast();
  const [maintenanceEquipments, setMaintenanceEquipments] = useState<Equipment[]>([
    {
      id: 1,
      name: "Ordinateur portable Dell XPS",
      type: "Informatique",
      category: "Matériel",
      status: "En maintenance",
      location: "Atelier informatique",
      service: "Service Informatique",
      lastMaintenance: "2024-03-15",
      supplier: "Dell",
      serialNumber: "XPS-2024-001",
      inventoryNumber: "INV-2024-001",
      observation: "Problème de batterie",
      availableQuantity: 1,
      minQuantity: 1,
      maintenanceReason: "Remplacement batterie",
      maintenanceStartDate: "2024-03-15",
      maintenanceEndDate: "2024-03-20"
    },
    {
      id: 2,
      name: "Imprimante HP LaserJet",
      type: "Informatique",
      category: "Matériel",
      status: "En maintenance",
      location: "Salle de reprographie",
      service: "Service Reprographie",
      lastMaintenance: "2024-03-10",
      supplier: "HP",
      serialNumber: "HP-2024-001",
      inventoryNumber: "INV-2024-002",
      observation: "Maintenance préventive",
      availableQuantity: 1,
      minQuantity: 1,
      maintenanceReason: "Maintenance annuelle",
      maintenanceStartDate: "2024-03-10",
      maintenanceEndDate: "2024-03-17"
    },
    {
      id: 3,
      name: "Machine à café",
      type: "Électroménager",
      category: "Matériel",
      status: "En maintenance",
      location: "Cuisine",
      service: "Service Général",
      lastMaintenance: "2024-03-12",
      supplier: "Nespresso",
      serialNumber: "NSP-2024-001",
      inventoryNumber: "INV-2024-003",
      observation: "Détartrage nécessaire",
      availableQuantity: 1,
      minQuantity: 1,
      maintenanceReason: "Détartrage complet",
      maintenanceStartDate: "2024-03-12",
      maintenanceEndDate: "2024-03-14"
    }
  ]);

  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [maintenanceToEdit, setMaintenanceToEdit] = useState<MaintenanceFormData | null>(null);

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
      setMaintenanceEquipments(maintenanceEquipments.map(eq => 
        eq.id === selectedEquipment?.id ? updatedEquipment : eq
      ));
      toast({
        title: "Maintenance mise à jour",
        description: "Les informations de maintenance ont été mises à jour avec succès.",
      });
    } else {
      setMaintenanceEquipments([...maintenanceEquipments, updatedEquipment]);
      toast({
        title: "Maintenance ajoutée",
        description: "L'équipement a été mis en maintenance avec succès.",
      });
    }

    return updatedEquipment;
  };

  const handleDeleteMaintenance = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
  };

  const confirmDelete = () => {
    if (selectedEquipment) {
      setMaintenanceEquipments(maintenanceEquipments.filter(eq => eq.id !== selectedEquipment.id));
      toast({
        title: "Maintenance terminée",
        description: "L'équipement a été retiré de la maintenance avec succès.",
      });
    }
  };

  return {
    maintenanceEquipments,
    selectedEquipment,
    setSelectedEquipment,
    maintenanceToEdit,
    setMaintenanceToEdit,
    handleAddMaintenance,
    handleDeleteMaintenance,
    confirmDelete
  };
};