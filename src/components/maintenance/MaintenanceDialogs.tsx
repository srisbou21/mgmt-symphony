import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AddMaintenanceForm } from "./AddMaintenanceForm";
import { Equipment, Location } from "@/types/equipment";
import { MaintenanceFormData } from "@/types/maintenance";
import { useToast } from "@/components/ui/use-toast";

interface MaintenanceDialogsProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  selectedEquipment: Equipment | null;
  maintenanceToEdit: MaintenanceFormData | null;
  onSubmit: (values: MaintenanceFormData) => void;
  onCancel: () => void;
  onConfirmDelete: () => void;
  locations: Location[];
}

export const MaintenanceDialogs = ({
  isDialogOpen,
  setIsDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedEquipment,
  maintenanceToEdit,
  onSubmit,
  onCancel,
  onConfirmDelete,
  locations
}: MaintenanceDialogsProps) => {
  const { toast } = useToast();

  const handleSubmit = async (values: MaintenanceFormData) => {
    try {
      await onSubmit(values);
      toast({
        title: maintenanceToEdit ? "Maintenance modifiée" : "Maintenance ajoutée",
        description: maintenanceToEdit 
          ? "La maintenance a été modifiée avec succès."
          : "La maintenance a été ajoutée avec succès.",
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
        title: "Maintenance terminée",
        description: "La maintenance a été terminée avec succès.",
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
              {maintenanceToEdit ? "Modifier la maintenance" : "Ajouter une maintenance"}
            </DialogTitle>
          </DialogHeader>
          {selectedEquipment && (
            <AddMaintenanceForm 
              onSubmit={handleSubmit}
              onCancel={onCancel}
              equipmentId={selectedEquipment.id}
              locations={locations}
              initialData={maintenanceToEdit || undefined}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Terminer la maintenance ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cet équipement sera retiré de la liste des maintenances. Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};