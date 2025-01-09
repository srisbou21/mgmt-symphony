export interface PrintTemplate {
  id: number;
  name: string;
  type: 'discharge' | 'equipment' | 'maintenance';
  header?: {
    showLogo: boolean;
    showCompanyInfo: boolean;
    showDate: boolean;
    showQRCode: boolean;
    title?: string;
  };
  content?: {
    showSerialNumbers: boolean;
    showInventoryNumbers: boolean;
    showObservations: boolean;
    showState: boolean;
  };
  footer?: {
    showSignature: boolean;
    showPageNumbers: boolean;
    customText?: string;
  };
  createdAt: string;
  updatedAt: string;
}