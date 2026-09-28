import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AmazonProductShowcase from '../components/AmazonProductShowcase';
import TrustBox from '../components/TrustBox';
import { PackageCheck, ShieldCheck, CheckCircle2, ArrowRight, Zap, AlertCircle } from 'lucide-react';
import { useDocumentMeta } from '../utils/seo';

export default function KomplettsetsPage() {
  useDocumentMeta({
    title: 'PV & Balkonkraftwerk Komplettsets im Vergleich · Wattpeak',
    description: 'Steckerfertige 800W-Balkonsolarsets und PV-Komplettpakete: Lieferumfang, Wechselrichter, Halterung und Schukokabel im Check.',
    canonicalPath: '/komplettsets',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Photovoltaik & Balkonkraftwerk Komplettsets im Vergleich',
      url: 'https://www.wattpeak.de/komplettsets',
    },
  });
  const setCategories = [
    {
      title: '800W Stecker-Solar Sets (Balkon & Terrasse)',
      power: 'Bis 2.000 Wp Modul / 800 W AC',
      scope: '2–4 bifaziale Glas-Glas Module, Mikrowechselrichter (z. B. Hoymiles/Deye), Schukokabel, Halterungssatz.',
      install: '100 % DIY ohne Elektriker erlaubt (vereinfachte MaStR-Registrierung nach Solarpaket I).',
      price: 'ca. 300 – 650 € *',
      target: 'Mieter, Wohnungseigentümer, Kleingarten',
      ctaText: 'Zum 800W Balkon-Simulator',
      ctaLink: '/balkonkraftwerk'
    },
    {
      title: '3 bis 5 kWp DIY-Komplettsets (Garage & Flachdach)',
      power: '3.000 – 5.000 Wp Modulleistung',
      scope: '6–10 Glas-Glas TOPCon Module, 1- oder 3-Phasen-String-Wechselrichter, Aufständerungs-Dreiecke, DC-Trennschalter.',
      install: 'Mechanische Montage in Eigenleistung möglich; AC-Netzanschluss & IBN erfordern eingetragenen Elektro-Fachbetrieb.',
      price: 'ca. 1.800 – 3.200 € * (ohne Speicher)',
      target: 'Eigenheimbesitzer mit handwerklichem Geschick',
      ctaText: 'Ertrag & Dimensionierung berechnen',
      ctaLink: '/ertragsrechner'
    },
    {
      title: '8 bis 12 kWp Heimanlagen-Sets mit Speicher',
      power: '8.000 – 12.000 Wp + 5–10 kWh LiFePO4',
      scope: '18–26 High-End N-Type Module, Hybrid-Wechselrichter (z. B. Huawei, Sungrow, Fronius), LFP-Batterieturm, Smart Meter, Unterkonstruktion.',
      install: 'Komplette DC-Montage durch Dachdecker/DIY möglich; Abnahme und Zählerschrankumbau zwingend nach NAV § 13.',
      price: 'ca. 6.500 – 10.800 € *',
      target: 'Einfamilienhaus mit Wärmepumpe / E-Auto',
      ctaText: 'System-Decoder starten',
      ctaLink: '/system-decoder'
    }
  ];

  const checklistItems = [
    {
      title: 'Solarmodule: N-Type TOPCon oder HJT Glas-Glas',
      desc: 'Achten Sie auf Doppelglas-Ausführung (2 mm / 2 mm). Glas-Glas bietet besseren Brandschutz (Klasse A) und 30 Jahre lineare Leistungsgarantie.'
    },
    {
      title: 'Wechselrichter mit Schattenmanagement & 2+ MPPT',
      desc: 'Mindestens zwei separate MPPT-Tracker stellen sicher, dass teilverschattete Dachhälften oder Gauben nicht den gesamten String herunterziehen.'
    },
    {
      title: 'DC-Überspannungsschutz Typ 1+2 & Trennschalter',
      desc: 'Ein normgerechter Generatoranschlusskasten (GAK) mit DC-Sicherungen schützt Wechselrichter und Hausverkabelung vor Blitz-Überspannungen.'
    },
    {
      title: 'Solarkabel nach EN 50618 (mindestens 6 mm²)',
      desc: 'UV-, ozon- und witterungsbeständige Leitungen mit halogenfreier Isolierung minimieren Leitungsverluste auf langen String-Wegen.'
    },
    {
      title: 'Statisch zertifiziertes Montagesystem',
      desc: 'Dachhaken und Klemmen müssen für die lokale Wind- und Schneelastzone nach Eurocode 1 (DIN EN 1991-1-4) bauaufsichtlich zugelassen sein.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 w-full">
        {/* Editorial Hero */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-mono text-xs font-bold border border-amber-300">
              <PackageCheck className="w-3.5 h-3.5 text-amber-800" />
              Do-It-Yourself &amp; schlüsselfertige Bausätze
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
              Photovoltaik-Komplettsets:<br />
              <span className="text-amber-500">Kaufberater, Lieferumfang &amp; Regeln.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Vom steckerfertigen 800W-Balkonset bis zur 10-kWp-Dachanlage mit Speicher: Worauf kommt es beim Komplettpaket 
              wirklich an, welche Komponenten dürfen nicht fehlen und wann ist die Abnahme durch einen Elektrofachbetrieb gesetzlich vorgeschrieben?
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/ertragsrechner"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-sm px-6 py-3 rounded-2xl shadow transition"
              >
                Passende Anlagengröße berechnen
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/hardware-katalog"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-sm px-6 py-3 rounded-2xl transition"
              >
                Einzelkomponenten vergleichen
              </Link>
            </div>
          </div>

          {/* 4 Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Einsparpotenzial</span>
              <div className="text-emerald-700 font-black text-lg mt-0.5">30 – 50 % DIY</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Lieferumfang</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">Alles abgestimmt</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Mehrwertsteuer</span>
              <div className="text-amber-700 font-black text-lg mt-0.5">0 % (§ 12 Abs. 3)</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Elektriker</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">&gt; 800W Pflicht</div>
            </div>
          </div>
        </section>

        {/* 3 Classes of Complete Sets */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Die drei Leistungsklassen von Photovoltaik-Komplettsets
            </h2>
            <p className="text-sm text-slate-600">
              Je nach Montageort, Budget und technischem Anspruch teilen sich Komplettsysteme in drei Hauptkategorien auf:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {setCategories.map((c) => (
              <div key={c.title} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    {c.power}
                  </div>
                  <h3 className="font-black text-slate-950 text-lg leading-snug">{c.title}</h3>
                  <div className="text-xs text-slate-600 space-y-2 pt-1">
                    <div><strong className="text-slate-900 block">Typischer Lieferumfang:</strong> {c.scope}</div>
                    <div><strong className="text-slate-900 block">Installation &amp; Normen:</strong> {c.install}</div>
                    <div><strong className="text-slate-900 block">Zielgruppe:</strong> {c.target}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-mono uppercase text-slate-500">Preisspanne:</span>
                    <span className="text-sm font-black font-mono text-slate-950">{c.price}</span>
                  </div>
                  <Link
                    to={c.ctaLink}
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition"
                  >
                    {c.ctaText}
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* E-Auto Hinweis */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <strong className="text-slate-900">Praxis-Tipp für E-Auto-Besitzer:</strong> Wer eine PV-Heimanlage für solares Überschussladen nutzen möchte, benötigt eine steuerbare 11-kW-Wallbox mit automatischer Phasenumschaltung.
            </div>
            <a
              href="https://www.ladestandorte.de/wallbox-vergleich"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 font-bold text-amber-700 hover:text-amber-600 shrink-0 underline"
            >
              Wallbox-Vergleich auf ladestandorte.de
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Quality Checklist */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Qualitäts-Checkliste: Worauf muss man beim Komplettset achten?
            </h2>
            <p className="text-sm text-slate-600">
              Billigangebote sparen oft an sicherheitsrelevanten Bauteilen. Prüfen Sie jedes Set vor dem Kauf anhand dieser 5 Kriterien:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklistItems.map((item, idx) => (
              <div key={item.title} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <h3 className="font-extrabold text-slate-950 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Legal & Electrician Notice */}
        <section className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-10 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            Rechtlicher Hinweis zur Elektroinstallation
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Was dürfen Sie selbst machen – und ab wann haftet der Elektrofachbetrieb?
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Gemäß <strong>§ 13 Niederspannungsanschlussverordnung (NAV)</strong> dürfen Arbeiten an elektrischen Anlagen, 
            die an das öffentliche Niederspannungsnetz angeschlossen sind, ausschließlich durch ein in das Installateurverzeichnis 
            eines Netzbetreibers eingetragenes Installationsunternehmen ausgeführt werden.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                In Eigenleistung erlaubt:
              </div>
              <p className="text-slate-600">
                Mechanische Dachmontage der Schienen und Module, Kabelverlegung bis zum Wechselrichter (DC-Seite) und Zusammenbau von steckerfertigen 800W-Balkongeräten.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Elektriker-Pflicht (ab 800W):
              </div>
              <p className="text-slate-600">
                AC-Anschluss an den Zählerschrank, Einbau von Zweirichtungszählern / EnFluRi-Sensoren, Inbetriebsetzungsantrag (E.8 Protokoll) beim Netzbetreiber.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Hardware Showcase */}
        <AmazonProductShowcase />

        {/* TrustBox */}
        <TrustBox />

        <div className="text-center text-xs text-slate-500 font-mono">
          * Alle Preise und Ertragsangaben sind beispielhafte Markt-Richtwerte. Reale Angebote variieren je nach Händler, Lieferbedingungen und Zubehör.
        </div>
      </main>

      <Footer />
    </div>
  );
}
