import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Equipment, EquipmentTypeValue } from "@/types/equipment";
import { Message } from "@/types/message";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FileSignature, FileSpreadsheet } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DocumentManager } from "@/components/documents/DocumentManager";
import { DigitalSignature } from "@/components/shared/DigitalSignature";
import { EquipmentTypeChart } from "@/components/dashboard/EquipmentTypeChart";
import { StatsTable } from "@/components/dashboard/StatsTable";
import { RecentMessageCard } from "@/components/dashboard/RecentMessageCard";
import * as XLSX from 'xlsx';
import { supabase } from "@/integrations/supabase/client";

interface TypeStat {
  type: EquipmentTypeValue;
  count: string;
  equipments: Equipment[];
}

const Dashboard = () => {
  const [typeStats, setTypeStats] = useState<TypeStat[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleExcelImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const { error } = await supabase
          .from('equipment')
          .insert(jsonData);

        if (error) {
          toast({
            title: "Erreur d'importation",
            description: "Une erreur est survenue lors de l'importation des données.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Import réussi",
            description: "Les données ont été importées avec succès.",
          });
        }
      } catch (error) {
        toast({
          title: "Erreur de fichier",
          description: "Le fichier n'a pas pu être lu correctement.",
          variant: "destructive",
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      const { data: equipments, error } = await supabase
        .from('equipment')
        .select('*');

      if (error) {
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les équipements.",
          variant: "destructive",
        });
        return;
      }

      const stats = equipments.reduce<TypeStat[]>((acc, equipment) => {
        const existingStat = acc.find(stat => stat.type === equipment.type);
        if (existingStat) {
          const currentCount = parseInt(existingStat.count);
          existingStat.count = String(currentCount + equipment.available_quantity);
          existingStat.equipments.push(equipment as Equipment);
        } else {
          acc.push({
            type: equipment.type as EquipmentTypeValue,
            count: String(equipment.available_quantity),
            equipments: [equipment as Equipment]
          });
        }
        return acc;
      }, []);

      setTypeStats(stats);
    };

    const fetchMessages = async () => {
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les messages récents.",
          variant: "destructive",
        });
        return;
      }

      setRecentMessages(messages as Message[]);
    };

    fetchEquipments();
    fetchMessages();
  }, [toast]);

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <div className="flex gap-4">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleExcelImport}
              className="hidden"
              id="excel-import"
            />
            <label htmlFor="excel-import">
              <Button variant="outline" size="sm" asChild>
                <span>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Importer Excel
                </span>
              </Button>
            </label>
          </div>
        </div>
        
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