import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrustBox from '../components/TrustBox';
import { Scale, Battery } from 'lucide-react';

export default function BatteriepassPage() {
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
              Verordnung (EU) 2023/1542
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
              EU-Batteriepass:<br />
              <span className="text-amber-500">Transparenz für PV- &amp; Heimspeicher.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Ab 2027 müssen stationäre Batteriespeicher und Traktionsbatterien mit mehr als 2&nbsp;kWh Kapazität 
              einen fälschungssicheren digitalen Produktpass mit QR-Code tragen. Erfahren Sie alles über Kennzeichnungspflichten, 
              CO2-Footprint und Batteriezustand (SOH).
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Geltung ab</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">Februar 2027</div>
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

        {/* 6 Mandatory Data Fields of EU Battery Passport */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-slate-950">
            Die 6 Kernbestandteile des digitalen Batteriepasses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="font-mono font-bold text-amber-700 block mb-1">1. CO2-Fußabdruck</span>
              Deklaration der Treibhausgasemissionen pro kWh über den gesamten Lebenszyklus (Rohstoffabbau, Zellfertigung, Transport).
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="font-mono font-bold text-amber-700 block mb-1">2. Rohstoff-Rezyklatquoten</span>
              Mindestanteile an recyceltem Kobalt, Blei, Lithium und Nickel (stufenweise verbindlich ab 2031).
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="font-mono font-bold text-amber-700 block mb-1">3. Leistungs- &amp; Haltbarkeitswerte</span>
              Zertifizierte Angaben zu Nennkapazität, Innenwiderstand, Leistungsabfall und erwarteter Zyklenzahl.
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="font-mono font-bold text-amber-700 block mb-1">4. BMS-Echtzeitdaten</span>
              Schnittstelle für Diagnosegeräte zur Bestimmung des aktuellen SOH und SOC für Zweitnutzung (Second Life).
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="font-mono font-bold text-amber-700 block mb-1">5. Sorgfaltspflichten (Due Diligence)</span>
              Nachweis sozialer und ökologischer Standards beim Abbau kritischer Rohstoffe in Drittländern.
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="font-mono font-bold text-amber-700 block mb-1">6. Demontage &amp; Recycling</span>
              Sicherheitsanweisungen für Recyclingbetriebe zur sortenreinen Trennung der Aktivmaterialien.
            </div>
          </div>
        </section>

        <TrustBox />
      </main>

      <Footer />
    </div>
  );
}
