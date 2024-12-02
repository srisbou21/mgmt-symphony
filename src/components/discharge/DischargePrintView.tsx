import { Discharge } from "@/types/discharge";

interface DischargePrintViewProps {
  discharge: Discharge;
  staffName: string;
  equipmentName: string;
}

export const DischargePrintView = ({ discharge, staffName, equipmentName }: DischargePrintViewProps) => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Bon de Décharge</h1>
      
      <div className="mb-8">
        <p className="mb-2">Date: {new Date(discharge.date).toLocaleDateString()}</p>
        <p className="mb-2">Type: {discharge.type}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Informations</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Personnel:</p>
            <p>{staffName}</p>
          </div>
          <div>
            <p className="font-medium">Équipement/Consommable:</p>
            <p>{equipmentName}</p>
          </div>
          <div>
            <p className="font-medium">Quantité:</p>
            <p>{discharge.quantity}</p>
          </div>
          {discharge.type === "Équipement" && (
            <>
              <div>
                <p className="font-medium">N° Série:</p>
                <p>{discharge.serialNumber || "-"}</p>
              </div>
              <div>
                <p className="font-medium">N° Inventaire:</p>
                <p>{discharge.inventoryNumber || "-"}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-16 text-right">
        <p className="mb-8">Signature:</p>
        <div className="border-t border-black inline-block w-48"></div>
      </div>
    </div>
  );
};