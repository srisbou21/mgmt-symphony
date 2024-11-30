import { motion } from "framer-motion";
import { Package, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EquipmentTable } from "@/components/equipment/EquipmentTable";
import { AddEquipmentForm } from "@/components/equipment/AddEquipmentForm";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type EquipmentType = "Informatique" | "Mobilier" | "Électroménager" | "Outillage" | "Véhicule" | "Matériel médical" | "Équipement sportif" | "Matériel audiovisuel";
type EquipmentStatus = "En service" | "En maintenance";

type Equipment = {
  id: number;
  name: string;
  type: EquipmentType;
  status: EquipmentStatus;
  location: string;
  lastMaintenance: string;
  supplier?: string;
};

type FormData = Omit<Equipment, "id" | "lastMaintenance">;

const Equipment = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<number | null>(null);
  const [equipmentToEdit, setEquipmentToEdit] = useState<Equipment | null>(null);
  const [equipments, setEquipments] = useState<Equipment[]>([
    {
      id: 1,
      name: "Ordinateur portable Dell XPS",
      type: "Informatique",
      status: "En service",
      location: "Bureau 201",
      lastMaintenance: "2024-01-15",
      supplier: "Dell",
    },
    {
      id: 2,
      name: "Imprimante HP LaserJet",
      type: "Informatique",
      status: "En maintenance",
      location: "Salle de reprographie",
      lastMaintenance: "2024-02-01",
      supplier: "HP",
    },
    {
      id: 3,
      name: "Bureau ergonomique",
      type: "Mobilier",
      status: "En service",
      location: "Bureau 305",
      lastMaintenance: "2023-12-10",
      supplier: "Steelcase",
    },
  ]);

  const handleAddEquipment = (values: FormData) => {
    const newEquipment: Equipment = {
      ...values,
      id: Math.max(0, ...equipments.map((e) => e.id)) + 1,
      lastMaintenance: new Date().toISOString().split('T')[0],
    };
    setEquipments([...equipments, newEquipment]);
    toast({
      title: "Équipement ajouté",
      description: "L'équipement a été ajouté avec succès.",
    });
    setIsDialogOpen(false);
  };

  const handleEditEquipment = (values: Equipment) => {
    setEquipments(equipments.map(eq => eq.id === values.id ? { ...values, lastMaintenance: eq.lastMaintenance } : eq));
    toast({
      title: "Équipement modifié",
      description: "L'équipement a été modifié avec succès.",
    });
    setIsDialogOpen(false);
    setEquipmentToEdit(null);
  };

  const handleDeleteEquipment = (id: number) => {
    setEquipmentToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (equipmentToDelete) {
      setEquipments(equipments.filter(eq => eq.id !== equipmentToDelete));
      toast({
        title: "Équipement supprimé",
        description: "L'équipement a été supprimé avec succès.",
      });
    }
    setIsDeleteDialogOpen(false);
    setEquipmentToDelete(null);
  };

  const openEditDialog = (equipment: Equipment) => {
    setEquipmentToEdit(equipment);
    setIsDialogOpen(true);
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
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-dmg-accent/10 text-dmg-accent text-sm font-medium mb-4">
            <Package className="w-4 h-4 mr-2" />
            Gestion des équipements
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-dmg-dark">
              Équipements
            </h1>
            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un équipement
            </Button>
          </div>
          <p className="text-dmg-muted text-lg mb-6">
            Gérez et suivez tous vos équipements
          </p>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dmg-muted" />
            <Input
              placeholder="Rechercher un équipement..."
              className="pl-10"
            />
          </div>
        </header>

        <Card className="overflow-hidden">
          <EquipmentTable 
            equipments={equipments} 
            onEdit={openEditDialog}
            onDelete={handleDeleteEquipment}
          />
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {equipmentToEdit ? "Modifier l'équipement" : "Ajouter un équipement"}
              </DialogTitle>
            </DialogHeader>
            <AddEquipmentForm 
              onSubmit={equipmentToEdit ? handleEditEquipment : handleAddEquipment}
              onCancel={() => {
                setIsDialogOpen(false);
                setEquipmentToEdit(null);
              }}
              initialData={equipmentToEdit || undefined}
            />
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action ne peut pas être annulée. Cet équipement sera définitivement supprimé.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </div>
  );
};

export default Equipment;