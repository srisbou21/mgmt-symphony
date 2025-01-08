export type DischargeType = "Équipement" | "Consommable";
export type DischargeStatus = "Acquisition" | "Restitution";
export type DischargeCategory = "Consommable" | "Matériel";

export interface DischargeItem {
  equipmentId: number;
  quantity: number;
  serialNumber: string;
  inventoryNumber?: string;
  category: DischargeCategory;
}

export interface Discharge {
  id: number;
  dischargeNumber: number;
  staffId: number;
  items: DischargeItem[];
  status: DischargeStatus;
  category: DischargeCategory;
  dischargeDate: string;
  returnDate?: string;
  attachedFile?: string;
  destination?: string;
}