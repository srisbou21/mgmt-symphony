import { motion } from "framer-motion";
import { Building2, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { AddSupplierForm } from "@/components/suppliers/AddSupplierForm";
import { SupplierTable, type Supplier } from "@/components/suppliers/SupplierTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Suppliers = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<number | null>(null);
  const [supplierToEdit, setSupplierToEdit] = useState<Supplier | null>(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      name: "Dell",
      contact: "Jean Dupont",
      email: "jean.dupont@dell.com",
      phone: "01 23 45 67 89",
      address: "1 rue de la Paix, 75000 Paris",
      commercialRegister: "",
    },
    {
      id: 2,
      name: "HP",
      contact: "Marie Martin",
      email: "marie.martin@hp.com",
      phone: "01 98 76 54 32",
      address: "2 avenue des Champs-Élysées, 75008 Paris",
      commercialRegister: "",
    },
  ]);

  const handleAddSupplier = (values: Omit<Supplier, "id">) => {
    const newSupplier: Supplier = {
      ...values,
      id: Math.max(0, ...suppliers.map((s) => s.id)) + 1,
    };
    setSuppliers([...suppliers, newSupplier]);
    toast({
      title: "Fournisseur ajouté",
      description: "Le fournisseur a été ajouté avec succès.",
    });
    setIsDialogOpen(false);
  };

  const handleEditSupplier = (values: Supplier) => {
    setSuppliers(suppliers.map(s => s.id === values.id ? values : s));
    toast({
      title: "Fournisseur modifié",
      description: "Le fournisseur a été modifié avec succès.",
    });
    setIsDialogOpen(false);
    setSupplierToEdit(null);
  };

  const handleDeleteSupplier = (id: number) => {
    setSupplierToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (supplierToDelete) {
      setSuppliers(suppliers.filter(s => s.id !== supplierToDelete));
      toast({
        title: "Fournisseur supprimé",
        description: "Le fournisseur a été supprimé avec succès.",
      });
    }
    setIsDeleteDialogOpen(false);
    setSupplierToDelete(null);
  };

  const openEditDialog = (supplier: Supplier) => {
    setSupplierToEdit(supplier);
    setIsDialogOpen(true);
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
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-dmg-accent/10 text-dmg-accent text-sm font-medium mb-4">
            <Building2 className="w-4 h-4 mr-2" />
            Gestion des fournisseurs
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-dmg-dark">
              Fournisseurs
            </h1>
            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un fournisseur
            </Button>
          </div>
          <p className="text-dmg-muted text-lg mb-6">
            Gérez vos fournisseurs et leurs informations
          </p>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dmg-muted" />
            <Input
              placeholder="Rechercher un fournisseur..."
              className="pl-10"
            />
          </div>
        </header>

        <Card className="overflow-hidden">
          <SupplierTable 
            suppliers={suppliers} 
            onEdit={openEditDialog}
            onDelete={handleDeleteSupplier}
          />
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {supplierToEdit ? "Modifier le fournisseur" : "Ajouter un fournisseur"}
              </DialogTitle>
            </DialogHeader>
            <AddSupplierForm 
              onSubmit={supplierToEdit ? handleEditSupplier : handleAddSupplier}
              onCancel={() => {
                setIsDialogOpen(false);
                setSupplierToEdit(null);
              }}
              initialData={supplierToEdit || undefined}
            />
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action ne peut pas être annulée. Ce fournisseur sera définitivement supprimé.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </div>
  );
};

export default Suppliers;