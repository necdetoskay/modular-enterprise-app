import React from "react";
import Link from "next/link";
import { 
  Car, 
  Users, 
  ShieldCheck, 
  Wrench, 
  Calendar, 
  Fuel, 
  BarChart4, 
  TrendingUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>Rapor Oluştur</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Toplam Araç" 
          value="24" 
          icon={<Car className="h-5 w-5" />} 
          trend="+2" 
          trendLabel="son aydan" 
          colorClass="text-blue-600 bg-blue-100" 
        />
        <StatCard 
          title="Aktif Personel" 
          value="48" 
          icon={<Users className="h-5 w-5" />} 
          trend="+5" 
          trendLabel="son aydan" 
          colorClass="text-green-600 bg-green-100" 
        />
        <StatCard 
          title="Bakımdaki Araçlar" 
          value="3" 
          icon={<Wrench className="h-5 w-5" />} 
          trend="-1" 
          trendLabel="geçen haftadan" 
          colorClass="text-amber-600 bg-amber-100" 
        />
        <StatCard 
          title="Aktif Tahsisler" 
          value="18" 
          icon={<Calendar className="h-5 w-5" />} 
          trend="+3" 
          trendLabel="geçen haftadan" 
          colorClass="text-purple-600 bg-purple-100" 
        />
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-card rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-xl font-semibold mb-4">Hızlı Erişim</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <QuickAccessCard 
              title="Araçlar" 
              description="Araç listesi ve detaylar" 
              icon={<Car className="h-6 w-6" />} 
              href="/vehicles" 
            />
            <QuickAccessCard 
              title="Kullanıcılar" 
              description="Kullanıcı yönetimi" 
              icon={<Users className="h-6 w-6" />} 
              href="/users" 
            />
            <QuickAccessCard 
              title="Roller" 
              description="Rol ve izin yönetimi" 
              icon={<ShieldCheck className="h-6 w-6" />} 
              href="/roles" 
            />
            <QuickAccessCard 
              title="Bakım Takip" 
              description="Araç bakım planlaması" 
              icon={<Wrench className="h-6 w-6" />} 
              href="/maintenance" 
            />
            <QuickAccessCard 
              title="Yakıt Takibi" 
              description="Yakıt tüketimi ve maliyetler" 
              icon={<Fuel className="h-6 w-6" />} 
              href="/fuel" 
            />
            <QuickAccessCard 
              title="Raporlar" 
              description="Analiz ve raporlama" 
              icon={<BarChart4 className="h-6 w-6" />} 
              href="/reports" 
            />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-xl font-semibold mb-4">Yaklaşan Bakımlar</h2>
          <div className="space-y-4">
            <UpcomingMaintenanceItem 
              vehicleName="Ford Focus" 
              plate="34 ABC 123" 
              date="23 Mayıs 2023" 
              type="Yağ Değişimi" 
            />
            <UpcomingMaintenanceItem 
              vehicleName="Toyota Corolla" 
              plate="34 XYZ 789" 
              date="25 Mayıs 2023" 
              type="Lastik Değişimi" 
            />
            <UpcomingMaintenanceItem 
              vehicleName="Renault Clio" 
              plate="34 DEF 456" 
              date="28 Mayıs 2023" 
              type="Genel Bakım" 
            />
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">Tüm Bakımları Görüntüle</Button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <h2 className="text-xl font-semibold mb-4">Son Aktiviteler</h2>
        <div className="space-y-4">
          <ActivityItem 
            title="Araç Tahsis Edildi" 
            description="Toyota Corolla (34 XYZ 789) Ahmet Yılmaz'a tahsis edildi" 
            time="2 saat önce" 
          />
          <ActivityItem 
            title="Bakım Tamamlandı" 
            description="Ford Focus (34 ABC 123) bakımı tamamlandı" 
            time="5 saat önce" 
          />
          <ActivityItem 
            title="Yeni Kullanıcı Eklendi" 
            description="Mehmet Demir sisteme yeni kullanıcı olarak eklendi" 
            time="1 gün önce" 
          />
          <ActivityItem 
            title="Yakıt Alımı Kaydedildi" 
            description="Renault Clio (34 DEF 456) için yakıt alımı kaydedildi" 
            time="1 gün önce" 
          />
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendLabel: string;
  colorClass: string;
}

function StatCard({ title, value, icon, trend, trendLabel, colorClass }: StatCardProps) {
  const isTrendPositive = trend.startsWith('+');
  
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6 card-hover">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClass}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={isTrendPositive ? "text-green-600" : "text-red-600"}>
          {trend}
        </span>
        <span className="ml-1 text-muted-foreground">{trendLabel}</span>
      </div>
    </div>
  );
}

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function QuickAccessCard({ title, description, icon, href }: QuickAccessCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-muted/50 hover:bg-muted rounded-lg p-4 transition-colors card-hover">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <div className="ml-3">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface UpcomingMaintenanceItemProps {
  vehicleName: string;
  plate: string;
  date: string;
  type: string;
}

function UpcomingMaintenanceItem({ vehicleName, plate, date, type }: UpcomingMaintenanceItemProps) {
  return (
    <div className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors">
      <div className="p-2 rounded-full bg-amber-100 text-amber-600">
        <Wrench className="h-5 w-5" />
      </div>
      <div className="ml-3">
        <h4 className="font-medium">{vehicleName}</h4>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{plate}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
          {type}
        </span>
      </div>
    </div>
  );
}

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
}

function ActivityItem({ title, description, time }: ActivityItemProps) {
  return (
    <div className="flex items-start p-3 rounded-lg hover:bg-muted transition-colors">
      <div className="p-2 rounded-full bg-blue-100 text-blue-600 mt-1">
        <TrendingUp className="h-4 w-4" />
      </div>
      <div className="ml-3">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
    </div>
  );
}
