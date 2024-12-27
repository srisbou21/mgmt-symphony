import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddDischargeForm } from "@/components/discharge/AddDischargeForm";
import { DischargeHeader } from "@/components/discharge/DischargeHeader";
import { DischargeTable } from "@/components/discharge/DischargeTable";
import { DischargeFilters } from "@/components/discharge/DischargeFilters";
import { Discharge as DischargeType } from "@/types/discharge";
import { Staff } from "@/types/staff";
import { Equipment } from "@/types/equipment";

const Discharge = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDischarge, setSelectedDischarge] = useState<DischargeType | null>(null);
  const [filters, setFilters] = useState({
    dischargeNumber: "",
    status: "all",
    dischargeDate: undefined as Date | undefined,
    category: "all",
    service: "all",
  });

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
      service: "Service Informatique",
      supplier: "Dell",
      serialNumbers: [
        { id: 1, number: "XPS-2024-001", inventoryNumber: "INV-2024-001", isAvailable: true, equipmentId: 1 }
      ],
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
      service: "Service Reprographie",
      supplier: "HP",
      serialNumbers: [
        { id: 2, number: "HP-2024-001", inventoryNumber: "INV-2024-002", isAvailable: true, equipmentId: 2 }
      ],
      observation: "",
      availableQuantity: 0,
      minQuantity: 0,
      lastMaintenance: "2024-01-15",
    },
  ];

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

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

  const filteredDischarges = mockEquipments.filter((equipment) => {
    const matchesNumber = !filters.dischargeNumber || equipment.serialNumbers.some(sn => sn.inventoryNumber?.includes(filters.dischargeNumber));
    const matchesStatus = filters.status === "all" || equipment.status === filters.status;
    const matchesCategory = filters.category === "all" || equipment.category === filters.category;
    const matchesService = filters.service === "all"; // Add service filtering logic when available
    const matchesDate = !filters.dischargeDate || equipment.lastMaintenance === filters.dischargeDate?.toISOString().split('T')[0];
    
    return matchesNumber && matchesStatus && matchesCategory && matchesService && matchesDate;
  });

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

        <DischargeFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <DischargeTable 
          equipments={filteredDischarges}
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
