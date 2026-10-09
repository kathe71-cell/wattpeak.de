import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml');

let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Replace https://www.wattpeak.de/ with https://wattpeak.de/
sitemap = sitemap.replace(/https:\/\/www\.wattpeak\.de/g, 'https://wattpeak.de');

// Replace all <lastmod> dates with today's date
const today = new Date().toISOString().split('T')[0];
sitemap = sitemap.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

fs.writeFileSync(sitemapPath, sitemap);
console.log('Sitemap fixed.');
