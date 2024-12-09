import React, { useEffect, useState } from 'react';
import { Scanner } from 'react-barcode-reader';
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
  const [error, setError] = useState<string | null>(null);

  const handleScan = (data: string) => {
    if (data) {
      onScan(data);
      toast({
        title: "Code-barres scanné",
        description: `Code lu: ${data}`,
      });
      onClose();
    }
  };

  const handleError = (err: any) => {
    setError("Erreur lors de la lecture du code-barres");
    console.error("Scanner error:", err);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scanner un code-barres</DialogTitle>
        </DialogHeader>
        <div className="min-h-[300px] flex flex-col items-center justify-center">
          {error ? (
            <div className="text-red-500 mb-4">{error}</div>
          ) : (
            <Scanner
              onScan={handleScan}
              onError={handleError}
              facingMode="environment"
            />
          )}
          <Button onClick={onClose} className="mt-4">Fermer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};