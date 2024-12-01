import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MaintenanceFormData } from "@/types/equipment";

const formSchema = z.object({
  equipmentId: z.number(),
  maintenanceReason: z.string().min(2, "La raison doit contenir au moins 2 caractères"),
  maintenanceStartDate: z.string(),
  maintenanceEndDate: z.string().optional(),
});

interface AddMaintenanceFormProps {
  onSubmit: (values: MaintenanceFormData) => void;
  onCancel: () => void;
  equipmentId: number;
}

export function AddMaintenanceForm({ onSubmit, onCancel, equipmentId }: AddMaintenanceFormProps) {
  const form = useForm<MaintenanceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      equipmentId: equipmentId,
      maintenanceReason: "",
      maintenanceStartDate: new Date().toISOString().split('T')[0],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="maintenanceReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raison de la maintenance</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Décrivez la raison de la maintenance..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maintenanceStartDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de début</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maintenanceEndDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de fin prévue (optionnel)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            Ajouter la maintenance
          </Button>
        </div>
      </form>
    </Form>
  );
}