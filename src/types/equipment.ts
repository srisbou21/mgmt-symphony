export type EquipmentType = "Informatique" | "Mobilier" | "Électroménager" | "Outillage" | "Véhicule" | "Matériel médical" | "Équipement sportif" | "Matériel audiovisuel";
export type EquipmentStatus = "En service" | "En maintenance";

export type Equipment = {
  id: number;
  name: string;
  type: EquipmentType;
  status: EquipmentStatus;
  location: string;
  lastMaintenance: string;
  supplier?: string;
  serialNumber: string;
  inventoryNumber: string;
  observation?: string;
  availableQuantity: number;
  minQuantity: number;
};

export type FormData = Omit<Equipment, "id" | "lastMaintenance">;