import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarcodeScanner } from "@/components/shared/BarcodeScanner";
import { Scan } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface IdentificationFieldsProps {
  form: UseFormReturn<any>;
}

export function IdentificationFields({ form }: IdentificationFieldsProps) {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanTarget, setScanTarget] = useState<"serialNumber" | "inventoryNumber" | null>(null);

  const handleScan = (data: string) => {
    if (scanTarget) {
      form.setValue(scanTarget, data);
    }
    setIsScannerOpen(false);
    setScanTarget(null);
  };

  const openScanner = (target: "serialNumber" | "inventoryNumber") => {
    setScanTarget(target);
    setIsScannerOpen(true);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="serialNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>N° Série</FormLabel>
            <div className="flex gap-2">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => openScanner("serialNumber")}
              >
                <Scan className="h-4 w-4" />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="inventoryNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>N° Inventaire</FormLabel>
            <div className="flex gap-2">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => openScanner("inventoryNumber")}
              >
                <Scan className="h-4 w-4" />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <BarcodeScanner
        isOpen={isScannerOpen}
        onClose={() => {
          setIsScannerOpen(false);
          setScanTarget(null);
        }}
        onScan={handleScan}
      />
    </div>
  );
}