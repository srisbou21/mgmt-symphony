import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagementForm } from "@/components/settings/UserManagementForm";
import { PasswordChangeForm } from "@/components/settings/PasswordChangeForm";

const Settings = () => {
  return (
    <div className="min-h-screen bg-dmg-light p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Paramètres</h1>
        
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Gestion des utilisateurs</TabsTrigger>
            <TabsTrigger value="password">Changer le mot de passe</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card className="p-6">
              <UserManagementForm />
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card className="p-6">
              <PasswordChangeForm />
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Settings;