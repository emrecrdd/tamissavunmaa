export const SITE_URL = 'https://tamisteknoloji.com.tr';
export const BRAND = 'TAMİS Teknoloji';
export const pages = {
  '/': { name: 'Ana Sayfa', title: 'TAMİS Teknoloji | Ankara CNC Talaşlı İmalat ve Derin Delme', description: 'Ankara Kahramankazan’da CNC talaşlı imalat, CNC tornalama, çelik karot derin delme, tasarım ve prototipleme. TAMİS üretim kabiliyetlerini keşfedin.' },
  '/kurumsal': { name: 'Kurumsal', title: 'Kurumsal | TAMİS Teknoloji, Ankara', description: 'TAMİS Teknoloji’nin kurumsal yaklaşımı, misyonu, vizyonu ve temel değerleri. Ankara’da mühendislik, hassas imalat ve üretim odaklı çalışmalar.' },
  '/yetkinlikler': { name: 'Yetkinlikler', title: 'CNC Talaşlı İmalat ve Derin Delme | TAMİS Teknoloji', description: '3 ve 4 eksen CNC dik işleme, CNC tornalama, çelik karot derin delme, hidrolik pres ve prototipleme. TAMİS’in işlediği malzemeleri inceleyin.' },
  '/uretim-altyapisi': { name: 'Üretim Altyapısı', title: 'Makine Parkı ve Üretim Altyapısı | TAMİS Teknoloji', description: 'TAMİS CNC dik işleme ve torna parkı, 4 metre üniversal torna, 160 ton hidrolik pres ve CMM ölçüm altyapısı. Üretim kapasitelerini inceleyin.' },
  '/ar-ge': { name: 'Ar-Ge', title: 'Savunma ve Havacılık Ar-Ge, Prototipleme | TAMİS', description: 'Savunma ve havacılık alanlarına yönelik TAMİS Ar-Ge yaklaşımı. Tasarım, prototipleme ve üretim kabiliyetleriyle desteklenen mühendislik çalışmaları.' },
  '/medya': { name: 'Medya', title: 'Üretim Görselleri ve Medya | TAMİS Teknoloji', description: 'TAMİS Teknoloji’nin üretim, talaşlı imalat ve mühendislik çalışmalarına ait görselleri inceleyin. Üretim altyapısını yakından tanıyın.' },
  '/kariyer': { name: 'Kariyer', title: 'Kariyer ve İş Başvurusu | TAMİS Teknoloji Ankara', description: 'TAMİS Teknoloji’de kariyer olanakları ve başvuru bilgileri. Ankara’da üretim, mühendislik ve teknik çalışma alanlarını keşfedin.' },
  '/iletisim': { name: 'İletişim', title: 'İletişim ve Adres | TAMİS Teknoloji Kahramankazan', description: 'TAMİS Teknoloji iletişim: Saray Mahallesi, 50. Cadde 17/C, Kahramankazan Ankara. Telefon: +90 312 394 01 35. Konum ve iletişim bilgileri.' },
};
export const normalizePath = path => path.replace(/\/+$/, '') || '/';
export function getSeo(path) {
  const pathname = normalizePath(path);
  const page = pages[pathname];
  return { ...(page || {name: 'Sayfa Bulunamadı', title: 'Sayfa Bulunamadı | TAMİS Teknoloji', description: 'Aradığınız sayfa bulunamadı. TAMİS Teknoloji ana sayfasından üretim ve iletişim bilgilerine ulaşabilirsiniz.'}), pathname, url: SITE_URL + (pathname === '/' ? '/' : pathname), noindex: !page };
}
export function structuredData(path) {
  const seo = getSeo(path);
  if (seo.noindex) return null;
  const orgId = SITE_URL + '/#organization';
  const graph = [
    {'@type': 'Organization', '@id': orgId, name: BRAND, url: SITE_URL + '/', logo: SITE_URL + '/brand/tamis-logo.png', telephone: '+90-312-394-01-35', email: 'info@tamis.com.tr', address: {'@type':'PostalAddress', streetAddress:'Saray Mah. 50. Cad. 17/C', addressLocality:'Kahramankazan', addressRegion:'Ankara', postalCode:'06980', addressCountry:'TR'}},
    {'@type':'WebSite', '@id':SITE_URL+'/#website', url:SITE_URL+'/', name:BRAND, publisher:{'@id':orgId}, inLanguage:'tr-TR'},
    {'@type':seo.pathname === '/iletisim' ? 'ContactPage' : seo.pathname === '/kurumsal' ? 'AboutPage' : 'WebPage', '@id':seo.url+'#webpage', url:seo.url, name:seo.title, description:seo.description, inLanguage:'tr-TR', isPartOf:{'@id':SITE_URL+'/#website'}, about:{'@id':orgId}, ...(seo.pathname !== '/' ? {breadcrumb:{'@id':seo.url+'#breadcrumb'}} : {})},
  ];
  if (seo.pathname !== '/') graph.push({'@type':'BreadcrumbList','@id':seo.url+'#breadcrumb',itemListElement:[{'@type':'ListItem',position:1,name:'Ana Sayfa',item:SITE_URL+'/'},{'@type':'ListItem',position:2,name:seo.name,item:seo.url}]});
  return {'@context':'https://schema.org','@graph':graph};
}
export function metaEntries(path) {
 const s = getSeo(path);
 return [ ['name','description',s.description], ['name','robots',s.noindex?'noindex, follow':'index, follow, max-image-preview:large'], ['property','og:type','website'], ['property','og:locale','tr_TR'], ['property','og:site_name',BRAND], ['property','og:title',s.title], ['property','og:description',s.description], ['property','og:url',s.url], ['property','og:image',SITE_URL+'/brand/social-card.jpg'], ['property','og:image:width','1200'], ['property','og:image:height','630'], ['property','og:image:alt','TAMİS Teknoloji'], ['name','twitter:card','summary_large_image'], ['name','twitter:title',s.title], ['name','twitter:description',s.description], ['name','twitter:image',SITE_URL+'/brand/social-card.jpg'] ];
}
