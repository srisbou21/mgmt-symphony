import { MainStats } from "@/components/dashboard/MainStats";
import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { SupplierStats } from "@/components/dashboard/SupplierStats";
import { Layout } from "@/components/layout/Layout";

const recentTickets = [
  {
    title: "Maintenance imprimante",
    time: "Il y a 2 heures",
    status: "En attente",
    priority: "Haute"
  },
  {
    title: "Problème PC portable",
    time: "Il y a 3 heures",
    status: "En cours",
    priority: "Moyenne"
  }
];

const stockAlerts = [
  {
    title: "Cartouches d'encre HP",
    stock: "Stock faible",
    currentQuantity: 2,
    minQuantity: 5
  },
  {
    title: "Papier A4",
    stock: "Stock critique",
    currentQuantity: 1,
    minQuantity: 10
  }
];

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600">
              Bienvenue dans votre système de gestion d'équipements
            </p>
          </div>

          <MainStats />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActivityCard
              title="Tickets récents"
              items={recentTickets}
              type="tickets"
            />
            <ActivityCard
              title="Alertes de stock"
              items={stockAlerts}
              type="alerts"
            />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">Aperçu des fournisseurs</h2>
            <SupplierStats />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;