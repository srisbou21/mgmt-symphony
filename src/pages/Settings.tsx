import { motion } from "framer-motion";
import { CompanySettingsForm } from "@/components/settings/CompanySettingsForm";
import { UserManagementForm } from "@/components/settings/UserManagementForm";
import { PasswordChangeForm } from "@/components/settings/PasswordChangeForm";
import { PrintTemplateSettings } from "@/components/settings/PrintTemplateSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Paramètres</h1>
          <p className="text-gray-600 mt-2">
            Gérez les paramètres de votre application
          </p>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList>
            <TabsTrigger value="company">Entreprise</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="templates">Modèles d'impression</TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <CompanySettingsForm />
          </TabsContent>

          <TabsContent value="users">
            <UserManagementForm />
          </TabsContent>

          <TabsContent value="security">
            <PasswordChangeForm />
          </TabsContent>

          <TabsContent value="templates">
            <PrintTemplateSettings />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Settings;