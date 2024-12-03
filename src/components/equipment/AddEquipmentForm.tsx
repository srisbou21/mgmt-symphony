import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Equipment } from "@/types/equipment";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { IdentificationFields } from "./form/IdentificationFields";
import { StatusFields } from "./form/StatusFields";
import { QuantityFields } from "./form/QuantityFields";
import { AdditionalFields } from "./form/AdditionalFields";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const equipmentTypes = [
  "Informatique",
  "Mobilier",
  "Électroménager",
  "Outillage",
  "Véhicule",
  "Matériel médical",
  "Équipement sportif",
  "Matériel audiovisuel"
] as const;

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  type: z.enum(equipmentTypes, {
    required_error: "Veuillez sélectionner un type d'équipement",
  }),
  category: z.enum(["Consommable", "Matériel"] as const, {
    required_error: "Veuillez sélectionner une catégorie",
  }),
  status: z.enum(["En service", "En maintenance"] as const),
  location: z.string().min(2, "L'emplacement doit contenir au moins 2 caractères"),
  supplier: z.string().min(1, "Veuillez sélectionner un fournisseur"),
  serialNumber: z.string().min(1, "Le numéro de série est requis"),
  inventoryNumber: z.string().min(1, "Le numéro d'inventaire est requis"),
  observation: z.string().optional(),
  availableQuantity: z.number().min(0, "La quantité ne peut pas être négative"),
  minQuantity: z.number().min(0, "La quantité minimale ne peut pas être négative"),
  invoice: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AddEquipmentFormProps {
  onSubmit: (values: FormData) => void;
  onCancel: () => void;
  initialData?: Equipment;
  suppliers: Array<{ id: number; name: string }>;
}

export function AddEquipmentForm({ onSubmit, onCancel, initialData, suppliers }: AddEquipmentFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      type: initialData?.type || "Informatique",
      category: initialData?.category || "Matériel",
      status: initialData?.status || "En service",
      location: initialData?.location || "",
      supplier: initialData?.supplier || "",
      serialNumber: initialData?.serialNumber || "",
      inventoryNumber: initialData?.inventoryNumber || "",
      observation: initialData?.observation || "",
      availableQuantity: initialData?.availableQuantity || 0,
      minQuantity: initialData?.minQuantity || 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Informations de base</h3>
          <BasicInfoFields form={form} />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Identification</h3>
          <IdentificationFields form={form} />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Statut et emplacement</h3>
          <StatusFields form={form} />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Gestion des quantités</h3>
          <QuantityFields form={form} />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Informations complémentaires</h3>
          <AdditionalFields form={form} suppliers={suppliers} />
        </Card>

        <Separator className="my-6" />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {initialData ? "Modifier l'équipement" : "Ajouter l'équipement"}
          </Button>
        </div>
      </form>
    </Form>
  );
}