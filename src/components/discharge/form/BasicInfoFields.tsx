import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Staff } from "@/types/staff";
import { UseFormReturn } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface BasicInfoFieldsProps {
  form: UseFormReturn<any>;
  staff: Staff[];
}

export function BasicInfoFields({ form, staff }: BasicInfoFieldsProps) {
  return (
    <div className="space-y-4">
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
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>État de la décharge</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner l'état" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Acquisition">Acquisition</SelectItem>
                <SelectItem value="Restitution">Restitution</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dischargeDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date de décharge</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "P")
                    ) : (
                      <span>Choisir une date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}