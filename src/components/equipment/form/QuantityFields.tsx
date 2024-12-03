import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface QuantityFieldsProps {
  form: UseFormReturn<any>;
}

export function QuantityFields({ form }: QuantityFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="availableQuantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantité disponible</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="0"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="minQuantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantité minimale (Alerte)</FormLabel>
            <FormControl>
              <Input 
                type="number"
                min="0"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}