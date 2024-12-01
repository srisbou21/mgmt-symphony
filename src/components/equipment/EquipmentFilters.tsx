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
  filters: Partial<Equipment>;
  onFilterChange: (key: keyof Equipment, value: string) => void;
}

export const EquipmentFilters = ({ filters, onFilterChange }: EquipmentFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      <Input
        placeholder="Nom..."
        value={filters.name || ""}
        onChange={(e) => onFilterChange("name", e.target.value)}
      />
      <Select
        value={filters.type || undefined}
        onValueChange={(value) => onFilterChange("type", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Type d'équipement" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">Tous les types</SelectItem>
          {equipmentTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="N° Série..."
        value={filters.serialNumber || ""}
        onChange={(e) => onFilterChange("serialNumber", e.target.value)}
      />
      <Input
        placeholder="N° Inventaire..."
        value={filters.inventoryNumber || ""}
        onChange={(e) => onFilterChange("inventoryNumber", e.target.value)}
      />
      <Input
        placeholder="Emplacement..."
        value={filters.location || ""}
        onChange={(e) => onFilterChange("location", e.target.value)}
      />
      <Input
        placeholder="Fournisseur..."
        value={filters.supplier || ""}
        onChange={(e) => onFilterChange("supplier", e.target.value)}
      />
    </div>
  );
};