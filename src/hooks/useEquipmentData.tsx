import { useState } from "react";
import type { Equipment, EquipmentTypeValue } from "@/types/equipment";

export const useEquipmentData = () => {
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
      serialNumbers: [
        { id: 1, number: "XPS-2024-001", inventoryNumber: "INV-2024-001", isAvailable: true, equipmentId: 1 },
        { id: 2, number: "XPS-2024-002", inventoryNumber: "INV-2024-002", isAvailable: false, equipmentId: 1 }
      ],
      observation: "RAS",
      availableQuantity: 2,
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
      lastMaintenance: "2024-01-16",
      supplier: "HP",
      serialNumbers: [
        { id: 3, number: "HP-2024-001", inventoryNumber: "INV-2024-003", isAvailable: true, equipmentId: 2 }
      ],
      observation: "Maintenance préventive",
      availableQuantity: 1,
      minQuantity: 1,
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
      serialNumbers: [
        { id: 4, number: "DESK-2024-001", inventoryNumber: "INV-2024-004", isAvailable: true, equipmentId: 3 }
      ],
      observation: "",
      availableQuantity: 1,
      minQuantity: 1,
    },
    {
      id: 4,
      name: "Projecteur Epson",
      type: "Matériel audiovisuel",
      category: "Matériel",
      status: "En service",
      location: "Salle de conférence",
      service: "Service Événementiel",
      lastMaintenance: "2024-03-01",
      supplier: "Epson",
      serialNumbers: [
        { id: 5, number: "PROJ-2024-001", inventoryNumber: "INV-2024-005", isAvailable: true, equipmentId: 4 }
      ],
      observation: "Lampe à changer dans 3 mois",
      availableQuantity: 1,
      minQuantity: 1,
    },
    {
      id: 5,
      name: "Cafetière Nespresso",
      type: "Électroménager",
      category: "Matériel",
      status: "En service",
      location: "Cuisine",
      service: "Service Général",
      lastMaintenance: "2024-02-15",
      supplier: "Nespresso",
      serialNumbers: [
        { id: 6, number: "COFFEE-2024-001", inventoryNumber: "INV-2024-006", isAvailable: true, equipmentId: 5 }
      ],
      observation: "Détartrage mensuel requis",
      availableQuantity: 1,
      minQuantity: 1,
    }
  ]);

  const [filters, setFilters] = useState<Partial<Equipment>>({
    name: "",
    type: undefined,
    category: undefined,
    location: ""
  });

  const handleFilterChange = (key: keyof Equipment, value: string) => {
    if (key === 'type') {
      setFilters(prev => ({ ...prev, [key]: value === 'all' ? undefined : value as EquipmentTypeValue }));
    } else {
      setFilters(prev => ({ ...prev, [key]: value === 'all' ? undefined : value }));
    }
  };

  const filteredEquipments = equipments.filter(equipment => {
    const matchName = !filters.name || 
      equipment.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchType = !filters.type || 
      equipment.type === filters.type;
    const matchCategory = !filters.category || 
      equipment.category === filters.category;
    const matchLocation = !filters.location || 
      equipment.location === filters.location;
    
    return matchName && matchType && matchCategory && matchLocation;
  });

  return {
    equipments,
    setEquipments,
    filters,
    setFilters,
    handleFilterChange,
    filteredEquipments
  };
};
