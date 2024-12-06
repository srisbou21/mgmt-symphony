import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Equipment } from "@/types/equipment";

interface StockAlertsProps {
  equipments: Equipment[];
}

export const StockAlerts = ({ equipments }: StockAlertsProps) => {
  const lowStockEquipments = equipments.filter(
    (equipment) => equipment.availableQuantity <= equipment.minQuantity
  );

  if (lowStockEquipments.length === 0) return null;

  return (
    <div className="space-y-4">
      {lowStockEquipments.map((equipment) => (
        <Alert variant="destructive" key={equipment.id}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Alerte stock bas</AlertTitle>
          <AlertDescription>
            {equipment.name} - Quantité disponible : {equipment.availableQuantity}/{equipment.minQuantity} (minimum)
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};