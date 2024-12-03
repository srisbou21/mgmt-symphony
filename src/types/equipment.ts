export type EquipmentType = "Informatique" | "Mobilier" | "Électroménager" | "Outillage" | "Véhicule" | "Matériel médical" | "Équipement sportif" | "Matériel audiovisuel";
export type EquipmentStatus = "En service" | "En maintenance";
export type EquipmentCategory = "Consommable" | "Matériel";

export interface Equipment {
  id: number;
  name: string;
  type: EquipmentType;
  category: EquipmentCategory;
  status: EquipmentStatus;
  location: string;
  service?: string;
  lastMaintenance: string;
  supplier?: string;
  serialNumber: string;
  inventoryNumber: string;
  observation?: string;
  availableQuantity: number;
  minQuantity: number;
  maintenanceReason?: string;
  maintenanceStartDate?: string;
  maintenanceEndDate?: string;
  invoice?: string; // Ajout du champ invoice
}

export interface Location {
  id: number;
  name: string;
  description?: string;
  building?: string;
  floor?: string;
}

export interface MaintenanceFormData {
  id?: number;
  equipmentId: number;
  maintenanceReason: string;
  maintenanceStartDate: string;
  maintenanceEndDate?: string;
  notes?: string;
}
