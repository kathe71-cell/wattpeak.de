import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrustBox from '../components/TrustBox';
import { Scale, Battery } from 'lucide-react';
import { useDocumentMeta } from '../utils/seo';

import { BATTERY_REGULATION_MILESTONES, BATTERY_PASSPORT_MANDATORY_FIELDS } from '../data/batteryPassportData';

export default function BatteriepassPage() {
  useDocumentMeta({
    title: 'EU-Batteriepass (VO 2023/1542) & Speicher-Diagnostik · wattpeak.de',
    description: 'EU-Batteriepass Pflicht ab 18.02.2027 für stationäre Batteriespeicher > 2 kWh gem. Verordnung (EU) 2023/1542, SOH-Alterungsdiagnostik und Zyklenfestigkeit.',
    canonicalPath: '/batteriepass',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'EU-Batteriepass (VO 2023/1542) & Speicher-Diagnostik für Photovoltaik',
      url: 'https://www.wattpeak.de/batteriepass',
      dateModified: '2026-10-01',
    },
  });
  // SOH Calculator inputs
  const [cycles, setCycles] = useState<number>(1200);
  const [chemistry, setChemistry] = useState<'lfp' | 'nmc'>('lfp');
  const [ratedCapacityAh, setRatedCapacityAh] = useState<number>(100);

  // SOH estimation
  const soh = useMemo(() => {
    // LFP degrades ~ 20% over 6000 cycles (linearized ~ 0.0033% per cycle)
    // NMC degrades ~ 20% over 2000 cycles (linearized ~ 0.01% per cycle)
    const rate = chemistry === 'lfp' ? 0.0033 : 0.010;
    const remainingPercent = Math.max(50, Math.round(100 - (cycles * rate)));
    const remainingCapacity = ((ratedCapacityAh * remainingPercent) / 100).toFixed(1);
    return {
      remainingPercent,
      remainingCapacity,
      status: remainingPercent >= 80 ? 'Sehr gut (Erstnutzung)' : remainingPercent >= 70 ? 'Gut (Second-Life tauglich)' : 'Kritisch / Recycling'
    };
  }, [cycles, chemistry, ratedCapacityAh]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 w-full">
        {/* Editorial Hero */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-mono text-xs font-bold border border-emerald-300">
              <Scale className="w-3.5 h-3.5 text-emerald-800" />
              Verordnung (EU) 2023/1542 · Art. 77
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
              EU-Batteriepass:<br />
              <span className="text-amber-500">Transparenz für PV- &amp; Heimspeicher.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Ab 18. Februar 2027 müssen stationäre Batteriespeicher mit mehr als 2&nbsp;kWh Kapazität 
              einen fälschungssicheren digitalen Produktpass mit QR-Code tragen (Verordnung EU 2023/1542). 
              Erfahren Sie alle regulatorischen Meilensteine, CO2-Footprint-Vorgaben und Diagnosedaten zum Batteriezustand (SOH).
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Pass-Pflicht ab</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">18.02.2027</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Schwellenwert</span>
              <div className="text-emerald-700 font-black text-lg mt-0.5">&gt; 2,0 kWh</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Zugangsmedium</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">QR-Code Scan</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Zentralwert</span>
              <div className="text-amber-700 font-black text-lg mt-0.5">SOH &amp; CO2-Wert</div>
            </div>
          </div>
        </section>

        {/* Interactive SOH Calculator */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-5">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
              Interaktive Diagnostik
            </span>
            <h2 className="text-2xl font-black text-slate-950 mt-1">
              State of Health (SOH) &amp; Degradations-Rechner
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Berechnung des Restgesundheitszustands von Lithium-Eisenphosphat (LiFePO4) im Vergleich zu NMC-Speichern.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-5">
              {/* Chemistry */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-900 mb-2 font-mono uppercase">
                  Zellchemie
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setChemistry('lfp')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      chemistry === 'lfp'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    <div>LiFePO4 (LFP)</div>
                    <div className="text-[10px] opacity-80">Heimspeicher-Standard (~6.000 Zyklen)</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChemistry('nmc')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      chemistry === 'nmc'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    <div>NMC / NCA</div>
                    <div className="text-[10px] opacity-80">Hohe Energiedichte (~2.000 Zyklen)</div>
                  </button>
                </div>
              </div>

              {/* Cycles Slider */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-900 font-mono uppercase">
                    Bisherige Lade- und Entladezyklen
                  </label>
                  <span className="font-mono font-black text-sm text-slate-950">{cycles} Zyklen</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="6000"
                  step="50"
                  value={cycles}
                  onChange={(e) => setCycles(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>Neuzustand (0)</span>
                  <span>5 Jahre (~1.250)</span>
                  <span>15 Jahre (~3.750)</span>
                  <span>6.000 Zyklen</span>
                </div>
              </div>

              {/* Capacity Slider */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-900 font-mono uppercase flex items-center gap-1.5">
                    <Battery className="w-3.5 h-3.5 text-emerald-600" />
                    Nennkapazität des Speichers
                  </label>
                  <span className="font-mono font-black text-sm text-slate-950">{ratedCapacityAh} Ah (~{(ratedCapacityAh * 0.0512).toFixed(1)} kWh)</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={ratedCapacityAh}
                  onChange={(e) => setRatedCapacityAh(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>20 Ah (Balkon ~1 kWh)</span>
                  <span>100 Ah (Standard ~5 kWh)</span>
                  <span>300 Ah (Großspeicher ~15 kWh)</span>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Berechneter Batteriezustand (SOH)
                </span>
                <div className="text-4xl font-black font-mono text-white mt-1">
                  {soh.remainingPercent} %
                </div>
                <div className="text-xs font-bold text-emerald-400 mt-1">
                  Status: {soh.status}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span>EU-Mindestgrenze für First-Life:</span>
                  <span className="font-bold text-slate-100">80 % SOH</span>
                </div>
                <div className="flex justify-between">
                  <span>Zelltyp:</span>
                  <span className="font-bold text-amber-400">{chemistry === 'lfp' ? 'Lithium-Eisenphosphat' : 'Nickel-Mangan-Cobalt'}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Stationäre Heimspeicher mit LiFePO4-Zellen erreichen bei 250 Vollzyklen pro Jahr typischerweise eine Lebensdauer von über 15 bis 20 Jahren, bevor der SOH unter 80 % fällt.
              </p>
            </div>
          </div>
        </section>

        {/* Regulatorische Meilensteine EU-Batterieverordnung */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-950">
              Verbindliche Fristen der Verordnung (EU) 2023/1542
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Gesetzlicher Zeitplan für Heimspeicher, Industriebatterien und digitale Kennzeichnung
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase font-mono border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Datum</th>
                  <th className="px-6 py-3">Meilenstein</th>
                  <th className="px-6 py-3">Rechtsgrundlage</th>
                  <th className="px-6 py-3">Geltungsbereich</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {BATTERY_REGULATION_MILESTONES.map((item) => (
                  <tr key={item.effectiveDate} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono font-bold text-slate-900">{item.effectiveDate}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-950">{item.label}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600">{item.legalArticle}</td>
                    <td className="px-6 py-4 text-slate-700">{item.scope}</td>
                    <td className="px-6 py-4">
                      {item.status === 'IN_FORCE' && (
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">In Kraft</span>
                      )}
                      {item.status === 'UPCOMING' && (
                        <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">Bevorstehend</span>
                      )}
                      {item.status === 'FUTURE' && (
                        <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded text-[10px]">Zukünftig</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6 Mandatory Data Fields of EU Battery Passport */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-slate-950">
            Die 6 Pflichtbestandteile des digitalen Batteriepasses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {BATTERY_PASSPORT_MANDATORY_FIELDS.map((field) => (
              <div key={field.id} className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="font-mono font-bold text-amber-700 block mb-1">{field.title}</span>
                <p className="text-slate-600 mb-2 leading-relaxed">{field.description}</p>
                <span className="text-[10px] font-mono text-slate-400">{field.legalBasis}</span>
              </div>
            ))}
          </div>
        </section>

        <TrustBox />
      </main>

      <Footer />
    </div>
  );
}
