import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Equipment } from "@/types/equipment";
import { Message } from "@/types/message";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FileSignature } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DocumentManager } from "@/components/documents/DocumentManager";
import { DigitalSignature } from "@/components/shared/DigitalSignature";
import { EquipmentTypeChart } from "@/components/dashboard/EquipmentTypeChart";
import { StatsTable } from "@/components/dashboard/StatsTable";
import { RecentMessageCard } from "@/components/dashboard/RecentMessageCard";

const Dashboard = () => {
  const [typeStats, setTypeStats] = useState<{ type: string; count: string }[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const { toast } = useToast();

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
    const stats = mockEquipments.reduce((acc, equipment) => {
      const existingStat = acc.find(stat => stat.type === equipment.type);
      if (existingStat) {
        existingStat.count = String(parseInt(existingStat.count) + equipment.availableQuantity);
      } else {
        acc.push({ type: equipment.type, count: String(equipment.availableQuantity) });
      }
      return acc;
    }, [] as { type: string; count: string }[]);

    setTypeStats(stats);

    const mockMessages: Message[] = [
      {
        id: 1,
        senderId: 1,
        receiverId: 2,
        subject: "Maintenance planifiée",
        content: "La maintenance des équipements est prévue pour demain.",
        read: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        senderId: 3,
        receiverId: 2,
        subject: "Nouveau document",
        content: "Un nouveau document a été ajouté à la GED.",
        read: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      }
    ];

    setRecentMessages(mockMessages);
  }, []);

  const handleSignatureSave = (signatureData: string) => {
    toast({
      title: "Signature enregistrée",
      description: "La signature numérique a été sauvegardée avec succès.",
    });
    setIsSignatureDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RecentMessageCard messages={recentMessages} />

          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Signature numérique</h2>
              <Button variant="outline" size="sm" onClick={() => setIsSignatureDialogOpen(true)}>
                <FileSignature className="w-4 h-4 mr-2" />
                Signer
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Utilisez la signature numérique pour valider vos documents et décharges.
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Répartition par type</h2>
            <EquipmentTypeChart typeStats={typeStats} />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Détails par type</h2>
            <StatsTable typeStats={typeStats} />
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Documents récents</h2>
          <DocumentManager />
        </Card>

        <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Signature numérique</DialogTitle>
            </DialogHeader>
            <DigitalSignature onSave={handleSignatureSave} />
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Dashboard;
