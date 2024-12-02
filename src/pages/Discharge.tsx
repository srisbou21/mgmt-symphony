import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddDischargeForm } from "@/components/discharge/AddDischargeForm";
import { DischargeHeader } from "@/components/discharge/DischargeHeader";
import { DischargeTable } from "@/components/discharge/DischargeTable";
import { Discharge as DischargeType } from "@/types/discharge";
import { Staff } from "@/types/staff";
import { Equipment } from "@/types/equipment";

const Discharge = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDischarge, setSelectedDischarge] = useState<DischargeType | null>(null);

  const mockStaff: Staff[] = [
    { 
      id: 1, 
      firstName: "John", 
      lastName: "Doe", 
      email: "john@example.com", 
      phone: "123456789", 
      service: "IT",
      position: "Technicien" 
    },
    { 
      id: 2, 
      firstName: "Jane", 
      lastName: "Smith", 
      email: "jane@example.com", 
      phone: "987654321", 
      service: "HR",
      position: "Manager" 
    },
  ];

  const mockEquipments: Equipment[] = [
    {
      id: 1,
      name: "Ordinateur portable Dell XPS",
      type: "Informatique",
      category: "Matériel",
      status: "En maintenance",
      location: "Bureau 201",
      supplier: "Dell",
      serialNumber: "XPS-2024-001",
      inventoryNumber: "INV-2024-001",
      observation: "RAS",
      availableQuantity: 0,
      minQuantity: 0,
      lastMaintenance: "2024-01-15",
    },
    {
      id: 2,
      name: "Imprimante HP LaserJet",
      type: "Informatique",
      category: "Matériel",
      status: "En maintenance",
      location: "Salle de reprographie",
      supplier: "HP",
      serialNumber: "HP-2024-001",
      inventoryNumber: "INV-2024-002",
      observation: "",
      availableQuantity: 0,
      minQuantity: 0,
      lastMaintenance: "2024-01-15",
    },
  ];

  const handleAddDischarge = (values: Partial<DischargeType>) => {
    console.log("New discharge:", values);
    toast({
      title: "Décharge créée",
      description: "La décharge a été créée avec succès.",
    });
    setIsDialogOpen(false);
  };

  const handleEditDischarge = (values: Partial<DischargeType>) => {
    console.log("Updated discharge:", values);
    toast({
      title: "Décharge modifiée",
      description: "La décharge a été modifiée avec succès.",
    });
    setIsDialogOpen(false);
    setSelectedDischarge(null);
  };

  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <DischargeHeader 
          onAddClick={() => setIsDialogOpen(true)}
          onPrintClick={() => window.print()}
        />

        <DischargeTable 
          equipments={mockEquipments}
          onDischargeSelect={(discharge) => {
            setSelectedDischarge(discharge);
            setIsDialogOpen(true);
          }}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedDischarge ? "Modifier la décharge" : "Ajouter une décharge"}
              </DialogTitle>
            </DialogHeader>
            <AddDischargeForm
              onSubmit={selectedDischarge ? handleEditDischarge : handleAddDischarge}
              onCancel={() => {
                setIsDialogOpen(false);
                setSelectedDischarge(null);
              }}
              equipments={mockEquipments}
              staff={mockStaff}
              initialData={selectedDischarge || undefined}
            />
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Discharge;
