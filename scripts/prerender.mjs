import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
import {render} from '../.prerender/entry-server.js';
import {SITE_URL,pages,getSeo,metaEntries,structuredData} from '../src/config/seo.js';
const template = await readFile('dist/index.html','utf8');
const escape = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for (const path of [...Object.keys(pages), '/404']) {
 const s=getSeo(path);
 const data=structuredData(path);
 const head = `<title>${escape(s.title)}</title>\n` + metaEntries(path).map(([attr,key,value])=>`<meta ${attr}="${key}" content="${escape(value)}">`).join('\n') + (s.noindex?'':`\n<link rel="canonical" href="${s.url}">`) + (data?`\n<script type="application/ld+json" id="structured-data">${JSON.stringify(data).replaceAll('<','\\u003c')}</script>`:'');
 const html=template.replace(/<title>[\s\S]*?<\/title>/,'').replace(/<meta name="description"[^>]*>/,'').replace('</head>',head+'\n</head>').replace('<div id="root"></div>',`<div id="root">${render(path)}</div>`);
 const file=path==='/404'?'dist/404.html':path==='/'?'dist/index.html':`dist${path}/index.html`;
 await mkdir(file.slice(0,file.lastIndexOf('/')),{recursive:true});
 await writeFile(file,html);
}
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(pages).map(path=>`<url><loc>${SITE_URL}${path}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
await rm('.prerender',{recursive:true,force:true});
console.log('8 sayfa ve 404 HTML, sitemap ve robots.txt oluşturuldu.');
