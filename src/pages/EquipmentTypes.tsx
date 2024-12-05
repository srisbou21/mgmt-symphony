import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Equipment, EquipmentType } from "@/types/equipment";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Input } from "@/components/ui/input";

interface EquipmentTypeStats {
  type: EquipmentType;
  count: number;
}

const EquipmentTypes = () => {
  const [typeStats, setTypeStats] = useState<EquipmentTypeStats[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Simulons des données d'équipement pour la démonstration
  const mockEquipments: Equipment[] = [
    {
      id: 1,
      name: "Ordinateur portable Dell XPS",
      type: "Informatique",
      category: "Matériel",
      status: "En service",
      location: "Bureau 201",
      supplier: "Dell",
      serialNumber: "XPS-2024-001",
      inventoryNumber: "INV-2024-001",
      observation: "RAS",
      availableQuantity: 5,
      minQuantity: 2,
      lastMaintenance: "2024-01-15",
    },
    {
      id: 2,
      name: "Imprimante HP LaserJet",
      type: "Informatique",
      category: "Matériel",
      status: "En maintenance",
      location: "Salle de reprographie",
      supplier: "HP",
      serialNumber: "HP-2024-001",
      inventoryNumber: "INV-2024-002",
      observation: "",
      availableQuantity: 3,
      minQuantity: 1,
      lastMaintenance: "2024-01-14",
    },
    {
      id: 3,
      name: "Bureau ergonomique",
      type: "Mobilier",
      category: "Matériel",
      status: "En service",
      location: "Bureau 305",
      supplier: "Office Pro",
      serialNumber: "DESK-2024-001",
      inventoryNumber: "INV-2024-003",
      observation: "",
      availableQuantity: 2,
      minQuantity: 1,
      lastMaintenance: "2024-01-12",
    },
  ];

  useEffect(() => {
    // Calculer les statistiques par type
    const stats = mockEquipments.reduce((acc: EquipmentTypeStats[], equipment) => {
      const existingStat = acc.find(stat => stat.type === equipment.type);
      if (existingStat) {
        existingStat.count += equipment.availableQuantity;
      } else {
        acc.push({ type: equipment.type, count: equipment.availableQuantity });
      }
      return acc;
    }, []);

    setTypeStats(stats);
  }, []);

  const filteredStats = typeStats.filter(stat =>
    stat.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Types d'équipements</h1>
        
        <div className="mb-6">
          <Input
            placeholder="Rechercher par type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Répartition par type</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="Quantité" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Détails par type</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type d'équipement</TableHead>
                  <TableHead>Nombre total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStats.map((stat) => (
                  <TableRow key={stat.type}>
                    <TableCell className="font-medium">{stat.type}</TableCell>
                    <TableCell>{stat.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default EquipmentTypes;