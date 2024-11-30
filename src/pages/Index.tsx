import { motion } from "framer-motion";
import { 
  Building2, 
  Package, 
  Wrench, 
  Users, 
  FileText, 
  Calendar,
  Bell,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityCard } from "@/components/dashboard/ActivityCard";

// Mock user role for demonstration
const userRole = "admin"; // This would come from auth context in the future

const getUserTitle = (role: string) => {
  switch (role) {
    case "admin":
      return "Directeur des Moyens Généraux";
    case "maintenance":
      return "Équipe de Maintenance";
    case "admin_staff":
      return "Personnel Administratif";
    default:
      return "Utilisateur";
  }
};

const getUserWelcomeMessage = (role: string) => {
  switch (role) {
    case "admin":
      return "Gérez efficacement l'ensemble des ressources matérielles, logistiques et humaines";
    case "maintenance":
      return "Suivez les interventions de maintenance et gérez les équipements";
    case "admin_staff":
      return "Gérez les stocks et traitez les demandes internes";
    default:
      return "Bienvenue sur votre espace de gestion";
  }
};

const stats = [
  {
    title: "Équipements",
    value: "1,234",
    icon: Package,
    color: "bg-dmg-accent/10 text-dmg-accent",
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
    description: "Maintenance préventive et curative, suivi des interventions"
  },
  {
    title: "Espaces",
    value: "89",
    icon: Building2,
    color: "bg-orange-100 text-orange-600",
    details: "Gestion des espaces",
    description: "Suivi et réservation des espaces, gestion de l'occupation"
  },
  {
    title: "Personnel",
    value: "45",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    details: "Gestion du personnel",
    description: "Plannings, congés, formations et certifications"
  },
  {
    title: "Contrats",
    value: "23",
    icon: FileText,
    color: "bg-purple-100 text-purple-600",
    details: "Gestion des contrats",
    description: "Suivi des contrats et des fournisseurs, alertes de renouvellement"
  },
  {
    title: "Planning",
    value: "12",
    icon: Calendar,
    color: "bg-pink-100 text-pink-600",
    details: "Planning et réservations",
    description: "Réservation des salles, planning des interventions"
  },
  {
    title: "Tickets",
    value: "34",
    icon: Bell,
    color: "bg-yellow-100 text-yellow-600",
    details: "Gestion des tickets",
    description: "Suivi des demandes internes et des interventions"
  },
  {
    title: "Rapports",
    value: "8",
    icon: BarChart3,
    color: "bg-cyan-100 text-cyan-600",
    details: "Rapports et analyses",
    description: "Tableaux de bord, KPIs et génération de rapports"
  }
];

const tickets = [
  {
    title: "Maintenance imprimante 3ème étage",
    time: "Il y a 2 heures",
    priority: "Urgent"
  },
  {
    title: "Réservation salle de réunion A",
    time: "Il y a 3 heures",
    priority: "Normal"
  },
  {
    title: "Demande de fournitures bureau",
    time: "Il y a 4 heures",
    priority: "Bas"
  }
];

const alerts = [
  {
    title: "Papier A4",
    stock: "5 ramettes restantes",
    status: "Critique"
  },
  {
    title: "Cartouches d'encre",
    stock: "3 unités restantes",
    status: "Faible"
  },
  {
    title: "Fournitures bureau",
    stock: "Stock à 15%",
    status: "À surveiller"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-dmg-accent/10 text-dmg-accent text-sm font-medium mb-4">
            {getUserTitle(userRole)}
          </div>
          <h1 className="text-4xl font-bold text-dmg-dark mb-2">
            Bienvenue sur votre espace de gestion
          </h1>
          <p className="text-dmg-muted text-lg">
            {getUserWelcomeMessage(userRole)}
          </p>
        </header>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityCard 
            title="Tickets récents" 
            items={tickets} 
            type="tickets" 
          />
          <ActivityCard 
            title="Alertes stocks" 
            items={alerts} 
            type="alerts" 
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
