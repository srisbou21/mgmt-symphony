import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AddEquipmentForm } from "./AddEquipmentForm";
import { Equipment } from "@/types/equipment";

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
  suppliers
}: EquipmentDialogsProps) => {
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
            onSubmit={onSubmit}
            onCancel={onCancel}
            initialData={equipmentToEdit || undefined}
            suppliers={suppliers}
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
            <AlertDialogAction onClick={onConfirmDelete}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};