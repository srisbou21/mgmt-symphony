export type ReservationStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface Reservation {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  userId: number;
  locationId: number;
  status: ReservationStatus;
  createdAt: string;
}