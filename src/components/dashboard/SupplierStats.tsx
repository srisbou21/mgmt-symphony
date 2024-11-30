import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Package, FileText } from "lucide-react";

const supplierStats = [
  {
    title: "Fournisseurs actifs",
    value: "24",
    icon: Building2,
    color: "bg-blue-100 text-blue-600",
    description: "Fournisseurs avec contrats en cours"
  },
  {
    title: "Commandes en cours",
    value: "12",
    icon: Package,
    color: "bg-green-100 text-green-600",
    description: "Commandes en attente de livraison"
  },
  {
    title: "Contrats à renouveler",
    value: "3",
    icon: FileText,
    color: "bg-yellow-100 text-yellow-800",
    description: "Contrats arrivant à échéance"
  }
];

export const SupplierStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {supplierStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${stat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};