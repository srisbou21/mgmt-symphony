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