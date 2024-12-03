import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Equipment } from "@/types/equipment";

const equipmentTypes = [
  "Informatique",
  "Mobilier",
  "Électroménager",
  "Outillage",
  "Véhicule",
  "Matériel médical",
  "Équipement sportif",
  "Matériel audiovisuel"
] as const;

interface MaintenanceFiltersProps {
  filters: {
    inventoryNumber: string;
    location: string;
    type: string;
  };
  onFilterChange: (key: string, value: string) => void;
  locations: { id: number; name: string }[];
}

export const MaintenanceFilters = ({ filters, onFilterChange, locations }: MaintenanceFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Input
        placeholder="N° Inventaire..."
        value={filters.inventoryNumber}
        onChange={(e) => onFilterChange("inventoryNumber", e.target.value)}
      />
      <Select
        value={filters.type}
        onValueChange={(value) => onFilterChange("type", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Type d'équipement" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les types</SelectItem>
          {equipmentTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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