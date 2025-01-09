import { QRCodeSVG } from "qrcode.react";

interface PrintHeaderProps {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  formattedDate: string;
  qrData: string;
  title: string;
}

export const PrintHeader = ({ 
  companyName, 
  companyAddress, 
  companyPhone, 
  companyEmail,
  formattedDate,
  qrData,
  title
}: PrintHeaderProps) => {
  return (
    <>
      <div className="border border-black">
        <div className="grid grid-cols-2">
          <div className="p-4 border-r border-black">
            <h1 className="text-lg font-bold uppercase">
              {title}
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
    </>
  );
};