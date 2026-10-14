# TAMİS SEO düzenlemesi

Ana adres: https://tamisteknoloji.com.tr/

## Kurulum

Bu paketin içeriğini mevcut projenizin içine kopyalayın. Mevcut .git klasörünüzü koruyun. Pakette node_modules ve dist bulunmaz.

```powershell
npm ci
npm run build
npm run preview
```

Node.js 22.12 veya üzeri kullanın. Netlify build komutu `npm run build`, yayın klasörü `dist` olmalıdır. netlify.toml bu ayarları içerir.

## Yapılanlar

- Sekiz mevcut sayfa için özgün başlık ve açıklama, canonical, Open Graph ve Twitter etiketleri.
- React sayfalarının build sırasında gerçek içerikle statik HTML olarak üretilmesi; istemci tarafında hydration ve gezinme sırasında SEO güncellemesi.
- Tek kaynaktan sitemap ve robots üretimi; asıl alan adının tutarlı kullanılması.
- Mevcut içerikteki şirket bilgilerine dayalı Organization, WebSite, WebPage ve BreadcrumbList JSON-LD verileri. Sertifika, yorum veya puan uydurulmadı.
- Netlify için eski ürün/teknoloji yollarına 301 ve bilinmeyen adreslere gerçek 404 yanıtı. Genel SPA 200 yönlendirmesi kaldırıldı.
- Büyük görsellerin WebP sürümleri, uygun görsellerde geç yükleme, ilk görsellerde öncelik ve boyut bilgileri; küçük favicon ve paylaşım görseli.
- Ana sayfaya mevcut hizmetleri ve Ankara Kahramankazan konumunu açıklayan kısa metin.
- İçeriğin JavaScript çalışmadan da görünmesi için ortak giriş animasyonlarının başlangıçta görünür olması.

## Yayına geçerken

1. Netlify'da tamisteknoloji.com.tr ana domain olmalı; www, TLS ve DNS ayarlarını doğrulayın. Eski Netlify adresinin yönlendirmesi bu hostingde geçerlidir. Başka bir hostingde 301/404 kurallarını aynı mantıkla yapılandırın.
2. Search Console'da tamisteknoloji.com.tr alan adı mülkünü DNS ile doğrulayın. https://tamisteknoloji.com.tr/sitemap.xml dosyasını gönderin.
3. Ana sayfa, yetkinlikler ve iletişimi URL Denetleme ile kontrol edin. Google'ın seçtiği canonical adreslerini takip edin.
4. Rich Results Test / Schema Markup Validator ile JSON-LD verilerini, PageSpeed Insights ile mobil performansı kontrol edin. Bu pakette canlı site ölçümü yapılmadı.
5. Rastgele bir URL'nin HTTP 404, /teknolojiler adresinin 301, sekiz ana sayfanın 200 döndürdüğünü yayın sonrasında kontrol edin. Vite preview, Netlify yönlendirmelerini uygulamaz.
6. Kaynaktaki info@tamis.com.tr adresi korundu. Güncel şirket e-postasını teyit edin; değişecekse iletişim/kariyer içeriğiyle src/config/seo.js birlikte güncellenmeli.
7. Şirket adı mevcut içerikte TAMİS Teknoloji olduğu için korundu; resmi ticari unvan, adres, telefon ve üretim iddialarını şirketle doğrulayın.

## Sonraki içerik çalışması

CNC talaşlı imalat, CNC tornalama ve derin delme için ayrı hizmet sayfaları; yalnızca doğrulanmış tolerans, malzeme, kapasite, parça örnekleri ve gerçek üretim fotoğrafları sağlandığında hazırlanmalı. Boş ya da birbirini tekrarlayan anahtar kelime sayfaları açılmamalı. Google İşletme Profili bilgileriyle sitedeki ad/adres/telefon uyumlu tutulmalı.

Kod düzenlemeleri sıralama garantisi değildir. Search Console doğrulaması, canlıya yayın ve indeksleme takibi ayrıca yapılmalıdır.

Kaynaklar:
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview

## Doğrulama

`npm run build` başarılı. `node scripts/check-seo.mjs` ile dokuz HTML çıktısında H1, özgün title, açıklama, canonical, JSON-LD, sayfa içeriği ve görsel yolları kontrol edilir. Kurumsal sayfanın eksik H1 etiketi düzeltildi. Bu ortamda Chrome indirilemediğinden tarayıcıda görsel/gezinme testi tamamlanamadı; yayın öncesi masaüstü ve mobil gezinmeyi kontrol edin.
