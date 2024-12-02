import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Equipment } from "@/types/equipment";

interface MaintenanceFiltersProps {
  filters: {
    inventoryNumber: string;
    location: string;
  };
  onFilterChange: (key: string, value: string) => void;
  locations: { id: number; name: string }[];
}

export const MaintenanceFilters = ({ filters, onFilterChange, locations }: MaintenanceFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Input
        placeholder="N° Inventaire..."
        value={filters.inventoryNumber}
        onChange={(e) => onFilterChange("inventoryNumber", e.target.value)}
      />
      <Select
        value={filters.location}
        onValueChange={(value) => onFilterChange("location", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Emplacement" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les emplacements</SelectItem>
          {locations.map((location) => (
            <SelectItem key={location.id} value={location.name}>
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};