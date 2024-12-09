import React from 'react';
import { useZxing } from 'react-zxing';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface BarcodeScannerProps {
  onScan: (data: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const BarcodeScanner = ({ onScan, isOpen, onClose }: BarcodeScannerProps) => {
  const { toast } = useToast();

  const { ref } = useZxing({
    onDecodeResult(result) {
      const data = result.getText();
      onScan(data);
      toast({
        title: "Code-barres scanné",
        description: `Code lu: ${data}`,
      });
      onClose();
    },
    onError(error) {
      console.error("Scanner error:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la lecture du code-barres",
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scanner un code-barres</DialogTitle>
        </DialogHeader>
        <div className="min-h-[300px] flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[300px] aspect-video mb-4">
            <video ref={ref} className="w-full h-full object-cover rounded-lg" />
          </div>
          <Button onClick={onClose} className="mt-4">Fermer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};