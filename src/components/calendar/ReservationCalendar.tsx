import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Reservation, Location } from "@/types/reservation";

interface ReservationCalendarProps {
  reservations: Reservation[];
  locations: Location[];
  onAddReservation: () => void;
  onDateSelect: (date: Date) => void;
}

export const ReservationCalendar = ({ 
  reservations,
  locations,
  onAddReservation,
  onDateSelect
}: ReservationCalendarProps) => {
  const [selectedLocationId, setSelectedLocationId] = useState<number>(locations[0]?.id || 1);

  const getLocationReservations = (date: Date) => {
    return reservations.filter(reservation => {
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);
      return reservation.locationId === selectedLocationId && 
             date >= start && 
             date <= end;
    });
  };

  const isDayFree = (date: Date) => {
    return getLocationReservations(date).length === 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Calendrier</h2>
          <Select
            value={String(selectedLocationId)}
            onValueChange={(value) => setSelectedLocationId(Number(value))}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sélectionner un emplacement" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.id} value={String(location.id)}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onAddReservation} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle réservation
        </Button>
      </div>
      
      <Calendar
        mode="single"
        className="rounded-md border w-full"
        onSelect={(date) => date && onDateSelect(date)}
        modifiers={{
          booked: (date) => {
            return getLocationReservations(date).length > 0;
          },
          free: (date) => isDayFree(date)
        }}
        modifiersStyles={{
          booked: {
            backgroundColor: "rgb(254, 226, 226)",
            color: "rgb(185, 28, 28)"
          },
          free: {
            backgroundColor: "#F2FCE2",
            color: "rgb(22, 163, 74)"
          }
        }}
      />
    </div>
  );
};