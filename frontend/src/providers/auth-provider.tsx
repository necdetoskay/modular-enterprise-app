"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// API URL
const API_URL = "http://localhost:5000/api";

// Kullanıcı tipi
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Context tipi
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

// Context oluştur
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider bileşeni
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Sayfa yüklendiğinde kullanıcı durumunu kontrol et
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // localStorage'dan token'ı al
        const token = localStorage.getItem("token");

        if (token) {
          // Token ile kullanıcı profilini getir
          const response = await fetch(`${API_URL}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            // Token geçersizse temizle
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Kullanıcı durumu kontrol edilirken hata:", error);
        // Hata durumunda token'ı temizle
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Giriş fonksiyonu
  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Giriş yapılırken bir hata oluştu");
      }

      const data = await response.json();

      // Token'ı localStorage'a kaydet
      localStorage.setItem("token", data.token);

      // Token'ı cookie'ye de kaydet (middleware için)
      document.cookie = `token=${data.token}; path=/; max-age=86400`;

      // Kullanıcı bilgisini localStorage'a kaydet
      localStorage.setItem("user", JSON.stringify(data.user));

      // Kullanıcı durumunu güncelle
      setUser(data.user);

      // Dashboard'a yönlendir
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Giriş yapılırken hata:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Çıkış fonksiyonu
  const logout = () => {
    // localStorage'dan token ve kullanıcı bilgisini sil
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Cookie'den token'ı sil
    document.cookie = "token=; path=/; max-age=0";

    // Kullanıcı durumunu güncelle
    setUser(null);

    // Giriş sayfasına yönlendir
    router.push("/auth/login");
  };

  // Kayıt fonksiyonu
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Kayıt olurken bir hata oluştu");
      }

      // Başarılı kayıt
      router.push("/auth/login?registered=true");
    } catch (error: any) {
      console.error("Kayıt olurken hata:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Context değerini oluştur
  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
