import { Package, Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaintenanceHeaderProps {
  onAddClick: () => void;
  onPrintClick: () => void;
}

export function MaintenanceHeader({ onAddClick, onPrintClick }: MaintenanceHeaderProps) {
  return (
    <header className="mb-8">
      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-4">
        <Package className="w-4 h-4 mr-2" />
        Équipements en maintenance
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-dmg-dark">
          Maintenance
        </h1>
        <div className="space-x-4">
          <Button onClick={onAddClick} className="gap-2">
            <Plus className="w-4 h-4" />
            Ajouter
          </Button>
          <Button onClick={onPrintClick} variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            Imprimer
          </Button>
        </div>
      </div>
      <p className="text-dmg-muted text-lg mb-6">
        Gérez les équipements actuellement en maintenance
      </p>
    </header>
  );
}