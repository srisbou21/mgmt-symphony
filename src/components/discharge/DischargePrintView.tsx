import { Discharge } from "@/types/discharge";
import { Equipment } from "@/types/equipment";

interface DischargePrintViewProps {
  discharge: Discharge;
  staffName: string;
  equipments: Equipment[];
}

export const DischargePrintView = ({ discharge, staffName, equipments }: DischargePrintViewProps) => {
  const formattedDate = new Date(discharge.dischargeDate).toLocaleDateString();
  
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="border border-black">
        <div className="grid grid-cols-2">
          <div className="p-4 border-r border-black">
            <h1 className="text-lg font-bold uppercase">
              Fiche décharge matériel et outillage interne
            </h1>
          </div>
          <div className="p-4">
            <p className="font-bold">Entreprise :</p>
            <p>CSV</p>
          </div>
        </div>
      </div>

      {/* Date and Location */}
      <div className="mt-8 text-right">
        <p>EL Jadida le {formattedDate}</p>
      </div>

      {/* Sortie Info */}
      <div className="mt-4">
        <p><span className="font-bold">SORTIE :</span> =</p>
        <p><span className="font-bold">Matériel/Outillage :</span> Entreprise : CSV Sarl =</p>
      </div>

      {/* Receiver Identity */}
      <div className="mt-4 border border-black">
        <div className="bg-gray-100 p-2 border-b border-black">
          <h2 className="text-center font-bold">IDENTITE DE RECEPTEUR</h2>
        </div>
        <div className="p-4">
          <p>Le(s) sous-signé(s) confirment réception du matériel / outillage suivant :</p>
          <p className="mt-2">
            <span className="font-bold">Nom et Prénom : </span>
            {staffName}
          </p>
          <div className="flex justify-between mt-2">
            <p>
              <span className="font-bold">Date de sortie : </span>
              {formattedDate}
            </p>
            <p>
              <span className="font-bold">Destination : </span>
              {discharge.destination || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="mt-4">
        <div className="border border-black">
          <div className="bg-gray-100 p-2 border-b border-black">
            <h2 className="text-center font-bold">CARACTERISTIQUES DU MATERIELS / OUTILLAGE</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-black">
                <th className="border-r border-black p-2 text-left">Qte</th>
                <th className="border-r border-black p-2 text-left">Désignation</th>
                <th className="border-r border-black p-2 text-left">Marque</th>
                <th className="border-r border-black p-2 text-left">N° du bon D'entrée</th>
                <th className="p-2 text-left">Observation</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((equipment, index) => (
                <tr key={index} className="border-b border-black">
                  <td className="border-r border-black p-2">{discharge.items[index]?.quantity || 1}</td>
                  <td className="border-r border-black p-2">{equipment.name}</td>
                  <td className="border-r border-black p-2">{equipment.supplier || "*****"}</td>
                  <td className="border-r border-black p-2">{equipment.inventoryNumber || "*****"}</td>
                  <td className="p-2">Heure : {new Date(discharge.dischargeDate).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Signature */}
      <div className="mt-8">
        <p className="font-bold">Nom & Visa du récepteur :</p>
        <div className="mt-16 border-t border-black w-48"></div>
      </div>
    </div>
  );
};