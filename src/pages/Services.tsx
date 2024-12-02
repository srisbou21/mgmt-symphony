import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Service } from "@/types/service";
import { ServiceTable } from "@/components/service/ServiceTable";
import { AddServiceForm } from "@/components/service/AddServiceForm";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | undefined>();
  const { toast } = useToast();

  const handleAdd = (values: Omit<Service, "id">) => {
    const newService = {
      ...values,
      id: services.length + 1,
    };
    setServices([...services, newService]);
    setIsAddDialogOpen(false);
    toast({
      title: "Service ajouté",
      description: "Le service a été ajouté avec succès.",
    });
  };

  const handleEdit = (values: Service) => {
    setServices(services.map((s) => (s.id === values.id ? values : s)));
    setEditingService(undefined);
    toast({
      title: "Service modifié",
      description: "Les informations ont été mises à jour avec succès.",
    });
  };

  const handleDelete = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
    toast({
      title: "Service supprimé",
      description: "Le service a été supprimé avec succès.",
    });
  };

  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
            <Building2 className="w-4 h-4 mr-2" />
            Gestion des Services
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-dmg-dark">
              Services
            </h1>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un service
            </Button>
          </div>
          <p className="text-dmg-muted text-lg mb-6">
            Gérez les différents services de votre organisation
          </p>
        </header>

        <Card className="overflow-hidden">
          <ServiceTable
            services={services}
            onEdit={setEditingService}
            onDelete={handleDelete}
          />
        </Card>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajouter un service</DialogTitle>
            </DialogHeader>
            <AddServiceForm
              onSubmit={handleAdd}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingService} onOpenChange={() => setEditingService(undefined)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Modifier un service</DialogTitle>
            </DialogHeader>
            <AddServiceForm
              initialData={editingService}
              onSubmit={handleEdit}
              onCancel={() => setEditingService(undefined)}
            />
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}