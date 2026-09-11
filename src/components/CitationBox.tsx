import React, { useState } from 'react';
import { BookOpen, Copy, Check } from 'lucide-react';

export default function CitationBox() {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const apaCitation = `wattpeak.de Fachredaktion. (2026). WattPeak (Wp) Definition, STC-Norm DIN EN IEC 60904-3 und Ertragsberechnung für Photovoltaikanlagen. https://wattpeak.de/ (Stand: September 2026).`;
  
  const harvardCitation = `wattpeak.de Fachredaktion, 2026. WattPeak (Wp) Definition und Photovoltaik-Ertragsmodell nach DIN EN IEC 60904-3. Online verfügbar unter: <https://wattpeak.de/> [Zugriff am 08. September 2026].`;

  const copyCitation = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span className="font-bold text-slate-900 font-mono uppercase tracking-wider text-[11px]">
            Wissenschaftliche Zitation für Fachpublikationen &amp; Presse
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">APA / Harvard</span>
      </div>

      <div className="space-y-3 font-mono text-[11px]">
        {/* APA */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-slate-700">
            <span className="font-bold text-slate-900 mr-1.5">[APA]:</span>
            {apaCitation}
          </div>
          <button
            onClick={() => copyCitation(apaCitation, 'APA')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold shrink-0 self-start sm:self-center transition-colors"
          >
            {copiedFormat === 'APA' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            {copiedFormat === 'APA' ? 'Kopiert' : 'APA kopieren'}
          </button>
        </div>

        {/* Harvard */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-slate-700">
            <span className="font-bold text-slate-900 mr-1.5">[Harvard]:</span>
            {harvardCitation}
          </div>
          <button
            onClick={() => copyCitation(harvardCitation, 'Harvard')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold shrink-0 self-start sm:self-center transition-colors"
          >
            {copiedFormat === 'Harvard' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            {copiedFormat === 'Harvard' ? 'Kopiert' : 'Harvard kopieren'}
          </button>
        </div>
      </div>
    </div>
  );
}
