import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Equipment } from "@/types/equipment";
import { Staff } from "@/types/staff";
import { Discharge } from "@/types/discharge";

const formSchema = z.object({
  equipmentId: z.number(),
  staffId: z.number(),
  type: z.enum(["Équipement", "Consommable"]),
  quantity: z.number().min(1, "La quantité doit être supérieure à 0"),
  serialNumber: z.string().optional(),
  inventoryNumber: z.string().optional(),
});

interface AddDischargeFormProps {
  onSubmit: (values: Partial<Discharge>) => void;
  onCancel: () => void;
  equipments: Equipment[];
  staff: Staff[];
}

export function AddDischargeForm({ onSubmit, onCancel, equipments, staff }: AddDischargeFormProps) {
  const form = useForm<Partial<Discharge>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "Équipement",
      quantity: 1,
    },
  });

  const watchType = form.watch("type");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="staffId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personnel</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le personnel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {staff.map((person) => (
                    <SelectItem key={person.id} value={person.id.toString()}>
                      {person.firstName} {person.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="equipmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Équipement/Consommable</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner l'équipement" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {equipments.map((equipment) => (
                    <SelectItem key={equipment.id} value={equipment.id.toString()}>
                      {equipment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Équipement">Équipement</SelectItem>
                  <SelectItem value="Consommable">Consommable</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchType === "Équipement" && (
          <>
            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>N° Série</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inventoryNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>N° Inventaire</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            Créer la décharge
          </Button>
        </div>
      </form>
    </Form>
  );
}