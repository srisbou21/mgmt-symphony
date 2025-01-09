import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Equipment } from "@/types/equipment";
import { Plus, Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { DischargeItem } from "@/types/discharge";

interface EquipmentFieldsProps {
  form: UseFormReturn<any>;
  equipments: Equipment[];
  items: DischargeItem[];
  setItems: (items: DischargeItem[]) => void;
}

export function EquipmentFields({ form, equipments, items, setItems }: EquipmentFieldsProps) {
  const addNewItem = () => {
    const defaultEquipment = equipments[0];
    if (!defaultEquipment) return;

    const defaultSerialNumber = defaultEquipment.serialNumbers[0];
    if (!defaultSerialNumber) return;

    const newItem: DischargeItem = {
      equipmentId: defaultEquipment.id,
      quantity: 1,
      serialNumber: defaultSerialNumber.number,
      inventoryNumber: defaultSerialNumber.inventoryNumber,
      category: defaultEquipment.category === "Matériel" ? "Matériel" : "Consommable"
    };
    setItems([...items, newItem]);
    form.setValue(`items.${items.length}`, newItem);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Équipements</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addNewItem}
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un équipement
        </Button>
      </div>

      {items.map((item, index) => {
        const selectedEquipment = equipments.find(e => e.id === item.equipmentId);
        const availableSerialNumbers = selectedEquipment?.serialNumbers.filter(sn => sn.isAvailable) || [];
        
        return (
          <div key={index} className="space-y-4 p-4 border rounded-lg relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => {
                const newItems = items.filter((_, i) => i !== index);
                setItems(newItems);
                form.setValue('items', newItems);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <FormField
              control={form.control}
              name={`items.${index}.category`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      const filteredEquipments = equipments.filter(e => e.category === value);
                      if (filteredEquipments.length > 0) {
                        const firstEquipment = filteredEquipments[0];
                        form.setValue(`items.${index}.equipmentId`, firstEquipment.id);
                        if (firstEquipment.serialNumbers[0]) {
                          form.setValue(`items.${index}.serialNumber`, firstEquipment.serialNumbers[0].number);
                          form.setValue(`items.${index}.inventoryNumber`, firstEquipment.serialNumbers[0].inventoryNumber || '');
                        }
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Matériel">Matériel</SelectItem>
                      <SelectItem value="Consommable">Consommable</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`items.${index}.equipmentId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Équipement {index + 1}</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      const equipment = equipments.find(e => e.id === Number(value));
                      if (equipment && equipment.serialNumbers[0]) {
                        field.onChange(Number(value));
                        form.setValue(`items.${index}.serialNumber`, equipment.serialNumbers[0].number);
                        if (equipment.category === "Matériel" && equipment.serialNumbers[0].inventoryNumber) {
                          form.setValue(`items.${index}.inventoryNumber`, equipment.serialNumbers[0].inventoryNumber);
                        }
                      }
                    }}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner l'équipement" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {equipments
                        .filter(e => e.category === item.category)
                        .map((equipment) => (
                          <SelectItem key={equipment.id} value={String(equipment.id)}>
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

                <FormField
                  control={form.control}
                  name={`items.${index}.serialNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N° Série</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          const serialNumber = selectedEquipment.serialNumbers.find(sn => sn.number === value);
                          if (serialNumber && selectedEquipment.category === "Matériel") {
                            form.setValue(`items.${index}.inventoryNumber`, serialNumber.inventoryNumber || '');
                          }
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un numéro de série" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableSerialNumbers.map((sn) => (
                            <SelectItem key={sn.id} value={sn.number}>
                              {sn.number}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedEquipment.category === "Matériel" && (
                  <FormField
                    control={form.control}
                    name={`items.${index}.inventoryNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>N° Inventaire</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantité</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          {...field} 
                          onChange={e => field.onChange(Number(e.target.value))} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}