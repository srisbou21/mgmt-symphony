import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eraser, Download, RotateCcw } from 'lucide-react';

interface DigitalSignatureProps {
  onSave?: (signature: string) => void;
  width?: number;
  height?: number;
}

export const DigitalSignature = ({ 
  onSave, 
  width = 500, 
  height = 200 
}: DigitalSignatureProps) => {
  const signatureRef = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClear = () => {
    signatureRef.current?.clear();
    setIsEmpty(true);
  };

  const handleSave = () => {
    if (signatureRef.current && !isEmpty) {
      const signatureData = signatureRef.current.toDataURL();
      onSave?.(signatureData);
    }
  };

  const handleBegin = () => {
    setIsEmpty(false);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="border rounded">
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{
            width,
            height,
            className: 'signature-canvas bg-white',
          }}
          onBegin={handleBegin}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="gap-2"
        >
          <Eraser className="h-4 w-4" />
          Effacer
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => signatureRef.current?.clear()}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Recommencer
        </Button>
        <Button
          onClick={handleSave}
          size="sm"
          disabled={isEmpty}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Sauvegarder
        </Button>
      </div>
    </Card>
  );
};