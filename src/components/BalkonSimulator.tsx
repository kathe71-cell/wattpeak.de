import React, { useState, useMemo } from 'react';
import { 
  Zap, Battery, CheckCircle2, 
  ExternalLink, Sun, Compass, 
  CloudRain, HelpCircle, Scale 
} from 'lucide-react';
import { calculateSolarYield, RegionZone } from '../utils/solarMath';
import { getAmazonSearchUrl } from '../data/products';

export default function BalkonSimulator() {
  // Simulator inputs
  const [moduleWp, setModuleWp] = useState<number>(880); // 2x 440Wp
  const [inverterAcWatts, setInverterAcWatts] = useState<number>(800); // 800W Solarpaket I vs 600W
  const [baseLoadWatts, setBaseLoadWatts] = useState<number>(180); // 180W Grundlast
  const [orientation, setOrientation] = useState<'south_angle' | 'south_vertical' | 'east_west' | 'general'>('south_angle');
  const [region, setRegion] = useState<RegionZone>('mitte');
  const [shading, setShading] = useState<'none' | 'light' | 'medium'>('none');
  const [hasStorage, setHasStorage] = useState<boolean>(true);
  const [storageCapacityKwh, setStorageCapacityKwh] = useState<number>(1.6); // 1.6 kWh (Standard Anker/EcoFlow)
  const electricityPriceEur = 0.34; // 34 Cent/kWh

  // Cost estimates for ROI based on real market averages 2025/2026
  const systemCost = useMemo(() => {
    // Base set: inverter + modules + basic mounting
    let baseSetCost = 360;
    if (moduleWp > 1600) baseSetCost = 580;
    else if (moduleWp > 1200) baseSetCost = 480;
    else if (moduleWp <= 500) baseSetCost = 250;

    const storageCost = hasStorage 
      ? (storageCapacityKwh >= 2.5 ? 1200 : storageCapacityKwh >= 2.0 ? 980 : storageCapacityKwh >= 1.6 ? 790 : 590) 
      : 0;

    return baseSetCost + storageCost;
  }, [moduleWp, hasStorage, storageCapacityKwh]);

  // Yield calculations with physical considerations via unified solarMath engine
  const simResults = useMemo(() => {
    let azimuth = 0; // 0 Sued
    let tilt = 30;

    if (orientation === 'south_vertical') {
      azimuth = 0;
      tilt = 90;
    } else if (orientation === 'east_west') {
      azimuth = -90; // Ost-West Aufteilung
      tilt = 30;
    } else if (orientation === 'general') {
      azimuth = 45; // Süd-West
      tilt = 45;
    }

    const annualConsumption = Math.round(baseLoadWatts * 8.76 * 1.4);

    const calc = calculateSolarYield({
      systemType: 'balcony',
      kwp: moduleWp / 1000,
      inverterAcWatts,
      region,
      tilt,
      azimuth,
      cellType: 'topcon',
      shading,
      annualConsumption,
      storageKwh: hasStorage ? storageCapacityKwh : 0,
      electricityPrice: electricityPriceEur,
      feedInRemunerationType: 'uncompensated',
      feedInTariff: 0,
      customInvestmentEur: systemCost,
    });

    return {
      annualGenerationKwh: calc.balance.totalAnnualYieldKwh,
      directSelfConsumptionKwh: calc.balance.directConsumptionKwh,
      storedAndUsedKwh: calc.balance.storageDischargeKwh,
      storageLossKwh: calc.balance.storageLossKwh,
      totalUsedKwh: calc.balance.totalSelfUsedKwh,
      givenAwayKwh: calc.balance.feedInKwh,
      usableSelfConsumptionRate: calc.balance.usableSelfConsumptionRatePercent,
      generationUtilizationRate: calc.balance.generationUtilizationRatePercent,
      annualSavingsEur: calc.economy.annualNetBenefitEur,
      paybackYears: calc.economy.estimatedPaybackYears !== null ? calc.economy.estimatedPaybackYears.toFixed(1) : '–',
    };
  }, [moduleWp, inverterAcWatts, baseLoadWatts, orientation, region, shading, hasStorage, storageCapacityKwh, electricityPriceEur, systemCost]);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <span className="text-[11px] font-mono font-bold tracking-widest text-amber-700 uppercase flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            Solarpaket I · 800W AC &amp; bis 2.000 Wp DC
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
            Balkonkraftwerk- &amp; Speicher-Simulator
          </h3>
          <p className="text-xs text-slate-600 mt-1 font-sans">
            Realistische Ertragsprognose unter Berücksichtigung von Überbelegung, Ausrichtung und Speicherzyklen
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-mono text-xs font-bold border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            Max. 2.000 Wp Modullimit
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-mono text-xs font-bold border border-amber-300">
            {inverterAcWatts}W Inverterlimit
          </span>
        </div>
      </div>

      {/* Main Grid: Controls Left (7 cols), Outputs Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Modulleistung DC */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Installierte Modulleistung (DC-Generator)
              </label>
              <span className="font-mono font-black text-base text-slate-950">
                {moduleWp} Wp
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {[
                { label: '440 Wp (1 Modul)', wp: 440 },
                { label: '880 Wp (2 Module)', wp: 880 },
                { label: '1.320 Wp (3 Mod.)', wp: 1320 },
                { label: '1.760 Wp (4 Mod.)', wp: 1760 },
              ].map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setModuleWp(m.wp)}
                  className={`py-2 px-2 text-center rounded-xl text-xs font-bold transition-all ${
                    moduleWp === m.wp
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Wechselrichterleistung & Ausrichtung Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Wechselrichter AC */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-xs font-bold text-slate-900 mb-2">
                Wechselrichter AC-Leistung
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: '800 Watt', val: 800, sub: 'Solarpaket I' },
                  { label: '600 Watt', val: 600, sub: 'Altbestand' },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setInverterAcWatts(item.val)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      inverterAcWatts === item.val
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="text-xs font-extrabold">{item.label}</div>
                    <div className="text-[10px] opacity-75 font-mono mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ausrichtung / Montage */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                Montagewinkel &amp; Ausrichtung
              </label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="south_angle">Süd (ca. 25–35° angewinkelt)</option>
                <option value="south_vertical">Balkongeländer senkrecht (90° Süd)</option>
                <option value="east_west">Ost-West (z. B. 2 Seiten aufgeteilt)</option>
                <option value="general">Teilverschatteter Winkel / Sonstige</option>
              </select>
            </div>
          </div>

          {/* Region & Verschattung Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Region */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                Standort / Region
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'nord', label: 'Nord' },
                  { id: 'mitte', label: 'Mitte' },
                  { id: 'sued', label: 'Süd' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRegion(r.id as any)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                      region === r.id
                        ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Verschattung */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-amber-500" />
                Verschattungssituation
              </label>
              <select
                value={shading}
                onChange={(e) => setShading(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="none">Keine Verschattung (freie Sicht)</option>
                <option value="light">Geringe Teilverschattung (Bäume / Gauben)</option>
                <option value="medium">Mäßige Verschattung (Nachbarbalkon / Häuserwand)</option>
              </select>
            </div>
          </div>

          {/* Grundlast */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-bold text-slate-900">
                Grundlast der Wohnung (Kühlschrank, Router, Standby)
              </label>
              <span className="font-mono font-black text-base text-slate-950">
                {baseLoadWatts} W
              </span>
            </div>
            <input
              type="range"
              min="80"
              max="350"
              step="10"
              value={baseLoadWatts}
              onChange={(e) => setBaseLoadWatts(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
              <span>80 W (Single)</span>
              <span>180 W (Standard)</span>
              <span>350 W (Home-Office / Familie)</span>
            </div>
          </div>

          {/* Speicher Option Toggle */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Battery className="w-4 h-4 text-amber-500" />
                  Batteriespeicher für Balkonkraftwerk
                </div>
                <span className="text-xs text-slate-500">
                  Speichert Mittagsüberschuss für die Abend- und Nachtstunden
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHasStorage(!hasStorage)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  hasStorage ? 'bg-amber-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    hasStorage ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {hasStorage && (
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 font-mono">
                  Akkukapazität (LiFePO4): {storageCapacityKwh.toFixed(1)} kWh
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '1,0 kWh (Kompakt)', kwh: 1.0 },
                    { label: '1,6 kWh (Anker Solix)', kwh: 1.6 },
                    { label: '2,0 kWh (EcoFlow / Zendure)', kwh: 2.0 },
                  ].map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setStorageCapacityKwh(s.kwh)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                        storageCapacityKwh === s.kwh
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                Wirtschaftliche Modellrechnung
              </span>
              <div className="text-3xl font-black text-slate-950 font-mono mt-1">
                ~ {simResults.annualSavingsEur} € <span className="text-sm font-normal text-slate-500">Stromersparnis / Jahr*</span>
              </div>
              <div className="text-xs text-slate-600 font-mono mt-1">
                Jahreserzeugung: ca. {simResults.annualGenerationKwh} kWh/a
              </div>
            </div>

            {/* Split Bar Chart */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline text-xs font-mono">
                <span className="font-bold text-slate-900">Nutzbarer Anteil am PV-Ertrag</span>
                <span className="font-black text-emerald-600">{simResults.usableSelfConsumptionRate} %</span>
              </div>
              {hasStorage && simResults.storageLossKwh > 0 && (
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>PV-Nutzungsgrad (inkl. Ladeverluste):</span>
                  <span className="font-semibold text-slate-700">{simResults.generationUtilizationRate} %</span>
                </div>
              )}
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${(simResults.directSelfConsumptionKwh / (simResults.annualGenerationKwh || 1)) * 100}%` }}
                  title={`Direkt verbraucht: ${simResults.directSelfConsumptionKwh} kWh`}
                ></div>
                {hasStorage && (
                  <div 
                    className="bg-amber-500 h-full transition-all duration-300"
                    style={{ width: `${(simResults.storedAndUsedKwh / (simResults.annualGenerationKwh || 1)) * 100}%` }}
                    title={`Nutzbare Akku-Entladung: ${simResults.storedAndUsedKwh} kWh`}
                  ></div>
                )}
                {hasStorage && simResults.storageLossKwh > 0 && (
                  <div 
                    className="bg-amber-200/90 h-full transition-all duration-300 border-r border-amber-300"
                    style={{ width: `${(simResults.storageLossKwh / (simResults.annualGenerationKwh || 1)) * 100}%` }}
                    title={`Wandlungs- & Speicherverluste (~12%): ${simResults.storageLossKwh} kWh`}
                  ></div>
                )}
                <div 
                  className="bg-slate-300 h-full transition-all duration-300"
                  style={{ width: `${(simResults.givenAwayKwh / (simResults.annualGenerationKwh || 1)) * 100}%` }}
                  title={`Unentgeltlich eingespeist: ${simResults.givenAwayKwh} kWh`}
                ></div>
              </div>
              <div className="flex flex-wrap gap-3 text-[10px] font-mono text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Direkt ({simResults.directSelfConsumptionKwh} kWh)
                </span>
                {hasStorage && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Akku ({simResults.storedAndUsedKwh} kWh)
                  </span>
                )}
                {hasStorage && simResults.storageLossKwh > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-200 border border-amber-400"></span> Wandlungsverluste ({simResults.storageLossKwh} kWh)
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span> Einspeisung ({simResults.givenAwayKwh} kWh)
                </span>
              </div>
            </div>

            {/* ROI Comparison Box */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[10px] uppercase">Investitionskosten ca.</span>
                <div className="text-slate-900 font-extrabold text-sm mt-0.5">~ {systemCost} € *</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase">Amortisationsdauer</span>
                <div className="text-emerald-700 font-extrabold text-sm mt-0.5">~ {simResults.paybackYears} Jahre *</div>
              </div>
            </div>

            {/* Hardware Recommendation CTA */}
            <a
              href={getAmazonSearchUrl(hasStorage ? 'Anker Solix Solarbank 2 E1600 Pro Balkonkraftwerk Speicher' : 'Balkonkraftwerk 800W Komplettset Hoymiles')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-extrabold py-3 px-4 rounded-xl text-sm shadow transition-all cursor-pointer"
            >
              Passende Hardware bei Amazon ansehen *
              <ExternalLink className="w-4 h-4 text-slate-950" />
            </a>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed font-sans">
            <strong className="text-slate-800 font-semibold">* Modellrechnung.</strong> Die tatsächliche Stromersparnis hängt vom realen Lastprofil, Wetter und individueller Verschattung ab. Bei Stecker-Solargeräten erfolgt die Einspeisung unentgeltlich, sofern keine separate Abrechnung beantragt wurde.
          </div>
        </div>
      </div>

      {/* Educational Box: Wp-Modulleistung vs. AC-Wechselrichterleistung */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-3 text-xs text-slate-700">
        <h4 className="font-extrabold text-slate-950 text-sm flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          Hintergrund: Wp-Modulleistung vs. AC-Wechselrichterleistung
        </h4>
        <p className="leading-relaxed">
          Warum erlaubt das Solarpaket I bis zu <strong>2.000 Wp Modulleistung</strong> bei nur <strong>800 Watt Wechselrichter-Einspeisung</strong>?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-sans">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Kappung bei Mittagsspitzen (Clipping)</span>
            <p className="text-slate-600">
              An klaren Junitagen liefert ein 1.760-Wp-Modulfeld rechnerisch mehr Gleichstrom, als der 800-W-Wechselrichter ins Stromnetz abgeben darf. Die Spitzenleistung wird bei 800 Watt gedeckelt.
            </p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Mehrertrag bei Bewölkung &amp; Randzeiten</span>
            <p className="text-slate-600">
              Der entscheidende Vorteil der Überbelegung liegt im Frühjahr, Herbst und bei diffuser Bewölkung: Während zwei Module bei Schlechtwetter vielleicht nur 150 Watt liefern, erreicht ein 4-Modul-Setup 300 bis 400 Watt und deckt die Haushaltsgrundlast zuverlässiger ab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
