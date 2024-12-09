import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AddEquipmentForm } from "./AddEquipmentForm";
import { Equipment } from "@/types/equipment";
import { useToast } from "@/components/ui/use-toast";

interface EquipmentDialogsProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  equipmentToEdit: Equipment | null;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  onConfirmDelete: () => void;
  suppliers: Array<{ id: number; name: string }>;
  locations: Array<{ id: number; name: string }>;
  services: Array<{ id: number; name: string }>;
}

export const EquipmentDialogs = ({
  isDialogOpen,
  setIsDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  equipmentToEdit,
  onSubmit,
  onCancel,
  onConfirmDelete,
  suppliers,
  locations,
  services
}: EquipmentDialogsProps) => {
  const { toast } = useToast();

  const handleSubmit = async (values: any) => {
    try {
      await onSubmit(values);
      toast({
        title: equipmentToEdit ? "Équipement modifié" : "Équipement ajouté",
        description: equipmentToEdit 
          ? "L'équipement a été modifié avec succès."
          : "L'équipement a été ajouté avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'opération.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await onConfirmDelete();
      toast({
        title: "Équipement supprimé",
        description: "L'équipement a été supprimé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {equipmentToEdit ? "Modifier l'équipement" : "Ajouter un équipement"}
            </DialogTitle>
          </DialogHeader>
          <AddEquipmentForm 
            onSubmit={handleSubmit}
            onCancel={onCancel}
            initialData={equipmentToEdit || undefined}
            suppliers={suppliers}
            locations={locations}
            services={services}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cet équipement sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
