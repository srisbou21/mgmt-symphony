import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Equipment, EquipmentType, Location } from "@/types/equipment";

interface InventoryFiltersProps {
  filters: {
    name: string;
    location: string;
    category: string;
    type: string;
  };
  onFilterChange: (key: string, value: string) => void;
  locations: Location[];
}

export const InventoryFilters = ({ filters, onFilterChange, locations }: InventoryFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      <Input
        placeholder="Nom..."
        value={filters.name}
        onChange={(e) => onFilterChange("name", e.target.value)}
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
          <SelectItem value="Informatique">Informatique</SelectItem>
          <SelectItem value="Mobilier">Mobilier</SelectItem>
          <SelectItem value="Électroménager">Électroménager</SelectItem>
          <SelectItem value="Outillage">Outillage</SelectItem>
          <SelectItem value="Véhicule">Véhicule</SelectItem>
          <SelectItem value="Matériel médical">Matériel médical</SelectItem>
          <SelectItem value="Équipement sportif">Équipement sportif</SelectItem>
          <SelectItem value="Matériel audiovisuel">Matériel audiovisuel</SelectItem>
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
