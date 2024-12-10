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
    inventoryNumber: z.string().optional(),
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
  const [items, setItems] = useState<DischargeItem[]>(initialData?.items || []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staffId: initialData?.staffId || staff[0]?.id || 0,
      status: initialData?.status || "Acquisition",
      dischargeDate: initialData?.dischargeDate ? new Date(initialData.dischargeDate) : new Date(),
      returnDate: initialData?.returnDate ? new Date(initialData.returnDate) : undefined,
      items: items,
      destination: initialData?.destination || "",
    },
  });

  const handleScan = (scannedCode: string) => {
    const equipment = equipments.find(e => 
      e.serialNumbers.some(sn => 
        sn.number === scannedCode || 
        (e.category === "Matériel" && sn.inventoryNumber === scannedCode)
      )
    );

    if (equipment) {
      const serialNumber = equipment.serialNumbers.find(sn => 
        sn.number === scannedCode || 
        (equipment.category === "Matériel" && sn.inventoryNumber === scannedCode)
      );

      if (serialNumber && serialNumber.isAvailable) {
        const existingItemIndex = items.findIndex(item => 
          item.equipmentId === equipment.id && 
          item.serialNumber === serialNumber.number
        );

        if (existingItemIndex === -1) {
          const newItem: DischargeItem = {
            equipmentId: equipment.id,
            quantity: 1,
            serialNumber: serialNumber.number,
            inventoryNumber: equipment.category === "Matériel" ? serialNumber.inventoryNumber : undefined,
          };
          setItems([...items, newItem]);
          form.setValue('items', [...items, newItem]);

          toast({
            title: "Équipement ajouté",
            description: `${equipment.name} a été ajouté à la décharge`,
          });
        } else {
          toast({
            title: "Équipement déjà scanné",
            description: "Cet équipement est déjà dans la liste",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Équipement non disponible",
          description: "Cet équipement n'est pas disponible ou a déjà été déchargé",
          variant: "destructive",
        });
      }
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
      items: values.items,
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
        <EquipmentFields 
          form={form} 
          equipments={equipments} 
          items={items} 
          setItems={setItems} 
        />

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
