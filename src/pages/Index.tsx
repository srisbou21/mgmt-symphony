import { Equipment } from "@/types/equipment";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EquipmentTable } from "@/components/equipment/EquipmentTable";
import { AddEquipmentForm } from "@/components/equipment/AddEquipmentForm";
import { useToast } from "@/components/ui/use-toast";

const mockEquipments: Equipment[] = [
  {
    id: 1,
    name: "Ordinateur portable Dell XPS",
    type: "Informatique",
    category: "Matériel",
    status: "En service",
    location: "Bureau 201",
    service: "Service Informatique",
    supplier: "Dell",
    serialNumbers: [
      { id: 1, number: "XPS-2024-001", inventoryNumber: "INV-2024-001", isAvailable: true, equipmentId: 1 },
      { id: 2, number: "XPS-2024-002", inventoryNumber: "INV-2024-002", isAvailable: false, equipmentId: 1 }
    ],
    lastMaintenance: "2024-01-15",
    availableQuantity: 1,
    minQuantity: 1,
    observation: "RAS"
  },
  {
    id: 2,
    name: "Imprimante HP LaserJet",
    type: "Informatique",
    category: "Matériel",
    status: "En maintenance",
    location: "Salle de reprographie",
    service: "Service Reprographie",
    supplier: "HP",
    serialNumbers: [
      { id: 3, number: "HP-2024-001", inventoryNumber: "INV-2024-003", isAvailable: true, equipmentId: 2 }
    ],
    lastMaintenance: "2024-01-16",
    availableQuantity: 1,
    minQuantity: 1,
    observation: "Maintenance préventive",
    maintenanceReason: "Maintenance préventive",
    maintenanceStartDate: "2024-02-01"
  }
];

const Index = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [equipments, setEquipments] = useState<Equipment[]>(mockEquipments);
  const [equipmentToEdit, setEquipmentToEdit] = useState<Equipment | null>(null);

  const handleSubmit = (values: Equipment) => {
    if (equipmentToEdit) {
      setEquipments(equipments.map(e => e.id === equipmentToEdit.id ? { ...values, id: equipmentToEdit.id } : e));
      toast({
        title: "Équipement modifié",
        description: "L'équipement a été mis à jour avec succès.",
      });
    } else {
      const newEquipment = { ...values, id: Math.max(0, ...equipments.map(e => e.id)) + 1 };
      setEquipments([...equipments, newEquipment]);
      toast({
        title: "Équipement ajouté",
        description: "L'équipement a été ajouté avec succès.",
      });
    }
    setIsDialogOpen(false);
    setEquipmentToEdit(null);
  };

  const handleDelete = (id: number) => {
    setEquipments(equipments.filter(e => e.id !== id));
    toast({
      title: "Équipement supprimé",
      description: "L'équipement a été supprimé avec succès.",
    });
  };

  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Équipements</h1>
            <p className="text-gray-600 mt-2">
              Gérez votre inventaire d'équipements
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un équipement
          </Button>
        </div>

        <Card className="overflow-hidden">
          <EquipmentTable
            equipments={equipments}
            onEdit={(equipment) => {
              setEquipmentToEdit(equipment);
              setIsDialogOpen(true);
            }}
            onDelete={handleDelete}
          />
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {equipmentToEdit ? "Modifier l'équipement" : "Ajouter un équipement"}
              </DialogTitle>
            </DialogHeader>
            <AddEquipmentForm
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsDialogOpen(false);
                setEquipmentToEdit(null);
              }}
              initialData={equipmentToEdit}
              suppliers={[
                { id: 1, name: "Dell" },
                { id: 2, name: "HP" },
                { id: 3, name: "Office Pro" }
              ]}
              locations={[
                { id: 1, name: "Bureau 201" },
                { id: 2, name: "Salle de réunion" },
                { id: 3, name: "Atelier" }
              ]}
              services={[
                { id: 1, name: "Service Informatique" },
                { id: 2, name: "Service Reprographie" },
                { id: 3, name: "Service Administratif" }
              ]}
            />
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Index;