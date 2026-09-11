import React from 'react';
import { Network, Cpu, Battery, Shield, Calculator } from 'lucide-react';

export default function DomainEcosystem() {
  const clusters = [
    {
      title: 'PV-Konfiguratoren & Rechner',
      icon: Calculator,
      color: 'text-amber-600 bg-amber-500/10 border-amber-500/30',
      domains: [
        { name: 'photovoltaikkonfigurator.de', desc: 'Dach-PV & Hausanlagen Multi-Step Planer' },
        { name: 'balkonkraftwerk-konfigurator.de', desc: '800W Stecker-Solar Berater für Mieter & Eigentümer' },
        { name: 'solaranlagenkonfigurator.de', desc: 'Komplettsysteme mit Speicher & Wärmepumpe' },
        { name: 'solardachkonfigurator.de', desc: 'Flächennutzung & Ziegel-Berechnung' },
      ]
    },
    {
      title: 'Speicher & EU-Batteriepass',
      icon: Battery,
      color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30',
      domains: [
        { name: 'eu-batteriepass.de', desc: 'Offizielle Normen der EU-Batterieverordnung 2023/1542' },
        { name: 'akkuzustand.de', desc: 'SOH-Diagnostik & Restkapazitäts-Kalkulator' },
        { name: 'eu-batterieverordnung.de', desc: 'Rechtspflichten für Importeure & Installateure' },
        { name: 'speicherstrategie.de', desc: 'Optimale Speicherdimensionierung & Zyklenfestigkeit' },
      ]
    },
    {
      title: 'Zelltechnik & Halbleiter',
      icon: Cpu,
      color: 'text-blue-600 bg-blue-500/10 border-blue-500/30',
      domains: [
        { name: 'backcontact.de', desc: 'Interdigitated Back Contact (IBC / ABC) Zellarchitektur' },
        { name: 'tandem-solarzelle.de', desc: 'Perowskit-Silizium Mehrfach-Halbleiter' },
        { name: 'perowskitsolarzellen.de', desc: 'Forschungsstände & 30%+ Wirkungsgrad' },
        { name: 'solarwafer.de', desc: 'Silizium-Wafer Formate (M10, G12) & Kristallzüchtung' },
      ]
    },
    {
      title: 'Gesetze, Pflichten & Netze',
      icon: Shield,
      color: 'text-slate-800 bg-slate-900/10 border-slate-900/20',
      domains: [
        { name: 'solarspitzengesetz.de', desc: 'Solarpaket I & II Gesetzgebung der Bundesregierung' },
        { name: 'solarebaupflicht.de', desc: 'PV-Pflichten der 16 Bundesländer nach GEG' },
        { name: 'solaranlagen-foerderung.de', desc: 'KfW-Kredite & 0% MwSt. nach § 12 Abs. 3 UStG' },
        { name: 'smartgridanalyse.de', desc: '§ 14a EnWG Dimmung & Dynamische Stromtarife' },
      ]
    }
  ];

  return (
    <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
            <Network className="w-4 h-4 text-amber-500" />
            Das wattpeak.de Verbundnetzwerk
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
            Spezialisierte Fachsatelliten des Portals
          </h2>
        </div>
        <p className="text-xs text-slate-500 font-mono max-w-md">
          Ein thematischer Cluster aus über 50 Fachdomains – von Halbleiterforschung bis hin zu behördlichen Nachweisen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clusters.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${c.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">{c.title}</h3>
              </div>

              <ul className="space-y-2.5 text-xs">
                {c.domains.map((d) => (
                  <li key={d.name} className="flex items-baseline justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div>
                      <span className="font-mono font-bold text-slate-950 block">{d.name}</span>
                      <span className="text-slate-500 text-[11px]">{d.desc}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded shrink-0">
                      In Entwicklung
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
