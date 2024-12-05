export type DischargeType = "Équipement" | "Consommable";
export type DischargeStatus = "Acquisition" | "Restitution";

export interface DischargeItem {
  equipmentId: number;
  quantity: number;
  serialNumber?: string;
  inventoryNumber?: string;
}

export interface Discharge {
  id: number;
  staffId: number;
  items: DischargeItem[];
  status: DischargeStatus;
  dischargeDate: string;
  returnDate?: string;
  attachedFile?: string;
  destination?: string;
  date?: string; // For backwards compatibility
  quantity?: number; // For backwards compatibility
  // Additional fields needed by Inventory.tsx
  equipmentId?: number;
  equipmentName?: string;
  category?: string;
  serialNumber?: string;
  inventoryNumber?: string;
}