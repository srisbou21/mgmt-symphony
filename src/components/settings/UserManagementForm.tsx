import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { User, UserFormValues } from "@/types/user";

const userFormSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  role: z.enum(["admin", "user"]),
  permissions: z.object({
    canManageUsers: z.boolean(),
    canManageEquipment: z.boolean(),
    canManageMaintenance: z.boolean(),
    canViewReports: z.boolean(),
  }),
});

export function UserManagementForm() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    { 
      id: "1", 
      username: "admin", 
      role: "admin", 
      permissions: { 
        canManageUsers: true, 
        canManageEquipment: true, 
        canManageMaintenance: true, 
        canViewReports: true 
      } 
    }
  ]);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "user",
      permissions: {
        canManageUsers: false,
        canManageEquipment: false,
        canManageMaintenance: false,
        canViewReports: false,
      },
    },
  });

  const onSubmit = (values: UserFormValues) => {
    const newUser: User = {
      id: String(users.length + 1),
      username: values.username,
      role: values.role,
      permissions: values.permissions
    };
    
    setUsers([...users, newUser]);
    toast({
      title: "Utilisateur créé",
      description: "Le nouvel utilisateur a été créé avec succès.",
    });
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Utilisateurs existants</h2>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{user.username}</h3>
                  <p className="text-sm text-gray-500">Rôle: {user.role}</p>
                </div>
                <Button variant="outline" onClick={() => console.log("Edit user", user.id)}>
                  Modifier
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Ajouter un utilisateur</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rôle</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un rôle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Administrateur</SelectItem>
                      <SelectItem value="user">Utilisateur</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Permissions</FormLabel>
              <FormField
                control={form.control}
                name="permissions.canManageUsers"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Gérer les utilisateurs</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="permissions.canManageEquipment"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Gérer les équipements</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="permissions.canManageMaintenance"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Gérer les maintenances</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="permissions.canViewReports"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Voir les rapports</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Ajouter l'utilisateur
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
