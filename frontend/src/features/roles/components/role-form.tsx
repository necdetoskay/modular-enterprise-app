"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Define the form schema with Zod
const roleFormSchema = z.object({
  name: z.string().min(2, { message: "Rol adı en az 2 karakter olmalıdır" }),
  description: z.string().min(5, { message: "Açıklama en az 5 karakter olmalıdır" }),
  permissions: z.array(z.string()).min(1, { message: "En az bir izin seçilmelidir" }),
});

type RoleFormValues = z.infer<typeof roleFormSchema>;

// Available permissions
const availablePermissions = [
  { id: "users.view", label: "Kullanıcıları Görüntüleme" },
  { id: "users.create", label: "Kullanıcı Oluşturma" },
  { id: "users.edit", label: "Kullanıcı Düzenleme" },
  { id: "users.delete", label: "Kullanıcı Silme" },
  { id: "roles.view", label: "Rolleri Görüntüleme" },
  { id: "roles.create", label: "Rol Oluşturma" },
  { id: "roles.edit", label: "Rol Düzenleme" },
  { id: "roles.delete", label: "Rol Silme" },
  { id: "settings.view", label: "Ayarları Görüntüleme" },
  { id: "settings.edit", label: "Ayarları Düzenleme" },
];

interface RoleFormProps {
  isOpen: boolean;
  onClose: () => void;
  role?: any;
}

export function RoleForm({ isOpen, onClose, role }: RoleFormProps) {
  const { toast } = useToast();
  
  // Initialize the form with react-hook-form
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  // Update form values when editing an existing role
  useEffect(() => {
    if (role) {
      form.reset({
        name: role.name,
        description: role.description,
        permissions: role.permissions,
      });
    } else {
      form.reset({
        name: "",
        description: "",
        permissions: [],
      });
    }
  }, [role, form]);

  // Form submission handler
  const onSubmit = (data: RoleFormValues) => {
    // Here you would typically send the data to your API
    console.log("Form submitted:", data);
    
    // Show success toast
    toast({
      title: role ? "Rol güncellendi" : "Rol oluşturuldu",
      description: role 
        ? `${data.name} rolü başarıyla güncellendi.` 
        : `${data.name} rolü başarıyla oluşturuldu.`,
    });
    
    // Close the modal
    onClose();
  };

  // Handle permission checkbox changes
  const handlePermissionChange = (permissionId: string) => {
    const currentPermissions = form.getValues("permissions");
    const isSelected = currentPermissions.includes(permissionId);
    
    if (isSelected) {
      const updatedPermissions = currentPermissions.filter(id => id !== permissionId);
      form.setValue("permissions", updatedPermissions);
    } else {
      form.setValue("permissions", [...currentPermissions, permissionId]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card rounded-lg shadow-lg border border-border w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">
            {role ? "Rol Düzenle" : "Yeni Rol"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Kapat</span>
          </Button>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Rol Adı
            </label>
            <input
              id="name"
              {...form.register("name")}
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Açıklama
            </label>
            <textarea
              id="description"
              {...form.register("description")}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              İzinler
            </label>
            <div className="border border-input rounded-md p-3 max-h-60 overflow-y-auto">
              <div className="space-y-2">
                {availablePermissions.map((permission) => {
                  const isChecked = form.watch("permissions").includes(permission.id);
                  return (
                    <div key={permission.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={isChecked}
                        onChange={() => handlePermissionChange(permission.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={permission.id} className="ml-2 text-sm">
                        {permission.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            {form.formState.errors.permissions && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.permissions.message}
              </p>
            )}
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit">
              {role ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
