import { Server, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceHeaderProps {
  onAddClick: () => void;
}

export const ServiceHeader = ({ onAddClick }: ServiceHeaderProps) => {
  return (
    <header className="mb-8">
      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-dmg-accent/10 text-dmg-accent text-sm font-medium mb-4">
        <Server className="w-4 h-4 mr-2" />
        Gestion des services
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-dmg-dark">
          Services
        </h1>
        <Button onClick={onAddClick} className="gap-2">
          <Plus className="w-4 h-4" />
          Ajouter un service
        </Button>
      </div>
      <p className="text-dmg-muted text-lg mb-6">
        Gérez les services de votre organisation
      </p>
    </header>
  );
};