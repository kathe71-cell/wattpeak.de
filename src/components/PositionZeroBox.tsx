import React from 'react';
import { Bookmark, Scale } from 'lucide-react';

export default function PositionZeroBox() {
  return (
    <div id="definition" className="bg-gradient-to-br from-amber-50/80 via-white to-slate-50 border-2 border-amber-300/80 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
      {/* Visual background badge */}
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-amber-200/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-200/60 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-sm">
            <Bookmark className="w-4 h-4 fill-slate-950 stroke-slate-950" />
          </span>
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-amber-900 uppercase">
              Position-0 Fachdefinition
            </span>
            <h3 className="text-xl font-black text-slate-950 tracking-tight">
              Was bedeutet WattPeak (Wp)?
            </h3>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-mono text-xs font-bold border border-amber-300">
          <Scale className="w-3.5 h-3.5 text-amber-800" />
          DIN EN IEC 60904-3
        </div>
      </div>

      {/* Featured Snippet 40-60 words Core Answer */}
      <p className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed mb-6">
        <strong className="text-slate-950 font-extrabold underline decoration-amber-400 decoration-2 underline-offset-4">
          WattPeak (Wp)
        </strong>{' '}
        bezeichnet die normierte elektrische Spitzenleistung eines Photovoltaikmoduls unter Labor-Standard-Testbedingungen (STC: 1.000&nbsp;W/m² Einstrahlung, 25&nbsp;°C Zelltemperatur, Spektrum AM&nbsp;1,5 nach DIN EN IEC 60904-3). 
        Während Wp die Momentanleistung beschreibt, gibt die Kilowattstunde (kWh) die tatsächliche Strommenge über die Zeit an: 1.000&nbsp;Wp (1&nbsp;kWp) erzeugen in Deutschland jährlich ca. 900 bis 1.150&nbsp;kWh Solarstrom.
      </p>

      {/* Quick Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
          <span className="text-slate-500 font-bold uppercase tracking-wider">Messbedingung (STC)</span>
          <span className="text-slate-950 font-extrabold text-sm mt-1">1.000 W/m² · 25 °C · AM 1,5</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
          <span className="text-slate-500 font-bold uppercase tracking-wider">Spezifischer Ertrag (DE)</span>
          <span className="text-emerald-700 font-extrabold text-sm mt-1">900 – 1.150 kWh / kWp·a</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
          <span className="text-slate-500 font-bold uppercase tracking-wider">Solarpaket I Limit</span>
          <span className="text-amber-700 font-extrabold text-sm mt-1">800 W AC / 2.000 Wp DC</span>
        </div>
      </div>
    </div>
  );
}
