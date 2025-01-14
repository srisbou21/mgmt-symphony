import { DigitalSignature } from "@/components/shared/DigitalSignature";

interface SignatureSectionProps {
  type: "restitution" | "reception";
  onSignatureSave?: (signature: string) => void;
}

export const SignatureSection = ({ type, onSignatureSave }: SignatureSectionProps) => {
  if (type === "restitution") {
    return (
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          <p className="font-bold mb-4">Signature du restituteur :</p>
          <DigitalSignature onSave={onSignatureSave} />
        </div>
        <div>
          <p className="font-bold mb-4">Signature du responsable :</p>
          <DigitalSignature onSave={onSignatureSave} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <p className="font-bold mb-4">Nom & Visa du récepteur :</p>
      <DigitalSignature onSave={onSignatureSave} />
    </div>
  );
};