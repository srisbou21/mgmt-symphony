export type DischargeType = "Équipement" | "Consommable";

export interface Discharge {
  id: number;
  equipmentId: number;
  staffId: number;
  type: DischargeType;
  quantity: number;
  date: string;
  serialNumber?: string;
  inventoryNumber?: string;
  staffName?: string;
  equipmentName?: string;
  category?: "Matériel" | "Consommable";
}