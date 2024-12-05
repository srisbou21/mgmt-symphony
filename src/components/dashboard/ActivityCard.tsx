import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface ActivityItem {
  title: string;
  time?: string;
  stock?: string;
  status?: string;
  priority?: string;
  currentQuantity?: number;
  minQuantity?: number;
}

interface ActivityCardProps {
  title: string;
  items: ActivityItem[];
  type: "tickets" | "alerts";
}

export const ActivityCard = ({ title, items, type }: ActivityCardProps) => {
  const { toast } = useToast();

  useEffect(() => {
    // Vérifier les alertes de stock
    if (type === "alerts") {
      items.forEach(item => {
        if (item.currentQuantity !== undefined && 
            item.minQuantity !== undefined && 
            item.currentQuantity <= item.minQuantity) {
          toast({
            title: "Alerte stock",
            description: `${item.title} est en quantité critique (${item.currentQuantity}/${item.minQuantity})`,
            variant: "destructive",
          });
        }
      });
    }
  }, [items, type]);

  return (
    <Card className="p-6 card-hover">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {title}
        {type === "alerts" && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
      </h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-lg bg-white border"
          >
            <div>
              <p className="font-medium text-dmg-dark">{item.title}</p>
              <p className="text-sm text-dmg-muted">
                {type === "tickets" ? item.time : item.stock}
              </p>
              {type === "alerts" && item.currentQuantity !== undefined && item.minQuantity !== undefined && (
                <p className={`text-sm ${item.currentQuantity <= item.minQuantity ? 'text-red-500' : 'text-green-500'}`}>
                  {item.currentQuantity}/{item.minQuantity} unités
                </p>
              )}
            </div>
            <Button size="sm" variant={type === "alerts" && item.currentQuantity <= (item.minQuantity || 0) ? "destructive" : "outline"}>
              {type === "tickets" ? "Traiter" : "Commander"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};