import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDocumentMeta } from '../utils/seo';
import { TrendingDown, Info, Zap, Calculator, ExternalLink } from 'lucide-react';
import { CURRENT_EEG_RATES, EEG_DEGRESSION_HISTORY } from '../data/eeg-rates';
import { getAmazonDirectUrl } from '../data/products';

export default function EinspeiseverguetungPage() {
  useDocumentMeta({
    title: 'EEG-Einspeisevergütung 2026 aktuell (ab 01.08.2026) · wattpeak.de',
    description: 'EEG-Einspeisevergütung 2026: Aktuelle Sätze der Bundesnetzagentur (7,70 ct/kWh bis 10 kWp), halbjährliche Degression gem. § 49 EEG und Rechenbeispiele.',
    canonicalPath: '/einspeiseverguetung',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Einspeisevergütung 2026: Aktuelle EEG-Sätze ab 01.08.2026 laut Bundesnetzagentur',
        description: 'Aktuelle EEG-Einspeisevergütungssätze nach Anlagengröße, Degressionsplan und Berechnungsbeispiele für PV-Anlagen.',
        url: 'https://www.wattpeak.de/einspeiseverguetung',
        author: { '@type': 'Organization', name: 'wattpeak.de' },
        publisher: { '@type': 'Organization', name: 'wattpeak.de', url: 'https://www.wattpeak.de' },
        datePublished: '2025-02-01',
        dateModified: '2026-10-01',
        image: 'https://www.wattpeak.de/og-image.png',
        inLanguage: 'de',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie hoch ist die aktuelle Einspeisevergütung 2026 für Photovoltaik?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Für Neuanlagen bis 10 kWp mit Inbetriebnahme ab 01.08.2026 beträgt die Teileinspeisung (Überschuss) laut Bundesnetzagentur 7,70 Cent/kWh. Bei Volleinspeisung bis 10 kWp werden 12,22 Cent/kWh vergütet. Die Sätze sinken gemäß § 49 EEG halbjährlich um 1 %.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bekommt ein 800W Balkonkraftwerk Einspeisevergütung?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nein. Stecker-Solargeräte (Balkonkraftwerke) bis 800 VA AC-Ausgangsleistung werden nach Solarpaket I (§ 8 Abs. 5a EEG) unentgeltlich abgenommen. Der produzierte Strom wird vorrangig direkt im Haushalt verbraucht, was teuren Netzbezug einspart.',
            },
          },
          {
            '@type': 'Question',
            name: 'Lohnt sich Photovoltaik ohne Einspeisevergütung?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja – da Eigenverbrauch von selbst erzeugtem Strom wirtschaftlich attraktiver ist als Netzeinspeisung zu ~7,7 Cent. Bei einem Haushaltsstrompreis von ca. 30–35 Cent/kWh entspricht jede selbst verbrauchte kWh einer Ersparnis von rund 30 Cent, während Netzeinspeisung nur 7,70 Cent erzielt.',
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
            <h2 className="text-xl font-black text-slate-950">Vergütungssätze – Übersicht (Inbetriebnahme ab 01.08.2026)</h2>
            <p className="text-sm text-slate-500 mt-1">Quelle: Bundesnetzagentur / EEG 2023 § 21 i. V. m. §§ 48, 49 (Stand: August–Dezember 2026)</p>
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
                {CURRENT_EEG_RATES.partialFeedIn.map((row, idx) => {
                  const fullRow = CURRENT_EEG_RATES.fullFeedIn[idx];
                  return (
                    <tr key={row.maxKwp} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">{row.label}</td>
                      <td className="px-6 py-4 text-right font-black text-emerald-700 text-base">{row.tariffCtPerKwh.toFixed(2).replace('.', ',')} ct/kWh</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-600">{fullRow ? `${fullRow.tariffCtPerKwh.toFixed(2).replace('.', ',')} ct/kWh` : '–'}</td>
                      <td className="px-6 py-4 text-right text-slate-400 text-xs font-mono">{CURRENT_EEG_RATES.validFrom}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
            <p className="text-xs text-amber-900 flex gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              Anlagen zwischen den Leistungsgrenzen erhalten für jeden Teil gestaffelt den jeweiligen Satz.
              Die Vergütung gilt für 20 Jahre ab Inbetriebnahme (§ 25 EEG 2023). Alle Angaben ohne Gewähr –
              maßgeblich ist das aktuelle EEG in seiner gültigen Fassung sowie die Festlegungen der Bundesnetzagentur.
            </p>
          </div>
        </section>

        {/* Halbjährliche Degression */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
            <TrendingDown className="w-5 h-5 text-rose-500" />
            <div>
              <h2 className="text-xl font-black text-slate-950">Halbjährliche Degression (EEG 2023 § 49)</h2>
              <p className="text-sm text-slate-500 mt-0.5">Vergütungssatz sinkt automatisch um 1 % alle 6 Monate (zum 01.02. und 01.08.)</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 font-bold text-slate-700">Zeitraum</th>
                  <th className="text-right px-6 py-3 font-bold text-slate-700">Teileinspeisung bis 10 kWp</th>
                  <th className="text-right px-6 py-3 font-bold text-slate-700">Volleinspeisung bis 10 kWp</th>
                  <th className="text-right px-6 py-3 font-bold text-slate-500 text-xs">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EEG_DEGRESSION_HISTORY.map((row) => {
                  const isCurrent = row.status === 'Aktuell gültig';
                  return (
                    <tr key={row.period} className={`hover:bg-slate-50 transition-colors ${isCurrent ? 'bg-emerald-50/50' : ''}`}>
                      <td className="px-6 py-3 text-slate-700 font-mono text-xs">{row.period}</td>
                      <td className={`px-6 py-3 text-right font-bold ${isCurrent ? 'text-emerald-700' : 'text-slate-600'}`}>
                        {row.partialUpTo10Ct.toFixed(2).replace('.', ',')} ct/kWh
                      </td>
                      <td className="px-6 py-3 text-right font-bold text-slate-600">
                        {row.fullUpTo10Ct.toFixed(2).replace('.', ',')} ct/kWh
                      </td>
                      <td className="px-6 py-3 text-right text-xs">
                        {isCurrent ? (
                          <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">aktuell</span>
                        ) : (
                          <span className="text-slate-400 font-mono">{row.status}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Berechnungsbeispiel */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-black text-slate-950">Berechnungsbeispiel: 10 kWp Hausdach-PV (Inbetriebnahme ab 01.08.2026)</h2>
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
              <div className="text-xs text-emerald-700 mt-1">× 7,70 ct/kWh = <strong>512 €/Jahr</strong> Vergütung</div>
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
              <div className="text-xs text-slate-500">Mikrowechselrichter für Balkonkraftwerke. 2x MPPT, integriertes WLAN, Konformitätsnachweis nach VDE-AR-N 4105:2026-03.</div>
              <a
                href={getAmazonDirectUrl('B0CJGKQXVL', 'Hoymiles HMS-800W-2T Mikrowechselrichter')}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-600"
              >
                Auf Amazon ansehen * <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
              <div className="text-sm font-bold text-slate-900">APsystems EZ1-M 800W</div>
              <div className="text-xs text-slate-500">20A Eingangsstrom je MPPT für moderne Hochleistungsmodule. Bluetooth &amp; WLAN, VDE-AR-N 4105:2026-03 konform.</div>
              <a
                href={getAmazonDirectUrl('B0CMXX3Y58', 'APsystems EZ1-M Mikrowechselrichter 800W')}
                target="_blank"
                rel="sponsored noopener noreferrer"
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
                Bei heutigen Strompreisen von ~30&nbsp;ct/kWh ist die Volleinspeisung zu 12,22&nbsp;ct/kWh
                (bis 10 kWp, ab 01.08.2026) wirtschaftlich selten überlegen. Eigenverbrauch mit Speicher ist meist rentabler:
                Jede selbst verbrauchte kWh erspart ca. 30&nbsp;ct Bezugskosten, statt 12,22&nbsp;ct als Volleinspeisung einzunehmen.
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
