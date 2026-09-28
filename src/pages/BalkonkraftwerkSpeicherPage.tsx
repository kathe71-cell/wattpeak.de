import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDocumentMeta } from '../utils/seo';
import { Battery, Zap, CheckCircle2, AlertTriangle, ExternalLink, Info } from 'lucide-react';
import { getAmazonDirectUrl } from '../data/products';

interface SpeicherProdukt {
  id: string;
  name: string;
  kapazitaet: string;
  wechselrichter: string;
  preis: string;
  highlights: string[];
  nachteile: string[];
  asin?: string;
  searchQuery: string;
  badge?: string;
  badgeColor?: string;
}

const SPEICHER: SpeicherProdukt[] = [
  {
    id: 'anker-solix-solarbank2',
    name: 'Anker SOLIX Solarbank 2 E1600 Pro',
    kapazitaet: '1.600 Wh (bis 9,6 kWh erweiterbar)',
    wechselrichter: 'Integriert (800W AC)',
    preis: 'ca. 799 – 1.099 €',
    highlights: [
      '4 integrierte MPPTs — bis zu 2.400 Wp PV direkt anschließen',
      'All-in-One: kein separater Wechselrichter nötig',
      '6.000 Zyklen LiFePO4 (10 Jahre Garantie)',
      'Smarte Null-Einspeisung via Smart Plug',
      'Modular erweiterbar bis 9,6 kWh',
    ],
    nachteile: [
      'Höherer Anschaffungspreis als Einzelkomponenten',
      'Proprietäre Erweiterungsakkus (nur Anker BP1600)',
    ],
    asin: 'B0DKNQB1TQ',
    searchQuery: 'Anker SOLIX Solarbank 2 E1600 Pro Balkonkraftwerk Speicher',
    badge: 'All-in-One Empfehlung',
    badgeColor: 'emerald',
  },
  {
    id: 'growatt-noah-2000',
    name: 'Growatt NOAH 2000',
    kapazitaet: '2.048 Wh (bis 8,2 kWh erweiterbar)',
    wechselrichter: 'Extern (zwischen Modul & Inverter)',
    preis: 'ca. 699 – 899 €',
    highlights: [
      'IP66 wetterfest — dauerhafter Außeneinsatz möglich',
      'Integrierte Akkuheizung für Winterbetrieb bis –20 °C',
      'Universell kompatibel: Hoymiles, Deye, APsystems',
      '2,05 kWh Kapazität — höchste im Einstiegssegment',
    ],
    nachteile: [
      'Kein integrierter Wechselrichter — benötigt separaten Inverter',
      'Installation zwischen Solarpanel und Mikrowechselrichter',
    ],
    asin: 'B0F9PWSNZ8',
    searchQuery: 'Growatt NOAH 2000 Balkonkraftwerk Speicher LiFePO4',
    badge: 'Winterfest IP66',
    badgeColor: 'blue',
  },
  {
    id: 'ecoflow-powerstream-delta2max',
    name: 'EcoFlow PowerStream 800W + DELTA 2 Max',
    kapazitaet: '2.048 Wh (bis 6,1 kWh erweiterbar)',
    wechselrichter: 'PowerStream 800W (seperater Inverter)',
    preis: 'ca. 999 – 1.390 €',
    highlights: [
      'Doppelfunktion: Balkonspeicher + Notstrom-Powerstation (2.400 W)',
      'Camping, Outdoor, Blackout-Backup inklusive',
      'Echtzeit-Null-Einspeisung via EcoFlow Smart Plug',
    ],
    nachteile: [
      'Teuerste Option im Vergleich',
      'Powerstation ist kein wetterfestes Außengerät',
    ],
    asin: 'B0FJRXF19P',
    searchQuery: 'EcoFlow PowerStream 800W DELTA 2 Max Balkonkraftwerk',
    badge: 'Notstrom inklusive',
    badgeColor: 'amber',
  },
];

