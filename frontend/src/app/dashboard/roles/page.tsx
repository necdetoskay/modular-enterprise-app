"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Download,
  ShieldCheck,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewSwitcher } from "@/components/ui/view-switcher";
import { useViewPreference } from "@/hooks/useViewPreference";
import { RoleForm } from "@/features/roles/components/role-form";
import { DeleteConfirmation } from "@/features/roles/components/delete-confirmation";

// Mock data for roles
const mockRoles = [
  { 
    id: 1, 
    name: "Admin", 
    description: "Tam yetkili sistem yöneticisi",
    userCount: 3,
    permissions: ["users.view", "users.create", "users.edit", "users.delete", "roles.view", "roles.create", "roles.edit", "roles.delete", "settings.view", "settings.edit"],
    createdAt: "2023-01-15T10:30:00Z"
  },
  { 
    id: 2, 
    name: "Manager", 
    description: "Departman yöneticisi",
    userCount: 5,
    permissions: ["users.view", "users.create", "users.edit", "roles.view", "settings.view"],
    createdAt: "2023-01-20T14:20:00Z"
  },
  { 
    id: 3, 
    name: "User", 
    description: "Standart kullanıcı",
    userCount: 12,
    permissions: ["users.view", "settings.view"],
    createdAt: "2023-01-25T09:15:00Z"
  },
  { 
    id: 4, 
    name: "Guest", 
    description: "Sınırlı erişime sahip misafir kullanıcı",
    userCount: 8,
    permissions: ["users.view"],
    createdAt: "2023-02-10T11:45:00Z"
  },
  { 
    id: 5, 
    name: "Auditor", 
    description: "Denetim yetkisine sahip kullanıcı",
    userCount: 2,
    permissions: ["users.view", "roles.view", "settings.view"],
    createdAt: "2023-03-05T16:30:00Z"
  },
];

export default function RolesPage() {
  const { viewMode } = useViewPreference({ defaultMode: "table", storageKey: "rolesViewMode" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  // Filter roles based on search query
  const filteredRoles = mockRoles.filter(role => 
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRole = () => {
    setSelectedRole(null);
    setIsFormOpen(true);
  };

  const handleEditRole = (role: any) => {
    setSelectedRole(role);
    setIsFormOpen(true);
  };

  const handleDeleteRole = (role: any) => {
    setSelectedRole(role);
    setIsDeleteConfirmOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Roller</h1>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddRole} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Yeni Rol</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rol ara..."
            className="pl-10 pr-4 py-2 w-full sm:w-[300px] rounded-md border border-input bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filtrele</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Dışa Aktar</span>
          </Button>
          <ViewSwitcher storageKey="rolesViewMode" defaultMode="table" />
        </div>
      </div>

      {viewMode === "table" && (
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Rol Adı</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Açıklama</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Kullanıcı Sayısı</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Oluşturulma Tarihi</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium">{role.name}</td>
                    <td className="px-4 py-3 text-sm">{role.description}</td>
                    <td className="px-4 py-3 text-sm">{role.userCount}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(role.createdAt)}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditRole(role)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Düzenle</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteRole(role)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Sil</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewMode === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <div key={role.id} className="bg-card rounded-lg shadow-sm border border-border p-6 card-hover">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{role.name}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                </div>
                <div className="relative">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span>{role.userCount} kullanıcı</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                <p>Oluşturulma: {formatDate(role.createdAt)}</p>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">İzinler</h4>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.slice(0, 3).map((permission, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted">
                      {permission}
                    </span>
                  ))}
                  {role.permissions.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted">
                      +{role.permissions.length - 3} daha
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditRole(role)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Düzenle
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  onClick={() => handleDeleteRole(role)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Sil
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "list" && (
        <div className="bg-card rounded-lg shadow-sm border border-border divide-y divide-border">
          {filteredRoles.map((role) => (
            <div key={role.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{role.name}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{role.userCount} kullanıcı</span>
                      <span className="mx-2">•</span>
                      <span>Oluşturulma: {formatDate(role.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditRole(role)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Düzenle</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteRole(role)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Sil</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Role Form Modal */}
      <RoleForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        role={selectedRole} 
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation 
        isOpen={isDeleteConfirmOpen} 
        onClose={() => setIsDeleteConfirmOpen(false)} 
        role={selectedRole} 
      />
    </div>
  );
}
