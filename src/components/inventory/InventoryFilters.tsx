import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InventoryFiltersProps {
  filters: {
    name: string;
    location: string;
    category: string;
    type: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export const InventoryFilters = ({ filters, onFilterChange }: InventoryFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Input
        placeholder="Nom de l'équipement..."
        value={filters.name}
        onChange={(e) => onFilterChange("name", e.target.value)}
      />
      <Input
        placeholder="Emplacement..."
        value={filters.location}
        onChange={(e) => onFilterChange("location", e.target.value)}
      />
      <Select
        value={filters.category}
        onValueChange={(value) => onFilterChange("category", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Toutes les catégories</SelectItem>
          <SelectItem value="Matériel">Matériel</SelectItem>
          <SelectItem value="Consommable">Consommable</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filters.type}
        onValueChange={(value) => onFilterChange("type", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Type d'équipement" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Tous les types</SelectItem>
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
    </div>
  );
};