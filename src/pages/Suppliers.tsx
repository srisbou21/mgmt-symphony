import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SupplierTable, type Supplier } from "@/components/suppliers/SupplierTable";
import { AddSupplierForm } from "@/components/suppliers/AddSupplierForm";
import { useToast } from "@/components/ui/use-toast";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState<Supplier | null>(null);
  const { toast } = useToast();

  const handleAddSupplier = (supplier: Omit<Supplier, 'id'>) => {
    const newSupplier = {
      ...supplier,
      id: suppliers.length + 1,
    };
    setSuppliers([...suppliers, newSupplier]);
    setIsDialogOpen(false);
    toast({
      title: "Succès",
      description: "Le fournisseur a été ajouté avec succès.",
    });
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setSupplierToEdit(supplier);
    setIsDialogOpen(true);
  };

  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    toast({
      title: "Succès",
      description: "Le fournisseur a été supprimé avec succès.",
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Gestion des Fournisseurs</h1>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un fournisseur
          </Button>
        </div>

        <SupplierTable 
          suppliers={suppliers}
          onEdit={handleEditSupplier}
          onDelete={handleDeleteSupplier}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {supplierToEdit ? "Modifier le fournisseur" : "Ajouter un fournisseur"}
              </DialogTitle>
            </DialogHeader>
            <AddSupplierForm
              onSubmit={handleAddSupplier}
              onCancel={() => {
                setIsDialogOpen(false);
                setSupplierToEdit(null);
              }}
              initialData={supplierToEdit || undefined}
            />
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Suppliers;