import React from 'react';
import SolarCalculator from '../components/Calculator';
import { Zap, ExternalLink } from 'lucide-react';

export default function EmbedCalculator() {
  return (
    <div className="min-h-screen bg-slate-50 p-2 sm:p-4 flex flex-col justify-between">
      <div>
        <SolarCalculator isEmbed={true} />
      </div>

      {/* Mandatory Attribution Footer for iFrames */}
      <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
            <Zap className="w-3.5 h-3.5 fill-slate-950 stroke-slate-950" />
          </div>
          <span>Powered by <strong>wattpeak.de</strong> · DIN EN IEC 60904-3 Ertragsmodell</span>
        </div>
        <a
          href="/"
          target="_top"
          className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-bold transition-colors"
        >
          Zur Vollversion auf wattpeak.de
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
