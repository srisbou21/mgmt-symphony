import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  details: string;
  description: string;
  link?: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  details,
  description,
}: StatCardProps) => {
  return (
    <Card className="p-6 card-hover transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-dmg-muted hover:text-dmg-dark button-hover"
            >
              Voir plus
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${color}`} />
                {title}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-dmg-muted">{description}</p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Statistiques</h3>
                <p className="text-2xl font-bold text-dmg-dark">{value}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <h3 className="font-semibold text-dmg-muted mb-1">{title}</h3>
      <p className="text-2xl font-bold text-dmg-dark">{value}</p>
    </Card>
  );
};