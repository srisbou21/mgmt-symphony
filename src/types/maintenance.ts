export type MaintenanceFormData = {
  equipmentId: number;
  maintenanceReason: string;
  maintenanceStartDate: string;
  maintenanceEndDate?: string;
  notes?: string;
};