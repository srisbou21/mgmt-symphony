import { Discharge } from "@/types/discharge";
import { Equipment } from "@/types/equipment";
import { PrintHeader } from "./print/PrintHeader";
import { IdentitySection } from "./print/IdentitySection";
import { EquipmentTable } from "./print/EquipmentTable";
import { SignatureSection } from "./print/SignatureSection";

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

  const isRestitution = discharge.status === "Restitution";
  const title = isRestitution 
    ? "Fiche de restitution matériel et outillage"
    : "Fiche décharge matériel et outillage interne";

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white">
      <PrintHeader
        companyName={companyName}
        companyAddress={companyAddress}
        companyPhone={companyPhone}
        companyEmail={companyEmail}
        formattedDate={formattedDate}
        qrData={qrData}
        title={title}
      />

      <div className="mt-4">
        <p><span className="font-bold">{isRestitution ? "RESTITUTION" : "SORTIE"} :</span></p>
        <p><span className="font-bold">Matériel/Outillage :</span> Entreprise : {companyName}</p>
      </div>

      <IdentitySection
        title={isRestitution ? "IDENTITE DU RESTITUTEUR" : "IDENTITE DE RECEPTEUR"}
        staffName={staffName}
        formattedDate={formattedDate}
        destination={discharge.destination}
        type={isRestitution ? "restitution" : "reception"}
      />

      <EquipmentTable
        equipments={equipments}
        items={discharge.items}
        showState={isRestitution}
      />

      <SignatureSection type={isRestitution ? "restitution" : "reception"} />
    </div>
  );
};