import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Reservation } from "@/types/reservation";

interface ReservationCalendarProps {
  reservations: Reservation[];
  onAddReservation: () => void;
}

export const ReservationCalendar = ({ 
  reservations,
  onAddReservation 
}: ReservationCalendarProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Calendrier</h2>
        <Button onClick={onAddReservation} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle réservation
        </Button>
      </div>
      
      <Calendar
        mode="single"
        className="rounded-md border w-full"
        modifiers={{
          booked: (date) => {
            return reservations.some(reservation => {
              const start = new Date(reservation.startDate);
              const end = new Date(reservation.endDate);
              return date >= start && date <= end;
            });
          }
        }}
        modifiersStyles={{
          booked: {
            backgroundColor: "rgb(254, 226, 226)",
            color: "rgb(185, 28, 28)"
          }
        }}
      />
    </div>
  );
};