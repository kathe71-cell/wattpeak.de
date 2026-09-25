import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render } = await import('./dist-ssr/entry-server.js');

const ROUTES = {
  '/': {
    title: 'Wattpeak · Solar verstehen. Besser entscheiden. | wattpeak.de',
    description: 'Unabhängige Solar-Entscheidungsplattform: 800W Balkonkraftwerke, Haus-Dachanlagen und Speichernachrüstung berechnen, vergleichen und objektiv bewerten.',
  },
  '/rechner': {
    title: 'PV-Rechner Übersicht: Ertrag, Balkonkraftwerk & Speicher · Wattpeak | wattpeak.de',
    description: 'Alle Photovoltaik-Rechner im Überblick: PV-Ertragsrechner, Balkonkraftwerk 800W Simulator, Speicherauslegung und Wirtschaftlichkeitsberechnung.',
  },
  '/ertragsrechner': {
    title: 'PV-Ertragsrechner & Wirtschaftlichkeit · Wattpeak | wattpeak.de',
    description: 'Berechnen Sie Solarertrag, Eigenverbrauchsquote, Speicher-Mehrwert und Amortisationsdauer physikalisch fundiert für Ihr Dach oder Balkonkraftwerk.',
  },
  '/anlagen-vergleich': {
    title: 'Solaranlagen & Größen im Vergleich · Wattpeak | wattpeak.de',
    description: 'Vergleich von Balkonkraftwerken (800W), 5–15 kWp Dachanlagen, Speichersystemen und Gewerbelösungen: Ertrag, Kosten und Autarkie im Überblick.',
  },
  '/hardware-katalog': {
    title: 'Solar-Hardware & Speicherkatalog · Wattpeak | wattpeak.de',
    description: 'Unabhängiger Katalog für Mikrowechselrichter, 800W Komplettsets, LiFePO4-Speichersysteme und Montagesets mit geprüften Herstellerdaten.',
  },
  '/balkonkraftwerk': {
    title: '800W Balkonkraftwerk Ratgeber (Solarpaket I) · Wattpeak | wattpeak.de',
    description: 'Alles zu 800W Stecker-Solargeräten nach Solarpaket I: 2.000 Wp Modullimit, Schuko-Steckdose, MaStR-Registrierung und Speicher-Nachrüstung.',
  },
  '/batteriepass': {
    title: 'EU-Batteriepass & Speicher-Diagnostik · Wattpeak | wattpeak.de',
    description: 'EU-Batteriepass (Verordnung 2023/1542), SOH-Alterungsdiagnostik und Zyklenfestigkeit von LiFePO4-Heim- und Balkonspeichern.',
  },
  '/technologie': {
    title: 'Zelltechnologie: TOPCon, HJT & Perowskit im Vergleich · Wattpeak | wattpeak.de',
    description: 'Physikalischer Vergleich moderner Solarzellen: N-Type TOPCon, Heterojunction (HJT), IBC und Perowskit-Tandem mit Wirkungsgraden und Temperaturkoeffizienten.',
  },
  '/solardachziegel': {
    title: 'Solardachziegel & Gebäudeintegrierte PV (BIPV) · Wattpeak | wattpeak.de',
    description: 'Solardachziegel im technischen Vergleich: Wirkungsgrad, Kosten im Neubau vs. Sanierung, Denkmalschutz und Brandschutz.',
  },
  '/komplettsets': {
    title: 'PV & Balkonkraftwerk Komplettsets im Vergleich · Wattpeak | wattpeak.de',
    description: 'Steckerfertige 800W-Balkonsolarsets und PV-Komplettpakete: Lieferumfang, Wechselrichter, Halterung und Schukokabel im Check.',
  },
  '/solarpflicht': {
    title: 'Solarpflicht & gesetzliche Bauvorgaben nach Bundesländern · Wattpeak | wattpeak.de',
    description: 'Übersicht der Solarpflichten bei Neubau und Dachsanierung in den 16 Bundesländern sowie EEG-Vorgaben für private Eigentümer.',
  },
  '/rechner-embed': {
    title: 'Wattpeak PV-Ertragsrechner Embed Widget | wattpeak.de',
    description: 'Kostenloses interaktives PV-Ertragsrechner Widget für Webmaster und Informationsportale.',
  },
  '/impressum': {
    title: 'Impressum (§ 5 DDG) · Wattpeak | wattpeak.de',
    description: 'Gesetzliche Pflichtangaben und Kontaktdaten des Diensteanbieters von Wattpeak.de gemäß § 5 Digitale-Dienste-Gesetz (DDG).',
  },
  '/datenschutz': {
    title: 'Datenschutzerklärung · Wattpeak | wattpeak.de',
    description: 'Datenschutzerklärung und Informationen zur DSGVO-konformen und datensparsamen Nutzung der Plattform Wattpeak.de.',
  },
};

console.log(`Starting prerendering of ${Object.keys(ROUTES).length} routes...`);

for (const [url, meta] of Object.entries(ROUTES)) {
  const appHtml = render(url);

  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  // Update Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${meta.title}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${meta.title}" />`);

  // Update Description
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${meta.description}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${meta.description}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${meta.description}" />`);

  // Update Canonical & OG URL
  const canonicalUrl = `https://wattpeak.de${url === '/' ? '/' : url}`;
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);

  const filePath = url === '/' ? 'dist/index.html' : `dist${url}/index.html`;
  const dir = path.dirname(toAbsolute(filePath));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(toAbsolute(filePath), html);
  console.log(`  ✓ ${url} -> ${filePath} (${(html.length / 1024).toFixed(1)} kB)`);
}

console.log('Static Site Prerendering complete!');
