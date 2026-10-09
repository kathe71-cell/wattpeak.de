const fs = require('fs');
const path = require('path');

const baseDir = '/Users/MRT/Desktop/base44_projekte';
const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('.') && !d.name.startsWith('_') && d.name !== 'wattpeak.de')
  .map(d => d.name);

for (const dir of dirs) {
  const p = path.join(baseDir, dir);
  console.log(`Processing ${dir}...`);

  try {
    // 1. Fix Vercel JSON (Caching + SPA Fallback)
    const vercelPath = path.join(p, 'vercel.json');
    if (fs.existsSync(vercelPath)) {
      let config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
      
      // Fix cache header
      config.headers = config.headers || [];
      if (!config.headers.find(h => h.source && h.source.includes('/assets/'))) {
        config.headers.unshift({
          "source": "/assets/(.*)",
          "headers": [
            { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
          ]
        });
      }

      // Fix SPA Rewrite
      config.rewrites = config.rewrites || [];
      config.rewrites = config.rewrites.filter(r => r.destination !== '/index.html');
      config.rewrites.push({
        "source": "/((?!ads\\.txt|robots\\.txt|sitemap\\.xml|feed\\.xml|llms\\.txt|og-image\\.png|favicon\\.svg|assets/.*).*)",
        "destination": "/index.html"
      });

      fs.writeFileSync(vercelPath, JSON.stringify(config, null, 2));
      console.log(`  - Updated vercel.json headers & rewrites`);
    }

    // 2. Fix Canonical & Sitemap dynamic generation in prerender.js
    const prerenderPath = path.join(p, 'prerender.js');
    if (fs.existsSync(prerenderPath)) {
      let code = fs.readFileSync(prerenderPath, 'utf8');

      // Attempt to extract base URL from code (e.g. `https://domain.de`)
      const urlMatch = code.match(/https:\/\/(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})/);
      if (urlMatch) {
        const domain = urlMatch[2]; // non-www domain
        const baseUrl = `https://${domain}`;
        
        // Remove 'www.' from canonical replacements if it exists
        code = code.replace(/https:\/\/www\.([a-zA-Z0-9-]+\.[a-zA-Z]{2,})/g, 'https://$1');

        // Check if dynamic sitemap generation already exists
        if (!code.includes('sitemap.xml')) {
          // Identify routes array name (ROUTES or routesToPrerender)
          const routesVarMatch = code.match(/const\s+(ROUTES|routesToPrerender|routes)\s*=/);
          if (routesVarMatch) {
            const routesVar = routesVarMatch[1];
            
            // Append sitemap logic
            const sitemapLogic = `\n
// --- Auto-injected Dynamic Sitemap ---
try {
  let routeKeys = [];
  if (Array.isArray(${routesVar})) {
    routeKeys = ${routesVar}.map(r => r.url || r.path);
  } else {
    routeKeys = Object.keys(${routesVar});
  }

  const sitemapUrlset = routeKeys
    .filter(url => url && !url.includes('404') && !url.includes('embed'))
    .map(url => {
      let loc = \`${baseUrl}\${url === '/' ? '' : url}\`;
      let priority = url === '/' ? '1.0' : '0.8';
      const today = new Date().toISOString().split('T')[0];
      return \`  <url>\\n    <loc>\${loc}</loc>\\n    <lastmod>\${today}</lastmod>\\n    <changefreq>weekly</changefreq>\\n    <priority>\${priority}</priority>\\n  </url>\`;
    }).join('\\n');

  const sitemapXml = \`<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n\${sitemapUrlset}\\n</urlset>\`;

  fs.writeFileSync(toAbsolute('dist/sitemap.xml'), sitemapXml);
  fs.writeFileSync(toAbsolute('public/sitemap.xml'), sitemapXml);
  console.log('  - Generated dynamic sitemap.xml for ' + '${domain}');
} catch (e) {
  console.error('Error generating sitemap:', e.message);
}
// -----------------------------------
`;
            code += sitemapLogic;
            console.log(`  - Injected dynamic sitemap generation`);
          }
        }
      }
      fs.writeFileSync(prerenderPath, code);
    }

    // 3. Fix static sitemap.xml just in case
    const sitemapPath = path.join(p, 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      let sm = fs.readFileSync(sitemapPath, 'utf8');
      sm = sm.replace(/https:\/\/www\./g, 'https://');
      const today = new Date().toISOString().split('T')[0];
      sm = sm.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
      fs.writeFileSync(sitemapPath, sm);
      console.log(`  - Fixed static public/sitemap.xml (www removal & dates)`);
    }

  } catch (e) {
    console.error(`  ! Error processing ${dir}:`, e.message);
  }
}
console.log('Batch processing complete.');
