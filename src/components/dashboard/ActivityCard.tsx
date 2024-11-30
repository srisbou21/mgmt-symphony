import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ActivityItem {
  title: string;
  time?: string;
  stock?: string;
  status?: string;
  priority?: string;
}

interface ActivityCardProps {
  title: string;
  items: ActivityItem[];
  type: "tickets" | "alerts";
}

export const ActivityCard = ({ title, items, type }: ActivityCardProps) => {
  return (
    <Card className="p-6 card-hover">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
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
            </div>
            <Button size="sm" variant="outline">
              {type === "tickets" ? "Traiter" : "Commander"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};