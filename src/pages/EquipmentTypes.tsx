import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Equipment, EquipmentType, EquipmentTypeStats } from "@/types/equipment";
import { EquipmentChart } from "@/components/equipment/stats/EquipmentChart";
import { EquipmentDetailsList } from "@/components/equipment/stats/EquipmentDetailsList";
import { equipmentTypes } from "@/types/equipment";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { PrintView, handlePrint } from "@/components/shared/PrintView";

const EquipmentTypes = () => {
  const [typeStats, setTypeStats] = useState<EquipmentTypeStats[]>([]);
  const [searchTerm, setSearchTerm] = useState("all");
  const [chartData, setChartData] = useState<any[]>([]);

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
    const stats = mockEquipments.reduce((acc: EquipmentTypeStats[], equipment) => {
      const existingStat = acc.find(stat => stat.type === equipment.type);
      if (existingStat) {
        existingStat.count += equipment.availableQuantity;
        existingStat.equipments.push(equipment);
      } else {
        acc.push({
          type: equipment.type,
          count: equipment.availableQuantity,
          equipments: [equipment]
        });
      }
      return acc;
    }, []);

    setTypeStats(stats);
  }, []);

  useEffect(() => {
    if (searchTerm && searchTerm !== "all") {
      const filteredType = typeStats.find(
        stat => stat.type === searchTerm
      );
      
      if (filteredType) {
        setChartData(filteredType.equipments.map(eq => ({
          name: eq.name,
          count: eq.availableQuantity,
          type: eq.type
        })));
      } else {
        setChartData([]);
      }
    } else {
      setChartData(typeStats.map(stat => ({
        name: stat.type,
        count: stat.count,
        type: stat.type
      })));
    }
  }, [searchTerm, typeStats]);

  const filteredStats = typeStats.filter(stat =>
    searchTerm === "all" || stat.type === searchTerm
  );

  const handlePrintClick = () => {
    const columns = [
      { header: "Type", accessor: "type" },
      { header: "Quantité totale", accessor: "count" },
      { header: "Nombre d'équipements", accessor: "equipmentCount" }
    ];

    const printData = typeStats.map(stat => ({
      type: stat.type,
      count: stat.count,
      equipmentCount: stat.equipments.length
    }));

    const printContent = (
      <PrintView
        title="Statistiques des équipements par type"
        data={printData}
        columns={columns}
      />
    );

    handlePrint(printContent);
  };

  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Types d'équipements</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrintClick}
            className="gap-2"
          >
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>
        </div>
        
        <div className="mb-6">
          <Select
            value={searchTerm}
            onValueChange={setSearchTerm}
          >
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="Sélectionner un type d'équipement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {equipmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <EquipmentChart data={chartData} searchTerm={searchTerm} />
          <EquipmentDetailsList stats={filteredStats} />
        </div>
      </motion.div>
    </div>
  );
};

export default EquipmentTypes;