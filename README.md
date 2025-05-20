# Modüler Kurumsal Uygulama

Kimlik doğrulama ve kullanıcı yönetimi özelliklerine sahip modüler kurumsal uygulama.

## Proje Yapısı

Proje, yeni özelliklerin ve modüllerin kolayca eklenebilmesine olanak tanıyan modüler bir yapıda organize edilmiştir.

### Backend Yapısı

```bash
backend/
├── src/
│   ├── config/           # Yapılandırma dosyaları (veritabanı, ortam değişkenleri vb.)
│   ├── core/             # Çekirdek işlevsellik
│   │   ├── auth/         # Kimlik doğrulama modülü
│   │   └── users/        # Kullanıcı yönetimi modülü
│   ├── modules/          # Alan-özel modüller
│   │   └── index.js      # Modül kaydı
│   ├── routes/           # API rotaları
│   ├── shared/           # Paylaşılan yardımcı programlar ve tipler
│   │   ├── types/        # Tip tanımlamaları
│   │   └── utils/        # Yardımcı fonksiyonlar
│   └── index.js          # Uygulama giriş noktası
```

### Frontend Yapısı

```bash
frontend/
├── public/               # Statik varlıklar
├── src/
│   ├── app/              # Next.js app router sayfaları
│   ├── components/       # UI bileşenleri
│   │   ├── business/     # İş-özel bileşenler
│   │   ├── layouts/      # Düzen bileşenleri
│   │   └── ui/           # UI bileşenleri
│   ├── core/             # Çekirdek işlevsellik
│   │   ├── auth/         # Kimlik doğrulama modülü
│   │   └── components/   # Çekirdek bileşenler
│   ├── modules/          # Alan-özel modüller
│   │   └── index.ts      # Modül kaydı
│   ├── providers/        # Context sağlayıcıları
│   ├── shared/           # Paylaşılan yardımcı programlar ve tipler
│   │   ├── config/       # Yapılandırma
│   │   ├── types/        # Tip tanımlamaları
│   │   └── utils/        # Yardımcı fonksiyonlar
│   └── styles/           # Global stiller
```

## Yeni Modül Ekleme

Uygulamaya yeni bir modül eklemek için:

1. `modules` dizininde modül adıyla yeni bir dizin oluşturun
2. Modülün işlevselliğini uygulayın (controller'lar, route'lar, model'ler vb.)
3. Modülü modül kaydında kaydedin (`modules/index.js` veya `modules/index.ts`)
4. Modül otomatik olarak uygulama tarafından yüklenecektir

## Kimlik Doğrulama

Kimlik doğrulama sistemi core/auth modülünde uygulanmıştır ve şunları sağlar:

- Kullanıcı kaydı
- Kullanıcı girişi
- JWT tabanlı kimlik doğrulama
- Rol tabanlı yetkilendirme

## Geliştirme

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Docker

Uygulama Docker kullanılarak çalıştırılabilir:

```bash
docker-compose up
```

Bu, aşağıdaki servisleri başlatacaktır:

- PostgreSQL veritabanı
- pgAdmin veritabanı yönetimi
- Backend API
- Frontend uygulaması
