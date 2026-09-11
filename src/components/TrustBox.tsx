import React from 'react';
import { ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';

export default function TrustBox() {
  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-xs text-slate-700 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-extrabold text-slate-950 uppercase font-mono tracking-wider text-[11px]">
            Redaktionelle Sorgfalt &amp; Rechtliche Differenzierung
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-slate-500 text-[11px]">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Rechts- &amp; Datenstand: 2025 / 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px]">
        <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">DIN EN IEC 60904-3</span>
            <span className="text-slate-500">STC-Laborstandard: 1.000 W/m², 25 °C, AM 1,5 zur Wp-Bestimmung</span>
          </div>
        </div>
        <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">Solarpaket I (EEG 2024–2026)</span>
            <span className="text-slate-500">800W Inverter AC, 2.000 Wp DC &amp; MaStR-Registrierung</span>
          </div>
        </div>
        <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">§ 12 Abs. 3 UStG (Steuerrecht)</span>
            <span className="text-slate-500">0 % Nullsteuersatz unter gesetzlichen Voraussetzungen für Wohngebäude</span>
          </div>
        </div>
      </div>
    </div>
  );
}
