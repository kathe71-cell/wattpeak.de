import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AmazonProductShowcase from '../components/AmazonProductShowcase';
import TrustBox from '../components/TrustBox';
import { Scale, AlertTriangle, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export default function SolarpflichtPage() {

  const statesData = [
    {
      state: 'Baden-Württemberg',
      newBuildNonRes: 'Pflicht (seit Jan 2022)',
      newBuildRes: 'Pflicht (seit Mai 2022)',
      roofReno: 'Pflicht bei grundlegender Dachsanierung (seit Jan 2023)',
      coverage: 'Mind. 60 % der geeigneten Dachfläche',
      status: 'Strengste Pflicht'
    },
    {
      state: 'Bayern',
      newBuildNonRes: 'Pflicht für Gewerbe & Industrie (seit März 2023)',
      newBuildRes: 'Aktuell Soll-Bestimmung / Empfehlung',
      roofReno: 'Soll-Bestimmung bei Sanierung',
      coverage: 'Wirtschaftlich zumutbare Auslegung',
      status: 'Teilpflicht (Gewerbe)'
    },
    {
      state: 'Berlin',
      newBuildNonRes: 'Pflicht (seit Jan 2023)',
      newBuildRes: 'Pflicht ab 50 m² Nutzfläche (seit Jan 2023)',
      roofReno: 'Pflicht bei wesentlicher Dachsanierung',
      coverage: 'Mind. 30 % der Bruttodachfläche',
      status: 'Umfassende Pflicht'
    },
    {
      state: 'Nordrhein-Westfalen (NRW)',
      newBuildNonRes: 'Pflicht für Gewerbeneubauten (seit Jan 2024)',
      newBuildRes: 'Pflicht für Wohnungsneubau (ab Jan 2025)',
      roofReno: 'Pflicht bei vollständiger Dacherneuerung (ab Jan 2026)',
      coverage: 'Geeignete Dachflächen',
      status: 'Stufenweiser Ausbau'
    },
    {
      state: 'Niedersachsen',
      newBuildNonRes: 'Pflicht für Gewerbe & Hallen (seit 2023)',
      newBuildRes: 'Pflicht für Wohnungsneubauten (seit Jan 2025)',
      roofReno: 'Pflicht bei grundlegender Dachsanierung (ab 2025)',
      coverage: 'Mind. 50 % der belegbaren Fläche',
      status: 'Umfassende Pflicht'
    },
    {
      state: 'Hamburg',
      newBuildNonRes: 'Pflicht (seit Jan 2023)',
      newBuildRes: 'Pflicht (seit Jan 2023)',
      roofReno: 'Pflicht bei Dachhaut-Erneuerung (seit Jan 2024)',
      coverage: 'Mind. 30 % der Bruttofläche',
      status: 'Umfassende Pflicht'
    },
    {
      state: 'Hessen',
      newBuildNonRes: 'Pflicht für Landesliegenschaften & Gewerbe (ab Nov 2023)',
      newBuildRes: 'Freiwillig / Fördermodell',
      roofReno: 'Freiwillig',
      coverage: 'Gewerblich orientiert',
      status: 'Teilpflicht (Öffentlich/Gewerbe)'
    },
    {
      state: 'Rheinland-Pfalz',
      newBuildNonRes: 'Pflicht für Gewerbeneubau & Parkplätze >50 Stellplätze',
      newBuildRes: 'Soll-Bestimmung (Vorbereitungspflicht Leerrohre)',
      roofReno: 'Gewerblich bei Sanierung',
      coverage: 'Wirtschaftlich optimiert',
      status: 'Teilpflicht'
    },
    {
      state: 'Bremen',
      newBuildNonRes: 'Pflicht (seit Juli 2024)',
      newBuildRes: 'Pflicht ab Juli 2025',
      roofReno: 'Pflicht bei Dachsanierung ab Juli 2025',
      coverage: 'Mind. 50 % der Nettodachfläche',
      status: 'Beschlossen'
    },
    {
      state: 'Schleswig-Holstein',
      newBuildNonRes: 'Pflicht für Nichtwohngebäude & Parkplätze >100 Plätze',
      newBuildRes: 'Aktuell noch keine Wohnneubau-Pflicht',
      roofReno: 'Gewerblich bei Dachsanierung',
      coverage: 'Mind. 30 % der geeigneten Fläche',
      status: 'Teilpflicht'
    },
    {
      state: 'Sachsen / Sachsen-Anhalt / Thüringen',
      newBuildNonRes: 'Vorrangig öffentliche Vorbildfunktion & Prüfungspflichten',
      newBuildRes: 'Keine allgemeine PV-Pflicht für Privatbauten',
      roofReno: 'Freiwillig / Förderanreize',
      coverage: 'Individuelle Wirtschaftlichkeit',
      status: 'Überwiegend freiwillig'
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
              <Scale className="w-3.5 h-3.5 text-amber-800" />
              GEG &amp; Landesbauordnungen 2024–2026
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
              Solarpflicht in Deutschland:<br />
              <span className="text-amber-500">Alle 16 Bundesländer im Check.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Wann ist eine Solaranlage gesetzlich vorgeschrieben? Welche Regeln gelten für Neubauten, 
              wann greift die Pflicht bei Dachsanierungen im Altbau und unter welchen Umständen sind Eigentümer befreit?
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/ertragsrechner"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-sm px-6 py-3 rounded-2xl shadow transition"
              >
                Ertragsrechner für Pflicht-Dimensionierung
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/system-decoder"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-sm px-6 py-3 rounded-2xl transition"
              >
                Systeme vergleichen
              </Link>
            </div>
          </div>

          {/* 4 Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Gewerbeneubau</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">Fast überall Pflicht</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Wohnneubau</span>
              <div className="text-amber-700 font-black text-lg mt-0.5">In 8+ Ländern</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Dachsanierung</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">Strikte Kriterien</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Förderung (MwSt.)</span>
              <div className="text-emerald-700 font-black text-lg mt-0.5">0 % Steuersatz</div>
            </div>
          </div>
        </section>

        {/* State-by-State Regulatory Matrix */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Bundesländer-Vergleich: Gesetzliche PV-Pflichten im Detail
            </h2>
            <p className="text-sm text-slate-600">
              Da das Baurecht Ländersache ist, variieren Fristen, Mindestbelegungsgrade und Sanierungspflichten stark zwischen den Bundesländern.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-mono uppercase text-[11px]">
                  <th className="py-3.5 px-4 font-bold">Bundesland</th>
                  <th className="py-3.5 px-4 font-bold">Nichtwohngebäude (Neubau)</th>
                  <th className="py-3.5 px-4 font-bold">Wohngebäude (Neubau)</th>
                  <th className="py-3.5 px-4 font-bold">Dachsanierung</th>
                  <th className="py-3.5 px-4 font-bold">Mindestbelegung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {statesData.map((s) => (
                  <tr key={s.state} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-950 font-mono">
                      {s.state}
                      <span className="block text-[10px] text-amber-700 font-sans font-normal mt-0.5">{s.status}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">{s.newBuildNonRes}</td>
                    <td className="py-3.5 px-4 text-slate-700">{s.newBuildRes}</td>
                    <td className="py-3.5 px-4 text-slate-700">{s.roofReno}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{s.coverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Exemptions & Exceptions */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-12 shadow-md space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              Rechtliche Ausnahmen
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Wann greift die Befreiung von der Solarpflicht?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Kein Gesetz verlangt wirtschaftlich ruinöse oder technisch gefährliche Maßnahmen. 
              In allen Bundesländern existieren rechtssichere Härtefall- und Ausnahmetatbestände:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-slate-800 text-xs sm:text-sm">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="text-amber-400 font-mono font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                1. Statische Unmöglichkeit
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Lässt der Dachstuhl die zusätzliche Dachlast (ca. 15–25 kg/m² inklusive Ballastierung/Schneelast) nachweislich nicht zu und wäre eine Ertüchtigung unzumutbar, entfällt die Pflicht.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="text-amber-400 font-mono font-bold flex items-center gap-1.5">
                <Scale className="w-4 h-4" />
                2. Wirtschaftliche Unzumutbarkeit
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Amortisiert sich die Photovoltaikanlage aufgrund extremer Nordausrichtung, massiver Verschattung durch Nachbargebäude oder Bäume nicht innerhalb der üblichen Betriebszeit (20 Jahre), kann ein Befreiungsantrag gestellt werden.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="text-amber-400 font-mono font-bold flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                3. Denkmalschutz vs. § 2 EEG
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Seit der EEG-Novelle haben Erneuerbare Energien zwar „überragendes öffentliches Interesse“. Dennoch können Denkmalbehörden sichtbare Anlagen auf Baudenkmälern ablehnen – hier bieten Solardachziegel oft den legalen Kompromiss.
              </p>
            </div>
          </div>
        </section>

        {/* Solarpaket I & 0% MwSt. */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
              Bundesrecht Solarpaket I
            </div>
            <h3 className="font-black text-slate-950 text-xl">Entbürokratisierung &amp; 800W Stecker-Solar</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mit dem Solarpaket I hat der Bundestag wesentliche Hürden abgebaut: Balkonkraftwerke dürfen nun bis 800 Watt einspeisen, 
              die Anmeldung beim Netzbetreiber entfiel (nur noch MaStR-Eintragung) und rückwärtslaufende Ferraris-Zähler werden vorübergehend geduldet.
            </p>
            <Link
              to="/balkonkraftwerk"
              className="inline-flex items-center gap-1.5 text-amber-600 font-bold text-xs hover:text-amber-700 pt-2"
            >
              Mehr zu den Balkonkraftwerk-Regeln <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              Steuerrecht § 12 Abs. 3 UStG
            </div>
            <h3 className="font-black text-slate-950 text-xl">Dauerhafter 0 % Mehrwertsteuersatz</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Für private Photovoltaikanlagen auf oder in der Nähe von Wohngebäuden gilt ein Mehrwertsteuersatz von 0 %. 
              Dies gilt für Solarmodule, Wechselrichter, Batteriespeicher sowie wesentliche Montage- und Installationskomponenten.
            </p>
            <Link
              to="/ertragsrechner"
              className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-xs hover:text-emerald-800 pt-2"
            >
              Wirtschaftlichkeit &amp; Steuervorteil berechnen <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Featured Hardware */}
        <AmazonProductShowcase />

        {/* TrustBox */}
        <TrustBox />

        <div className="text-center text-xs text-slate-500 font-mono">
          * Rechtlicher Hinweis: Diese Zusammenfassung stellt keine Rechtsberatung dar. Für verbindliche Auskünfte zu Bauanträgen und Befreiungen wenden Sie sich bitte an das zuständige Bauordnungsamt oder einen Sachverständigen.
        </div>
      </main>

      <Footer />
    </div>
  );
}
