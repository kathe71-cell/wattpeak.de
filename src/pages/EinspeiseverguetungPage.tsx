import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDocumentMeta } from '../utils/seo';
import { TrendingDown, Info, Zap, Calculator, ExternalLink } from 'lucide-react';
import { getAmazonDirectUrl } from '../data/products';

const VERGÜTUNGSSÄTZE = [
  { leistung: 'bis 10 kWp', einspeisung: '8,03', volleinspeisung: '12,87', gueltigAb: 'Feb. 2025' },
  { leistung: '10 – 40 kWp', einspeisung: '6,95', volleinspeisung: '10,73', gueltigAb: 'Feb. 2025' },
  { leistung: '40 – 100 kWp', einspeisung: '5,68', volleinspeisung: '10,73', gueltigAb: 'Feb. 2025' },
];

// Degression: EEG 2023 § 20 — alle 6 Monate –1 %
const DEGRESSION = [
  { zeitraum: 'Aug. 2024 – Jan. 2025', satz: '8,11 ct/kWh' },
  { zeitraum: 'Feb. 2025 – Jul. 2025', satz: '8,03 ct/kWh' },
  { zeitraum: 'Aug. 2025 – Jan. 2026', satz: '7,95 ct/kWh' },
  { zeitraum: 'Feb. 2026 – Jul. 2026', satz: '7,87 ct/kWh' },
  { zeitraum: 'Aug. 2026 – Jan. 2027', satz: '7,79 ct/kWh' },
];

