export type EquipmentType = 
  | "Informatique"
  | "Mobilier"
  | "Électroménager"
  | "Outillage"
  | "Véhicule"
  | "Matériel médical"
  | "Équipement sportif"
  | "Matériel audiovisuel";

export type EquipmentCategory = "Matériel" | "Consommable";

export interface SerialNumber {
  number: string;
  inventoryNumber?: string;
  isAvailable: boolean;
}

export interface Equipment {
  id: number;
  name: string;
  type: EquipmentType;
  category: EquipmentCategory;
  serialNumbers: SerialNumber[];
  availableQuantity: number;
  minQuantity: number;
  status: string;
  location: string;
  service: string;
  supplier: string;
  lastMaintenance?: string;
}