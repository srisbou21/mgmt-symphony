import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Equipment, EquipmentType } from "@/types/equipment";

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

interface EquipmentFiltersProps {
  filters: Partial<Equipment> & { serialNumberFilter?: string; inventoryNumberFilter?: string };
  onFilterChange: (key: string, value: string) => void;
  locations: { id: number; name: string }[];
}

export const EquipmentFilters = ({ filters, onFilterChange, locations }: EquipmentFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      <Input
        placeholder="Nom..."
        value={filters.name || ""}
        onChange={(e) => onFilterChange("name", e.target.value)}
      />
      <Select
        value={filters.type || "all"}
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
        value={filters.category || "all"}
        onValueChange={(value) => onFilterChange("category", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les catégories</SelectItem>
          <SelectItem value="Consommable">Consommable</SelectItem>
          <SelectItem value="Matériel">Matériel</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="N° Série..."
        value={filters.serialNumberFilter || ""}
        onChange={(e) => onFilterChange("serialNumberFilter", e.target.value)}
      />
      <Input
        placeholder="N° Inventaire..."
        value={filters.inventoryNumberFilter || ""}
        onChange={(e) => onFilterChange("inventoryNumberFilter", e.target.value)}
      />
      <Select
        value={filters.location || "all"}
        onValueChange={(value) => onFilterChange("location", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Emplacement" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto">
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