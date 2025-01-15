import { useState } from "react";
import { Document } from "@/types/document";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Upload, Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const DocumentManager = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // TODO: Implement file upload logic
      console.log("Files to upload:", files);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion Documentaire</h1>
        <Button onClick={() => document.getElementById("file-upload")?.click()}>
          <Upload className="w-4 h-4 mr-2" />
          Ajouter un document
        </Button>
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Rechercher des documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtres
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold">{doc.title}</h3>
                <p className="text-sm text-gray-500">{doc.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Version {doc.version}</span>
                  <span>{new Date(doc.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};