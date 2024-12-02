import { Discharge } from "@/types/discharge";

interface DischargePrintViewProps {
  discharge: Discharge;
  staffName: string;
  equipmentName: string;
}

export const DischargePrintView = ({ discharge, staffName, equipmentName }: DischargePrintViewProps) => {
  const isEquipment = discharge.category === "Matériel";

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Bon de Décharge - {discharge.category}
      </h1>
      
      <div className="mb-8">
        <p className="mb-2 text-gray-700">Date: {new Date(discharge.date).toLocaleDateString()}</p>
        <p className="mb-2 text-gray-700">Type: {discharge.type}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Informations</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-600">Personnel:</p>
            <p className="text-gray-800">{staffName}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">{isEquipment ? "Équipement" : "Consommable"}:</p>
            <p className="text-gray-800">{equipmentName}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Quantité:</p>
            <p className="text-gray-800">{discharge.quantity}</p>
          </div>
          {isEquipment && (
            <>
              <div>
                <p className="font-medium text-gray-600">N° Série:</p>
                <p className="text-gray-800">{discharge.serialNumber || "-"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">N° Inventaire:</p>
                <p className="text-gray-800">{discharge.inventoryNumber || "-"}</p>
              </div>
            </>
          )}
          {discharge.attachedFile && (
            <div className="col-span-2">
              <p className="font-medium text-gray-600">Fichier joint:</p>
              <p className="text-gray-800">{discharge.attachedFile}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 text-right">
        <p className="mb-8 text-gray-600">Signature:</p>
        <div className="border-t border-gray-300 inline-block w-48"></div>
      </div>
    </div>
  );
};