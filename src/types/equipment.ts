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

export type Equipment = {
  id: number;
  name: string;
  type: EquipmentTypeValue;
  category: "Consommable" | "Matériel";
  status: "En service" | "En maintenance";
  location: string;
  service: string;
  lastMaintenance?: string;
  supplier?: string;
  serialNumber: string;
  inventoryNumber: string;
  observation?: string;
  availableQuantity: number;
  minQuantity: number;
  maintenanceReason?: string;
  maintenanceStartDate?: string;
  maintenanceEndDate?: string;
};