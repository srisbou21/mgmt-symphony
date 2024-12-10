import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import type { Reservation } from "@/types/reservation";

interface ReservationListProps {
  reservations: Reservation[];
  selectedDate?: Date;
}

export const ReservationList = ({ reservations, selectedDate }: ReservationListProps) => {
  const filteredReservations = selectedDate
    ? reservations.filter(reservation => {
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        return selectedDate >= start && selectedDate <= end;
      })
    : reservations;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Réservations
        {selectedDate && (
          <span className="text-sm font-normal text-gray-500 ml-2">
            {format(selectedDate, "d MMMM yyyy", { locale: fr })}
          </span>
        )}
      </h2>

      {filteredReservations.length === 0 ? (
        <p className="text-gray-500 text-sm">Aucune réservation pour cette période</p>
      ) : (
        <div className="space-y-3">
          {filteredReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{reservation.title}</h3>
                <Badge variant={
                  reservation.status === 'approved' ? 'default' :
                  reservation.status === 'rejected' ? 'destructive' :
                  reservation.status === 'cancelled' ? 'secondary' :
                  'outline'
                }>
                  {reservation.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                {format(new Date(reservation.startDate), "d MMM yyyy HH:mm", { locale: fr })}
                {" - "}
                {format(new Date(reservation.endDate), "d MMM yyyy HH:mm", { locale: fr })}
              </p>
              {reservation.description && (
                <p className="text-sm text-gray-600 mt-2">{reservation.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}