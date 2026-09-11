import React, { useState } from 'react';
import { Code2, Copy, Check, ExternalLink } from 'lucide-react';

export default function EmbedWidgetBox() {
  const [copied, setCopied] = useState(false);
  const [kwpPreset, setKwpPreset] = useState('8.5');

  const embedCode = `<iframe \n  src="https://wattpeak.de/rechner-embed?kwp=${kwpPreset}&region=mitte&tilt=32"\n  width="100%" \n  height="780" \n  frameborder="0" \n  style="border-radius: 16px; border: 1px solid #e2e8f0; max-width: 850px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);"\n  title="WattPeak Ertragsrechner (DIN EN IEC 60904-3)"\n></iframe>\n<p style="font-size: 11px; font-family: sans-serif; color: #64748b; margin-top: 6px;">\n  Bereitgestellt von <a href="https://wattpeak.de/" target="_blank" rel="noopener" style="color: #d97706; font-weight: 600; text-decoration: none;">wattpeak.de</a> – Fachportal für Photovoltaik &amp; Speichertechnik.\n</p>`;

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-amber-700 uppercase">
              Webmaster &amp; Redaktionen
            </span>
            <h3 className="text-xl font-black text-slate-950 tracking-tight">
              Kostenloses Embed-Widget für Ihre Website
            </h3>
          </div>
        </div>
        <a
          href="/rechner-embed"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 font-mono"
        >
          Standalone-Vorschau öffnen
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed mb-4">
        Binden Sie den physikalisch basierten WattPeak-Ertragsrechner direkt in Ihre Fachartikel, 
        Handwerker-Websites oder Blog-Beiträge ein. Vollständig responsive, cookielos und DSGVO-konform.
      </p>

      {/* Preset Selector */}
      <div className="flex items-center gap-2 mb-3 text-xs font-mono">
        <span className="text-slate-500 font-bold">Standard-Vorauswahl:</span>
        {[
          { label: '800W Balkon', val: '0.88' },
          { label: '8,5 kWp EFH', val: '8.5' },
          { label: '12 kWp Wärmepumpe', val: '12.0' },
        ].map((p) => (
          <button
            key={p.label}
            onClick={() => setKwpPreset(p.val)}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              kwpPreset === p.val
                ? 'bg-slate-900 text-white border-slate-900 font-bold'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Code Box */}
      <div className="relative bg-slate-900 rounded-2xl p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
        <button
          onClick={copyEmbed}
          className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Kopiert!' : 'Code kopieren'}
        </button>
        <pre className="pr-24 overflow-x-auto text-[11px] leading-relaxed text-amber-200/90">
          {embedCode}
        </pre>
      </div>
    </div>
  );
}
