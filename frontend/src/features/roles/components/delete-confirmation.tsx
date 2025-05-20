"use client";

import React from "react";
import { AlertTriangle, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  role?: any;
}

export function DeleteConfirmation({ isOpen, onClose, role }: DeleteConfirmationProps) {
  const { toast } = useToast();

  const handleDelete = () => {
    // Here you would typically send a delete request to your API
    console.log("Deleting role:", role);
    
    // Show success toast
    toast({
      title: "Rol silindi",
      description: `${role?.name} rolü başarıyla silindi.`,
    });
    
    // Close the modal
    onClose();
  };

  if (!isOpen || !role) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card rounded-lg shadow-lg border border-border w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Rol Sil</h2>
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
                Bu rolü silmek istediğinizden emin misiniz?
              </p>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-md p-4 mb-6">
            <p className="font-medium">{role.name}</p>
            <p className="text-sm text-muted-foreground">{role.description}</p>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <Users className="h-4 w-4 mr-1" />
              <span>{role.userCount} kullanıcı bu role sahip</span>
            </div>
          </div>
          
          {role.userCount > 0 && (
            <div className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 rounded-md p-4 mb-6">
              <p className="text-sm">
                <strong>Uyarı:</strong> Bu rol {role.userCount} kullanıcı tarafından kullanılıyor. 
                Rolü sildiğinizde, bu kullanıcılar varsayılan role atanacaktır.
              </p>
            </div>
          )}
          
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
