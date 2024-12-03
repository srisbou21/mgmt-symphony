import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface IdentificationFieldsProps {
  form: UseFormReturn<any>;
}

export function IdentificationFields({ form }: IdentificationFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="serialNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>N° Série</FormLabel>
            <FormControl>
              <Input placeholder="Ex: XPS-2024-001" {...field} />
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
              <Input placeholder="Ex: INV-2024-001" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}