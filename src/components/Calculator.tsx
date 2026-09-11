import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { 
  Zap, Sun, Compass, Battery, Euro, 
  Share2, Check, Info, Printer, Building
} from 'lucide-react';
import { 
  calculateSolarYield, 
  CELL_TECH_PROPERTIES,
  LOCATION_PRESETS, MOUNTING_OPTIONS,
  MountingType, RegionZone
} from '../utils/solarMath';
import CalculationTransparencyBox from './CalculationTransparencyBox';

interface CalculatorProps {
  isEmbed?: boolean;
}

export default function SolarCalculator({ isEmbed = false }: CalculatorProps) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navState = location.state as {
    kwp?: number;
    demand?: number;
    storage?: number;
    mount?: MountingType;
    tilt?: number;
    region?: RegionZone;
  } | null;

  const [copied, setCopied] = useState(false);

  // Initialize state from location state, URL params, or realistic defaults
  const [kwp, setKwp] = useState<number>(() => {
    if (typeof navState?.kwp === 'number') return navState.kwp;
    const p = searchParams.get('kwp');
    return p ? parseFloat(p) : 9.6;
  });

  const [region, setRegion] = useState<RegionZone>(() => {
    if (navState?.region) return navState.region;
    const r = searchParams.get('region');
    return (r === 'nord' || r === 'sued') ? r : 'mitte';
  });

  const [locationId, setLocationId] = useState<string>(() => {
    return searchParams.get('loc') || '';
  });

  const [mountingType, setMountingType] = useState<MountingType>(() => {
    if (navState?.mount && navState.mount in MOUNTING_OPTIONS) return navState.mount;
    const m = searchParams.get('mount');
    return (m && m in MOUNTING_OPTIONS) ? (m as MountingType) : 'pitched';
  });

  const [tilt, setTilt] = useState<number>(() => {
    if (typeof navState?.tilt === 'number') return navState.tilt;
    const t = searchParams.get('tilt');
    return t ? parseInt(t, 10) : 35;
  });

  const [azimuth, setAzimuth] = useState<number>(() => {
    const a = searchParams.get('azimuth');
    return a !== null ? parseInt(a, 10) : 0;
  });

  const [cellType, setCellType] = useState<'topcon' | 'hjt' | 'ibc' | 'perc'>(() => {
    const c = searchParams.get('cell');
    return (c === 'hjt' || c === 'ibc' || c === 'perc') ? c : 'topcon';
  });

  const [annualConsumption, setAnnualConsumption] = useState<number>(() => {
    if (typeof navState?.demand === 'number') return navState.demand;
    const ac = searchParams.get('demand');
    return ac ? parseInt(ac, 10) : 4200;
  });

  const [storageKwh, setStorageKwh] = useState<number>(() => {
    if (typeof navState?.storage === 'number') return navState.storage;
    const s = searchParams.get('storage');
    return s ? parseFloat(s) : 7.5;
  });

  const [electricityPrice] = useState<number>(0.34);
  const [feedInTariff] = useState<number>(0.0811);
  const [showFormulas, setShowFormulas] = useState(false);

  // When mounting type changes, adjust default tilt if appropriate
  const handleMountingChange = (newMount: MountingType) => {
    setMountingType(newMount);
    setTilt(MOUNTING_OPTIONS[newMount].defaultTilt);
  };

  // Clean up any legacy query params or hash fragments from the address bar on mount
  useEffect(() => {
    if ((window.location.search || window.location.hash) && window.location.pathname !== '/rechner-embed') {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch {
        // Ignore in non-browser environments
      }
    }
  }, []);

  // Listen for preset submissions from the Solar-Finder hero form without URL pollution
  useEffect(() => {
    const handleFinderApply = (e: Event) => {
      const customEvent = e as CustomEvent<{
        kwp: number;
        demand: number;
        storage: number;
        mount: MountingType;
        tilt: number;
        region: 'nord' | 'mitte' | 'sued';
      }>;
      if (customEvent.detail) {
        const d = customEvent.detail;
        if (typeof d.kwp === 'number') setKwp(d.kwp);
        if (typeof d.demand === 'number') setAnnualConsumption(d.demand);
        if (typeof d.storage === 'number') setStorageKwh(d.storage);
        if (d.mount) {
          setMountingType(d.mount);
          setTilt(typeof d.tilt === 'number' ? d.tilt : MOUNTING_OPTIONS[d.mount].defaultTilt);
        }
        if (d.region) setRegion(d.region);
      }
    };

    window.addEventListener('solar-finder-apply', handleFinderApply);
    return () => window.removeEventListener('solar-finder-apply', handleFinderApply);
  }, []);

  // Calculate results reactively
  const results = useMemo(() => {
    return calculateSolarYield({
      kwp,
      region,
      locationId: locationId || undefined,
      mountingType,
      tilt,
      azimuth,
      cellType,
      annualConsumption,
      storageKwh,
      electricityPrice,
      feedInTariff
    });
  }, [kwp, region, locationId, mountingType, tilt, azimuth, cellType, annualConsumption, storageKwh, electricityPrice, feedInTariff]);

  const copyShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12">
      <div className={`bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ${isEmbed ? 'p-4 sm:p-6' : 'p-6 sm:p-10'}`}>
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Physikalisch basierte Modellrechnung
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
              Photovoltaik Ertrags- &amp; Wirtschaftlichkeitsrechner
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-sans">
              Berechnung nach STC-Referenzbedingungen (DIN EN IEC 60904-3) &amp; langjährigen DWD-Globalstrahlungswerten
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 no-print">
            <button
              onClick={copyShareLink}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
              title="Aktuelle Konfiguration als Link kopieren"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Link kopiert!' : 'Konfiguration teilen'}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
              title="Datenblatt als PDF drucken"
            >
              <Printer className="w-3.5 h-3.5" />
              PDF / Drucken
            </button>

            <button
              onClick={() => setShowFormulas(!showFormulas)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-100/70 hover:bg-amber-100 text-amber-950 font-bold text-xs border border-amber-300 transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-amber-800" />
              {showFormulas ? 'Formel schließen' : 'Berechnungsformel'}
            </button>
          </div>
        </div>

        {/* Formula Explanation Drawer */}
        {showFormulas && (
          <div className="mb-8 p-5 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 font-mono text-xs space-y-3 animate-fadeIn">
            <div className="text-amber-400 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Physikalisches Näherungsmodell</span>
              <span className="text-[10px] text-slate-400">DWD Globalstrahlung &amp; STC</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              Der Jahresertrag wird berechnet über: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">E_jahr = P_kWp · G_horiz · f_orient · PR · [1 + γ_Pmp · (T_cell - 25°C)]</code>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-800">
              <div>• <span className="text-amber-300">G_horiz:</span> {results.effectiveRadiationKwhM2} kWh/m² auf geneigter Fläche</div>
              <div>• <span className="text-amber-300">PR:</span> Performance Ratio inkl. Kabel &amp; Wechselrichter (~84%)</div>
              <div>• <span className="text-amber-300">γ_Pmp:</span> Temp.-Koeffizient ({CELL_TECH_PROPERTIES[cellType].tempCoeff} %/K)</div>
            </div>
          </div>
        )}

        {/* Main Grid: Inputs Left (7 cols), Live Results Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Col: Interactive Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Preset Buttons */}
            <div>
              <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-500 mb-2">
                Schnellauswahl typischer Anlagengrößen
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: '800W Balkon', p: 0.88, s: 1.6, c: 2200, m: 'facade_balcony' as MountingType, t: 85 },
                  { label: '6 kWp Doppelhaus', p: 6.0, s: 5.0, c: 3500, m: 'pitched' as MountingType, t: 35 },
                  { label: '10 kWp Einfamilien', p: 10.0, s: 7.5, c: 4500, m: 'pitched' as MountingType, t: 35 },
                  { label: '15 kWp Wärmepumpe', p: 15.0, s: 10.0, c: 7000, m: 'pitched' as MountingType, t: 35 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setKwp(preset.p);
                      setStorageKwh(preset.s);
                      setAnnualConsumption(preset.c);
                      setMountingType(preset.m);
                      setTilt(preset.t);
                    }}
                    className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all duration-150 text-left ${
                      kwp === preset.p
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="font-extrabold">{preset.label}</div>
                    <div className="text-[10px] opacity-75 font-mono">{preset.p} kWp · {preset.s} kWh</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generatorleistung (kWp) Slider */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  PV-Nennleistung (Generatorgröße)
                </label>
                <div className="text-right">
                  <span className="text-xl font-black text-slate-950 font-mono">{kwp.toFixed(2)}</span>
                  <span className="text-xs font-bold text-amber-700 ml-1 font-mono">kWp ({Math.round(kwp * 1000)} Wp)</span>
                </div>
              </div>
              <input
                type="range"
                min="0.8"
                max="25"
                step="0.1"
                value={kwp}
                onChange={(e) => setKwp(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>0.8 kWp (Balkon)</span>
                <span>5 kWp (Reihenhaus)</span>
                <span>10 kWp (Standard EFH)</span>
                <span>25 kWp (Großdach)</span>
              </div>
            </div>

            {/* Dach- / Montageart */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-500" />
                Dach- &amp; Montageart
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(Object.keys(MOUNTING_OPTIONS) as MountingType[]).map((key) => {
                  const m = MOUNTING_OPTIONS[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleMountingChange(key)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        mountingType === key
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
                      }`}
                    >
                      <div className="text-xs font-extrabold">{m.name}</div>
                      <div className="text-[10px] opacity-75 font-mono mt-0.5">Typ. {m.defaultTilt}° Neigung</div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500 mt-2 font-mono">
                {MOUNTING_OPTIONS[mountingType].desc}
              </p>
            </div>

            {/* Standort & Einstrahlung */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  Standort &amp; Einstrahlungszone (DWD Mittelwerte)
                </label>
                <span className="text-[10px] text-amber-800 font-mono font-bold">
                  {results.effectiveRadiationKwhM2} kWh/m² geneigt
                </span>
              </div>

              {/* 3 Macro Regions */}
              <div className="grid grid-cols-3 gap-1.5">
                {(['nord', 'mitte', 'sued'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRegion(r);
                      setLocationId('');
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold uppercase transition-all ${
                      region === r && !locationId
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {r === 'nord' ? 'Nord (1.000)' : r === 'mitte' ? 'Mitte (1.080)' : 'Süd (1.200)'}
                  </button>
                ))}
              </div>

              {/* City / PLZ Presets */}
              <div>
                <select
                  value={locationId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setLocationId(id);
                    if (id) {
                      const found = LOCATION_PRESETS.find(p => p.id === id);
                      if (found) setRegion(found.region);
                    }
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="">Oder spezifische Region / PLZ-Zone wählen...</option>
                  {LOCATION_PRESETS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      PLZ {loc.postalPrefix} – {loc.name} (~{loc.annualRadiationKwhM2} kWh/m²)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dachneigung & Ausrichtung */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Dachneigung */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-500" />
                    Dachneigung
                  </label>
                  <span className="font-mono font-black text-sm text-slate-950">{tilt}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="1"
                  value={tilt}
                  onChange={(e) => setTilt(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>0° Flach</span>
                  <span>35° Optimal</span>
                  <span>90° Fassade</span>
                </div>
              </div>

              {/* Ausrichtung Azimut */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-900">
                    Ausrichtung (Azimut)
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {azimuth === 0 ? '0° Süd' : azimuth < 0 ? `${Math.abs(azimuth)}° Ost` : `${azimuth}° West`}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1 pt-1">
                  {[
                    { label: 'Ost (-90°)', val: -90 },
                    { label: 'S-O (-45°)', val: -45 },
                    { label: 'Süd (0°)', val: 0 },
                    { label: 'S-W (+45°)', val: 45 },
                    { label: 'West (+90°)', val: 90 },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setAzimuth(item.val)}
                      className={`py-2 px-1 text-center rounded-xl text-[10px] font-bold transition-all ${
                        azimuth === item.val
                          ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Zell-Technologie */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-900 mb-2">
                Halbleiter- &amp; Zelltechnologie
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(CELL_TECH_PROPERTIES) as Array<keyof typeof CELL_TECH_PROPERTIES>).map((key) => {
                  const tech = CELL_TECH_PROPERTIES[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCellType(key as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        cellType === key
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="text-xs font-extrabold">{tech.name}</div>
                      <div className="text-[10px] font-mono text-amber-400 mt-0.5">
                        γ: {tech.tempCoeff} %/K
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                {CELL_TECH_PROPERTIES[cellType].desc}
              </p>
            </div>

            {/* Speicher & Verbrauch Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Batteriespeicher */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Battery className="w-3.5 h-3.5 text-amber-500" />
                    Batteriespeicher (Nutzbar)
                  </label>
                  <span className="font-mono font-black text-sm text-slate-950">{storageKwh.toFixed(1)} kWh</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={storageKwh}
                  onChange={(e) => setStorageKwh(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>0 (Ohne)</span>
                  <span>5 kWh</span>
                  <span>20 kWh</span>
                </div>
              </div>

              {/* Jahresverbrauch */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Euro className="w-3.5 h-3.5 text-amber-500" />
                    Jahresstrombedarf
                  </label>
                  <span className="font-mono font-black text-sm text-slate-950">{annualConsumption.toLocaleString('de-DE')} kWh</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="12000"
                  step="250"
                  value={annualConsumption}
                  onChange={(e) => setAnnualConsumption(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>1.500 (Single)</span>
                  <span>4.000 (EFH)</span>
                  <span>12.000 (WP+EV)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Live Output & Key Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Main Key Figures Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
                    Erwarteter Jahresertrag
                  </span>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono mt-1">
                    {results.totalAnnualYieldKwh.toLocaleString('de-DE')}
                    <span className="text-lg font-bold text-amber-400 ml-1.5">kWh/a</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    Spez. Ertrag
                  </span>
                  <div className="text-base font-bold font-mono text-emerald-400">
                    {results.specificYieldKwhPerKwp} <span className="text-xs">kWh/kWp</span>
                  </div>
                </div>
              </div>

              {/* Financial Benefit Highlight */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-300 font-bold">
                  Jährlicher Gesamtvorteil (Ersparnis + Einspeisung)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono mt-1">
                  ~ {results.totalAnnualBenefitEur.toLocaleString('de-DE')} €
                  <span className="text-xs text-slate-300 font-normal ml-1">/ Jahr*</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-amber-500/20 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Vermiedener Netzstrom:</span>
                    <span className="text-white font-bold">{results.selfConsumptionKwh.toLocaleString('de-DE')} kWh (~{results.annualSavingsEur} €)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Einspeiseerlös:</span>
                    <span className="text-white font-bold">{results.feedInKwh.toLocaleString('de-DE')} kWh (~{results.annualFeedInRevenueEur} €)</span>
                  </div>
                </div>
              </div>

              {/* Investment & Amortisation Strip */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 font-mono text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Geschätzte Investition</span>
                  <div className="text-white font-black text-base mt-0.5">
                    ~ {results.estimatedInvestmentEur.toLocaleString('de-DE')} € *
                  </div>
                  <span className="text-[10px] text-slate-400">0% MwSt. Richtwert</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Amortisationsdauer</span>
                  <div className="text-emerald-400 font-black text-base mt-0.5">
                    ~ {results.estimatedPaybackYears} Jahre *
                  </div>
                  <span className="text-[10px] text-slate-400">Ersparnis-Rückfluss</span>
                </div>
              </div>

              {/* Autarky & Self-Consumption Progress Bars */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-300">Autarkiegrad (Netzunabhängigkeit)</span>
                    <span className="font-bold text-emerald-400">{results.autarkyRatePercent} %</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${results.autarkyRatePercent}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-300">Eigenverbrauchsquote des PV-Stroms</span>
                    <span className="font-bold text-amber-400">{results.selfConsumptionRatePercent} %</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full transition-all duration-300"
                      style={{ width: `${results.selfConsumptionRatePercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Micro Metrics Strip */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase">CO2-Einsparung</span>
                  <div className="text-slate-200 font-bold mt-0.5">~ {results.co2SavedKgPerYear.toLocaleString('de-DE')} kg/a</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase">Netzeinspeisung</span>
                  <div className="text-slate-200 font-bold mt-0.5">{results.feedInKwh.toLocaleString('de-DE')} kWh/a</div>
                </div>
              </div>
            </div>

            {/* Model Note Alert */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed font-sans">
              <strong className="text-slate-900 font-bold">* Modellrechnung.</strong> Die tatsächliche Höhe hängt vom individuellen Nutzungsverhalten und den Konditionen des Anbieters ab. Alle Ertragswerte basieren auf physikalischen Näherungsmodellen und langjährigen Globalstrahlungswerten des Deutschen Wetterdienstes (DWD). Individuelle Verschattung, Lastspitzen und Jahreswetter können zu Abweichungen führen.
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Transparency Box: Wie berechnet WattPeak den PV-Ertrag? */}
      {!isEmbed && (
        <CalculationTransparencyBox />
      )}
    </div>
  );
}
