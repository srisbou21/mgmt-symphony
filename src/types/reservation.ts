export interface Reservation {
  id: number;
  locationId: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  userId: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  createdAt: string;
}