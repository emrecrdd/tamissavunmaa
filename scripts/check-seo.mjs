import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {pages,getSeo} from '../src/config/seo.js';
const titles=new Set();
for(const path of [...Object.keys(pages),'/404']) {
 const file=path==='/404'?'dist/404.html':path==='/'?'dist/index.html':`dist${path}/index.html`;
 const html=await readFile(file,'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${path}: H1`);
 assert.equal((html.match(/<meta name="description"/g)||[]).length,1,`${path}: description`);
 const title=html.match(/<title>(.*?)<\/title>/)[1];assert(!titles.has(title));titles.add(title);
 if(path==='/404'){assert(html.includes('noindex, follow'));assert(!html.includes('rel="canonical"'));continue;}
 assert(html.includes(`rel="canonical" href="${getSeo(path).url}"`),path);
 const data=JSON.parse(html.match(/<script type="application\/ld\+json" id="structured-data">(.*?)<\/script>/)[1]);assert(data['@graph'].length>=3);
 assert(html.match(/<main[\s\S]*?<\/main>/)[0].replace(/<[^>]+>/g,'').length>80);
 for(const match of html.matchAll(/<img[^>]+src="(\/[^"?]+)"/g))await access('dist'+match[1]);
 console.log('OK',path);
}
console.log('SEO HTML kontrolleri başarılı. Hosting HTTP ve tarayıcı testleri ayrıca gereklidir.');
