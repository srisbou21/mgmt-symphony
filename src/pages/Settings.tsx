import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon, MapPin, Server, Type } from "lucide-react";
import { LocationTable } from "@/components/locations/LocationTable";
import { LocationHeader } from "@/components/locations/LocationHeader";
import { LocationDialogs } from "@/components/locations/LocationDialogs";
import { ServiceTable } from "@/components/service/ServiceTable";
import { ServiceHeader } from "@/components/service/ServiceHeader";
import { ServiceDialogs } from "@/components/service/ServiceDialogs";
import { EquipmentTypeTable } from "@/components/equipment-type/EquipmentTypeTable";
import { EquipmentTypeHeader } from "@/components/equipment-type/EquipmentTypeHeader";
import { EquipmentTypeDialogs } from "@/components/equipment-type/EquipmentTypeDialogs";
import { useEffect, useState } from "react";
import { Location } from "@/types/equipment";
import { Service } from "@/types/service";
import { EquipmentType } from "@/types/equipment";
import { useToast } from "@/components/ui/use-toast";

const STORAGE_KEYS = {
  LOCATIONS: 'locations',
  SERVICES: 'services',
  EQUIPMENT_TYPES: 'equipmentTypes'
};

const Settings = () => {
  const { toast } = useToast();
  
  // États pour les emplacements
  const [locations, setLocations] = useState<Location[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOCATIONS);
    return saved ? JSON.parse(saved) : [];
  });
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [isLocationDeleteDialogOpen, setIsLocationDeleteDialogOpen] = useState(false);
  const [locationToEdit, setLocationToEdit] = useState<Location | null>(null);

  // États pour les services
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : [];
  });
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isServiceDeleteDialogOpen, setIsServiceDeleteDialogOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  // États pour les types d'équipement
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EQUIPMENT_TYPES);
    return saved ? JSON.parse(saved) : [];
  });
  const [isEquipmentTypeDialogOpen, setIsEquipmentTypeDialogOpen] = useState(false);
  const [isEquipmentTypeDeleteDialogOpen, setIsEquipmentTypeDeleteDialogOpen] = useState(false);
  const [equipmentTypeToEdit, setEquipmentTypeToEdit] = useState<EquipmentType | null>(null);

  // Sauvegarder les données dans le localStorage quand elles changent
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOCATIONS, JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EQUIPMENT_TYPES, JSON.stringify(equipmentTypes));
  }, [equipmentTypes]);

  // Gestionnaires d'événements pour les emplacements
  const handleLocationSubmit = (values: any) => {
    if (locationToEdit) {
      setLocations(locations.map(l => l.id === locationToEdit.id ? { ...values, id: locationToEdit.id } : l));
      toast({
        title: "Emplacement modifié",
        description: "L'emplacement a été mis à jour avec succès."
      });
    } else {
      setLocations([...locations, { ...values, id: Date.now() }]);
      toast({
        title: "Emplacement ajouté",
        description: "Le nouvel emplacement a été créé avec succès."
      });
    }
    setIsLocationDialogOpen(false);
    setLocationToEdit(null);
  };

  const handleLocationDelete = () => {
    if (locationToEdit) {
      setLocations(locations.filter(l => l.id !== locationToEdit.id));
      toast({
        title: "Emplacement supprimé",
        description: "L'emplacement a été supprimé avec succès."
      });
      setIsLocationDeleteDialogOpen(false);
      setLocationToEdit(null);
    }
  };

  // Gestionnaires d'événements pour les services
  const handleServiceSubmit = (values: any) => {
    if (serviceToEdit) {
      setServices(services.map(s => s.id === serviceToEdit.id ? { ...values, id: serviceToEdit.id } : s));
      toast({
        title: "Service modifié",
        description: "Le service a été mis à jour avec succès."
      });
    } else {
      setServices([...services, { ...values, id: Date.now() }]);
      toast({
        title: "Service ajouté",
        description: "Le nouveau service a été créé avec succès."
      });
    }
    setIsServiceDialogOpen(false);
    setServiceToEdit(null);
  };

  const handleServiceDelete = () => {
    if (serviceToEdit) {
      setServices(services.filter(s => s.id !== serviceToEdit.id));
      toast({
        title: "Service supprimé",
        description: "Le service a été supprimé avec succès."
      });
      setIsServiceDeleteDialogOpen(false);
      setServiceToEdit(null);
    }
  };

  // Gestionnaires d'événements pour les types d'équipement
  const handleEquipmentTypeSubmit = (values: any) => {
    if (equipmentTypeToEdit) {
      setEquipmentTypes(types => types.map(t => t.id === equipmentTypeToEdit.id ? { ...values, id: equipmentTypeToEdit.id } : t));
      toast({
        title: "Type d'équipement modifié",
        description: "Le type d'équipement a été mis à jour avec succès."
      });
    } else {
      setEquipmentTypes([...equipmentTypes, { ...values, id: Date.now() }]);
      toast({
        title: "Type d'équipement ajouté",
        description: "Le nouveau type d'équipement a été créé avec succès."
      });
    }
    setIsEquipmentTypeDialogOpen(false);
    setEquipmentTypeToEdit(null);
  };

  const handleEquipmentTypeDelete = () => {
    if (equipmentTypeToEdit) {
      setEquipmentTypes(types => types.filter(t => t.id !== equipmentTypeToEdit.id));
      toast({
        title: "Type d'équipement supprimé",
        description: "Le type d'équipement a été supprimé avec succès."
      });
      setIsEquipmentTypeDeleteDialogOpen(false);
      setEquipmentTypeToEdit(null);
    }
  };

  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-100 text-gray-800 text-sm font-medium mb-4">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Paramètres
          </div>
          <h1 className="text-4xl font-bold text-dmg-dark mb-4">
            Paramètres
          </h1>
          <p className="text-dmg-muted text-lg">
            Gérez les paramètres de l'application
          </p>
        </header>

        <Card className="p-6">
          <Tabs defaultValue="locations">
            <TabsList className="mb-6">
              <TabsTrigger value="locations" className="gap-2">
                <MapPin className="w-4 h-4" />
                Emplacements
              </TabsTrigger>
              <TabsTrigger value="services" className="gap-2">
                <Server className="w-4 h-4" />
                Services
              </TabsTrigger>
              <TabsTrigger value="equipment-types" className="gap-2">
                <Type className="w-4 h-4" />
                Types d'équipement
              </TabsTrigger>
            </TabsList>

            <TabsContent value="locations">
              <LocationHeader onAddClick={() => setIsLocationDialogOpen(true)} />
              <LocationTable
                locations={locations}
                onEdit={(location) => {
                  setLocationToEdit(location);
                  setIsLocationDialogOpen(true);
                }}
                onDelete={(id) => {
                  const location = locations.find(l => l.id === id);
                  if (location) {
                    setLocationToEdit(location);
                    setIsLocationDeleteDialogOpen(true);
                  }
                }}
              />
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
                onConfirmDelete={handleLocationDelete}
              />
            </TabsContent>

            <TabsContent value="services">
              <ServiceHeader onAddClick={() => setIsServiceDialogOpen(true)} />
              <ServiceTable
                services={services}
                onEdit={(service) => {
                  setServiceToEdit(service);
                  setIsServiceDialogOpen(true);
                }}
                onDelete={(id) => {
                  const service = services.find(s => s.id === id);
                  if (service) {
                    setServiceToEdit(service);
                    setIsServiceDeleteDialogOpen(true);
                  }
                }}
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
                onConfirmDelete={handleServiceDelete}
              />
            </TabsContent>

            <TabsContent value="equipment-types">
              <EquipmentTypeHeader onAddClick={() => setIsEquipmentTypeDialogOpen(true)} />
              <EquipmentTypeTable
                equipmentTypes={equipmentTypes}
                onEdit={(type) => {
                  setEquipmentTypeToEdit(type);
                  setIsEquipmentTypeDialogOpen(true);
                }}
                onDelete={(id) => {
                  const type = equipmentTypes.find(t => t.id === id);
                  if (type) {
                    setEquipmentTypeToEdit(type);
                    setIsEquipmentTypeDeleteDialogOpen(true);
                  }
                }}
              />
              <EquipmentTypeDialogs
                isDialogOpen={isEquipmentTypeDialogOpen}
                setIsDialogOpen={setIsEquipmentTypeDialogOpen}
                isDeleteDialogOpen={isEquipmentTypeDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsEquipmentTypeDeleteDialogOpen}
                equipmentTypeToEdit={equipmentTypeToEdit}
                onSubmit={handleEquipmentTypeSubmit}
                onCancel={() => {
                  setIsEquipmentTypeDialogOpen(false);
                  setEquipmentTypeToEdit(null);
                }}
                onConfirmDelete={handleEquipmentTypeDelete}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
};

export default Settings;