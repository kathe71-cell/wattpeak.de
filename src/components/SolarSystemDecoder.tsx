import React, { useState } from 'react';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';
import { getAmazonLink } from '../data/solarCatalog';

export default function SolarSystemDecoder() {
  const [selectedSystem, setSelectedSystem] = useState<'balkon-basic' | 'balkon-speicher' | 'dach-klein' | 'dach-gross'>('balkon-speicher');

  const SYSTEMS_DATA = {
    'balkon-basic': {
      title: '800W Stecker-Solar Basic',
      subtitle: 'Für Balkongeländer & Mietwohnungen',
      investment: 'ca. 330 – 390 € *',
      annualYield: 'ca. 850 – 1.000 kWh',
      annualSavings: '~ 140 € / Jahr',
      payback: 'ca. 2,5 – 3 Jahre',
      autarky: 'ca. 20 – 30 %',
      hardware: '2x 440Wp Bifazial N-Type TOPCon + Hoymiles HMS-800W-2T',
      features: [
        'Kein Elektriker nötig – Plug & Play Schukostecker',
        'Unbürokratische 5-Minuten-Anmeldung im MaStR',
        '0 % Mehrwertsteuer gem. § 12 Abs. 3 UStG für Wohngebäude'
      ],
      amazonQuery: 'Balkonkraftwerk 800W Komplettset Hoymiles'
    },
    'balkon-speicher': {
      title: '800W Kraftpaket mit 1,6 kWh Speicher',
      subtitle: 'Für maximale Eigenstromnutzung am Abend',
      investment: 'ca. 1.100 – 1.300 € *',
      annualYield: 'ca. 950 – 1.100 kWh',
      annualSavings: '~ 260 € / Jahr',
      payback: 'ca. 4,5 Jahre',
      autarky: 'ca. 45 – 60 %',
      hardware: '2x 440Wp Module + Anker SOLIX Solarbank 2 E1600 Pro + Halterung',
      features: [
        'Rettet bis zu 85 % des Solarstroms für die Nachtstunden',
        'Integrierter 800W Inverter und 4x MPPT Tracker',
        'Smarte Null-Einspeiseregelung per App und Smart Plug'
      ],
      amazonQuery: 'Anker SOLIX Solarbank 2 E1600 Pro'
    },
    'dach-klein': {
      title: 'Dach-Komplettset 5 kWp (Reihenhaus)',
      subtitle: 'Für kleine Hausdächer, Garagen & Carports',
      investment: 'ca. 3.200 – 3.800 € *',
      annualYield: 'ca. 4.800 – 5.400 kWh',
      annualSavings: '~ 780 € / Jahr',
      payback: 'ca. 4,5 – 5,5 Jahre',
      autarky: 'ca. 40 – 55 %',
      hardware: '12x 445Wp Trina Vertex S+ + 5 kW String-Wechselrichter',
      features: [
        'Deutliche Senkung der Haushaltsstromrechnung',
        'Ausreichend Strom für Grundlast und Haushaltsgroßgeräte',
        'Modular um 5 kWh LiFePO4 Speicher erweiterbar'
      ],
      amazonQuery: 'Photovoltaik Komplettset 5 kWp'
    },
    'dach-gross': {
      title: '10 kWp Premium-Dachanlage mit Speicher',
      subtitle: 'Das Maximum für Einfamilienhaus & Wärmepumpe',
      investment: 'ca. 8.500 – 9.900 € *',
      annualYield: 'ca. 9.500 – 11.200 kWh',
      annualSavings: '~ 1.850 € / Jahr',
      payback: 'ca. 5,0 – 6,5 Jahre',
      autarky: 'ca. 70 – 85 %',
      hardware: '24x 445Wp Glas-Glas + 10 kW Hybrid-Wechselrichter + 10 kWh Speicher',
      features: [
        'Weitgehende Unabhängigkeit von steigenden Strompreisen',
        'Notstromfunktion bei Stromausfall integriert',
        'Perfekt kombiniert mit Wärmepumpe und Wallbox (Überschussladen)'
      ],
      amazonQuery: 'Photovoltaik Komplettanlage 10 kWp'
    }
  };

  const current = SYSTEMS_DATA[selectedSystem];

  return (
    <section id="decoder" className="py-14 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest px-3 py-1 rounded">
            Interaktiver System-Vergleich
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3 text-white tracking-tight">
            Der Solaranlagen- &amp; Amortisations-Decoder
          </h2>
          <p className="text-slate-300 text-sm mt-2">
            Vergleichen Sie Balkon- und Dachanlagen hinsichtlich Anschaffungskosten, 
            jährlicher Ersparnis und Autarkiegrad auf einen Blick.
          </p>
        </div>

        {/* System Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8 max-w-4xl mx-auto">
          {[
            { id: 'balkon-basic', label: '800W Basic', sub: 'Ab 349 €' },
            { id: 'balkon-speicher', label: '800W + Speicher', sub: 'Top-Empfehlung' },
            { id: 'dach-klein', label: '5 kWp Hausdach', sub: 'Reihenhaus' },
            { id: 'dach-gross', label: '10 kWp Autarkie', sub: 'Mit 10 kWh Akku' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSystem(item.id as any)}
              className={`py-3 px-3 rounded-2xl text-xs font-bold transition border text-left flex flex-col justify-between ${
                selectedSystem === item.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xl scale-[1.02]'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="font-extrabold text-sm">{item.label}</div>
              <div className="text-[11px] font-mono opacity-80 mt-0.5">{item.sub}</div>
            </button>
          ))}
        </div>

        {/* Decoder Result Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: System & Key Financials */}
          <div className="md:col-span-6 space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                Gewähltes System-Setup
              </span>
              <h3 className="text-2xl font-black text-white mt-0.5">{current.title}</h3>
              <p className="text-xs text-slate-400">{current.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400">Anschaffungskosten</span>
                <div className="text-xl font-black text-white font-mono mt-0.5">{current.investment}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400">Jährliche Ersparnis</span>
                <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">{current.annualSavings}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400">Amortisation</span>
                <div className="text-sm font-bold text-slate-200 font-mono mt-0.5">{current.payback}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400">Autarkiegrad</span>
                <div className="text-sm font-bold text-amber-400 font-mono mt-0.5">{current.autarky}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hardware & Amazon CTA */}
          <div className="md:col-span-6 space-y-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <span className="font-mono font-bold text-slate-300 uppercase text-[10px] block">
                Empfohlene Kern-Hardware:
              </span>
              <div className="font-extrabold text-amber-300 text-sm">{current.hardware}</div>
              <ul className="space-y-1.5 pt-2 text-slate-300">
                {current.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={getAmazonLink(current.amazonQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingCart className="w-4 h-4 text-slate-950" />
              <span>Passende Hardware bei Amazon.de ansehen *</span>
            </a>
            <div className="text-[11px] text-center text-slate-400 font-mono leading-relaxed">
              * Werbelink / Partnerlink: Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. 0 % MwSt. gem. § 12 Abs. 3 UStG unter gesetzlichen Voraussetzungen für private Wohngebäude.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
