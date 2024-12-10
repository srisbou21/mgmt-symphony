export interface EquipmentTypeDefinition {
  id: number;
  name: string;
  description?: string;
}

export const equipmentTypes = [
  "Informatique",
  "Mobilier",
  "Électroménager",
  "Outillage",
  "Véhicule",
  "Matériel médical",
  "Équipement sportif",
  "Matériel audiovisuel"
] as const;

export type EquipmentType = EquipmentTypeDefinition;
export type EquipmentTypeValue = typeof equipmentTypes[number];

export interface SerialNumber {
  id: number;
  number: string;
  inventoryNumber?: string;
  isAvailable: boolean;
  equipmentId: number;
}

export interface Equipment {
  id: number;
  name: string;
  type: EquipmentTypeValue;
  category: "Matériel" | "Consommable";
  status: "En service" | "En maintenance";
  location: string;
  service: string;
  lastMaintenance?: string;
  supplier: string;
  serialNumbers: SerialNumber[];
  observation?: string;
  availableQuantity: number;
  minQuantity: number;
  maintenanceReason?: string;
  maintenanceStartDate?: string;
  maintenanceEndDate?: string;
}

export interface Location {
  id: number;
  name: string;
  description?: string;
  building?: string;
  floor?: string;
}