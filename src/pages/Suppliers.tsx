import { motion } from "framer-motion";
import { SupplierTable, type Supplier } from "@/components/suppliers/SupplierTable";
import { AddSupplierForm } from "@/components/suppliers/AddSupplierForm";
import { useState } from "react";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isAddingSupplier, setIsAddingSupplier] = useState(false);

  const handleAddSupplier = (supplier: Omit<Supplier, 'id'>) => {
    setSuppliers([...suppliers, { ...supplier, id: suppliers.length + 1 }]);
    setIsAddingSupplier(false);
  };

  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  const handleEditSupplier = (supplier: Supplier) => {
    // Add edit functionality here
    console.log('Editing supplier:', supplier);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Gestion des Fournisseurs</h1>
      
      {isAddingSupplier ? (
        <AddSupplierForm 
          onSubmit={handleAddSupplier}
          onCancel={() => setIsAddingSupplier(false)}
        />
      ) : (
        <SupplierTable 
          suppliers={suppliers}
          onEdit={handleEditSupplier}
          onDelete={handleDeleteSupplier}
        />
      )}
    </motion.div>
  );
};

export default Suppliers;