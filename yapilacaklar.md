# Araç Takip ve Yönetim Sistemi - Yapılacaklar Listesi

Bu dosya, Araç Takip ve Yönetim Sistemi projesine özel görevleri içerir. Genel proje görevleri için `generic_yapilacaklar.md` dosyasına bakınız.

## Proje Kurulumu ve Altyapı
- [x] Proje klasör yapısının oluşturulması
- [x] Veritabanı tasarımı ve şemasının oluşturulması
- [x] Backend framework seçimi ve kurulumu (Node.js/Express)
- [ ] Frontend framework seçimi ve kurulumu (React)
- [x] API yapısının planlanması
- [x] Kimlik doğrulama ve yetkilendirme sisteminin kurulması
- [x] Veritabanı bağlantısının kurulması (PostgreSQL)
- [x] Temel CRUD işlemlerinin oluşturulması
- [x] Hata yönetimi ve loglama sisteminin kurulması
- [x] Merkezi enum yönetimi için constants/enums modülü oluşturulması

## Araç Yönetimi Modülü
- [x] Araç ekleme/düzenleme/silme işlemleri
- [ ] Araç detay sayfası
- [ ] Araç listesi ve filtreleme özellikleri
- [ ] Araç durumu takibi (Müsait, Kullanımda, Bakımda, Kazalı, Temizlikte)
- [ ] Araç bilgilerinin (marka, model, plaka, yıl, motor, şasi no, vb.) yönetimi
- [ ] Araç belgeleri ve dosyalarının yönetimi (ruhsat, sigorta, vb.)
- [ ] Araç fotoğrafları yönetimi

## Personel Yönetimi Modülü
- [ ] Personel ekleme/düzenleme/silme işlemleri
- [ ] Personel detay sayfası
- [ ] Personel listesi ve filtreleme özellikleri
- [ ] Personel bilgilerinin yönetimi (ad, soyad, departman, iletişim bilgileri, vb.)
- [ ] Personel belgeleri yönetimi (ehliyet, vb.)
- [ ] Personel araç kullanım geçmişi

## Departman Yönetimi Modülü
- [ ] Departman ekleme/düzenleme/silme işlemleri
- [ ] Departman detay sayfası
- [ ] Departman listesi
- [ ] Departmana bağlı personel listesi
- [ ] Departmana tahsis edilen araçların listesi

## Tahsis İşlemleri Modülü
- [ ] Araç tahsis etme işlemi
- [ ] Araç iade işlemi
- [ ] Tahsis geçmişi ve raporlama
- [ ] Tahsis onay süreci
- [ ] Tahsis takvimi ve planlaması
- [ ] Tahsis çakışma kontrolü
- [ ] Tahsis bildirimleri

## Bakım Takip Modülü
- [ ] Bakım kaydı oluşturma/düzenleme/silme
- [ ] Bakım planlaması ve hatırlatmaları
- [ ] Periyodik bakım takibi
- [ ] Bakım maliyetleri takibi
- [ ] Bakım geçmişi ve raporlama
- [ ] Bakım türleri yönetimi (yağ değişimi, lastik değişimi, vb.)
- [ ] Bakım bildirimleri

## Kaza Kayıtları Modülü
- [ ] Kaza kaydı oluşturma/düzenleme/silme
- [ ] Kaza detayları (tarih, yer, açıklama, vb.)
- [ ] Kaza fotoğrafları yönetimi
- [ ] Kaza raporları
- [ ] Sigorta ve hasar takibi
- [ ] Kaza sonrası işlemler takibi

## Temizlik Takip Modülü
- [ ] Temizlik kaydı oluşturma/düzenleme/silme
- [ ] Temizlik planlaması ve hatırlatmaları
- [ ] Temizlik geçmişi ve raporlama
- [ ] Temizlik türleri yönetimi (iç temizlik, dış temizlik, detaylı temizlik)
- [ ] Temizlik bildirimleri

## Kilometre Takibi Modülü
- [ ] Kilometre girişi
- [ ] Kilometre geçmişi ve raporlama
- [ ] Kilometre bazlı bakım hatırlatmaları
- [ ] Yakıt tüketimi takibi
- [ ] Kilometre analizi ve grafikleri

