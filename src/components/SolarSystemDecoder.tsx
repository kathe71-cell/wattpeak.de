import React, { useState, useMemo } from 'react';
import { ShoppingCart, CheckCircle2, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAmazonSearchUrl } from '../data/products';
import { calculateSolarYield, SolarParams } from '../utils/solarMath';

export default function SolarSystemDecoder() {
  const [selectedSystem, setSelectedSystem] = useState<'balkon-basic' | 'balkon-speicher' | 'dach-klein' | 'dach-gross'>('balkon-speicher');

  // 4 transparent defined reference configurations with explicit assumptions
  const SYSTEM_CONFIGS: Record<'balkon-basic' | 'balkon-speicher' | 'dach-klein' | 'dach-gross', {
    title: string;
    subtitle: string;
    hardware: string;
    mpptRange?: string;
    maxInputCurrent?: string;
    maxInputVoltage?: string;
    features: string[];
    amazonQuery: string;
    params: SolarParams;
    investmentLabel: string;
  }> = {
    'balkon-basic': {
      title: '800W Stecker-Solar Basic',
      subtitle: 'Für Balkongeländer, Terrasse & Mietwohnungen',
      investmentLabel: 'ca. 330 – 390 € * (Basis-Set)',
      hardware: '2x 440Wp Bifazial N-Type TOPCon + Hoymiles HMS-800W-2T',
      mpptRange: '16 – 60 V DC (2x MPPT getrennt)',
      maxInputCurrent: '14,0 A je Tracker',
      maxInputVoltage: '65 V DC',
      features: [
        'Kein Elektriker nötig – Direktanschluss über Schukosteckdose (Solarpaket I)',
        'Unbürokratische 5-Minuten-Registrierung im MaStR der Bundesnetzagentur',
        '800 W AC-Einspeisegrenze am Wechselrichter (gemäß Solarpaket I / VDE AR-N 4105)'
      ],
      amazonQuery: 'Balkonkraftwerk 800W Komplettset Hoymiles',
      params: {
        systemType: 'balcony',
        kwp: 0.88,
        inverterAcWatts: 800,
        region: 'mitte',
        mountingType: 'facade_balcony',
        tilt: 85,
        azimuth: 0,
        cellType: 'topcon',
        shading: 'none',
        annualConsumption: 2000,
        storageKwh: 0,
        electricityPrice: 0.36,
        feedInRemunerationType: 'uncompensated',
        feedInTariff: 0,
        customInvestmentEur: 360,
      }
    },
    'balkon-speicher': {
      title: '800W Balkonkraftwerk mit 1,6 kWh Speicher',
      subtitle: 'Für optimierten Eigenverbrauch in den Abend- & Nachtstunden',
      investmentLabel: 'ca. 950 – 1.150 € * (Set + LiFePO4 Speicher)',
      hardware: '2x 440Wp Module + Anker SOLIX Solarbank 2 E1600 Pro (All-in-One)',
      mpptRange: '16 – 60 V DC (4x MPPT integriert)',
      maxInputCurrent: '16,0 A je Eingang',
      maxInputVoltage: '60 V DC',
      features: [
        'Speichert Mittagsüberschuss für die nächtliche Grundlast (Kühlschrank, Router, Standby)',
        'Integrierter 800W Inverter und 4x MPPT Tracker für getrennte Modulausrichtung',
        'Smarte App-Steuerung und Kompatibilität mit Smart Plugs'
      ],
      amazonQuery: 'Anker SOLIX Solarbank 2 E1600 Pro',
      params: {
        systemType: 'balcony',
        kwp: 0.88,
        inverterAcWatts: 800,
        region: 'mitte',
        mountingType: 'facade_balcony',
        tilt: 85,
        azimuth: 0,
        cellType: 'topcon',
        shading: 'none',
        annualConsumption: 2000,
        storageKwh: 1.6,
        electricityPrice: 0.36,
        feedInRemunerationType: 'uncompensated',
        feedInTariff: 0,
        customInvestmentEur: 980,
      }
    },
    'dach-klein': {
      title: 'Dachanlage 5 kWp (Reihenhaus / Kompaktdach)',
      subtitle: 'Wirtschaftliche Grundabsicherung für Einfamilienhäuser',
      investmentLabel: 'ca. 6.200 – 7.200 € * (schlüsselfertig inkl. Montage)',
      hardware: '11–12x 445Wp Glas-Glas TOPCon Module + 5 kW String-Wechselrichter',
      mpptRange: '120 – 850 V DC (2x String-MPPT)',
      maxInputCurrent: '13,5 A je String',
      maxInputVoltage: '1.000 V DC max.',
      features: [
        'Deutliche Senkung des Netzstrombezugs tagsüber',
        'Gesetzliche Einspeisevergütung nach EEG für jede eingespeiste Kilowattstunde',
        'Jederzeit modular um einen Hochvolt-Heimspeicher erweiterbar'
      ],
      amazonQuery: 'Photovoltaik Komplettset 5 kWp',
      params: {
        systemType: 'rooftop',
        kwp: 5.0,
        region: 'mitte',
        mountingType: 'pitched',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        shading: 'none',
        annualConsumption: 3500,
        storageKwh: 0,
        electricityPrice: 0.36,
        feedInRemunerationType: 'eeg_partial',
        feedInTariff: 0.0803,
        customInvestmentEur: 6500,
      }
    },
    'dach-gross': {
      title: '10 kWp Dachanlage mit 7,5 kWh Speicher',
      subtitle: 'Optimiert für Einfamilienhaus, Wärmepumpe & hohe Autarkie',
      investmentLabel: 'ca. 13.500 – 15.500 € * (schlüsselfertig inkl. Speicher)',
      hardware: '22–23x 445Wp Glas-Glas + 10 kW Hybrid-Wechselrichter + 7,5 kWh LiFePO4 Speicher',
      mpptRange: '160 – 950 V DC (2x MPPT)',
      maxInputCurrent: '15,0 A je String',
      maxInputVoltage: '1.000 V DC max.',
      features: [
        'Hohe Eigenversorgung über Tag, Abend und Nacht (typisch 65–75 % Autarkie)',
        'Notstromfunktion und automatischer Umschaltbetrieb bei Netzausfall',
        'Optimale Ergänzung zu Wärmepumpe und steuerbarer Wallbox'
      ],
      amazonQuery: 'Photovoltaik Komplettanlage 10 kWp',
      params: {
        systemType: 'rooftop',
        kwp: 10.0,
        region: 'mitte',
        mountingType: 'pitched',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        shading: 'none',
        annualConsumption: 5000,
        storageKwh: 7.5,
        electricityPrice: 0.36,
        feedInRemunerationType: 'eeg_partial',
        feedInTariff: 0.0803,
        customInvestmentEur: 14500,
      }
    }
  };

  const currentConfig = SYSTEM_CONFIGS[selectedSystem];

  // Dynamically calculate metrics using the unified physics engine
  const calculation = useMemo(() => {
    return calculateSolarYield(currentConfig.params);
  }, [currentConfig]);

  const b = calculation.balance;
  const eco = calculation.economy;

  return (
    <section id="anlagenvergleich" className="py-12 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest px-3 py-1 rounded">
            Anlagen vergleichen · Gleiche Rechenbasis
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3 text-white tracking-tight">
            Solaranlagen im System-Vergleich
          </h2>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Vergleichen Sie 800W-Balkonsolar und 5–10 kWp Dachanlagen auf derselben physikalischen Rechenbasis. 
            Alle Annahmen zu Verbrauch, Einstrahlung und Einspeisevergütung sind vollständig transparent ausgewiesen.
          </p>
        </div>

        {/* System Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 max-w-4xl mx-auto">
          {[
            { id: 'balkon-basic', label: '800W Basic', sub: 'Ohne Akku' },
            { id: 'balkon-speicher', label: '800W + Speicher', sub: 'Mit 1,6 kWh Akku' },
            { id: 'dach-klein', label: '5 kWp Hausdach', sub: 'Ohne Akku' },
            { id: 'dach-gross', label: '10 kWp Dachanlage', sub: 'Mit 7,5 kWh Akku' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSystem(item.id as any)}
              className={`py-3 px-3 rounded-2xl text-xs font-bold transition border text-left flex flex-col justify-between cursor-pointer ${
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

        {/* Explicit Assumptions Strip */}
        <div className="max-w-4xl mx-auto mb-6 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-amber-400 font-bold uppercase mr-1.5">Annahmen des Vergleichs:</span>
            Haushalt: {currentConfig.params.annualConsumption} kWh/a · Strompreis: {currentConfig.params.electricityPrice.toFixed(2)} €/kWh · EEG: {(currentConfig.params.feedInTariff ?? 0) > 0 ? `${((currentConfig.params.feedInTariff ?? 0) * 100).toFixed(2)} ct/kWh` : '0,00 ct/kWh (unentgeltlich)'} · Region: Mitteldeutschland
          </div>
          <Link
            to="/ertragsrechner"
            state={{
              kwp: currentConfig.params.kwp,
              demand: currentConfig.params.annualConsumption,
              storage: currentConfig.params.storageKwh,
              mount: currentConfig.params.mountingType,
              tilt: currentConfig.params.tilt,
              region: currentConfig.params.region,
            }}
            className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 shrink-0"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Im Rechner anpassen</span>
          </Link>
        </div>

        {/* Decoder Result Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: System & Key Financials */}
          <div className="md:col-span-6 space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                Physikalisch berechnete Kennzahlen
              </span>
              <h3 className="text-2xl font-black text-white mt-0.5">{currentConfig.title}</h3>
              <p className="text-xs text-slate-400">{currentConfig.subtitle}</p>
            </div>

            {/* Metrics 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400">Jahreserzeugung</span>
                <div className="text-xl font-black text-white font-mono mt-0.5">{b.totalAnnualYieldKwh} kWh/a</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Generator: {currentConfig.params.kwp} kWp</div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400">Nutzbare Eigenversorgung</span>
                <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">{b.totalSelfUsedKwh} kWh/a</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Vor Ort im Haushalt genutzt</div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400">Autarkiegrad</span>
                <div className="text-xl font-black text-amber-400 font-mono mt-0.5">{b.autarkyRatePercent} %</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Anteil am {currentConfig.params.annualConsumption}-kWh-Bedarf</div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400">Nutzbarer Anteil Ertrag</span>
                <div className="text-xl font-black text-slate-200 font-mono mt-0.5">{b.usableSelfConsumptionRatePercent} %</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {b.storageLossKwh > 0 ? `+ ${b.storageLossKwh} kWh Speicherverlust` : 'Kein Speicherverlust'}
                </div>
              </div>
            </div>

            {/* Economic Summary */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Netto-Ersparnis / Jahr</span>
                <div className="text-emerald-400 font-black text-sm mt-0.5">~ {eco.annualNetBenefitEur} € / Jahr *</div>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Amortisationsdauer</span>
                <div className="text-slate-200 font-black text-sm mt-0.5">
                  {eco.estimatedPaybackYears !== null ? `ca. ${eco.estimatedPaybackYears.toFixed(1)} Jahre *` : '–'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hardware & Amazon CTA */}
          <div className="md:col-span-6 space-y-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <span className="font-mono font-bold text-slate-300 uppercase text-[10px] block">
                Typische Hardware-Konfiguration:
              </span>
              <div className="font-extrabold text-amber-300 text-sm">{currentConfig.hardware}</div>
              <div className="text-[11px] font-mono text-slate-400">
                Marktpreis-Richtwert (Stand: September 2026): {currentConfig.investmentLabel}
              </div>
              <ul className="space-y-1.5 pt-2 text-slate-300">
                {currentConfig.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={getAmazonSearchUrl(currentConfig.amazonQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-slate-950" />
              <span>Passende Hardware bei Amazon.de ansehen *</span>
            </a>
            
            <div className="text-[11px] text-center text-slate-400 font-mono leading-relaxed">
              * Modellrechnung auf physikalischer Basis der DWD-Globalstrahlung. Nullsteuersatz (0 % MwSt.) gem. § 12 Abs. 3 UStG unter den gesetzlichen Voraussetzungen für private Wohngebäude.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
