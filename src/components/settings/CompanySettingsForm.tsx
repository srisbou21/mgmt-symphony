import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const companyFormSchema = z.object({
  name: z.string().min(1, "Le nom de la société est requis"),
  address: z.string().min(1, "L'adresse est requise"),
  phone: z.string().min(1, "Le téléphone est requis"),
  email: z.string().email("Email invalide"),
  logo: z.string().optional(),
});

export function CompanySettingsForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: localStorage.getItem('company_name') || '',
      address: localStorage.getItem('company_address') || '',
      phone: localStorage.getItem('company_phone') || '',
      email: localStorage.getItem('company_email') || '',
      logo: localStorage.getItem('company_logo') || '',
    },
  });

  const onSubmit = (values: z.infer<typeof companyFormSchema>) => {
    // Sauvegarder dans le localStorage
    Object.entries(values).forEach(([key, value]) => {
      localStorage.setItem(`company_${key}`, value || '');
    });

    toast({
      title: "Paramètres sauvegardés",
      description: "Les informations de la société ont été mises à jour.",
    });
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la société</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL du logo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Sauvegarder</Button>
        </form>
      </Form>
    </Card>
  );
}