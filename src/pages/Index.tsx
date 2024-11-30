import { motion } from "framer-motion";
import { MainStats } from "@/components/dashboard/MainStats";
import { SupplierStats } from "@/components/dashboard/SupplierStats";
import { ActivityCard } from "@/components/dashboard/ActivityCard";

// Mock user role for demonstration
const userRole = "admin";

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

        <MainStats />
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Gestion des fournisseurs</h2>
          <SupplierStats />
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