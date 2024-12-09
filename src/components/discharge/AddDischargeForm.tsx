import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Equipment } from "@/types/equipment";
import { Staff } from "@/types/staff";
import { Discharge, DischargeItem } from "@/types/discharge";
import { useState } from "react";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { EquipmentFields } from "./form/EquipmentFields";
import { Button } from "@/components/ui/button";
import { BarcodeScanner } from "@/components/shared/BarcodeScanner";
import { Scan } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  staffId: z.number(),
  status: z.enum(["Acquisition", "Restitution"] as const),
  dischargeDate: z.date(),
  returnDate: z.date().optional(),
  items: z.array(z.object({
    equipmentId: z.number(),
    quantity: z.number().min(1, "La quantité doit être supérieure à 0"),
    serialNumber: z.string(),
    inventoryNumber: z.string(),
  })),
  attachedFile: z.string().optional(),
  destination: z.string().optional(),
});

interface AddDischargeFormProps {
  onSubmit: (values: Discharge) => void;
  onCancel: () => void;
  equipments: Equipment[];
  staff: Staff[];
  initialData?: Partial<Discharge>;
}

export function AddDischargeForm({ onSubmit, onCancel, equipments, staff, initialData }: AddDischargeFormProps) {
  const { toast } = useToast();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  
  // Ensure we have valid default values
  const defaultEquipmentId = equipments[0]?.id || 0;
  const defaultStaffId = staff[0]?.id || 0;
  
  const defaultItem: DischargeItem = {
    equipmentId: defaultEquipmentId,
    quantity: 1,
    serialNumber: "",
    inventoryNumber: "",
  };

  const [items, setItems] = useState<DischargeItem[]>(
    initialData?.items || [defaultItem]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staffId: initialData?.staffId || defaultStaffId,
      status: initialData?.status || "Acquisition",
      dischargeDate: initialData?.dischargeDate ? new Date(initialData.dischargeDate) : new Date(),
      returnDate: initialData?.returnDate ? new Date(initialData.returnDate) : undefined,
      items: items.map(item => ({
        equipmentId: item.equipmentId,
        quantity: item.quantity,
        serialNumber: item.serialNumber || "",
        inventoryNumber: item.inventoryNumber || "",
      })),
      destination: initialData?.destination || "",
    },
  });

  const handleScan = (scannedCode: string) => {
    // Rechercher l'équipement correspondant au code scanné
    const equipment = equipments.find(
      e => e.serialNumber === scannedCode || e.inventoryNumber === scannedCode
    );

    if (equipment) {
      // Vérifier si l'équipement est déjà dans la liste
      const existingItemIndex = items.findIndex(item => item.equipmentId === equipment.id);

      if (existingItemIndex !== -1) {
        // Incrémenter la quantité si l'équipement existe déjà
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += 1;
        setItems(updatedItems);
        form.setValue(`items.${existingItemIndex}.quantity`, updatedItems[existingItemIndex].quantity);
      } else {
        // Ajouter un nouvel équipement à la liste
        const newItem: DischargeItem = {
          equipmentId: equipment.id,
          quantity: 1,
          serialNumber: equipment.serialNumber,
          inventoryNumber: equipment.inventoryNumber,
        };
        setItems([...items, newItem]);
        form.setValue(`items`, [...items, newItem]);
      }

      toast({
        title: "Équipement ajouté",
        description: `${equipment.name} a été ajouté à la décharge`,
      });
    } else {
      toast({
        title: "Équipement non trouvé",
        description: "Aucun équipement ne correspond au code scanné",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const discharge: Discharge = {
      id: initialData?.id || Math.random(),
      dischargeNumber: Math.floor(Math.random() * 10000),
      staffId: values.staffId,
      status: values.status,
      dischargeDate: values.dischargeDate.toISOString(),
      returnDate: values.returnDate?.toISOString(),
      items: values.items.map(item => ({
        equipmentId: item.equipmentId,
        quantity: item.quantity,
        serialNumber: item.serialNumber,
        inventoryNumber: item.inventoryNumber,
      })),
      attachedFile: values.attachedFile,
      destination: values.destination,
    };
    onSubmit(discharge);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Ajouter des équipements</h3>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => setIsScannerOpen(true)}
          >
            <Scan className="w-4 h-4 mr-2" />
            Scanner un code-barres
          </Button>
        </div>

        <BasicInfoFields form={form} staff={staff} />
        <EquipmentFields form={form} equipments={equipments} items={items} setItems={setItems} />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {initialData ? "Modifier" : "Créer"} la décharge
          </Button>
        </div>

        <BarcodeScanner
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onScan={handleScan}
        />
      </form>
    </Form>
  );
}