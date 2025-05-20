"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Download 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewSwitcher } from "@/components/ui/view-switcher";
import { useViewPreference } from "@/hooks/useViewPreference";
import { UserForm } from "@/features/users/components/user-form";
import { DeleteConfirmation } from "@/features/users/components/delete-confirmation";

// Mock data for users
const mockUsers = [
  { 
    id: 1, 
    name: "Ahmet Yılmaz", 
    email: "ahmet.yilmaz@example.com", 
    role: "Admin", 
    status: "active",
    lastLogin: "2023-05-15T10:30:00Z"
  },
  { 
    id: 2, 
    name: "Mehmet Demir", 
    email: "mehmet.demir@example.com", 
    role: "User", 
    status: "active",
    lastLogin: "2023-05-14T14:20:00Z"
  },
  { 
    id: 3, 
    name: "Ayşe Kaya", 
    email: "ayse.kaya@example.com", 
    role: "Manager", 
    status: "inactive",
    lastLogin: "2023-05-10T09:15:00Z"
  },
  { 
    id: 4, 
    name: "Fatma Şahin", 
    email: "fatma.sahin@example.com", 
    role: "User", 
    status: "active",
    lastLogin: "2023-05-16T11:45:00Z"
  },
  { 
    id: 5, 
    name: "Ali Öztürk", 
    email: "ali.ozturk@example.com", 
    role: "User", 
    status: "active",
    lastLogin: "2023-05-15T16:30:00Z"
  },
];

export default function UsersPage() {
  const { viewMode } = useViewPreference({ defaultMode: "table", storageKey: "usersViewMode" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setIsDeleteConfirmOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Kullanıcılar</h1>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddUser} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Yeni Kullanıcı</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Kullanıcı ara..."
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
          <ViewSwitcher storageKey="usersViewMode" defaultMode="table" />
        </div>
      </div>

      {viewMode === "table" && (
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ad Soyad</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">E-posta</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Rol</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Durum</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Son Giriş</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm">{user.name}</td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "Admin" 
                          ? "bg-blue-100 text-blue-800" 
                          : user.role === "Manager" 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {user.status === "active" ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{formatDate(user.lastLogin)}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Düzenle</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteUser(user)}
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
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-card rounded-lg shadow-sm border border-border p-6 card-hover">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="relative">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
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
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Son giriş: {formatDate(user.lastLogin)}</p>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditUser(user)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Düzenle
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  onClick={() => handleDeleteUser(user)}
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
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Düzenle</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteUser(user)}
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

      {/* User Form Modal */}
      <UserForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        user={selectedUser} 
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation 
        isOpen={isDeleteConfirmOpen} 
        onClose={() => setIsDeleteConfirmOpen(false)} 
        user={selectedUser} 
      />
    </div>
  );
}
