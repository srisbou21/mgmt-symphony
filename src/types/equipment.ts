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

export type EquipmentTypeValue = typeof equipmentTypes[number];

export type EquipmentType = {
  id: number;
  name: string;
  description?: string;
};

export type EquipmentTypeStats = {
  type: EquipmentTypeValue;
  count: number;
  equipments: Equipment[];
};

export type Location = {
  id: number;
  name: string;
  description?: string;
  building?: string;
  floor?: string;
};

export type EquipmentCategory = "Consommable" | "Matériel";

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
  category: EquipmentCategory;
  status: "En service" | "En maintenance";
  location: string;
  service: string;
  lastMaintenance?: string;
  supplier?: string;
  serialNumbers: SerialNumber[];
  observation?: string;
  availableQuantity: number;
  minQuantity: number;
  maintenanceReason?: string;
  maintenanceStartDate?: string;
  maintenanceEndDate?: string;
}

export interface EquipmentFilters extends Partial<Equipment> {
  serialNumberFilter?: string;
  inventoryNumberFilter?: string;
}