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

const formSchema = z.object({
  staffId: z.number(),
  status: z.enum(["Acquisition", "Restitution"] as const),
  dischargeDate: z.date(),
  returnDate: z.date().optional(),
  items: z.array(z.object({
    equipmentId: z.number(),
    quantity: z.number().min(1, "La quantité doit être supérieure à 0"),
    serialNumber: z.string().optional(),
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
  // Initialize items with required fields having non-optional values
  const [items, setItems] = useState<DischargeItem[]>(initialData?.items || [{
    equipmentId: 0,
    quantity: 1,
    serialNumber: "",
    inventoryNumber: "",
  }]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staffId: initialData?.staffId || 0,
      status: initialData?.status || "Acquisition",
      dischargeDate: initialData?.dischargeDate ? new Date(initialData.dischargeDate) : new Date(),
      returnDate: initialData?.returnDate ? new Date(initialData.returnDate) : undefined,
      // Ensure default items have required fields
      items: initialData?.items || [{
        equipmentId: 0,
        quantity: 1,
        serialNumber: "",
        inventoryNumber: "",
      }],
      destination: initialData?.destination || "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const discharge: Discharge = {
      id: initialData?.id || Math.random(),
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
      </form>
    </Form>
  );
}