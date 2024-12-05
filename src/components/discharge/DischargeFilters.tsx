import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

interface DischargeFiltersProps {
  filters: {
    dischargeNumber: string;
    status: string;
    dischargeDate: Date | undefined;
    category: string;
    service: string;
  };
  onFilterChange: (key: string, value: any) => void;
}

export const DischargeFilters = ({ filters, onFilterChange }: DischargeFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      <Input
        placeholder="N° Décharge..."
        value={filters.dischargeNumber}
        onChange={(e) => onFilterChange("dischargeNumber", e.target.value)}
      />
      
      <Select
        value={filters.status}
        onValueChange={(value) => onFilterChange("status", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="État" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les états</SelectItem>
          <SelectItem value="Acquisition">Acquisition</SelectItem>
          <SelectItem value="Restitution">Restitution</SelectItem>
        </SelectContent>
      </Select>

      <DatePicker
        date={filters.dischargeDate}
        onChange={(date) => onFilterChange("dischargeDate", date)}
        placeholder="Date de décharge"
      />

      <Select
        value={filters.category}
        onValueChange={(value) => onFilterChange("category", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les catégories</SelectItem>
          <SelectItem value="Matériel">Matériel</SelectItem>
          <SelectItem value="Consommable">Consommable</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.service}
        onValueChange={(value) => onFilterChange("service", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Service" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les services</SelectItem>
          <SelectItem value="IT">IT</SelectItem>
          <SelectItem value="HR">RH</SelectItem>
          <SelectItem value="Finance">Finance</SelectItem>
          <SelectItem value="Maintenance">Maintenance</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};