import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { AddDischargeForm } from "@/components/discharge/AddDischargeForm";
import { DischargePrintView } from "@/components/discharge/DischargePrintView";
import { Equipment } from "@/types/equipment";
import { Staff } from "@/types/staff";
import { Discharge } from "@/types/discharge";

const Discharge = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDischarge, setSelectedDischarge] = useState<Discharge | null>(null);
  const [discharges, setDischarges] = useState<Discharge[]>([]);

  // Exemple de données (à remplacer par les vraies données)
  const equipments: Equipment[] = [
    {
      id: 1,
      name: "Ordinateur portable",
      type: "Informatique",
      status: "En service",
      location: "Bureau 201",
      lastMaintenance: "2024-01-15",
      serialNumber: "XPS-2024-001",
      inventoryNumber: "INV-2024-001",
      availableQuantity: 5,
      minQuantity: 2,
    },
  ];

  const staff: Staff[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "123456789",
      position: "Technicien",
      service: "IT",
    },
  ];

  const handlePrint = (discharge: Discharge) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const staffMember = staff.find(s => s.id === discharge.staffId);
    const equipment = equipments.find(e => e.id === discharge.equipmentId);

    if (!staffMember || !equipment) return;

    const staffName = `${staffMember.firstName} ${staffMember.lastName}`;

    printWindow.document.write(`
      <html>
        <head>
          <title>Bon de Décharge</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <div id="print-content">
            ${document.getElementById('discharge-print-view')?.innerHTML}
          </div>
          <script>
            window.onload = () => window.print();
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleSubmit = (values: Partial<Discharge>) => {
    const newDischarge: Discharge = {
      id: Math.max(0, ...discharges.map(d => d.id)) + 1,
      date: new Date().toISOString(),
      ...values,
    } as Discharge;

    setDischarges([...discharges, newDischarge]);
    setIsDialogOpen(false);
    toast({
      title: "Décharge créée",
      description: "La décharge a été créée avec succès.",
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Décharges</h1>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle décharge
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="p-6">
            {discharges.map((discharge) => {
              const staffMember = staff.find(s => s.id === discharge.staffId);
              const equipment = equipments.find(e => e.id === discharge.equipmentId);

              return (
                <div key={discharge.id} className="flex justify-between items-center p-4 border-b last:border-0">
                  <div>
                    <p className="font-medium">
                      {staffMember?.firstName} {staffMember?.lastName} - {equipment?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(discharge.date).toLocaleDateString()} - Quantité: {discharge.quantity}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => {
                      setSelectedDischarge(discharge);
                      handlePrint(discharge);
                    }}
                  >
                    <Printer className="h-4 w-4" />
                    Imprimer
                  </Button>
                </div>
              );
            })}

            {discharges.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                Aucune décharge enregistrée
              </p>
            )}
          </div>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nouvelle décharge</DialogTitle>
            </DialogHeader>
            <AddDischargeForm
              onSubmit={handleSubmit}
              onCancel={() => setIsDialogOpen(false)}
              equipments={equipments}
              staff={staff}
            />
          </DialogContent>
        </Dialog>

        {selectedDischarge && (
          <div className="hidden">
            <div id="discharge-print-view">
              <DischargePrintView
                discharge={selectedDischarge}
                staffName={`${staff.find(s => s.id === selectedDischarge.staffId)?.firstName} ${staff.find(s => s.id === selectedDischarge.staffId)?.lastName}`}
                equipmentName={equipments.find(e => e.id === selectedDischarge.equipmentId)?.name || ""}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Discharge;