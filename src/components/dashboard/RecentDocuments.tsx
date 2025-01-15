import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

interface Document {
  id: number;
  title: string;
  date: string;
  type: string;
  size: string;
}

const mockDocuments: Document[] = [
  {
    id: 1,
    title: "Rapport maintenance Q1 2024",
    date: "2024-01-15",
    type: "PDF",
    size: "2.5 MB"
  },
  {
    id: 2,
    title: "Inventaire équipements",
    date: "2024-01-14",
    type: "XLSX",
    size: "1.8 MB"
  },
  {
    id: 3,
    title: "Procédure maintenance",
    date: "2024-01-13",
    type: "DOCX",
    size: "856 KB"
  }
];

export const RecentDocuments = () => {
  const { toast } = useToast();

  const handleDownload = (document: Document) => {
    toast({
      title: "Téléchargement démarré",
      description: `${document.title} est en cours de téléchargement.`,
    });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Documents récents</h2>
        <Button variant="outline" size="sm">
          Voir tous
        </Button>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {mockDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-white"
            >
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(doc.date).toLocaleDateString()} • {doc.type} • {doc.size}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(doc)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};