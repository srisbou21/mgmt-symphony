import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PrintTemplate } from "@/types/printTemplate";
import { useToast } from "@/components/ui/use-toast";
import { PdfGenerator } from "@/utils/pdfGenerator";

export const PrintTemplateSettings = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<PrintTemplate[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<PrintTemplate | null>(null);

  const handleSaveTemplate = () => {
    if (!currentTemplate) return;

    setTemplates(prev => {
      const existing = prev.find(t => t.id === currentTemplate.id);
      if (existing) {
        return prev.map(t => t.id === currentTemplate.id ? currentTemplate : t);
      }
      return [...prev, currentTemplate];
    });

    toast({
      title: "Modèle sauvegardé",
      description: "Le modèle d'impression a été sauvegardé avec succès.",
    });
  };

  const handlePreview = async () => {
    if (!currentTemplate) return;

    try {
      const pdfGenerator = new PdfGenerator(currentTemplate);
      
      // Exemple de données pour la prévisualisation
      const headers = ['Nom', 'Type', 'État', 'Emplacement'];
      const data = [
        ['Équipement 1', 'Matériel', 'En service', 'Bureau 201'],
        ['Équipement 2', 'Outillage', 'En maintenance', 'Atelier'],
      ];

      pdfGenerator.addTable(headers, data);
      await pdfGenerator.generate(`preview_${currentTemplate.name}.pdf`);

      toast({
        title: "Prévisualisation générée",
        description: "Le PDF de prévisualisation a été créé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du PDF.",
        variant: "destructive",
      });
    }
  };

  // ... keep existing code (template form fields and UI)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Modèles d'impression</h2>
        <div className="space-x-2">
          <Button onClick={() => setCurrentTemplate({
            id: templates.length + 1,
            name: "Nouveau modèle",
            type: "discharge",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })}>
            Nouveau modèle
          </Button>
        </div>
      </div>

      {currentTemplate && (
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du modèle</Label>
                <Input
                  id="name"
                  value={currentTemplate.name}
                  onChange={(e) => setCurrentTemplate({
                    ...currentTemplate,
                    name: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type de document</Label>
                <Select
                  value={currentTemplate.type}
                  onValueChange={(value: 'discharge' | 'equipment' | 'maintenance') => 
                    setCurrentTemplate({
                      ...currentTemplate,
                      type: value
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discharge">Décharge</SelectItem>
                    <SelectItem value="equipment">Équipement</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">En-tête</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={currentTemplate.header?.showLogo ?? false}
                    onCheckedChange={(checked) => setCurrentTemplate({
                      ...currentTemplate,
                      header: {
                        ...currentTemplate.header,
                        showLogo: checked
                      }
                    })}
                  />
                  <Label>Afficher le logo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={currentTemplate.header?.showCompanyInfo ?? false}
                    onCheckedChange={(checked) => setCurrentTemplate({
                      ...currentTemplate,
                      header: {
                        ...currentTemplate.header,
                        showCompanyInfo: checked
                      }
                    })}
                  />
                  <Label>Informations de l'entreprise</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contenu</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={currentTemplate.content?.showSerialNumbers ?? false}
                    onCheckedChange={(checked) => setCurrentTemplate({
                      ...currentTemplate,
                      content: {
                        ...currentTemplate.content,
                        showSerialNumbers: checked
                      }
                    })}
                  />
                  <Label>Numéros de série</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={currentTemplate.content?.showObservations ?? false}
                    onCheckedChange={(checked) => setCurrentTemplate({
                      ...currentTemplate,
                      content: {
                        ...currentTemplate.content,
                        showObservations: checked
                      }
                    })}
                  />
                  <Label>Observations</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pied de page</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={currentTemplate.footer?.showSignature ?? false}
                    onCheckedChange={(checked) => setCurrentTemplate({
                      ...currentTemplate,
                      footer: {
                        ...currentTemplate.footer,
                        showSignature: checked
                      }
                    })}
                  />
                  <Label>Zone de signature</Label>
                </div>
                <div className="space-y-2">
                  <Label>Texte personnalisé</Label>
                  <Textarea
                    value={currentTemplate.footer?.customText ?? ""}
                    onChange={(e) => setCurrentTemplate({
                      ...currentTemplate,
                      footer: {
                        ...currentTemplate.footer,
                        customText: e.target.value
                      }
                    })}
                    placeholder="Texte à afficher en pied de page..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setCurrentTemplate(null)}>
              Annuler
            </Button>
            <Button variant="outline" onClick={handlePreview}>
              Prévisualiser
            </Button>
            <Button onClick={handleSaveTemplate}>
              Enregistrer
            </Button>
          </div>
        </Card>
      )}

      {templates.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Modèles existants</h3>
          <div className="grid gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-gray-500">Type: {template.type}</p>
                </div>
                <Button variant="outline" onClick={() => setCurrentTemplate(template)}>
                  Modifier
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
