import { motion } from "framer-motion";
import { Package, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

// Mock data - à remplacer par des données réelles plus tard
const equipments = [
  {
    id: 1,
    name: "Ordinateur portable Dell XPS",
    type: "Informatique",
    status: "En service",
    location: "Bureau 201",
    lastMaintenance: "2024-01-15",
  },
  {
    id: 2,
    name: "Imprimante HP LaserJet",
    type: "Informatique",
    status: "En maintenance",
    location: "Salle de reprographie",
    lastMaintenance: "2024-02-01",
  },
  {
    id: 3,
    name: "Bureau ergonomique",
    type: "Mobilier",
    status: "En service",
    location: "Bureau 305",
    lastMaintenance: "2023-12-10",
  },
];

const Equipment = () => {
  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-dmg-accent/10 text-dmg-accent text-sm font-medium mb-4">
            <Package className="w-4 h-4 mr-2" />
            Gestion des équipements
          </div>
          <h1 className="text-4xl font-bold text-dmg-dark mb-4">
            Équipements
          </h1>
          <p className="text-dmg-muted text-lg mb-6">
            Gérez et suivez tous vos équipements
          </p>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dmg-muted" />
            <Input
              placeholder="Rechercher un équipement..."
              className="pl-10"
            />
          </div>
        </header>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Emplacement</TableHead>
                <TableHead>Dernière maintenance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipments.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell className="font-medium">{equipment.name}</TableCell>
                  <TableCell>{equipment.type}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        equipment.status === "En service"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {equipment.status}
                    </span>
                  </TableCell>
                  <TableCell>{equipment.location}</TableCell>
                  <TableCell>{equipment.lastMaintenance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </div>
  );
};

export default Equipment;