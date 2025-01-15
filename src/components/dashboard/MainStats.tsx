import { motion } from "framer-motion";
import { StatCard } from "./StatCard";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Package, 
  Wrench, 
  Users, 
  FileText, 
  Calendar,
  Bell,
  BarChart3,
  BellDot,
  Mail,
  FileSignature,
  Files
} from "lucide-react";
import { Equipment } from "@/types/equipment";

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
      {
        id: 1,
        number: "XPS-2024-001",
        inventoryNumber: "INV-2024-001",
        isAvailable: true,
        equipmentId: 1
      }
    ],
    lastMaintenance: "2024-01-15",
  }
];

const hasLowStockAlerts = (equipments: Equipment[]) => {
  return equipments.some(equipment => equipment.availableQuantity <= equipment.minQuantity);
};

const stats = [
  {
    title: "Équipements",
    value: "1,234",
    icon: hasLowStockAlerts(mockEquipments) ? BellDot : Package,
    color: hasLowStockAlerts(mockEquipments) ? "bg-red-100 text-red-600" : "bg-dmg-accent/10 text-dmg-accent",
    details: "Gestion des équipements et des stocks",
    description: "Suivi des équipements, gestion des stocks, alertes de réapprovisionnement",
    link: "/equipment"
  },
  {
    title: "Maintenance",
    value: "56",
    icon: Wrench,
    color: "bg-green-100 text-green-600",
    details: "Suivi des maintenances",
    description: "Maintenance préventive et curative, suivi des interventions",
    link: "/maintenance"
  },
  {
    title: "Documents",
    value: "145",
    icon: Files,
    color: "bg-purple-100 text-purple-600",
    details: "Gestion documentaire",
    description: "Stockage, partage et signature de documents",
    link: "/documents"
  },
  {
    title: "Personnel",
    value: "45",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    details: "Gestion du personnel",
    description: "Plannings, congés, formations et certifications",
    link: "/staff"
  },
  {
    title: "Signatures",
    value: "89",
    icon: FileSignature,
    color: "bg-orange-100 text-orange-600",
    details: "Signatures électroniques",
    description: "Signature et validation de documents",
    link: "/signatures"
  },
  {
    title: "Planning",
    value: "12",
    icon: Calendar,
    color: "bg-pink-100 text-pink-600",
    details: "Planning et réservations",
    description: "Réservation des salles, planning des interventions",
    link: "/planning"
  },
  {
    title: "Messages",
    value: "34",
    icon: Mail,
    color: "bg-yellow-100 text-yellow-600",
    details: "Messagerie interne",
    description: "Communication entre les équipes",
    link: "/messages"
  },
  {
    title: "Rapports",
    value: "8",
    icon: BarChart3,
    color: "bg-cyan-100 text-cyan-600",
    details: "Rapports et analyses",
    description: "Tableaux de bord, KPIs et génération de rapports",
    link: "/reports"
  }
];

export const MainStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link to={stat.link || "#"}>
            <StatCard {...stat} />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
