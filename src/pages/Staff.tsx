import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StaffTable } from "@/components/staff/StaffTable";
import { AddStaffForm } from "@/components/staff/AddStaffForm";
import { Staff } from "@/types/staff";
import { useToast } from "@/components/ui/use-toast";
import { Service } from "@/types/service";

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | undefined>();
  const [services] = useState<Service[]>([
    { id: 1, name: "Service Informatique" },
    { id: 2, name: "Service RH" },
    { id: 3, name: "Service Commercial" },
  ]);
  const { toast } = useToast();

  const handleAdd = (values: Omit<Staff, "id">) => {
    const newStaff = {
      ...values,
      id: staff.length + 1,
    };
    setStaff([...staff, newStaff]);
    setIsAddDialogOpen(false);
    toast({
      title: "Personnel ajouté",
      description: "Le membre du personnel a été ajouté avec succès.",
    });
  };

  const handleEdit = (values: Staff) => {
    setStaff(staff.map((s) => (s.id === values.id ? values : s)));
    setEditingStaff(undefined);
    toast({
      title: "Personnel modifié",
      description: "Les informations ont été mises à jour avec succès.",
    });
  };

  const handleDelete = (id: number) => {
    setStaff(staff.filter((s) => s.id !== id));
    toast({
      title: "Personnel supprimé",
      description: "Le membre du personnel a été supprimé avec succès.",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion du Personnel</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <StaffTable
        staff={staff}
        onEdit={setEditingStaff}
        onDelete={handleDelete}
      />

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ajouter un membre du personnel</DialogTitle>
          </DialogHeader>
          <AddStaffForm
            onSubmit={handleAdd}
            onCancel={() => setIsAddDialogOpen(false)}
            services={services}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingStaff} onOpenChange={() => setEditingStaff(undefined)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier un membre du personnel</DialogTitle>
          </DialogHeader>
          {editingStaff && (
            <AddStaffForm
              initialData={editingStaff}
              onSubmit={handleEdit}
              onCancel={() => setEditingStaff(undefined)}
              services={services}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}