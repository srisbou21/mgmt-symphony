import { Discharge } from "@/types/discharge";
import { Equipment } from "@/types/equipment";
import { QRCodeSVG } from "qrcode.react";

interface DischargePrintViewProps {
  discharge: Discharge;
  staffName: string;
  equipments: Equipment[];
}

export const DischargePrintView = ({ discharge, staffName, equipments }: DischargePrintViewProps) => {
  const formattedDate = new Date(discharge.dischargeDate).toLocaleDateString();
  const companyName = localStorage.getItem('company_name') || 'CSV';
  const companyAddress = localStorage.getItem('company_address') || '';
  const companyPhone = localStorage.getItem('company_phone') || '';
  const companyEmail = localStorage.getItem('company_email') || '';
  
  // Créer les données pour le QR code
  const qrData = JSON.stringify({
    dischargeNumber: discharge.dischargeNumber,
    date: discharge.dischargeDate,
    staff: staffName,
    items: discharge.items.map(item => ({
      equipmentId: item.equipmentId,
      serialNumber: item.serialNumber,
      category: item.category
    }))
  });

  if (discharge.status === "Restitution") {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white">
        <div className="border border-black">
          <div className="grid grid-cols-2">
            <div className="p-4 border-r border-black">
              <h1 className="text-lg font-bold uppercase">
                Fiche de restitution matériel et outillage
              </h1>
            </div>
            <div className="p-4">
              <p className="font-bold">Entreprise :</p>
              <p>{companyName}</p>
              <p className="text-sm">{companyAddress}</p>
              <p className="text-sm">{companyPhone}</p>
              <p className="text-sm">{companyEmail}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-start">
          <p>EL Jadida le {formattedDate}</p>
          <div>
            <QRCodeSVG value={qrData} size={100} />
            <p className="text-xs text-center mt-1">Scan pour vérifier</p>
          </div>
        </div>

        <div className="mt-4">
          <p><span className="font-bold">RESTITUTION :</span></p>
          <p><span className="font-bold">Matériel/Outillage :</span> Entreprise : {companyName}</p>
        </div>

        <div className="mt-4 border border-black">
          <div className="bg-gray-100 p-2 border-b border-black">
            <h2 className="text-center font-bold">IDENTITE DU RESTITUTEUR</h2>
          </div>
          <div className="p-4">
            <p>Le(s) sous-signé(s) confirment la restitution du matériel / outillage suivant :</p>
            <p className="mt-2">
              <span className="font-bold">Nom et Prénom : </span>
              {staffName}
            </p>
            <div className="flex justify-between mt-2">
              <p>
                <span className="font-bold">Date de restitution : </span>
                {formattedDate}
              </p>
              <p>
                <span className="font-bold">Provenance : </span>
                {discharge.destination || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="border border-black">
            <div className="bg-gray-100 p-2 border-b border-black">
              <h2 className="text-center font-bold">CARACTERISTIQUES DU MATERIELS / OUTILLAGE RESTITUÉ</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-black">
                  <th className="border-r border-black p-2 text-left">Qte</th>
                  <th className="border-r border-black p-2 text-left">Désignation</th>
                  <th className="border-r border-black p-2 text-left">Type</th>
                  <th className="border-r border-black p-2 text-left">Catégorie</th>
                  <th className="border-r border-black p-2 text-left">État</th>
                  <th className="p-2 text-left">Observation</th>
                </tr>
              </thead>
              <tbody>
                {equipments.map((equipment, index) => (
                  <tr key={index} className="border-b border-black">
                    <td className="border-r border-black p-2">{discharge.items[index]?.quantity || 1}</td>
                    <td className="border-r border-black p-2">{equipment.name}</td>
                    <td className="border-r border-black p-2">{equipment.type}</td>
                    <td className="border-r border-black p-2">{equipment.category}</td>
                    <td className="border-r border-black p-2">{"Bon état"}</td>
                    <td className="p-2">Heure : {new Date(discharge.dischargeDate).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <p className="font-bold">Signature du restituteur :</p>
            <div className="mt-16 border-t border-black w-48"></div>
          </div>
          <div>
            <p className="font-bold">Signature du responsable :</p>
            <div className="mt-16 border-t border-black w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white">
      <div className="border border-black">
        <div className="grid grid-cols-2">
          <div className="p-4 border-r border-black">
            <h1 className="text-lg font-bold uppercase">
              Fiche décharge matériel et outillage interne
            </h1>
          </div>
          <div className="p-4">
            <p className="font-bold">Entreprise :</p>
            <p>{companyName}</p>
            <p className="text-sm">{companyAddress}</p>
            <p className="text-sm">{companyPhone}</p>
            <p className="text-sm">{companyEmail}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-start">
        <p>EL Jadida le {formattedDate}</p>
        <div>
          <QRCodeSVG value={qrData} size={100} />
          <p className="text-xs text-center mt-1">Scan pour vérifier</p>
        </div>
      </div>

      <div className="mt-4">
        <p><span className="font-bold">SORTIE :</span></p>
        <p><span className="font-bold">Matériel/Outillage :</span> Entreprise : {companyName}</p>
      </div>

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
                <th className="border-r border-black p-2 text-left">Type</th>
                <th className="border-r border-black p-2 text-left">Catégorie</th>
                <th className="p-2 text-left">Observation</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((equipment, index) => (
                <tr key={index} className="border-b border-black">
                  <td className="border-r border-black p-2">{discharge.items[index]?.quantity || 1}</td>
                  <td className="border-r border-black p-2">{equipment.name}</td>
                  <td className="border-r border-black p-2">{equipment.type}</td>
                  <td className="border-r border-black p-2">{equipment.category}</td>
                  <td className="p-2">Heure : {new Date(discharge.dischargeDate).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <p className="font-bold">Nom & Visa du récepteur :</p>
        <div className="mt-16 border-t border-black w-48"></div>
      </div>
    </div>
  );
};
