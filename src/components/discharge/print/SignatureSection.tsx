interface SignatureSectionProps {
  type: "restitution" | "reception";
}

export const SignatureSection = ({ type }: SignatureSectionProps) => {
  if (type === "restitution") {
    return (
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
    );
  }

  return (
    <div className="mt-8">
      <p className="font-bold">Nom & Visa du récepteur :</p>
      <div className="mt-16 border-t border-black w-48"></div>
    </div>
  );
};