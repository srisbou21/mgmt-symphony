import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ReservationCalendar } from "@/components/calendar/ReservationCalendar";
import { ReservationDialog } from "@/components/calendar/ReservationDialog";
import { ReservationList } from "@/components/calendar/ReservationList";
import { DayAvailability } from "@/components/calendar/DayAvailability";
import { useToast } from "@/components/ui/use-toast";
import type { Reservation, Location } from "@/types/reservation";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

// Exemple de données pour les emplacements
const mockLocations: Location[] = [
  { id: 1, name: "Salle A", capacity: 10, description: "Salle de réunion principale" },
  { id: 2, name: "Salle B", capacity: 6, description: "Salle de réunion secondaire" },
  { id: 3, name: "Bureau 1", capacity: 4, description: "Bureau individuel" },
];

const CalendarPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location>(mockLocations[0]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleAddReservation = (reservation: Reservation) => {
    const isLocationAvailable = !reservations.some(r => 
      r.locationId === reservation.locationId &&
      new Date(r.startDate) <= new Date(reservation.endDate) &&
      new Date(r.endDate) >= new Date(reservation.startDate)
    );

    if (!isLocationAvailable) {
      toast({
        title: "Erreur de réservation",
        description: "Cet emplacement n'est pas disponible pour les dates sélectionnées.",
        variant: "destructive",
      });
      return;
    }

    setReservations([...reservations, reservation]);
    setIsDialogOpen(false);
    toast({
      title: "Réservation créée",
      description: "La réservation a été créée avec succès.",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <header className="mb-8">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendrier des réservations
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Réservation des emplacements
            </h1>
            <p className="text-lg text-gray-600">
              Gérez les réservations des salles et espaces
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-4 lg:col-span-2">
              <ReservationCalendar
                reservations={reservations}
                locations={mockLocations}
                onAddReservation={() => setIsDialogOpen(true)}
                onDateSelect={setSelectedDate}
              />
              {selectedDate && (
                <div className="mt-6">
                  <DayAvailability
                    date={selectedDate}
                    location={selectedLocation}
                    reservations={reservations.filter(r => r.locationId === selectedLocation.id)}
                  />
                </div>
              )}
            </Card>

            <Card className="p-4">
              <ReservationList 
                reservations={reservations}
                selectedDate={selectedDate}
              />
            </Card>
          </div>

          <ReservationDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSubmit={handleAddReservation}
            selectedDate={selectedDate}
            locations={mockLocations}
          />
        </motion.div>
      </div>
    </Layout>
  );
};

export default CalendarPage;