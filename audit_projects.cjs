const fs = require('fs');
const path = require('path');

const baseDir = '/Users/MRT/Desktop/base44_projekte';
const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('.') && !d.name.startsWith('_') && d.name !== 'wattpeak.de')
  .map(d => d.name);

const report = [];

for (const dir of dirs) {
  const p = path.join(baseDir, dir);
  let hasVercelJson = false;
  let hasPrerender = false;
  let hasSitemap = false;
  let hasCacheHeader = false;
  let hasSpaRewrite = false;
  let sitemapDynamic = false;
  let wwwMismatch = false;

  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(p, 'package.json'), 'utf8'));
    
    // Check vercel.json
    if (fs.existsSync(path.join(p, 'vercel.json'))) {
      hasVercelJson = true;
      const v = JSON.parse(fs.readFileSync(path.join(p, 'vercel.json'), 'utf8'));
      if (v.rewrites && v.rewrites.length > 0) hasSpaRewrite = true;
      if (v.headers && v.headers.find(h => h.source && h.source.includes('assets'))) hasCacheHeader = true;
    }

    // Check prerender.js
    if (fs.existsSync(path.join(p, 'prerender.js'))) {
      hasPrerender = true;
      const pre = fs.readFileSync(path.join(p, 'prerender.js'), 'utf8');
      if (pre.includes('sitemap.xml')) sitemapDynamic = true;
    }

    // Check sitemap.xml
    if (fs.existsSync(path.join(p, 'public', 'sitemap.xml'))) {
      hasSitemap = true;
      const sm = fs.readFileSync(path.join(p, 'public', 'sitemap.xml'), 'utf8');
      if (sm.includes('www.')) {
        // let's check canonical in index.html
        let index = '';
        if (fs.existsSync(path.join(p, 'index.html'))) {
          index = fs.readFileSync(path.join(p, 'index.html'), 'utf8');
        }
        const canonicalMatch = index.match(/<link rel="canonical" href="(.*?)"/);
        if (canonicalMatch && !canonicalMatch[1].includes('www.')) {
          wwwMismatch = true;
        }
      }
    }

    report.push({
      project: dir,
      status: 'OK',
      details: {
        hasVercelJson,
        hasSpaRewrite,
        hasCacheHeader,
        hasPrerender,
        sitemapDynamic,
        wwwMismatch
      }
    });

  } catch (e) {
    // maybe no package.json or not a web project
    report.push({
      project: dir,
      status: 'SKIP',
      error: e.message.substring(0, 50)
    });
  }
}

console.log(JSON.stringify(report, null, 2));
