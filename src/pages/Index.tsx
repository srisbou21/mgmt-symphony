import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const Index = () => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const stats = [
    {
      title: "Équipements",
      value: "1,234",
      icon: Package,
      color: "bg-dmg-accent/10 text-dmg-accent",
      details: "Gestion des équipements et des stocks",
      description: "Suivi des équipements, gestion des stocks, alertes de réapprovisionnement"
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
            Dashboard DMG
          </div>
          <h1 className="text-4xl font-bold text-dmg-dark mb-2">
            Bienvenue sur votre espace de gestion
          </h1>
          <p className="text-dmg-muted text-lg">
            Gérez efficacement vos ressources matérielles, logistiques et humaines
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
              <Card className="p-6 card-hover">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
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
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                          {stat.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-dmg-muted">{stat.description}</p>
                        <div className="mt-4">
                          <h3 className="font-semibold mb-2">Statistiques</h3>
                          <p className="text-2xl font-bold text-dmg-dark">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <h3 className="font-semibold text-dmg-muted mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-dmg-dark">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 card-hover">
            <h2 className="text-xl font-semibold mb-4">Tickets récents</h2>
            <div className="space-y-4">
              {[
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
              ].map((ticket, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-white border"
                >
                  <div>
                    <p className="font-medium text-dmg-dark">
                      {ticket.title}
                    </p>
                    <p className="text-sm text-dmg-muted">{ticket.time}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Traiter
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 card-hover">
            <h2 className="text-xl font-semibold mb-4">Alertes stocks</h2>
            <div className="space-y-4">
              {[
                {
                  item: "Papier A4",
                  stock: "5 ramettes restantes",
                  status: "Critique"
                },
                {
                  item: "Cartouches d'encre",
                  stock: "3 unités restantes",
                  status: "Faible"
                },
                {
                  item: "Fournitures bureau",
                  stock: "Stock à 15%",
                  status: "À surveiller"
                }
              ].map((alert, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-white border"
                >
                  <div>
                    <p className="font-medium text-dmg-dark">
                      {alert.item}
                    </p>
                    <p className="text-sm text-dmg-muted">{alert.stock}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Commander
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;