import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LocationTable } from "@/components/locations/LocationTable";
import { LocationHeader } from "@/components/locations/LocationHeader";
import { LocationDialogs } from "@/components/locations/LocationDialogs";
import type { Location } from "@/types/equipment";

const Locations = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<number | null>(null);
  const [locationToEdit, setLocationToEdit] = useState<Location | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  const handleAddLocation = (values: Omit<Location, "id">) => {
    const newLocation: Location = {
      ...values,
      id: Math.max(0, ...locations.map((l) => l.id)) + 1,
    };
    setLocations([...locations, newLocation]);
    toast({
      title: "Emplacement ajouté",
      description: "L'emplacement a été ajouté avec succès.",
    });
    setIsDialogOpen(false);
  };

  const handleEditLocation = (values: Location) => {
    setLocations(locations.map(l => l.id === values.id ? values : l));
    toast({
      title: "Emplacement modifié",
      description: "L'emplacement a été modifié avec succès.",
    });
    setIsDialogOpen(false);
    setLocationToEdit(null);
  };

  const handleDeleteLocation = (id: number) => {
    setLocationToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (locationToDelete) {
      setLocations(locations.filter(l => l.id !== locationToDelete));
      toast({
        title: "Emplacement supprimé",
        description: "L'emplacement a été supprimé avec succès.",
      });
    }
    setIsDeleteDialogOpen(false);
    setLocationToDelete(null);
  };

  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <LocationHeader onAddClick={() => setIsDialogOpen(true)} />
        
        <Card className="overflow-hidden">
          <LocationTable 
            locations={locations}
            onEdit={(location) => {
              setLocationToEdit(location);
              setIsDialogOpen(true);
            }}
            onDelete={handleDeleteLocation}
          />
        </Card>

        <LocationDialogs 
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          locationToEdit={locationToEdit}
          onSubmit={locationToEdit ? handleEditLocation : handleAddLocation}
          onCancel={() => {
            setIsDialogOpen(false);
            setLocationToEdit(null);
          }}
          onConfirmDelete={confirmDelete}
        />
      </motion.div>
    </div>
  );
};

export default Locations;