"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  LayoutDashboard,
  Users,
  Car,
  Settings,
  Menu,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  UserCircle,
  ShieldCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Genel",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        title: "Kullanıcılar",
        href: "/users",
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Roller",
        href: "/roles",
        icon: <ShieldCheck className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Araç Yönetimi",
    items: [
      {
        title: "Araçlar",
        href: "/vehicles",
        icon: <Car className="h-5 w-5" />,
      },
      {
        title: "Personel",
        href: "/personnel",
        icon: <UserCircle className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Ayarlar",
    items: [
      {
        title: "Sistem Ayarları",
        href: "/settings",
        icon: <Settings className="h-5 w-5" />,
      },
    ],
  },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-card text-card-foreground shadow-lg flex flex-col fixed h-full z-10 transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="p-4 flex items-center border-b border-border">
          <div className="flex items-center">
            <Car className="h-6 w-6 text-primary" />
            {!sidebarCollapsed && (
              <span className="ml-3 font-bold text-xl">Araç Takip</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-6 px-2">
            {sidebarSections.map((section) => (
              <div key={section.title} className="space-y-2">
                {!sidebarCollapsed && (
                  <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-2 text-sm rounded-md transition-colors",
                        pathname === item.href
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        sidebarCollapsed && "justify-center px-2"
                      )}
                    >
                      {item.icon}
                      {!sidebarCollapsed && <span className="ml-3">{item.title}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        {/* Header */}
        <header className="bg-card text-card-foreground shadow-sm z-10 border-b border-border">
          <div className="flex items-center justify-between px-6 py-3 h-16">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <ThemeToggle />

              <Button variant="outline" size="icon" className="rounded-full relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
                <span className="sr-only">Notifications</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      AU
                    </div>
                    {!sidebarCollapsed && (
                      <>
                        <div className="flex flex-col items-start text-sm">
                          <span className="font-medium">Admin User</span>
                          <span className="text-xs text-muted-foreground">admin@example.com</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ayarlar</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    // Çerezleri temizle
                    document.cookie = "token=; path=/; max-age=0";
                    // LocalStorage'ı temizle
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    // Sayfayı yenile (bu, middleware'in kullanıcıyı giriş sayfasına yönlendirmesini sağlar)
                    window.location.href = "/auth/login";
                  }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Çıkış Yap</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-muted/30">{children}</main>
      </div>
    </div>
  );
}
