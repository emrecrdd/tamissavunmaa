import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeo, metaEntries, structuredData } from '../config/seo';
export default function Seo() {
 const {pathname} = useLocation();
 useEffect(() => {
  const seo = getSeo(pathname);
  document.title = seo.title;
  for (const [attribute,key,value] of metaEntries(pathname)) {
   let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
   if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attribute,key); document.head.append(tag); }
   tag.content = value;
  }
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (seo.noindex) canonical?.remove();
  else { if (!canonical) { canonical = document.createElement('link'); canonical.rel='canonical'; document.head.append(canonical); } canonical.href=seo.url; }
  document.getElementById('structured-data')?.remove();
  const data = structuredData(pathname);
  if (data) { const script=document.createElement('script'); script.id='structured-data'; script.type='application/ld+json'; script.textContent=JSON.stringify(data); document.head.append(script); }
 }, [pathname]);
 return null;
}
