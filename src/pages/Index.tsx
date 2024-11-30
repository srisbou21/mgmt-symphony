import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Package, Wrench, Users } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const stats = [
    {
      title: "Équipements",
      value: "1,234",
      icon: Package,
      color: "bg-dmg-accent/10 text-dmg-accent",
    },
    {
      title: "Maintenance",
      value: "56",
      icon: Wrench,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Espaces",
      value: "89",
      icon: Building2,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Personnel",
      value: "45",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
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
            Gérez vos ressources et suivez vos indicateurs clés
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
                  <div
                    className={`p-3 rounded-lg ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-dmg-muted hover:text-dmg-dark"
                  >
                    Voir plus
                  </Button>
                </div>
                <h3 className="font-semibold text-dmg-muted mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-dmg-dark">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 card-hover">
            <h2 className="text-xl font-semibold mb-4">Demandes récentes</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-white border"
                >
                  <div>
                    <p className="font-medium text-dmg-dark">
                      Maintenance imprimante
                    </p>
                    <p className="text-sm text-dmg-muted">Il y a 2 heures</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Traiter
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 card-hover">
            <h2 className="text-xl font-semibold mb-4">Stocks faibles</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-white border"
                >
                  <div>
                    <p className="font-medium text-dmg-dark">
                      Papier A4
                    </p>
                    <p className="text-sm text-dmg-muted">5 ramettes restantes</p>
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