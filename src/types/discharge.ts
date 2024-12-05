export type DischargeType = "Équipement" | "Consommable";
export type DischargeStatus = "Acquisition" | "Restitution";

export interface DischargeItem {
  equipmentId: number;
  quantity: number;
  serialNumber: string;
  inventoryNumber: string;
  type?: string;
  category?: string;
}

export interface Discharge {
  id: number;
  dischargeNumber: number;
  staffId: number;
  items: DischargeItem[];
  status: DischargeStatus;
  dischargeDate: string;
  returnDate?: string;
  attachedFile?: string;
  destination?: string;
  type?: string;
  category?: string;
  equipmentId?: number;
  equipmentName?: string;
  serialNumber?: string;
  inventoryNumber?: string;
  quantity?: number;
}