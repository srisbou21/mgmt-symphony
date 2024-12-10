import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { StockAlerts } from "@/components/alerts/StockAlerts";
import {
  Package,
  Wrench,
  Users,
  FileText,
  Settings,
  BarChart3,
  Upload,
  Calendar as CalendarIcon,
  Truck,
  BellDot
} from "lucide-react";
import { Equipment } from "@/types/equipment";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

// Mock data pour les équipements avec stock bas
const mockEquipments: Equipment[] = [
  {
    id: 1,
    name: "Ordinateur portable Dell XPS",
    type: "Informatique",
    availableQuantity: 2,
    minQuantity: 5,
    category: "Matériel",
    status: "En service",
    location: "Bureau 201",
    service: "Service Informatique",
    supplier: "Dell",
    serialNumbers: [
      { number: "XPS-2024-001", inventoryNumber: "INV-2024-001", isAvailable: true },
      { number: "XPS-2024-002", inventoryNumber: "INV-2024-002", isAvailable: false }
    ],
    lastMaintenance: "2024-01-15",
  },
  {
    id: 2,
    name: "Imprimante HP LaserJet",
    type: "Informatique",
    availableQuantity: 1,
    minQuantity: 3,
    category: "Matériel",
    status: "En service",
    location: "Bureau 202",
    service: "Service Reprographie",
    supplier: "HP",
    serialNumbers: [
      { number: "HP-2024-001", inventoryNumber: "INV-2024-003", isAvailable: true }
    ],
    lastMaintenance: "2024-01-16",
  }
];

const menuItems = [
  {
    title: "Équipements",
    description: "Gérer les équipements et leur inventaire",
    icon: Package,
    path: "/equipment",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Statistiques",
    description: "Consulter les statistiques par type",
    icon: BarChart3,
    path: "/statistics",
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Maintenance",
    description: "Suivre les maintenances et réparations",
    icon: Wrench,
    path: "/maintenance-equipment",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Personnel",
    description: "Gérer les équipes et les accès",
    icon: Users,
    path: "/staff",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Décharges",
    description: "Gérer les sorties d'équipements",
    icon: Upload,
    path: "/discharge",
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Inventaire",
    description: "Suivre les stocks et les mouvements",
    icon: FileText,
    path: "/inventory",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Fournisseurs",
    description: "Gérer les fournisseurs",
    icon: Truck,
    path: "/suppliers",
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Calendrier",
    description: "Gérer les réservations",
    icon: CalendarIcon,
    path: "/calendar",
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Paramètres",
    description: "Configurer l'application",
    icon: Settings,
    path: "/settings",
    color: "bg-gray-100 text-gray-600",
  },
];

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    const hasLowStock = mockEquipments.some(
      equipment => equipment.availableQuantity <= equipment.minQuantity
    );

    if (hasLowStock) {
      toast({
        title: "Alerte stock",
        description: "Certains équipements sont en quantité critique",
        variant: "destructive",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="text-center mb-12">
          <div className="flex justify-end mb-4">
            {mockEquipments.some(eq => eq.availableQuantity <= eq.minQuantity) && (
              <Link to="/inventory" className="inline-flex items-center text-red-600">
                <BellDot className="h-6 w-6 mr-2 animate-pulse" />
                <span>Alertes stock</span>
              </Link>
            )}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Gestion des Moyens Généraux
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 mb-8"
          >
            Plateforme centralisée pour la gestion des équipements et des ressources
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={item.path}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <Button variant="ghost" className="w-full mt-4">
                      Accéder
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <StockAlerts equipments={mockEquipments} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;