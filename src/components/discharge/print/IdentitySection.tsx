interface IdentitySectionProps {
  title: string;
  staffName: string;
  formattedDate: string;
  destination?: string;
  type: "reception" | "restitution";
}

export const IdentitySection = ({
  title,
  staffName,
  formattedDate,
  destination,
  type
}: IdentitySectionProps) => {
  return (
    <div className="mt-4 border border-black">
      <div className="bg-gray-100 p-2 border-b border-black">
        <h2 className="text-center font-bold">{title}</h2>
      </div>
      <div className="p-4">
        <p>
          Le(s) sous-signé(s) confirment {type === "reception" ? "réception" : "la restitution"} du matériel / outillage suivant :
        </p>
        <p className="mt-2">
          <span className="font-bold">Nom et Prénom : </span>
          {staffName}
        </p>
        <div className="flex justify-between mt-2">
          <p>
            <span className="font-bold">Date de {type === "reception" ? "sortie" : "restitution"} : </span>
            {formattedDate}
          </p>
          <p>
            <span className="font-bold">{type === "reception" ? "Destination" : "Provenance"} : </span>
            {destination || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};