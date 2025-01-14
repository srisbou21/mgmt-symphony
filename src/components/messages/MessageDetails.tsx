import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Message } from "@/types/message";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface MessageDetailsProps {
  message: Message | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MessageDetails = ({ message, isOpen, onClose }: MessageDetailsProps) => {
  if (!message) return null;

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{message.subject}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="text-sm text-gray-500 mb-4">
            {format(new Date(message.createdAt), "d MMMM yyyy 'à' HH:mm", {
              locale: fr,
            })}
          </div>
          <div className="prose max-w-none mb-6">
            {message.content}
          </div>
          {message.attachments && message.attachments.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold mb-2">Pièces jointes</h4>
              <div className="space-y-2">
                {message.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(file)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};