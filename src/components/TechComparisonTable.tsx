import React from 'react';
import { Cpu } from 'lucide-react';

export default function TechComparisonTable() {
  const technologies = [
    {
      name: 'N-Type TOPCon',
      subtitle: 'Tunnel Oxide Passivated Contact',
      status: 'Aktueller Marktstandard (80%+ Marktanteil)',
      efficiency: '22,5 % – 23,2 %',
      tempCoeff: '-0,30 %/K',
      bifaciality: 'ca. 80 %',
      degradation: 'ca. 0,40 % / Jahr',
      pros: 'Exzellentes Preis-Leistungs-Verhältnis, hohe Schwachlichtausbeute, keine LID (Licht-Degradation).',
      cons: 'Empfindlicher gegen Feuchtigkeit als Glas-Glas-Aufbauten, erfordert saubere Randversiegelung.',
      highlight: false
    },
    {
      name: 'Heterojunction (HJT)',
      subtitle: 'Silizium-Heteroübergang mit a-Si Schichten',
      status: 'High-Efficiency Premium',
      efficiency: '23,2 % – 24,0 %',
      tempCoeff: '-0,26 %/K (Bester Hitzewert)',
      bifaciality: 'ca. 85 % – 95 %',
      degradation: 'ca. 0,25 % / Jahr (typ. 30 J. lineare Herstellergarantie)',
      pros: 'Hervorragende Performance bei 40°C+ im Sommer, höchste beidseitige Stromerzeugung (Bifazialität).',
      cons: 'Höhere Fertigungskosten, Silber-Verbrauch in der Metallisierung höher.',
      highlight: true
    },
    {
      name: 'Back-Contact (IBC / ABC)',
      subtitle: 'Interdigitated Back Contact (z.B. Aiko ABC, Maxeon)',
      status: 'Ästhetik- & Wirkungsgrad-Spitze',
      efficiency: '23,8 % – 24,6 %',
      tempCoeff: '-0,28 %/K',
      bifaciality: 'ca. 70 % (oder Monofazial Full-Black)',
      degradation: 'ca. 0,35 % / Jahr',
      pros: 'Keine störenden Busbars oder Lötbändchen auf der Vorderseite, homogene Tiefschwarz-Optik.',
      cons: 'Aufwändiger Laser-Strukturierungsprozess der Rückseitenpole.',
      highlight: false
    },
    {
      name: 'Perowskit-Silizium Tandem',
      subtitle: 'Zweischicht-Halbleiter der nächsten Generation',
      status: 'Labor- & Pilotserien-Reife',
      efficiency: '28 % – 33 %+ (Laborrekord 34,6 %)',
      tempCoeff: '-0,20 %/K',
      bifaciality: 'Variabel',
      degradation: 'In industrieller Langzeit-Erprobung',
      pros: 'Durchbricht das physikalische Shockley-Queisser-Limit von reinem Silizium (ca. 29,4%).',
      cons: 'Langzeitstabilität gegenüber UV-Strahlung und Feuchtigkeit Gegenstand aktueller Zertifizierungen.',
      highlight: false
    }
  ];

  return (
    <div id="technologie" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
            <Cpu className="w-4 h-4 text-amber-500" />
            Halbleiter-Spezifikationen
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
            Zelltechnologien im physikalischen Vergleich
          </h2>
        </div>
        <p className="text-xs text-slate-500 font-mono max-w-md">
          Vergleich nach STC-Wirkungsgrad (DIN EN IEC 60904-3) und realem Temperaturverhalten.
        </p>
      </div>

      {/* Responsive Table / Cards */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
              <th className="p-4 rounded-tl-2xl">Zell-Architektur</th>
              <th className="p-4">Modulwirkungsgrad</th>
              <th className="p-4">Temp.-Koeffizient γ</th>
              <th className="p-4">Bifazialitätsgrad</th>
              <th className="p-4">Degradation / a</th>
              <th className="p-4 rounded-tr-2xl">Technischer Kernvorteil</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 border-x border-b border-slate-200">
            {technologies.map((t) => (
              <tr key={t.name} className={`hover:bg-slate-50 transition-colors ${t.highlight ? 'bg-amber-50/50' : ''}`}>
                <td className="p-4">
                  <div className="font-extrabold text-sm text-slate-950 font-sans">{t.name}</div>
                  <div className="text-[10px] text-slate-500">{t.subtitle}</div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                    {t.status}
                  </span>
                </td>
                <td className="p-4 font-black text-slate-900 text-sm">
                  {t.efficiency}
                </td>
                <td className="p-4">
                  <span className="font-black text-amber-700 bg-amber-100/70 px-2 py-1 rounded">
                    {t.tempCoeff}
                  </span>
                </td>
                <td className="p-4 text-slate-700 font-bold">
                  {t.bifaciality}
                </td>
                <td className="p-4 text-slate-700 font-bold">
                  {t.degradation}
                </td>
                <td className="p-4 font-sans text-xs text-slate-600 leading-relaxed max-w-xs">
                  {t.pros}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 font-sans leading-relaxed">
        <strong className="text-slate-950 font-bold">Bedeutung des Temperaturkoeffizienten γ_Pmp:</strong>{' '}
        Photovoltaikmodule verlieren bei Erwärmung an Spannung und damit Leistung. 
        Erreicht ein Modul an einem sonnigen Sommertag 55 °C (ΔT = +30 K über STC), verliert ein älteres PERC-Modul (-0,36 %/K) 
        über 10,8 % seiner Spitzenleistung, während ein HJT-Modul (-0,26 %/K) lediglich 7,8 % einbüßt.
      </div>
    </div>
  );
}
