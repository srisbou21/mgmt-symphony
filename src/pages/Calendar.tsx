import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ReservationCalendar } from "@/components/calendar/ReservationCalendar";
import { ReservationDialog } from "@/components/calendar/ReservationDialog";
import { ReservationList } from "@/components/calendar/ReservationList";
import { useToast } from "@/components/ui/use-toast";
import type { Reservation } from "@/types/reservation";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const CalendarPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleAddReservation = (reservation: Reservation) => {
    setReservations([...reservations, reservation]);
    setIsDialogOpen(false);
    toast({
      title: "Réservation créée",
      description: "La réservation a été créée avec succès.",
    });
  };

  return (
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
              onAddReservation={() => setIsDialogOpen(true)}
            />
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
        />
      </motion.div>
    </div>
  );
};

export default CalendarPage;