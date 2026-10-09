import React, { useState, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { 
  Battery,
  Share2, Check, Printer, ChevronDown, ChevronUp,
  FolderHeart, TrendingUp, Sliders
} from 'lucide-react';
import { 
  calculateSolarYield, 
  getDefaultFeedInTariff,
  LOCATION_PRESETS, MOUNTING_OPTIONS,
  MountingType, RegionZone, SystemType,
  SolarParams
} from '../utils/solarMath';
import CalculationTransparencyBox from './CalculationTransparencyBox';
import SavedProjectsDrawer from './SavedProjectsDrawer';
import OfferBenchmarkModal from './OfferBenchmarkModal';
import { encodeProjectToQuery, decodeProjectFromQuery } from '../utils/shareUtils';

interface CalculatorProps {
  isEmbed?: boolean;
}

export default function SolarCalculator({ isEmbed = false }: CalculatorProps) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navState = location.state as {
    systemType?: SystemType;
    kwp?: number;
    demand?: number;
    storage?: number;
    mount?: MountingType;
    tilt?: number;
    region?: RegionZone;
  } | null;

  // Modals & Drawers state
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [projectName, setProjectName] = useState<string>('Meine PV-Konfiguration');

  // Check if URL has encoded project payload
  const initialFromUrl = useMemo(() => {
    return decodeProjectFromQuery(location.search);
  }, [location.search]);

  // Primary Inputs
  const [systemType, setSystemType] = useState<SystemType>(() => {
    if (initialFromUrl?.params.systemType) return initialFromUrl.params.systemType;
    if (navState?.systemType) return navState.systemType;
    return 'rooftop';
  });

  const [kwp, setKwp] = useState<number>(() => {
    if (typeof initialFromUrl?.params.kwp === 'number') return initialFromUrl.params.kwp;
    if (typeof navState?.kwp === 'number') return navState.kwp;
    const p = searchParams.get('kwp');
    return p ? parseFloat(p) : 9.6;
  });

  const [region, setRegion] = useState<RegionZone>(() => {
    if (initialFromUrl?.params.region) return initialFromUrl.params.region;
    if (navState?.region) return navState.region;
    const r = searchParams.get('region');
    return (r === 'nord' || r === 'sued') ? r : 'mitte';
  });

  const [locationId, setLocationId] = useState<string>(() => {
    return initialFromUrl?.params.locationId || searchParams.get('loc') || '';
  });

  const [mountingType, setMountingType] = useState<MountingType>(() => {
    if (initialFromUrl?.params.mountingType) return initialFromUrl.params.mountingType;
    if (navState?.mount && navState.mount in MOUNTING_OPTIONS) return navState.mount;
    const m = searchParams.get('mount');
    return (m && m in MOUNTING_OPTIONS) ? (m as MountingType) : 'pitched';
  });

  const [tilt, setTilt] = useState<number>(() => {
    if (typeof initialFromUrl?.params.tilt === 'number') return initialFromUrl.params.tilt;
    if (typeof navState?.tilt === 'number') return navState.tilt;
    const t = searchParams.get('tilt');
    return t ? parseInt(t, 10) : 35;
  });

  const [azimuth, setAzimuth] = useState<number>(() => {
    if (typeof initialFromUrl?.params.azimuth === 'number') return initialFromUrl.params.azimuth;
    const a = searchParams.get('azimuth');
    return a !== null ? parseInt(a, 10) : 0;
  });

  const [cellType, setCellType] = useState<'topcon' | 'hjt' | 'ibc' | 'perc'>(() => {
    if (initialFromUrl?.params.cellType) return initialFromUrl.params.cellType;
    const c = searchParams.get('cell');
    return (c === 'hjt' || c === 'ibc' || c === 'perc') ? c : 'topcon';
  });

  const [shading, setShading] = useState<'none' | 'light' | 'medium'>('none');

  const [annualConsumption, setAnnualConsumption] = useState<number>(() => {
    if (typeof initialFromUrl?.params.annualConsumption === 'number') return initialFromUrl.params.annualConsumption;
    if (typeof navState?.demand === 'number') return navState.demand;
    const ac = searchParams.get('demand');
    return ac ? parseInt(ac, 10) : 4200;
  });

  const [storageKwh, setStorageKwh] = useState<number>(() => {
    if (typeof initialFromUrl?.params.storageKwh === 'number') return initialFromUrl.params.storageKwh;
    if (typeof navState?.storage === 'number') return navState.storage;
    const s = searchParams.get('storage');
    return s ? parseFloat(s) : 7.5;
  });

  // Editable Assumptions
  const [electricityPrice, setElectricityPrice] = useState<number>(() => {
    if (typeof initialFromUrl?.params.electricityPrice === 'number') return initialFromUrl.params.electricityPrice;
    return 0.36; // 36 Cent / kWh
  });

  const [feedInTariff, setFeedInTariff] = useState<number>(() => {
    if (typeof initialFromUrl?.params.feedInTariff === 'number') return initialFromUrl.params.feedInTariff;
    return getDefaultFeedInTariff(7.5, 'rooftop', 'eeg_partial'); // 7,70 ct / kWh (BNetzA Stand August–Dezember 2026)
  });

  const [customInvestmentEur, setCustomInvestmentEur] = useState<number | undefined>(() => {
    return initialFromUrl?.params.customInvestmentEur;
  });

  // Update defaults when location preset changes
  const handleLocationPresetChange = (locId: string) => {
    setLocationId(locId);
    if (locId) {
      const preset = LOCATION_PRESETS.find(l => l.id === locId);
      if (preset) setRegion(preset.region);
    }
  };

  const handleMountingChange = (newMount: MountingType) => {
    setMountingType(newMount);
    setTilt(MOUNTING_OPTIONS[newMount].defaultTilt);
  };

  // Load a saved project from LocalStorage
  const handleLoadSavedProject = (p: SolarParams, name?: string) => {
    if (p.systemType) setSystemType(p.systemType);
    if (typeof p.kwp === 'number') setKwp(p.kwp);
    if (p.region) setRegion(p.region);
    if (p.locationId) setLocationId(p.locationId);
    if (p.mountingType) setMountingType(p.mountingType);
    if (typeof p.tilt === 'number') setTilt(p.tilt);
    if (typeof p.azimuth === 'number') setAzimuth(p.azimuth);
    if (p.cellType) setCellType(p.cellType);
    if (typeof p.annualConsumption === 'number') setAnnualConsumption(p.annualConsumption);
    if (typeof p.storageKwh === 'number') setStorageKwh(p.storageKwh);
    if (typeof p.electricityPrice === 'number') setElectricityPrice(p.electricityPrice);
    if (typeof p.feedInTariff === 'number') setFeedInTariff(p.feedInTariff);
    if (typeof p.customInvestmentEur === 'number') setCustomInvestmentEur(p.customInvestmentEur);
    if (name) setProjectName(name);
  };

  // Construct current params bundle
  const currentParams: SolarParams = useMemo(() => ({
    systemType,
    kwp,
    region,
    locationId: locationId || undefined,
    mountingType,
    tilt,
    azimuth,
    cellType,
    shading,
    annualConsumption,
    storageKwh,
    electricityPrice,
    feedInTariff,
    customInvestmentEur
  }), [systemType, kwp, region, locationId, mountingType, tilt, azimuth, cellType, shading, annualConsumption, storageKwh, electricityPrice, feedInTariff, customInvestmentEur]);

  // Calculate result using Unified Math Engine
  const result = useMemo(() => {
    return calculateSolarYield(currentParams);
  }, [currentParams]);

  // Share Link generator
  const handleShareLink = () => {
    const encoded = encodeProjectToQuery(currentParams, projectName);
    const fullUrl = `${window.location.origin}/ertragsrechner?p=${encoded}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="rechner" className="space-y-8 print:p-0">
      
      {/* Action Toolbar: Save, Share, Print & Benchmark */}
      {!isEmbed && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 p-3 sm:p-4 rounded-2xl shadow-xs print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-slate-700">
              Modul-STC: DIN EN IEC 60904-3 &middot; EEG-Stand: August–Dezember 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSavedDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl transition cursor-pointer"
            >
              <FolderHeart className="w-3.5 h-3.5 text-amber-600" />
              <span>Mein Solarprojekt</span>
            </button>

            <button
              type="button"
              onClick={handleShareLink}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl transition cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-600" />}
              <span>{copiedLink ? 'Link kopiert!' : 'Teilen'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Drucken / PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input Controls */}
        <div className="lg:col-span-6 space-y-6 print:hidden">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* System Type Selector (3 Clean Entries) */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Anlagentyp
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setSystemType('balcony');
                    if (kwp > 2.0) setKwp(0.88);
                    if (storageKwh > 3.0) setStorageKwh(1.6);
                    setMountingType('facade_balcony');
                    setTilt(85);
                  }}
                  className={`py-2 px-2 text-xs font-extrabold rounded-xl transition cursor-pointer ${
                    systemType === 'balcony' 
                      ? 'bg-white text-slate-950 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  Balkonkraftwerk
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSystemType('rooftop');
                    if (kwp < 3.0) setKwp(9.6);
                    if (storageKwh < 4.0) setStorageKwh(7.5);
                    setMountingType('pitched');
                    setTilt(35);
                  }}
                  className={`py-2 px-2 text-xs font-extrabold rounded-xl transition cursor-pointer ${
                    systemType === 'rooftop' 
                      ? 'bg-white text-slate-950 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  Dachanlage
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSystemType('retrofit_storage');
                    if (kwp < 3.0) setKwp(8.0);
                    if (storageKwh === 0) setStorageKwh(7.5);
                  }}
                  className={`py-2 px-2 text-xs font-extrabold rounded-xl transition cursor-pointer ${
                    systemType === 'retrofit_storage' 
                      ? 'bg-white text-slate-950 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  Speichernachrüstung
                </button>
              </div>
            </div>

            {/* Slider 1: Module Power (kWp) */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {systemType === 'balcony' ? 'Modulleistung (Wp)' : 'Anlagenleistung (kWp)'}
                </label>
                <span className="font-mono font-black text-lg text-slate-950">
                  {systemType === 'balcony' ? `${Math.round(kwp * 1000)} Wp` : `${kwp.toFixed(1)} kWp`}
                </span>
              </div>
              <input
                type="range"
                min={systemType === 'balcony' ? 0.4 : 2.0}
                max={systemType === 'balcony' ? 2.0 : 25.0}
                step={systemType === 'balcony' ? 0.04 : 0.4}
                value={kwp}
                onChange={(e) => setKwp(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>{systemType === 'balcony' ? '400 Wp (1 Modul)' : '2 kWp (Garage)'}</span>
                <span>{systemType === 'balcony' ? '2.000 Wp (Solarpaket I Limit)' : '25 kWp (Großdach)'}</span>
              </div>
            </div>

            {/* Slider 2: Annual Demand (kWh) */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Jahresstromverbrauch (kWh/a)
                </label>
                <span className="font-mono font-black text-lg text-slate-950">
                  {annualConsumption.toLocaleString('de-DE')} kWh
                </span>
              </div>
              <input
                type="range"
                min={1200}
                max={12000}
                step={100}
                value={annualConsumption}
                onChange={(e) => setAnnualConsumption(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>1.500 kWh (1–2 Pers.)</span>
                <span>4.000 kWh (Familie)</span>
                <span>8.000+ kWh (WP/E-Auto)</span>
              </div>
            </div>

            {/* Slider 3: Battery Storage (kWh) */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <div className="flex items-center gap-1.5">
                  <Battery className="w-3.5 h-3.5 text-emerald-600" />
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Nutzbarer Batteriespeicher (kWh)
                  </label>
                </div>
                <span className="font-mono font-black text-lg text-slate-950">
                  {storageKwh === 0 ? 'Ohne Speicher' : `${storageKwh.toFixed(1)} kWh`}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={systemType === 'balcony' ? 3.2 : 20.0}
                step={systemType === 'balcony' ? 0.4 : 0.5}
                value={storageKwh}
                onChange={(e) => setStorageKwh(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>0 kWh (Direktverbrauch)</span>
                <span>{systemType === 'balcony' ? '1,6 kWh (Standard)' : '7,5–10 kWh (Haus)'}</span>
                <span>{systemType === 'balcony' ? '3,2 kWh' : '20 kWh'}</span>
              </div>
            </div>

            {/* Location / Region Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Standort / Region
                </label>
                <select
                  value={locationId}
                  onChange={(e) => handleLocationPresetChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="">Großregion Mitte (~1.080 kWh/m²)</option>
                  {LOCATION_PRESETS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.annualRadiationKwhM2} kWh/m²)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Dachart &amp; Montage
                </label>
                <select
                  value={mountingType}
                  onChange={(e) => handleMountingChange(e.target.value as MountingType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {Object.entries(MOUNTING_OPTIONS).map(([key, opt]) => (
                    <option key={key} value={key}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Collapsible Advanced Settings (Progressive Disclosure) */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-slate-950 py-2 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-amber-600" />
                  <span>Erweiterte Parameter (Zelltechnik, Strompreis, Vergütung)</span>
                </div>
                {showAdvancedSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showAdvancedSettings && (
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Dachneigung (°)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={90}
                        value={tilt}
                        onChange={(e) => setTilt(parseInt(e.target.value, 10) || 0)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Ausrichtung (Azimut)
                      </label>
                      <select
                        value={azimuth}
                        onChange={(e) => setAzimuth(parseInt(e.target.value, 10))}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      >
                        <option value={-90}>Ost (-90°)</option>
                        <option value={-45}>Süd-Ost (-45°)</option>
                        <option value={0}>Süd (0° optimal)</option>
                        <option value={45}>Süd-West (+45°)</option>
                        <option value={90}>West (+90°)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Zelltechnologie
                      </label>
                      <select
                        value={cellType}
                        onChange={(e) => setCellType(e.target.value as any)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      >
                        <option value="topcon">N-Type TOPCon (-0,30%/K)</option>
                        <option value="hjt">Heterojunction HJT (-0,26%/K)</option>
                        <option value="ibc">Back-Contact IBC (-0,28%/K)</option>
                        <option value="perc">P-Type PERC (-0,36%/K)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Strompreis Arbeitspreis (€/kWh)
                      </label>
                      <input
                        type="number"
                        step={0.01}
                        min={0.20}
                        max={0.70}
                        value={electricityPrice}
                        onChange={(e) => setElectricityPrice(parseFloat(e.target.value) || 0.36)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Einspeisevergütung (€/kWh)
                      </label>
                      <input
                        type="number"
                        step={0.001}
                        min={0.00}
                        max={0.15}
                        value={feedInTariff}
                        onChange={(e) => setFeedInTariff(parseFloat(e.target.value) || 0.0)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Verschattung
                    </label>
                    <div className="flex gap-2">
                      {[
                        { id: 'none', label: 'Keine (100 %)' },
                        { id: 'light', label: 'Leicht (Gaube / Baum ~90 %)' },
                        { id: 'medium', label: 'Mittel (~78 %)' }
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setShading(s.id as any)}
                          className={`flex-1 text-[11px] py-1.5 rounded-lg border font-semibold transition cursor-pointer ${
                            shading === s.id ? 'bg-amber-500 border-amber-600 text-slate-950 font-bold' : 'bg-white border-slate-300 text-slate-700'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Results & Energy Balance Dashboard */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Main Results Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Header with Project Title */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  Ergebnis-Kalkulation
                </span>
                <h3 className="font-black text-xl text-slate-950 mt-1">{projectName}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-mono block">Spezifischer Ertrag</span>
                <strong className="font-mono text-base font-black text-slate-900">
                  {result.physics.specificYieldKwhPerKwp} kWh/kWp
                </strong>
              </div>
            </div>

            {/* 4 Core Metric KPI Blocks */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">Jahresertrag</span>
                <div className="text-2xl font-black text-slate-950 font-mono mt-0.5">
                  {result.balance.totalAnnualYieldKwh.toLocaleString('de-DE')} <span className="text-sm font-semibold">kWh/a</span>
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">
                  CO₂-Vermeidung: {result.economy.co2SavedKgPerYear} kg/a
                </span>
              </div>

              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80">
                <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase">Autarkiegrad</span>
                <div className="text-2xl font-black text-emerald-950 font-mono mt-0.5">
                  {result.balance.autarkyRatePercent} %
                </div>
                <span className="text-[10px] text-emerald-700 block mt-1">
                  Eigenversorgungs-Anteil
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">Eigenverbrauchsquote</span>
                  <span className="text-[10px] font-mono text-slate-400">Nutzbar</span>
                </div>
                <div className="text-2xl font-black text-slate-950 font-mono mt-0.5">
                  {result.balance.usableSelfConsumptionRatePercent} %
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">
                  {result.balance.totalSelfUsedKwh.toLocaleString('de-DE')} kWh vor Ort genutzt
                  {result.balance.storageLossKwh > 0 && ` · PV-Nutzung inkl. Verluste: ${result.balance.generationUtilizationRatePercent} %`}
                </span>
              </div>

              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80">
                <span className="text-[11px] font-mono font-bold text-amber-900 uppercase">Wirtschaftl. Vorteil</span>
                <div className="text-2xl font-black text-amber-950 font-mono mt-0.5">
                  {result.economy.annualNetBenefitEur.toLocaleString('de-DE')} <span className="text-sm font-semibold">€/a</span>
                </div>
                <span className="text-[10px] text-amber-800 block mt-1">
                  Ersparnis + Erlös abzgl. Kosten
                </span>
              </div>
            </div>

            
            {/* Silo-Structure Contextual Hardware Link */}
            {systemType === "balcony" && (
              <div className="mt-4 mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-300 flex items-center justify-between gap-4 group">
                <div>
                  <h5 className="text-sm font-black text-amber-950">Passendes 800W-Set gesucht?</h5>
                  <p className="text-xs text-amber-800 mt-1">Vergleiche 800W Komplettsets und Speicher, die genau zu diesem Ertrag passen.</p>
                </div>
                <a href="/hardware-katalog" className="shrink-0 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-4 py-2 rounded-xl text-xs transition">
                  Zum Hardware-Katalog →
                </a>
              </div>
            )}
            {systemType === "rooftop" && (
              <div className="mt-4 mb-6 p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 group">
                <div>
                  <h5 className="text-sm font-black text-white">Dachanlage konfigurieren?</h5>
                  <p className="text-xs text-slate-400 mt-1">Finde die passenden Wechselrichter und Speicher für deine Hausanlage.</p>
                </div>
                <a href="/hardware-katalog" className="shrink-0 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-4 py-2 rounded-xl text-xs transition">
                  System-Hardware prüfen →
                </a>
              </div>
            )}

            {/* Detailed Energy Flow Balance (Closed Equations) */}
            <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono">
                Geschlossene Energiebilanz (kWh/a)
              </h4>

              <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 font-mono text-[11px]">
                <div className="flex justify-between pb-1 border-b border-slate-200">
                  <span className="text-slate-600">Direktverbrauch tagsüber:</span>
                  <strong className="text-slate-900">{result.balance.directConsumptionKwh.toLocaleString('de-DE')} kWh</strong>
                </div>
                {result.balance.storageChargeKwh > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">In Speicher geladen:</span>
                      <strong className="text-emerald-900">{result.balance.storageChargeKwh.toLocaleString('de-DE')} kWh</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Aus Speicher genutzt:</span>
                      <strong className="text-emerald-900">{result.balance.storageDischargeKwh.toLocaleString('de-DE')} kWh</strong>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-slate-200 text-slate-400">
                      <span>Speicherverluste (Wärme/BMS ~12%):</span>
                      <span>{result.balance.storageLossKwh} kWh</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Netzeinspeisung:</span>
                  <strong className="text-slate-900">
                    {result.balance.feedInKwh.toLocaleString('de-DE')} kWh 
                    {systemType === 'balcony' && ' (unentgeltlich)'}
                  </strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 text-slate-800">
                  <span>Verbleibender Netzbezug:</span>
                  <strong>{result.balance.gridPurchaseKwh.toLocaleString('de-DE')} kWh</strong>
                </div>
              </div>
            </div>

            {/* Investment & Amortisation */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Geschätzte Investition</span>
                  <div className="text-xl font-black font-mono mt-0.5 text-white">
                    ca. {result.economy.estimatedInvestmentEur.toLocaleString('de-DE')} € *
                  </div>
                  {result.economy.isInvestmentCustom && (
                    <span className="text-[10px] text-amber-400 font-mono">Eigener Angebotspreis</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Amortisation</span>
                  <div className="text-lg font-black font-mono mt-0.5 text-amber-400">
                    {result.economy.estimatedPaybackYears ? `ca. ${result.economy.estimatedPaybackYears} Jahre` : '> 25 Jahre'}
                  </div>
                </div>
              </div>

              {/* Handwerker-Angebots-Checker CTA (für Dachanlagen) */}
              {systemType !== 'balcony' && (
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(true)}
                  className="w-full bg-slate-800 hover:bg-slate-750 border border-slate-700 text-amber-300 font-bold text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Eigenes Handwerker-Angebot vergleichen</span>
                </button>
              )}
            </div>

            {/* With vs Without Storage Benchmark Table */}
            {storageKwh > 0 && (
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-emerald-950 font-black">Isolierter Mehrwert des Speichers:</strong>
                  <span className="font-mono text-emerald-800 text-[11px]">
                    ca. {result.storageDelta.annualStorageCycles} Zyklen/a
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/60">
                    <span className="text-slate-500 block text-[9px] uppercase">Zusatz-Eigenverbrauch</span>
                    <strong className="text-emerald-900 text-sm">+{result.storageDelta.additionalSelfUsedKwh} kWh/a</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/60">
                    <span className="text-slate-500 block text-[9px] uppercase">Mehrersparnis / Jahr</span>
                    <strong className="text-emerald-900 text-sm">+{result.storageDelta.additionalAnnualSavingsEur} €/a</strong>
                  </div>
                </div>
                <div className="text-[10px] text-slate-600 leading-relaxed pt-1">
                  Autarkie steigt von {result.withoutStorageBenchmark.autarkyRatePercent} % (ohne Speicher) auf {result.balance.autarkyRatePercent} % (mit Speicher).
                </div>
              </div>
            )}

            <div className="text-[10px] text-slate-500 font-mono leading-relaxed">
              * Modellrechnung nach DIN EN IEC 60904-3 und DWD-Globalstrahlung. Alle Ertragswerte sind unverbindliche Näherungswerte. Keine Rechts- oder Steuerberatung.
            </div>

          </div>
        </div>

      </div>

      {/* PRINT-ONLY CLEAN LAYOUT (Hidden on screen, perfectly formatted on paper / PDF export) */}
      <div className="hidden print:block space-y-6 text-slate-900 font-sans">
        <div className="border-b-2 border-slate-900 pb-4">
          <h1 className="text-2xl font-black">WattPeak Solar-Ertragsberechnung &amp; Systemauslegung</h1>
          <div className="text-xs font-mono text-slate-500 mt-1">
            Projekt: {projectName} &middot; Erstellt am: {new Date().toLocaleDateString('de-DE')} &middot; Modell: WattPeak v2.5 (DIN EN IEC 60904-3 / DWD)
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div className="border border-slate-300 p-3 rounded-lg">
            <h3 className="font-bold uppercase text-[11px] mb-2">Eingabewerte:</h3>
            <ul className="space-y-1">
              <li>Anlagenleistung: {kwp} kWp</li>
              <li>Speicherkapazität: {storageKwh} kWh</li>
              <li>Jahresstrombedarf: {annualConsumption} kWh</li>
              <li>Dachneigung / Azimut: {tilt}° / {azimuth}°</li>
              <li>Zelltechnologie: {cellType.toUpperCase()}</li>
              <li>Strompreis: {electricityPrice} €/kWh</li>
            </ul>
          </div>
          <div className="border border-slate-300 p-3 rounded-lg">
            <h3 className="font-bold uppercase text-[11px] mb-2">Berechnete Ergebnisse:</h3>
            <ul className="space-y-1">
              <li>Jahresertrag: {result.balance.totalAnnualYieldKwh} kWh/a</li>
              <li>Eigenverbrauch gesamt: {result.balance.totalSelfUsedKwh} kWh/a</li>
              <li>Netzeinspeisung: {result.balance.feedInKwh} kWh/a</li>
              <li>Autarkiegrad: {result.balance.autarkyRatePercent} %</li>
              <li>Eigenverbrauchsquote: {result.balance.selfConsumptionRatePercent} %</li>
              <li>Netto-Vorteil / Jahr: ca. {result.economy.annualNetBenefitEur} €</li>
              <li>Amortisation: {result.economy.paybackStatusText}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* MODALS & DRAWERS */}
      <SavedProjectsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        currentParams={currentParams}
        onLoadProject={handleLoadSavedProject}
      />

      <OfferBenchmarkModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        currentKwp={kwp}
        currentStorageKwh={storageKwh}
        currentAnnualBenefitEur={result.economy.annualNetBenefitEur}
        onApplyCustomPrice={(priceEur) => setCustomInvestmentEur(priceEur)}
      />

      {/* 9-Faktoren Transparenzbereich */}
      {!isEmbed && <CalculationTransparencyBox />}
    </div>
  );
}
