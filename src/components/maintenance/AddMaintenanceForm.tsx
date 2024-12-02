import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Equipment, Location } from "@/types/equipment";
import { MaintenanceFormData } from "@/types/maintenance";

const formSchema = z.object({
  equipmentId: z.number(),
  maintenanceReason: z.string().min(2, "La raison doit contenir au moins 2 caractères"),
  maintenanceStartDate: z.string(),
  maintenanceEndDate: z.string().optional(),
  notes: z.string().optional(),
  location: z.string().min(1, "L'emplacement est requis"),
});

interface AddMaintenanceFormProps {
  onSubmit: (values: MaintenanceFormData) => void;
  onCancel: () => void;
  equipmentId: number;
  locations: Location[];
  initialData?: MaintenanceFormData;
}

export function AddMaintenanceForm({ onSubmit, onCancel, equipmentId, locations, initialData }: AddMaintenanceFormProps) {
  const form = useForm<MaintenanceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      equipmentId: equipmentId,
      maintenanceReason: "",
      maintenanceStartDate: new Date().toISOString().split('T')[0],
      maintenanceEndDate: "",
      notes: "",
      location: "",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <FormLabel>Date de fin prévue</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emplacement</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un emplacement" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.name}>
                      {location.name}
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
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes additionnelles</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Ajoutez des notes supplémentaires..."
                  className="resize-none"
                  {...field}
                />
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
            {initialData ? "Modifier la maintenance" : "Ajouter la maintenance"}
          </Button>
        </div>
      </form>
    </Form>
  );
}