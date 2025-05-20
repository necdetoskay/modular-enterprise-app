"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Define the form schema with Zod
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Ad soyad en az 2 karakter olmalıdır" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  role: z.enum(["Admin", "Manager", "User"], { 
    required_error: "Lütfen bir rol seçiniz" 
  }),
  status: z.enum(["active", "inactive"], { 
    required_error: "Lütfen bir durum seçiniz" 
  }),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

export function UserForm({ isOpen, onClose, user }: UserFormProps) {
  const { toast } = useToast();
  
  // Initialize the form with react-hook-form
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "User",
      status: "active",
    },
  });

  // Update form values when editing an existing user
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      form.reset({
        name: "",
        email: "",
        role: "User",
        status: "active",
      });
    }
  }, [user, form]);

  // Form submission handler
  const onSubmit = (data: UserFormValues) => {
    // Here you would typically send the data to your API
    console.log("Form submitted:", data);
    
    // Show success toast
    toast({
      title: user ? "Kullanıcı güncellendi" : "Kullanıcı oluşturuldu",
      description: user 
        ? `${data.name} başarıyla güncellendi.` 
        : `${data.name} başarıyla oluşturuldu.`,
    });
    
    // Close the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card rounded-lg shadow-lg border border-border w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">
            {user ? "Kullanıcı Düzenle" : "Yeni Kullanıcı"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Kapat</span>
          </Button>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Ad Soyad
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
            <label htmlFor="email" className="block text-sm font-medium">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              {...form.register("email")}
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium">
              Rol
            </label>
            <select
              id="role"
              {...form.register("role")}
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
            {form.formState.errors.role && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.role.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium">
              Durum
            </label>
            <select
              id="status"
              {...form.register("status")}
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
            {form.formState.errors.status && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.status.message}
              </p>
            )}
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit">
              {user ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
