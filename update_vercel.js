const fs = require('fs');
const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

// Remove any existing rewrites to avoid duplication
config.rewrites = config.rewrites || [];
config.rewrites = config.rewrites.filter(r => r.destination !== '/index.html');

config.rewrites.push({
  "source": "/((?!ads\\.txt|robots\\.txt|sitemap\\.xml|feed\\.xml|llms\\.txt|og-image\\.png|favicon\\.svg|assets/.*).*)",
  "destination": "/index.html"
});

fs.writeFileSync('vercel.json', JSON.stringify(config, null, 2));
console.log('Updated vercel.json');
