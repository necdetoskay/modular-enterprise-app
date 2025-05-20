import React from "react";
import Link from "next/link";
import { Car } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center pt-6">
        <Link href="/" className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">Araç Takip</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
