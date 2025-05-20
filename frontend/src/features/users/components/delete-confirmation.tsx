"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

export function DeleteConfirmation({ isOpen, onClose, user }: DeleteConfirmationProps) {
  const { toast } = useToast();

  const handleDelete = () => {
    // Here you would typically send a delete request to your API
    console.log("Deleting user:", user);
    
    // Show success toast
    toast({
      title: "Kullanıcı silindi",
      description: `${user?.name} başarıyla silindi.`,
    });
    
    // Close the modal
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card rounded-lg shadow-lg border border-border w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Kullanıcı Sil</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Kapat</span>
          </Button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Bu işlem geri alınamaz</h3>
              <p className="text-muted-foreground">
                Bu kullanıcıyı silmek istediğinizden emin misiniz?
              </p>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-md p-4 mb-6">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.role === "Admin" 
                  ? "bg-blue-100 text-blue-800" 
                  : user.role === "Manager" 
                  ? "bg-purple-100 text-purple-800" 
                  : "bg-gray-100 text-gray-800"
              }`}>
                {user.role}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.status === "active" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {user.status === "active" ? "Aktif" : "Pasif"}
              </span>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button 
              type="button" 
              variant="destructive"
              onClick={handleDelete}
            >
              Sil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
