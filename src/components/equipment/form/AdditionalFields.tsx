import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";

interface AdditionalFieldsProps {
  form: UseFormReturn<any>;
  suppliers: Array<{ id: number; name: string }>;
}

export function AdditionalFields({ form, suppliers }: AdditionalFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="supplier"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fournisseur</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un fournisseur" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.name}>
                    {supplier.name}
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
        name="observation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observation</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Ajoutez vos observations ici..."
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
        name="invoice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Facture</FormLabel>
            <Card className="p-4">
              <FormControl>
                <Input 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                    }
                  }}
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-2">
                Formats acceptés: PDF, JPG, PNG. Taille maximale: 5MB
              </p>
            </Card>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}