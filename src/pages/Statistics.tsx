import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Equipment, EquipmentTypeValue } from "@/types/equipment";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";

interface EquipmentTypeStats {
  type: EquipmentTypeValue;
  count: number;
}

interface DetailedStats {
  name: string;
  quantity: number;
  location: string;
  status: string;
}

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8",
  "#82CA9D", "#FFC658", "#FF7C43",
];

const Statistics = () => {
  const [typeStats, setTypeStats] = useState<EquipmentTypeStats[]>([]);
  const [selectedType, setSelectedType] = useState<EquipmentTypeValue | null>(null);
  const [detailedStats, setDetailedStats] = useState<DetailedStats[]>([]);

  const mockEquipments: Equipment[] = [
    {
      id: 1,
      name: "Ordinateur portable Dell XPS",
      type: "Informatique",
      category: "Matériel",
      status: "En service",
      location: "Bureau 201",
      service: "Service Informatique",
      supplier: "Dell",
      serialNumbers: [
        { id: 1, number: "XPS-2024-001", inventoryNumber: "INV-2024-001", isAvailable: true, equipmentId: 1 }
      ],
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
      service: "Service Reprographie",
      supplier: "HP",
      serialNumbers: [
        { id: 2, number: "HP-2024-001", inventoryNumber: "INV-2024-002", isAvailable: true, equipmentId: 2 }
      ],
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
      service: "Service Administratif",
      supplier: "Office Pro",
      serialNumbers: [
        { id: 3, number: "DESK-2024-001", inventoryNumber: "INV-2024-003", isAvailable: true, equipmentId: 3 }
      ],
      observation: "",
      availableQuantity: 2,
      minQuantity: 1,
      lastMaintenance: "2024-01-12",
    },
  ];

  useEffect(() => {
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

  const handleTypeClick = (type: EquipmentTypeValue) => {
    setSelectedType(type);
    const filteredEquipments = mockEquipments.filter(eq => eq.type === type);
    const detailed = filteredEquipments.map(eq => ({
      name: eq.name,
      quantity: eq.availableQuantity,
      location: eq.location,
      status: eq.status
    }));
    setDetailedStats(detailed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Statistiques des Équipements</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Répartition par type</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeStats}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                    onClick={(entry) => handleTypeClick(entry.type)}
                    className="cursor-pointer"
                  >
                    {typeStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedType ? `Détails pour ${selectedType}` : 'Sélectionnez un type'}
            </h2>
            {selectedType && (
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={detailedStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantity" fill="#8884d8" name="Quantité" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </div>

        {selectedType && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Liste détaillée</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Équipement</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Emplacement</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detailedStats.map((stat, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{stat.name}</TableCell>
                    <TableCell>{stat.quantity}</TableCell>
                    <TableCell>{stat.location}</TableCell>
                    <TableCell>{stat.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default Statistics;
