import { useState, useEffect } from "react";
import { Document } from "@/types/document";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Upload, Filter, FileText, Download, Tag, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

export const DocumentManager = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        setDocuments(data as Document[]);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les documents.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (const file of Array.from(files)) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const fileUrl = URL.createObjectURL(file);

          const { data, error } = await supabase
            .from('documents')
            .insert({
              title: file.name,
              description: "",
              file_url: fileUrl,
              file_type: file.type,
              file_size: file.size,
              tags: [],
              category: "Non classé",
              status: "draft",
              created_by: user.id
            })
            .select()
            .single();

          if (error) throw error;

          if (data) {
            setDocuments(prev => [data as Document, ...prev]);
            toast({
              title: "Document ajouté",
              description: `${file.name} a été ajouté avec succès.`,
            });
          }
        } catch (error) {
          console.error('Error uploading document:', error);
          toast({
            title: "Erreur",
            description: `Erreur lors de l'ajout de ${file.name}.`,
            variant: "destructive",
          });
        }
      }
    }
  };

  const handleDownload = (doc: Document) => {
    // Simuler un téléchargement
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Téléchargement démarré",
      description: `${doc.title} est en cours de téléchargement.`,
    });
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
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
          {filteredDocuments.map((doc) => (
            <Dialog key={doc.id}>
              <DialogTrigger asChild>
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-500" />
                        <h3 className="font-semibold">{doc.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{doc.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {doc.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(doc.updatedAt).toLocaleDateString()}
                      </span>
                      <span>v{doc.version}</span>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{doc.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Détails</h4>
                    <p className="text-sm text-gray-500">{doc.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Taille: {(doc.fileSize / 1024 / 1024).toFixed(2)} MB
                    </div>
                    <Button onClick={() => handleDownload(doc)}>
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};