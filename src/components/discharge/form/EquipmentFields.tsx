import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Equipment } from "@/types/equipment";
import { Plus, Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface EquipmentFieldsProps {
  form: UseFormReturn<any>;
  equipments: Equipment[];
  items: any[];
  setItems: (items: any[]) => void;
}

export function EquipmentFields({ form, equipments, items, setItems }: EquipmentFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Équipements</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => setItems([...items, { equipmentId: 0, quantity: 1 }])}
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un équipement
        </Button>
      </div>

      {items.map((item, index) => {
        const selectedEquipment = equipments.find(e => e.id === Number(form.getValues(`items.${index}.equipmentId`)));
        
        return (
          <div key={index} className="space-y-4 p-4 border rounded-lg relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setItems(items.filter((_, i) => i !== index))}
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <FormField
              control={form.control}
              name={`items.${index}.equipmentId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Équipement {index + 1}</FormLabel>
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

            {selectedEquipment && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm">
                    <span className="font-medium">Type : </span>
                    {selectedEquipment.type}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Catégorie : </span>
                    {selectedEquipment.category}
                  </div>
                </div>
              </>
            )}

            <FormField
              control={form.control}
              name={`items.${index}.quantity`}
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

            <FormField
              control={form.control}
              name={`items.${index}.serialNumber`}
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
              name={`items.${index}.inventoryNumber`}
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
          </div>
        );
      })}
    </div>
  );
}