export default function BalkonkraftwerkSpeicherPage() {
  useDocumentMeta({
    title: 'Balkonkraftwerk Speicher 2025: Anker SOLIX, EcoFlow & Growatt NOAH im Vergleich',
    description: 'Balkonspeicher für Balkonkraftwerke im Vergleich: Anker SOLIX Solarbank 2 E1600, EcoFlow PowerStream + DELTA 2 Max, Growatt NOAH 2000. Kapazität, Kompatibilität und Eigenverbrauch maximieren.',
    canonicalPath: '/balkonkraftwerk-speicher',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Balkonkraftwerk Speicher 2025: Alle Systeme im Vergleich',
        description: 'Balkonspeicher für Stecker-Solargeräte: Anker SOLIX Solarbank 2, EcoFlow PowerStream, Growatt NOAH 2000 – Technik, Kompatibilität und Wirtschaftlichkeit.',
        url: 'https://www.wattpeak.de/balkonkraftwerk-speicher',
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
            name: 'Welcher Balkonspeicher ist der beste?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Für die meisten Balkonkraftwerk-Nutzer ist die Anker SOLIX Solarbank 2 E1600 Pro die beste Wahl: All-in-One-Lösung mit 4 integrierten MPPTs, 1,6 kWh Kapazität, 6.000 Zyklen LiFePO4 und integriertem 800W Inverter. Wer winterfeste Außenmontage braucht, greift zum Growatt NOAH 2000 (IP66). Das EcoFlow PowerStream + DELTA 2 Max Bundle empfiehlt sich für Nutzer die auch Notstrom/Camping benötigen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Lohnt sich ein Speicher für das Balkonkraftwerk?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ein Balkonspeicher lohnt sich, wenn der produzierte Solarstrom überwiegend tagsüber anfällt, während der Haushaltsverbrauch abends und nachts höher ist. Durch den Speicher steigt die Eigenverbrauchsquote von ca. 30 % auf 70–90 %. Bei 30 Cent/kWh Strompreis und 700 kWh Jahresertrag sind das zusätzlich bis zu 140–150 € Ersparnis pro Jahr.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie wird ein Balkonspeicher angeschlossen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All-in-One-Systeme wie die Anker SOLIX Solarbank 2 haben einen integrierten Wechselrichter und werden direkt an die Solarmodule und das Hausnetz angeschlossen. Systeme wie Growatt NOAH 2000 werden zwischen Solarmodul und externem Mikrowechselrichter geschaltet (DC-seitig via MC4). Das EcoFlow PowerStream ist AC-seitig mit dem Hausnetz verbunden und speist über einen separaten Wechselrichter ein.',
            },
          },
        ],
      },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 w-full">

        {/* Hero */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-950 font-mono text-xs font-bold border border-blue-300">
              <Battery className="w-3.5 h-3.5 text-blue-700" />
              LiFePO4 Speicher · Stand September 2026
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Balkonspeicher:<br />
              <span className="text-blue-500">Eigenverbrauch maximieren.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Ohne Speicher geht ein Großteil des Solarstroms ungenutzt ins Netz — ohne Vergütung.
              Ein Balkonspeicher verschiebt den selbst erzeugten Strom in die Abendstunden,
              erhöht die Eigenverbrauchsquote auf 70–90 % und amortisiert sich oft in 4–7 Jahren.
            </p>
          </div>

          {/* Stat Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Ohne Speicher</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">~30 %</div>
              <div className="text-slate-400 text-xs">Eigenverbrauch</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-emerald-700 uppercase">Mit Speicher</span>
              <div className="text-emerald-800 font-black text-lg mt-0.5">70–90 %</div>
              <div className="text-emerald-600 text-xs">Eigenverbrauch</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Kapazität</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">1,6–2 kWh</div>
              <div className="text-slate-400 text-xs">Einstiegssegment</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Amortisation</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">4–7 Jahre</div>
              <div className="text-slate-400 text-xs">typisch bei 30 ct/kWh</div>
            </div>
          </div>
        </section>

        {/* Produktvergleich */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-slate-950">Die 3 besten Balkonspeicher 2025</h2>

          {SPEICHER.map((produkt) => {
            const badgeClasses: Record<string, string> = {
              emerald: 'bg-emerald-100 text-emerald-800 border-emerald-300',
              blue: 'bg-blue-100 text-blue-800 border-blue-300',
              amber: 'bg-amber-100 text-amber-800 border-amber-300',
            };
            const bc = badgeClasses[produkt.badgeColor ?? 'emerald'];
            return (
              <div key={produkt.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-xl font-black text-slate-950">{produkt.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {produkt.badge && (
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${bc}`}>
                            {produkt.badge}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-100 text-slate-600 border border-slate-200">
                          <Battery className="w-3 h-3" /> {produkt.kapazitaet}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-950">{produkt.preis}</div>
                      <div className="text-xs text-slate-500 font-mono">Marktpreis-Richtwert *</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-bold text-emerald-700 uppercase mb-2">Vorteile</div>
                      <ul className="space-y-1.5">
                        {produkt.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-rose-600 uppercase mb-2">Einschränkungen</div>
                      <ul className="space-y-1.5">
                        {produkt.nachteile.map((n) => (
                          <li key={n} className="flex items-start gap-2 text-sm text-slate-600">
                            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                            {n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                    <div className="text-xs text-slate-500">
                      <span className="font-bold text-slate-700">Wechselrichter:</span> {produkt.wechselrichter}
                    </div>
                    <div className="ml-auto">
                      <a
                        href={getAmazonDirectUrl(produkt.asin, produkt.searchQuery)}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-colors text-sm"
                      >
                        Auf Amazon ansehen * <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Funktionsweise */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-xl font-black text-slate-950">Wie funktioniert ein Balkonspeicher?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-black text-sm">1</div>
              <h3 className="font-bold text-slate-900 text-sm">Tagsüber: Direktverbrauch + Laden</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Solarstrom deckt tagsüber den laufenden Verbrauch (Kühlschrank, Stand-by, WFH).
                Überschüsse werden in den Speicher geladen statt ins Netz eingespeist.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-black text-sm">2</div>
              <h3 className="font-bold text-slate-900 text-sm">Abends: Entladen aus dem Speicher</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ab ca. 16–18 Uhr sinkt die Solarleistung. Der Speicher gibt seinen Inhalt ans
                Hausnetz ab und verdrängt teurem Netzbezug zur Abendspitze.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-sm">3</div>
              <h3 className="font-bold text-slate-900 text-sm">Null-Einspeisung via Smart Meter</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Systeme wie Anker SOLIX oder EcoFlow messen via Smart Plug den Netzbezug in Echtzeit
                und passen die Einspeiseleistung dynamisch an — kein Strom geht verloren.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong>Smart Meter:</strong> Für die Null-Einspeisung wird ein <strong>Shelly Pro 3EM</strong> (
              <a href={getAmazonDirectUrl('B0G14VF9TL', 'Shelly Pro 3EM Energiemessgerät')} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-700 font-bold hover:underline">auf Amazon *</a>
              ) oder ein Shelly Plus 1PM (
              <a href={getAmazonDirectUrl('B0965J4HT5', 'Shelly Plus 1PM')} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-700 font-bold hover:underline">auf Amazon *</a>
              ) empfohlen. Diese werden im Zählerschrank (durch Elektriker) bzw. als Steckdosen-Zwischenstecker installiert
              und kommunizieren direkt mit dem Speicher-Gateway.
            </p>
          </div>
        </section>

        {/* CTA Links */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/balkonkraftwerk"
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-amber-300 hover:shadow-md transition-all space-y-2"
          >
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-slate-900">800W Balkonkraftwerk Ratgeber</h3>
            <p className="text-sm text-slate-500">Solarpaket I, Schuko-Norm, MaStR-Registrierung und Technik erklärt.</p>
          </Link>
          <Link
            to="/einspeiseverguetung"
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all space-y-2"
          >
            <Battery className="w-5 h-5 text-emerald-500" />
            <h3 className="font-black text-slate-900">EEG Einspeisevergütung 2025/2026</h3>
            <p className="text-sm text-slate-500">Aktuelle Vergütungssätze, Degression und Berechnungsbeispiele.</p>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