## Yakıt Takibi Modülü
- [ ] Yakıt alımı kaydı oluşturma/düzenleme/silme
- [ ] Yakıt tüketimi takibi ve raporlama
- [ ] Yakıt maliyetleri analizi
- [ ] Yakıt verimliliği hesaplamaları
- [ ] Yakıt alımı bildirimleri

## Masraf Takibi Modülü
- [ ] Masraf kaydı oluşturma/düzenleme/silme
- [ ] Masraf kategorileri yönetimi
- [ ] Masraf raporları ve analizleri
- [ ] Araç bazlı masraf takibi
- [ ] Bütçe planlaması ve takibi

## Belge ve Hatırlatma Modülü
- [ ] Belge takibi (ruhsat, sigorta, muayene, vb.)
- [ ] Belge son geçerlilik tarihi takibi
- [ ] Belge yenileme hatırlatmaları
- [ ] Belge arşivi yönetimi
- [ ] Otomatik hatırlatma sistemi

## Raporlama ve Analiz Modülü
- [ ] Araç kullanım raporları
- [ ] Maliyet analizi raporları
- [ ] Departman bazlı raporlar
- [ ] Personel bazlı raporlar
- [ ] Özelleştirilebilir rapor oluşturma
- [ ] Rapor dışa aktarma (PDF, Excel, vb.)
- [ ] Grafikler ve görselleştirmeler
  - [ ] İnteraktif grafikler ve veri görselleştirmeleri
  - [ ] Gerçek zamanlı güncellenen dashboard

## Kullanıcı Arayüzü ve Tasarım
- [ ] Tema değiştirici (theme switcher) özelliği
  - [ ] Açık/koyu tema seçenekleri ve özel temalar
  - [ ] WCAG AA standardına uygun kontrast oranları (en az 4.5:1)
  - [ ] Kullanıcı tercihlerinin yerel depolamada saklanması
- [ ] Modern ve gösterişli tasarım dili
- [ ] Zengin ikon kütüphanesi kullanımı (Font Awesome, Material Icons)
- [ ] İnteraktif grafikler ve veri görselleştirmeleri
- [ ] Kullanıcı deneyimini zenginleştiren animasyonlar ve geçiş efektleri
- [ ] CRUD işlemlerinin modal pencereler içinde gerçekleştirilmesi
- [ ] Responsive tasarım ve mobil uyumluluk
  - [ ] Tüm ekran boyutlarında (akıllı telefonlar, tabletler, masaüstü) düzgün görüntüleme
  - [ ] Mobil öncelikli (mobile-first) tasarım yaklaşımı
  - [ ] Dokunmatik ekran optimizasyonu
  - [ ] Mobil cihazlarda performans optimizasyonu
  - [ ] Progressive Web App (PWA) özellikleri

## Mobil Uyumluluk
- [ ] Tam mobil uyumlu uygulama geliştirme
  - [ ] Tüm ekran boyutlarında (akıllı telefonlar, tabletler, masaüstü) düzgün çalışma
  - [ ] Esnek grid sistemi ve görüntü ölçeklendirme
  - [ ] Mobil öncelikli (mobile-first) tasarım yaklaşımı
- [ ] Dokunmatik ekran optimizasyonu
  - [ ] Yeterli buton boyutları ve dokunma alanları
  - [ ] Dokunmatik hareketlerin desteklenmesi
- [ ] Mobil cihazlarda performans optimizasyonu
- [ ] Offline çalışma modu veya sınırlı bağlantı durumlarında kullanılabilirlik
- [ ] Progressive Web App (PWA) özelliklerinin eklenmesi
- [ ] Mobil tarayıcı uyumluluğu testleri

## Genel Modüller
Bu modüller için `generic_yapilacaklar.md` dosyasına bakınız:

- Kullanıcı Yönetimi ve Güvenlik
- Bildirim Sistemi
- Test ve Kalite Kontrol
- Dağıtım ve Devreye Alma

## Not
Bu yapılacaklar listesi, projeye özel görevleri içerir. Genel proje görevleri için `generic_yapilacaklar.md` dosyasına bakınız. Bu şekilde, proje yönetimini daha organize bir şekilde yapabilir ve gelecekteki projelerde de kullanabileceğiniz bir şablon oluşturabilirsiniz.