export default function EinspeiseverguetungPage() {
  useDocumentMeta({
    title: 'Einspeisevergütung 2025/2026 Photovoltaik – EEG-Sätze aktuell',
    description: 'Aktuelle EEG-Einspeisevergütung für Photovoltaik 2025 und 2026: Vergütungssätze nach Anlagengröße, halbjährliche Degression und Berechnungsbeispiele für Balkonkraftwerk und Hausdach-PV.',
    canonicalPath: '/einspeiseverguetung',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Einspeisevergütung 2025/2026: Aktuelle EEG-Sätze für Photovoltaik',
        description: 'Aktuelle EEG-Einspeisevergütungssätze nach Anlagengröße, Degressionsplan und Berechnungsbeispiele für PV-Anlagen.',
        url: 'https://www.wattpeak.de/einspeiseverguetung',
        author: { '@type': 'Organization', name: 'wattpeak.de' },
        publisher: { '@type': 'Organization', name: 'wattpeak.de', url: 'https://www.wattpeak.de' },
        datePublished: '2025-02-01',
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
            name: 'Wie hoch ist die Einspeisevergütung 2025 für Photovoltaik?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Für Anlagen bis 10 kWp beträgt die Teileinspeisung (Überschuss) 8,03 Cent/kWh (Stand: Februar 2025). Die Vergütung sinkt gemäß EEG 2023 halbjährlich um 1 %. Bei Volleinspeiseanlagen bis 10 kWp werden 12,87 Cent/kWh vergütet.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bekommt ein 800W Balkonkraftwerk Einspeisevergütung?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nein. Stecker-Solargeräte (Balkonkraftwerke) bis 800 W AC-Ausgangsleistung werden nach Solarpaket I nicht über das EEG-Einspeisevergütungssystem vergütet. Der produzierte Strom wird direkt im Haushalt verbraucht (Eigenverbrauch), was den Netzbezug und damit die Stromrechnung reduziert.',
            },
          },
          {
            '@type': 'Question',
            name: 'Lohnt sich Photovoltaik ohne Einspeisevergütung?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja – da Eigenverbrauch von selbst erzeugtem Strom wirtschaftlich attraktiver ist als Netzeinspeisung zu 8 Cent. Bei einem Haushaltsstrompreis von ca. 30 Cent/kWh entspricht jede selbst verbrauchte kWh einer Ersparnis von 30 Cent, während Netzeinspeisung nur 8 Cent bringt.',
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
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-mono text-xs font-bold border border-emerald-300">
              <Zap className="w-3.5 h-3.5 text-emerald-700" />
              EEG 2023 · Stand September 2026
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Einspeisevergütung 2025/2026:<br />
              <span className="text-emerald-500">Aktuelle EEG-Sätze.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Das Erneuerbare-Energien-Gesetz (EEG 2023) legt fest, wie viel Cent pro eingespeister Kilowattstunde
              Photovoltaikstrom Anlagenbetreiber erhalten. Die Vergütung sinkt halbjährlich und variiert je nach
              installierter Leistung und Einspeisung (Überschuss oder Volleinspeiser).
            </p>
          </div>
        </section>

        {/* Aktuelle Vergütungstabelle */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-950">Vergütungssätze – Übersicht (ab Februar 2025)</h2>
            <p className="text-sm text-slate-500 mt-1">Quelle: Bundesnetzagentur / EEG 2023 § 21 i. V. m. § 20 Abs. 1 Satz 2</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 font-bold text-slate-700">Anlagengröße</th>
                  <th className="text-right px-6 py-3 font-bold text-slate-700">Teileinspeisung (Überschuss)</th>
                  <th className="text-right px-6 py-3 font-bold text-slate-700">Volleinspeisung</th>
                  <th className="text-right px-6 py-3 font-bold text-slate-500 text-xs">Gültig ab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {VERGÜTUNGSSÄTZE.map((row) => (
                  <tr key={row.leistung} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.leistung}</td>
                    <td className="px-6 py-4 text-right font-black text-emerald-700 text-base">{row.einspeisung} ct/kWh</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-600">{row.volleinspeisung} ct/kWh</td>
                    <td className="px-6 py-4 text-right text-slate-400 text-xs font-mono">{row.gueltigAb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
            <p className="text-xs text-amber-900 flex gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              Anlagen zwischen den Leistungsgrenzen erhalten für jeden Teil gestaffelt den jeweiligen Satz.
              Die Vergütung gilt für 20 Jahre ab Inbetriebnahme (§ 25 EEG 2023). Alle Angaben ohne Gewähr –
              maßgeblich ist das aktuelle EEG in seiner gültigen Fassung sowie die Bescheide des zuständigen Netzbetreibers.
            </p>
          </div>
        </section>

        {/* Halbjährliche Degression */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
            <TrendingDown className="w-5 h-5 text-rose-500" />
            <div>
              <h2 className="text-xl font-black text-slate-950">Halbjährliche Degression (EEG 2023 § 20)</h2>
              <p className="text-sm text-slate-500 mt-0.5">Vergütungssatz sinkt automatisch um 1 % alle 6 Monate</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 font-bold text-slate-700">Zeitraum</th>
                  <th className="text-right px-6 py-3 font-bold text-slate-700">Teileinspeisung bis 10 kWp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DEGRESSION.map((row, i) => (
                  <tr key={row.zeitraum} className={`hover:bg-slate-50 transition-colors ${i === 2 ? 'bg-emerald-50/50' : ''}`}>
                    <td className="px-6 py-3 text-slate-700 font-mono text-xs">{row.zeitraum}</td>
                    <td className={`px-6 py-3 text-right font-bold ${i === 2 ? 'text-emerald-700' : 'text-slate-600'}`}>
                      {row.satz}
                      {i === 2 && <span className="ml-2 text-xs font-normal text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">aktuell</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Berechnungsbeispiel */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-black text-slate-950">Berechnungsbeispiel: 10 kWp Hausdach-PV</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="text-xs text-slate-500 uppercase font-mono font-bold">Jahresertrag (typisch)</div>
              <div className="text-2xl font-black text-slate-950 mt-1">9.500 kWh</div>
              <div className="text-xs text-slate-500 mt-1">bei 950 kWh/kWp Volllaststunden (Mitteleuropa, Süddach)</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="text-xs text-slate-500 uppercase font-mono font-bold">Eigenverbrauchsquote</div>
              <div className="text-2xl font-black text-slate-950 mt-1">30 %</div>
              <div className="text-xs text-slate-500 mt-1">= 2.850 kWh × 30 ct/kWh = <strong>855 €/Jahr</strong> gespart</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
              <div className="text-xs text-emerald-700 uppercase font-mono font-bold">Einspeiseerlös (70 %)</div>
              <div className="text-2xl font-black text-emerald-800 mt-1">6.650 kWh</div>
              <div className="text-xs text-emerald-700 mt-1">× 8,03 ct/kWh = <strong>534 €/Jahr</strong> Vergütung</div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong>Fazit:</strong> Der Eigenverbrauchsanteil (30 %) bringt durch eingesparten Strom zu 30 ct/kWh deutlich
              mehr Wirtschaftlichkeit als die Netzeinspeisung (70 %) zu 8,03 ct/kWh. Deshalb lohnt sich ein
              Batteriespeicher: Er erhöht die Eigenverbrauchsquote auf 70–90 % und maximiert den Ertrag erheblich.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/ertragsrechner"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-colors text-sm"
            >
              <Calculator className="w-4 h-4" />
              Ertragsrechner öffnen
            </Link>
            <Link
              to="/balkonkraftwerk-speicher"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors text-sm"
            >
              Speicher für mehr Eigenverbrauch →
            </Link>
          </div>
        </section>

        {/* Balkonkraftwerk: kein EEG */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-black text-slate-950">Balkonkraftwerk: Keine EEG-Einspeisevergütung</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Stecker-Solargeräte (Balkonkraftwerke, Plug-in-PV) bis 800&nbsp;W AC-Ausgangsleistung fallen
            nicht unter das EEG-Einspeisevergütungssystem. Der erzeugte Strom wird direkt im Haushalt verbraucht
            und verdrängt teuren Netzbezug. Bei einem Haushaltsstrompreis von ca. 30&nbsp;ct/kWh und einem
            Jahresertrag von rund 700–900&nbsp;kWh spart ein 800-W-Balkonkraftwerk typischerweise
            <strong> 210–270 € pro Jahr</strong> – ohne Bürokratie und Netzanmeldung beim Netzbetreiber.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
              <div className="text-sm font-bold text-slate-900">Hoymiles HMS-800W-2T</div>
              <div className="text-xs text-slate-500">Der meistverkaufte Mikrowechselrichter für Balkonkraftwerke in Deutschland. 2x MPPT, integriertes WLAN, VDE-AR-N 4105.</div>
              <a
                href={getAmazonDirectUrl('B0CJGKQXVL', 'Hoymiles HMS-800W-2T Mikrowechselrichter')}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-600"
              >
                Auf Amazon ansehen * <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
              <div className="text-sm font-bold text-slate-900">APsystems EZ1-M 800W</div>
              <div className="text-xs text-slate-500">Alternative mit 20A Eingangsstrom für moderne Hochleistungsmodule. Bluetooth & WLAN, VDE 4105 konform.</div>
              <a
                href={getAmazonDirectUrl('B0CMXX3Y58', 'APsystems EZ1-M Mikrowechselrichter 800W')}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-600"
              >
                Auf Amazon ansehen * <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <Link to="/balkonkraftwerk" className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-amber-600 transition-colors">
            → Vollständiger Balkonkraftwerk-Ratgeber
          </Link>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-xl font-black text-slate-950">Häufige Fragen zur Einspeisevergütung</h2>

          <div className="space-y-4 divide-y divide-slate-100">
            <div className="pt-4 first:pt-0 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">Gilt die 20-Jahres-Garantie für alle Neuanlagen?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ja, Anlagen die seit 1. Januar 2023 in Betrieb genommen wurden, erhalten die EEG-Vergütung
                für 20 Kalenderjahre ab dem Jahr der Inbetriebnahme (§ 25 EEG 2023). Der Anfangssatz ist
                festgeschrieben – die spätere Degression betrifft nur Neuanlagen, nicht bestehende Verträge.
              </p>
            </div>
            <div className="pt-4 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">Wer zahlt die Einspeisevergütung aus?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Der örtliche Übertragungsnetzbetreiber (ÜNB) ist gesetzlich zur Abnahme und Vergütung
                verpflichtet. In der Praxis wird die Abrechnung über den zuständigen Verteilnetzbetreiber
                (VNB) abgewickelt, der dem Anlagenbetreiber nach der Inbetriebnahme einen Einspeisevertrag
                anbietet.
              </p>
            </div>
            <div className="pt-4 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">Muss ich die Einspeisevergütung versteuern?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Seit 1. Januar 2023 sind Einnahmen aus dem Betrieb von PV-Anlagen bis 30 kWp auf Einfamilienhäusern
                einkommensteuerlich befreit (§ 3 Nr. 72 EStG). Eine Umsatzsteuerpflicht entfällt durch die
                Kleinunternehmerregelung (§ 19 UStG) oder die optionale Umsatzsteuerbefreiung nach § 12 Abs. 3 UStG.
                Für steuerliche Fragen wende dich an einen Steuerberater.
              </p>
            </div>
            <div className="pt-4 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">Lohnt sich Volleinspeisung oder Eigenverbrauch mit Speicher?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bei heutigen Strompreisen von ~30&nbsp;ct/kWh ist die Volleinspeisung zu 12,87&nbsp;ct/kWh
                wirtschaftlich selten sinnvoll. Eigenverbrauch mit Speicher ist meist rentabler:
                Jede selbst verbrauchte kWh erspart 30&nbsp;ct statt 12,87&nbsp;ct einzunehmen.
              </p>
              <Link to="/balkonkraftwerk-speicher" className="text-sm text-amber-700 font-bold hover:text-amber-600">
                → Speichersysteme im Vergleich
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
