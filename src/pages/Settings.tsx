import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagementForm } from "@/components/settings/UserManagementForm";
import { PasswordChangeForm } from "@/components/settings/PasswordChangeForm";
import { LocationTable } from "@/components/locations/LocationTable";
import { ServiceTable } from "@/components/service/ServiceTable";
import { CompanySettingsForm } from "@/components/settings/CompanySettingsForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Location } from "@/types/equipment";
import { Service } from "@/types/service";
import { LocationDialogs } from "@/components/locations/LocationDialogs";
import { ServiceDialogs } from "@/components/service/ServiceDialogs";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [locations, setLocations] = useState<Location[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  
  // États pour les dialogues des emplacements
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [isLocationDeleteDialogOpen, setIsLocationDeleteDialogOpen] = useState(false);
  const [locationToEdit, setLocationToEdit] = useState<Location | null>(null);
  const [locationToDelete, setLocationToDelete] = useState<number | null>(null);

  // États pour les dialogues des services
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isServiceDeleteDialogOpen, setIsServiceDeleteDialogOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);

  // Gestionnaires d'événements pour les emplacements
  const handleLocationSubmit = (values: any) => {
    if (locationToEdit) {
      setLocations(locations.map(l => l.id === locationToEdit.id ? values : l));
      toast({
        title: "Emplacement modifié",
        description: "L'emplacement a été modifié avec succès.",
      });
    } else {
      const newLocation = {
        ...values,
        id: Math.max(0, ...locations.map(l => l.id)) + 1,
      };
      setLocations([...locations, newLocation]);
      toast({
        title: "Emplacement ajouté",
        description: "L'emplacement a été ajouté avec succès.",
      });
    }
    setIsLocationDialogOpen(false);
    setLocationToEdit(null);
  };

  const handleLocationDelete = (id: number) => {
    setLocationToDelete(id);
    setIsLocationDeleteDialogOpen(true);
  };

  const confirmLocationDelete = () => {
    if (locationToDelete) {
      setLocations(locations.filter(l => l.id !== locationToDelete));
      toast({
        title: "Emplacement supprimé",
        description: "L'emplacement a été supprimé avec succès.",
      });
    }
    setIsLocationDeleteDialogOpen(false);
    setLocationToDelete(null);
  };

  // Gestionnaires d'événements pour les services
  const handleServiceSubmit = (values: any) => {
    if (serviceToEdit) {
      setServices(services.map(s => s.id === serviceToEdit.id ? values : s));
      toast({
        title: "Service modifié",
        description: "Le service a été modifié avec succès.",
      });
    } else {
      const newService = {
        ...values,
        id: Math.max(0, ...services.map(s => s.id)) + 1,
      };
      setServices([...services, newService]);
      toast({
        title: "Service ajouté",
        description: "Le service a été ajouté avec succès.",
      });
    }
    setIsServiceDialogOpen(false);
    setServiceToEdit(null);
  };

  const handleServiceDelete = (id: number) => {
    setServiceToDelete(id);
    setIsServiceDeleteDialogOpen(true);
  };

  const confirmServiceDelete = () => {
    if (serviceToDelete) {
      setServices(services.filter(s => s.id !== serviceToDelete));
      toast({
        title: "Service supprimé",
        description: "Le service a été supprimé avec succès.",
      });
    }
    setIsServiceDeleteDialogOpen(false);
    setServiceToDelete(null);
  };

  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Paramètres</h1>
        
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Gestion des utilisateurs</TabsTrigger>
            <TabsTrigger value="password">Changer le mot de passe</TabsTrigger>
            <TabsTrigger value="locations">Emplacements</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="company">Société</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card className="p-6">
              <UserManagementForm />
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card className="p-6">
              <PasswordChangeForm />
            </Card>
          </TabsContent>

          <TabsContent value="locations">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Emplacements</h2>
                <Button onClick={() => setIsLocationDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter un emplacement
                </Button>
              </div>
              <LocationTable
                locations={locations}
                onEdit={(location) => {
                  setLocationToEdit(location);
                  setIsLocationDialogOpen(true);
                }}
                onDelete={handleLocationDelete}
              />
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Services</h2>
                <Button onClick={() => setIsServiceDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter un service
                </Button>
              </div>
              <ServiceTable
                services={services}
                onEdit={(service) => {
                  setServiceToEdit(service);
                  setIsServiceDialogOpen(true);
                }}
                onDelete={handleServiceDelete}
              />
            </Card>
          </TabsContent>

          <TabsContent value="company">
            <CompanySettingsForm />
          </TabsContent>
        </Tabs>

        <LocationDialogs
          isDialogOpen={isLocationDialogOpen}
          setIsDialogOpen={setIsLocationDialogOpen}
          isDeleteDialogOpen={isLocationDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsLocationDeleteDialogOpen}
          locationToEdit={locationToEdit}
          onSubmit={handleLocationSubmit}
          onCancel={() => {
            setIsLocationDialogOpen(false);
            setLocationToEdit(null);
          }}
          onConfirmDelete={confirmLocationDelete}
        />

        <ServiceDialogs
          isDialogOpen={isServiceDialogOpen}
          setIsDialogOpen={setIsServiceDialogOpen}
          isDeleteDialogOpen={isServiceDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsServiceDeleteDialogOpen}
          serviceToEdit={serviceToEdit}
          onSubmit={handleServiceSubmit}
          onCancel={() => {
            setIsServiceDialogOpen(false);
            setServiceToEdit(null);
          }}
          onConfirmDelete={confirmServiceDelete}
        />
      </motion.div>
    </div>
  );
};

export default Settings;