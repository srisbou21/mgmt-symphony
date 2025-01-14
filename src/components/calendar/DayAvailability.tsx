import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Reservation, Location } from "@/types/reservation";

interface DayAvailabilityProps {
  date: Date;
  location: Location;
  reservations: Reservation[];
}

export const DayAvailability = ({ date, location, reservations }: DayAvailabilityProps) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);
  
  const isTimeSlotReserved = (hour: number) => {
    return reservations.some(reservation => {
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);
      const slotStart = new Date(date);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(date);
      slotEnd.setHours(hour + 1, 0, 0, 0);
      
      return slotStart >= start && slotEnd <= end;
    });
  };

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          Disponibilités pour {format(date, "d MMMM yyyy", { locale: fr })}
        </h3>
        <p className="text-sm text-gray-500">{location.name}</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {timeSlots.map((hour) => {
          const isReserved = isTimeSlotReserved(hour);
          return (
            <Badge
              key={hour}
              variant={isReserved ? "destructive" : "secondary"}
              className="justify-center py-2"
            >
              {`${hour.toString().padStart(2, "0")}:00`}
            </Badge>
          );
        })}
      </div>

      <div className="mt-4 flex gap-2">
        <Badge variant="secondary">Disponible</Badge>
        <Badge variant="destructive">Réservé</Badge>
      </div>
    </Card>
  );
};