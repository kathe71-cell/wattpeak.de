import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDocumentMeta } from '../utils/seo';
import { Zap, CheckCircle2, XCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { getAmazonDirectUrl } from '../data/products';

interface WRTyp {
  typ: string;
  label: string;
  kurz: string;
  vorteile: string[];
  nachteile: string[];
  fuerWen: string;
  farbe: string;
}

const WR_TYPEN: WRTyp[] = [
  {
    typ: 'mikro',
    label: 'Mikrowechselrichter',
    kurz: 'Für jedes Modul ein eigener Wechselrichter direkt am Paneel',
    vorteile: [
      'Kein Gesamtausfall durch ein Schattenmodul (modulweises MPPT)',
      'Plug-and-Play für Balkonkraftwerke: Schuko-Anschluss konform',
      'Monitoring auf Modulebene (z. B. S-Miles Cloud bei Hoymiles)',
      'Einfache Erweiterung: weitere Module jederzeit nachrüstbar',
      'Kleinste Einheit: Ideal für 1–4 Module (bis 2.000 Wp)',
      'Defektrisiko auf ein Modul begrenzt (kein Single-Point-of-Failure)',
    ],
    nachteile: [
      'Höhere Stückkosten bei vielen Modulen (> 6–8 Module)',
      'Mehrere Geräte = mehr Servicepunkte bei Defekt',
    ],
    fuerWen: 'Balkonkraftwerk (1–4 Module), Teilbeschattung, Nachrüstung einzelner Module, Mieter & WEG',
    farbe: 'amber',
  },
  {
    typ: 'string',
    label: 'String-Wechselrichter',
    kurz: 'Klassischer Zentralwechselrichter für ganze Modulreihen (Strings)',
    vorteile: [
      'Niedrigste Kosten pro kWp bei > 5 kWp (1 Gerät für viele Module)',
      'Bewährte Technologie mit langer Marktgeschichte (25+ Jahre)',
      'Einfache Wartung da zentraler Servicepunkt',
      'Hoher Wirkungsgrad bei unverschatteten Süddächern',
    ],
    nachteile: [
      'Schwächstes Modul limitiert gesamten String (Flaschenhals)',
      'Kein Modul-Monitoring ohne optionale Leistungsoptimierer',
      'Einzelgeräteausfall = Gesamtanlage steht still',
      'Ungeeignet für Ost-West-Dächer ohne Mehrstrang-MPPT',
    ],
    fuerWen: 'Einfamilienhäuser > 5 kWp, unverschattete Süddächer, Gewerbe-PV-Anlagen',
    farbe: 'blue',
  },
  {
    typ: 'hybrid',
    label: 'Hybrid-Wechselrichter',
    kurz: 'Kombinierter PV- + Speicher-Wechselrichter für Hausbatterien',
    vorteile: [
      'Integrierter Laderegler für DC-gekoppelte Hausbatterien',
      'Höchste Systemeffizienz durch DC-Kopplung (weniger Umwandlung)',
      'Notstromfähigkeit / Schwarzstartfähigkeit bei vielen Modellen',
      'Echtzeit-Steuerung: Einspeisung, Eigenverbrauch, Ladung in einer Einheit',
    ],
    nachteile: [
      'Teuerste Option bei kleineren Anlagen (< 5 kWp)',
      'Komplexere Installation (AC + DC + Speicher)',
      'Proprietäre Akkusysteme oft erforderlich',
    ],
    fuerWen: 'Hauseigentümer mit > 8 kWp PV + Haushaltsspeicher (> 5 kWh), Notstrom-Anforderung',
    farbe: 'emerald',
  },
];

const PRODUKTE = [
  {
    name: 'Hoymiles HMS-800W-2T',
    typ: 'mikro',
    leistung: '800 W AC',
    wirkungsgrad: '96,7 %',
    mppt: 2,
    garantie: '12 Jahre',
    asin: 'B0CJGKQXVL',
    searchQuery: 'Hoymiles HMS-800W-2T Mikrowechselrichter 800W',
    highlight: 'Referenz-Mikrowechselrichter für Balkonkraftwerke',
  },
  {
    name: 'APsystems EZ1-M',
    typ: 'mikro',
    leistung: '800 W AC',
    wirkungsgrad: '97,3 %',
    mppt: 2,
    garantie: '12 Jahre',
    asin: 'B0CMXX3Y58',
    searchQuery: 'APsystems EZ1-M Mikrowechselrichter 800W',
    highlight: '20A Eingangsstrom für Hochleistungsmodule',
  },
];

const FARB_MAP: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-800',   badge: 'bg-amber-100 text-amber-800 border-amber-300' },
  blue:    { bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-800',    badge: 'bg-blue-100 text-blue-800 border-blue-300' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
};

export default function WechselrichterVergleichPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useDocumentMeta({
    title: 'Wechselrichter Vergleich 2025: Mikro vs. String vs. Hybrid',
    description: 'Mikrowechselrichter, String-Wechselrichter und Hybrid-Wechselrichter für Photovoltaik im technischen Vergleich: Funktionsweise, Vorteile, Nachteile und Produktempfehlungen.',
    canonicalPath: '/wechselrichter-vergleich',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Wechselrichter Vergleich 2025: Mikro vs. String vs. Hybrid',
        description: 'Detaillierter technischer Vergleich der drei PV-Wechselrichtertypen mit Produktempfehlungen.',
        url: 'https://www.wattpeak.de/wechselrichter-vergleich',
        author: { '@type': 'Organization', name: 'wattpeak.de' },
        publisher: { '@type': 'Organization', name: 'wattpeak.de', url: 'https://www.wattpeak.de' },
        datePublished: '2025-01-01',
        dateModified: '2026-09-28',
        image: 'https://www.wattpeak.de/og-image.png',
        inLanguage: 'de',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was ist der Unterschied zwischen Mikro- und String-Wechselrichter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ein Mikrowechselrichter wird direkt an jedem einzelnen Solarmodul angebracht und wandelt den Gleichstrom modulweise in Wechselstrom um. Ein String-Wechselrichter ist ein zentrales Gerät, das alle Module einer Reihe (String) zusammenführt und gemeinsam umwandelt. Mikrowechselrichter sind ideal bei Teilbeschattung und für kleine Anlagen; String-Wechselrichter sind kostengünstiger bei großen, unverschatteten Anlagen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Welcher Wechselrichter ist für ein Balkonkraftwerk geeignet?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Für Balkonkraftwerke (Stecker-Solargeräte) bis 800 W werden ausschließlich Mikrowechselrichter verwendet, die nach VDE-AR-N 4105 zertifiziert sind und über einen integrierten NA-Schutz verfügen. Empfohlen: Hoymiles HMS-800W-2T oder APsystems EZ1-M 800W.',
            },
          },
          {
            '@type': 'Question',
            name: 'Brauche ich einen Hybrid-Wechselrichter für einen Batteriespeicher?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nicht zwingend. Bei Balkonkraftwerken können AC-seitige Balkonspeicher wie Anker SOLIX Solarbank 2 oder Growatt NOAH 2000 ohne Hybrid-Wechselrichter betrieben werden. Hybrid-Wechselrichter werden erst für große Hausbatterien (> 5 kWh) im DC-gekoppelten Betrieb relevant.',
            },
          },
        ],
      },
    ],
  });

  const faqs = [
    {
      q: 'Wie lange hält ein Wechselrichter?',
      a: 'Mikrowechselrichter wie Hoymiles oder APsystems bieten 12 Jahre Herstellergarantie. In der Praxis erreichen moderne Mikrowechselrichter durch IP67-Schutz und hohe MTBF-Werte (> 500.000 Stunden) Lebensdauern von 20–25 Jahren. String-Wechselrichter von Qualitätsherstellern (SMA, Fronius) halten typischerweise 15–20 Jahre.',
    },
    {
      q: 'Was kostet ein Mikrowechselrichter für ein Balkonkraftwerk?',
      a: 'Mikrowechselrichter für 800W-Balkonkraftwerke (Hoymiles HMS-800W-2T, APsystems EZ1-M) kosten zwischen 119 und 169 € (Stand: 2026). In Komplettsets mit 2 Solarmodulen + Kabel beginnen die Preise bei ca. 300 €.',
    },
    {
      q: 'Ist ein Wechselrichter mit VDE-AR-N 4105 für Balkonkraftwerke Pflicht?',
      a: 'Ja. Seit Solarpaket I (2023) müssen alle Stecker-Solargeräte bis 800 W einen Wechselrichter mit integriertem Netz- und Anlagenschutz (NA-Schutz) nach VDE-AR-N 4105 enthalten. Ältere Geräte ohne integriertes Relais sind nicht mehr normkonform.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 w-full">

        {/* Hero */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-mono text-xs font-bold border border-amber-300">
              <Zap className="w-3.5 h-3.5 text-amber-700" />
              Technik-Vergleich · Stand September 2026
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Wechselrichter Vergleich:<br />
              <span className="text-amber-500">Mikro vs. String vs. Hybrid.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Der Wechselrichter wandelt Gleichstrom (DC) aus den Solarmodulen in netzkonformen Wechselstrom (AC) um.
              Welcher Typ optimal ist, hängt von der Anlagengröße, dem Verschattungsgrad und dem Systemziel ab.
            </p>
          </div>
        </section>

        {/* 3 Typen Karten */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950">Die drei Wechselrichtertypen im Vergleich</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {WR_TYPEN.map((wr) => {
              const f = FARB_MAP[wr.farbe];
              return (
                <div key={wr.typ} className={`rounded-2xl border ${f.border} ${f.bg} p-6 space-y-4`}>
                  <div>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${f.badge}`}>
                      {wr.label}
                    </span>
                    <p className={`text-sm mt-3 ${f.text} font-medium leading-snug`}>{wr.kurz}</p>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-emerald-700 uppercase mb-2">Stärken</div>
                    <ul className="space-y-1">
                      {wr.vorteile.map((v) => (
                        <li key={v} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> {v}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-rose-600 uppercase mb-2">Einschränkungen</div>
                    <ul className="space-y-1">
                      {wr.nachteile.map((n) => (
                        <li key={n} className="flex items-start gap-2 text-xs text-slate-600">
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" /> {n}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-white/60">
                    <div className="text-xs font-bold text-slate-600 uppercase mb-1">Ideal für</div>
                    <p className="text-xs text-slate-700 leading-relaxed">{wr.fuerWen}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Produktempfehlungen Mikrowechselrichter */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-950">Empfehlungen: Mikrowechselrichter für Balkonkraftwerke</h2>
            <p className="text-sm text-slate-500 mt-1">800 W Modelle mit VDE-AR-N 4105 Zertifizierung und integriertem NA-Schutz</p>
          </div>
          <div className="divide-y divide-slate-100">
            {PRODUKTE.map((p) => (
              <div key={p.name} className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-black text-slate-900">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.highlight}</div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                      ⚡ {p.leistung}
                    </span>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                      η {p.wirkungsgrad}
                    </span>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                      {p.mppt}x MPPT
                    </span>
                    <span className="text-xs font-mono bg-emerald-50 px-2 py-0.5 rounded text-emerald-700">
                      {p.garantie} Garantie
                    </span>
                  </div>
                </div>
                <a
                  href={getAmazonDirectUrl(p.asin, p.searchQuery)}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-colors text-sm"
                >
                  Amazon * <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Schnellvergleichs-Tabelle */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-950">Schnellvergleich: Welcher Typ für welche Anlage?</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3 font-bold text-slate-700">Kriterium</th>
                  <th className="text-center px-5 py-3 font-bold text-amber-700">Mikro</th>
                  <th className="text-center px-5 py-3 font-bold text-blue-700">String</th>
                  <th className="text-center px-5 py-3 font-bold text-emerald-700">Hybrid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {[
                  ['Balkonkraftwerk (1–4 Module)', '✅ Ideal', '❌ Nein', '❌ Nein'],
                  ['Kleindach 3–5 kWp', '✅ Gut', '✅ Gut', '⚠️ Teuer'],
                  ['Großdach > 8 kWp', '⚠️ Teuer', '✅ Ideal', '✅ Gut'],
                  ['Teilbeschattung', '✅ Sehr gut', '⚠️ Schwach', '⚠️ Schwach'],
                  ['Mit Hausbatterie', '⚠️ AC-koppelbar', '⚠️ AC-koppelbar', '✅ DC-Kopplung'],
                  ['Notstromfähigkeit', '❌ Nein', '⚠️ Modellabhängig', '✅ Ja (oft)'],
                  ['Kosten pro kWp', '⬆ Höher', '⬇ Günstig', '⬆⬆ Am höchsten'],
                  ['Garantie (typisch)', '12 Jahre', '10–15 Jahre', '10–15 Jahre'],
                ].map(([kr, mikro, string_, hybrid]) => (
                  <tr key={kr} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-700">{kr}</td>
                    <td className="px-5 py-3 text-center text-slate-700">{mikro}</td>
                    <td className="px-5 py-3 text-center text-slate-700">{string_}</td>
                    <td className="px-5 py-3 text-center text-slate-700">{hybrid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-3">
          <h2 className="text-xl font-black text-slate-950">Häufige Fragen</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 text-sm">{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                }
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Weiterführende Links */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/balkonkraftwerk" className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-amber-300 hover:shadow-md transition-all space-y-1">
            <Zap className="w-4 h-4 text-amber-500" />
            <h3 className="font-black text-slate-900 text-sm">Balkonkraftwerk Ratgeber</h3>
            <p className="text-xs text-slate-500">Solarpaket I, Schuko-Norm & MaStR</p>
          </Link>
          <Link to="/balkonkraftwerk-speicher" className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all space-y-1">
            <Zap className="w-4 h-4 text-blue-500" />
            <h3 className="font-black text-slate-900 text-sm">Balkonspeicher Vergleich</h3>
            <p className="text-xs text-slate-500">Anker SOLIX, EcoFlow & Growatt NOAH</p>
          </Link>
          <Link to="/hardware-katalog" className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-300 hover:shadow-md transition-all space-y-1">
            <Zap className="w-4 h-4 text-emerald-500" />
            <h3 className="font-black text-slate-900 text-sm">Hardware-Katalog</h3>
            <p className="text-xs text-slate-500">Alle Produkte mit technischen Daten</p>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
