"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Burada normalde bir API çağrısı yapılır
      // Şimdilik basit bir simülasyon yapalım
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Başarılı işlem
      setSuccess(true);
    } catch (err) {
      setError("Şifre sıfırlama isteği gönderilirken bir hata oluştu");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Şifrenizi Sıfırlayın
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Şifrenizi hatırladınız mı?{" "}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              Giriş yapın
            </Link>
          </p>
        </div>
        
        {success ? (
          <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <p className="font-bold">Şifre sıfırlama bağlantısı gönderildi</p>
            <p className="block sm:inline">E-posta adresinize şifre sıfırlama bağlantısı gönderdik. Lütfen e-postanızı kontrol edin.</p>
            <div className="mt-4">
              <Link href="/auth/login">
                <Button className="w-full">Giriş Sayfasına Dön</Button>
              </Link>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Şifrenizi sıfırlamak için e-posta adresinizi girin. Size şifre sıfırlama bağlantısı içeren bir e-posta göndereceğiz.
              </p>
            </div>
            
            <div className="rounded-md shadow-sm">
              <div className="relative">
                <label htmlFor="email-address" className="sr-only">
                  E-posta Adresi
                </label>
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="E-posta Adresi"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? "Gönderiliyor..." : "Şifre Sıfırlama Bağlantısı Gönder"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
