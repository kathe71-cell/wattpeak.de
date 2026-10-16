import React, { useState } from 'react';
import { 
  FileCheck, 
  Info, 
  CheckCircle2, 
  Calculator,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sliders,
  MapPin
} from 'lucide-react';
import { evaluatePvOffer, OfferPlausibilityResult } from '../utils/offerEvaluation';
import { LOCATION_PRESETS, RegionZone } from '../utils/solarMath';

export interface ScopeItem {
  id: string;
  label: string;
  hint: string;
  status: 'included' | 'missing' | 'unclear';
}

const DEFAULT_SCOPE_ITEMS: ScopeItem[] = [
  { id: 'scaffold', label: 'Gerüst & Absturzsicherung', hint: 'Aufbau, Vorhaltung und Abbau nach UVV', status: 'unclear' },
  { id: 'dc_mount', label: 'DC-Dachmontage & Unterkonstruktion', hint: 'Dachhaken, Schienen, Modulmontage und DC-Verkabelung', status: 'included' },
  { id: 'inverter', label: 'Wechselrichter & DC-Freischalter', hint: 'Montage, Erdung und AC-Zuleitung', status: 'included' },
  { id: 'ac_grid', label: 'AC-Anschluss & Zählerschrank', hint: 'Einbau SLS, ÜSS (Überspannungsschutz) und FI-Schutzschalter', status: 'unclear' },
  { id: 'grid_reg', label: 'Netzbetreiber-Anmeldung (VNB)', hint: 'Fertigmeldung und Inbetriebsetzungsprotokoll durch konzessionierten Elektriker', status: 'unclear' },
  { id: 'mastr', label: 'MaStR-Registrierung', hint: 'Eintragung im Marktstammdatenregister der Bundesnetzagentur', status: 'unclear' },
  { id: 'docu', label: 'Dokumentation & Messprotokolle', hint: 'Strangmessung (Leerlaufspannung, Isolationswiderstand) nach DIN EN 62446-1', status: 'unclear' }
];

export interface OfferBenchmarkProps {
  initialKwp?: number;
  initialStorageKwh?: number;
  initialOfferPriceEur?: number;
  onApplyToCalculator?: (params: { kwp: number; storageKwh: number; customInvestmentEur: number; locationId?: string }) => void;
  className?: string;
}

export default function PvOfferBenchmark({
  initialKwp = 9.6,
  initialStorageKwh = 7.5,
  initialOfferPriceEur = 18500,
  onApplyToCalculator,
  className = ''
}: OfferBenchmarkProps) {
  // Primary Inputs
  const [kwp, setKwp] = useState<number>(initialKwp);
  const [storageKwh, setStorageKwh] = useState<number>(initialStorageKwh);
  const [offerPriceEur, setOfferPriceEur] = useState<number>(initialOfferPriceEur);
  const [taxRatePercent, setTaxRatePercent] = useState<number>(0); // 0% (Wohngebäude § 12 Abs. 3 UStG) oder 19%
  const [offeredYieldKwh, setOfferedYieldKwh] = useState<string>('');

  // Optional Standort- & Anlagendetails (Wiederverwendung Unified Math Engine)
  const [locationId, setLocationId] = useState<string>('');
  const [tilt, setTilt] = useState<number>(35);
  const [azimuth, setAzimuth] = useState<number>(0);
  const [showDetailedParameters, setShowDetailedParameters] = useState<boolean>(false);

  // Scope Checklist
  const [scopeItems, setScopeItems] = useState<ScopeItem[]>(DEFAULT_SCOPE_ITEMS);
  const [showScopeCheck, setShowScopeCheck] = useState<boolean>(false);

  // Zentrale Auswertung über Unified Math Engine
  const evaluation: OfferPlausibilityResult = evaluatePvOffer({
    kwp,
    storageKwh,
    totalOfferPriceEur: offerPriceEur,
    taxRatePercent,
    locationId: locationId || undefined,
    tilt: showDetailedParameters ? tilt : undefined,
    azimuth: showDetailedParameters ? azimuth : undefined,
    offeredAnnualYieldKwh: offeredYieldKwh ? Number(offeredYieldKwh) : undefined
  });

  // Scope status counters
  const includedCount = scopeItems.filter(i => i.status === 'included').length;
  const unclearCount = scopeItems.filter(i => i.status === 'unclear').length;

  const handleScopeStatusToggle = (id: string) => {
    setScopeItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const nextStatus = item.status === 'unclear' ? 'included' : item.status === 'included' ? 'missing' : 'unclear';
      return { ...item, status: nextStatus };
    }));
  };

  const handleReset = () => {
    setKwp(initialKwp);
    setStorageKwh(initialStorageKwh);
    setOfferPriceEur(initialOfferPriceEur);
    setTaxRatePercent(0);
    setOfferedYieldKwh('');
    setLocationId('');
    setTilt(35);
    setAzimuth(0);
    setShowDetailedParameters(false);
    setScopeItems(DEFAULT_SCOPE_ITEMS);
  };

  return (
    <div id="angebotscheck" className={`bg-white rounded-3xl border-2 border-slate-900 shadow-xl overflow-hidden scroll-mt-24 ${className}`}>
      
      {/* Component Header with Engineering Clean 2.0 Instrumentation Look */}
      <div className="bg-slate-950 text-white p-6 sm:p-9 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-dark opacity-30"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider border border-slate-800">
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span>WATTPEAK KERNWERKZEUG · 3-STUFEN-AUDIT</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-sans">
              PV-Angebots-Check
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Tragen Sie die Kernwerte Ihres Handwerker-Angebots ein. Wir berechnen den reinen kWp-Kostenkennwert, 
              plausibilisieren die Ertragsprognose gegen die Wattpeak Unified Math Engine (DIN EN IEC 60904-3) 
              und prüfen typische Kostenfallen im Leistungsumfang – neutral, werbefrei und ohne Registrierung.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3.5 py-2.5 rounded-xl transition cursor-pointer shadow-sm"
              title="Auf Standardwerte zurücksetzen"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>ZURÜCKSETZEN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs on the Left, 3-Tier Classification on the Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
        
        {/* LEFT COLUMN: Input Parameters */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                1. Angaben aus Ihrem Angebot
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Keine Registrierung</span>
            </div>

            {/* Input: Angebotspreis & Steuer-Differenzierung */}
            <div>
              <div className="flex justify-between items-baseline mb-1.5">
                <label className="text-xs font-bold text-slate-900 uppercase">
                  Angebotspreis (Rechnungsbetrag)
                </label>
                <span className="text-[11px] font-mono text-slate-500">schlüsselfertig</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={120000}
                  step={250}
                  value={offerPriceEur}
                  onChange={(e) => setOfferPriceEur(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-black text-slate-950 font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="z.B. 18500"
                />
                <span className="absolute right-3.5 top-2.5 text-base font-black text-slate-500">€</span>
              </div>

              {/* Steuerliche Einordnung (Wahlmöglichkeit des im Angebot ausgewiesenen USt-Satzes) */}
              <div className="mt-2.5 flex items-center justify-between gap-2 p-2 bg-white rounded-xl border border-slate-200 text-xs">
                <span className="text-slate-700 font-semibold text-[11px]">Ausgewiesene USt im Angebot:</span>
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => setTaxRatePercent(0)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                      taxRatePercent === 0 
                        ? 'bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs' 
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    0 % USt
                  </button>
                  <button
                    type="button"
                    onClick={() => setTaxRatePercent(19)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                      taxRatePercent === 19 
                        ? 'bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs' 
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    19 % USt
                  </button>
                </div>
              </div>
            </div>

            {/* Input: Anlagenleistung & Speicher */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1.5">
                  Anlagenleistung (kWp)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0.1}
                    max={100}
                    step={0.1}
                    value={kwp}
                    onChange={(e) => setKwp(Math.max(0.1, Number(e.target.value)))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-black text-slate-950 font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="z.B. 9.6"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-bold text-slate-500 font-mono">kWp</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1.5">
                  Speicherkapazität (kWh)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={50}
                    step={0.5}
                    value={storageKwh}
                    onChange={(e) => setStorageKwh(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-black text-slate-950 font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="0 wenn ohne Speicher"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-bold text-slate-500 font-mono">kWh</span>
                </div>
              </div>
            </div>

            {/* Optional Input: Vom Anbieter prognostizierter Jahresertrag */}
            <div className="pt-2 border-t border-slate-200">
              <div className="flex justify-between items-baseline mb-1">
                <label className="text-xs font-bold text-slate-800 uppercase">
                  Vom Anbieter prognostizierter Ertrag (optional)
                </label>
                <span className="text-[10px] text-slate-500 font-mono">kWh/Jahr</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min={100}
                  max={150000}
                  step={100}
                  value={offeredYieldKwh}
                  onChange={(e) => setOfferedYieldKwh(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-950 font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="z.B. 9800 kWh/Jahr aus dem Angebot"
                />
                <span className="absolute right-3 top-2 text-xs font-mono text-slate-400">kWh/a</span>
              </div>
            </div>

            {/* Optional: Standort- & Dachdaten für standortbezogene Plausibilisierung */}
            <div className="pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowDetailedParameters(!showDetailedParameters)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-800 hover:text-slate-950 py-1 cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Standort &amp; Dachneigung angeben (für standortbezogenen Check)</span>
                </div>
                {showDetailedParameters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showDetailedParameters && (
                <div className="mt-3 p-3.5 bg-white rounded-xl border border-slate-200 space-y-3 animate-in fade-in duration-150 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Standort / Region (DWD-Globalstrahlung)
                    </label>
                    <select
                      value={locationId}
                      onChange={(e) => setLocationId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-900"
                    >
                      <option value="">Standard (Mitteldeutschland ~1.080 kWh/m²)</option>
                      {LOCATION_PRESETS.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name} ({loc.annualRadiationKwhM2} kWh/m²)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Dachneigung (°)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={90}
                        value={tilt}
                        onChange={(e) => setTilt(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Ausrichtung (Azimut)
                      </label>
                      <select
                        value={azimuth}
                        onChange={(e) => setAzimuth(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      >
                        <option value={-90}>Ost (-90°)</option>
                        <option value={-45}>Süd-Ost (-45°)</option>
                        <option value={0}>Süd (0°)</option>
                        <option value={45}>Süd-West (+45°)</option>
                        <option value={90}>West (+90°)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scope of Delivery Checklist Toggle */}
            <div className="pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowScopeCheck(!showScopeCheck)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-800 hover:text-slate-950 py-1.5 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Checkliste Leistungsumfang ({includedCount} enthalten, {unclearCount} unklar)</span>
                </div>
                {showScopeCheck ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showScopeCheck && (
                <div className="mt-3 space-y-2 pt-2 border-t border-slate-200 animate-in fade-in duration-150">
                  <p className="text-[11px] text-slate-600 mb-2">
                    Klären Sie vor Vertragsunterschrift ab, welche Nebenarbeiten im Festpreis enthalten sind:
                  </p>
                  {scopeItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-start justify-between gap-3 p-2 bg-white rounded-xl border border-slate-200 text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{item.label}</div>
                        <div className="text-[10px] text-slate-500">{item.hint}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleScopeStatusToggle(item.id)}
                        className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold cursor-pointer transition ${
                          item.status === 'included' 
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                            : item.status === 'missing'
                            ? 'bg-red-100 text-red-900 border border-red-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {item.status === 'included' && 'Enthalten'}
                        {item.status === 'missing' && 'Nicht enthalten'}
                        {item.status === 'unclear' && 'Unklar / Prüfen'}
                      </button>
                    </div>
                  ))}
                  <p className="text-[10px] text-slate-400 mt-1 italic">
                    Hinweis: Eine nicht ausdrücklich genannte Position bedeutet nicht zwingend ein Fehlen. Klären Sie unklare Punkte vor Vertragsunterschrift schriftlich ab.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3-TIER CLASSIFICATION RESULTS */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* TIER 1: RECHNERISCHE KENNZAHLEN (BERECHNET) */}
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-900 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-250 pb-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-950 bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-md">
                Kategorie 1: Rechnerisch abgeleitet
              </span>
              <span className="text-[11px] font-mono text-slate-500">Exakte Mathematik</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 text-white p-4 rounded-2xl border border-slate-800 shadow-inner">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Rechn. Gesamtpreis je kWp
                </span>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono-numbers tracking-tight mt-1">
                  {evaluation.rawPricePerKwp.toLocaleString('de-DE')} € <span className="text-xs text-slate-400 font-sans font-semibold">/ kWp</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1.5 font-mono">
                  Inkl. Montage, PV {evaluation.safeStorageKwh > 0 ? `+ ${evaluation.safeStorageKwh} kWh Speicher` : ''}
                </span>
              </div>

              <div className="bg-slate-950 text-white p-4 rounded-2xl border border-slate-800 shadow-inner">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Speicher-zu-PV Verhältnis
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono-numbers tracking-tight mt-1">
                  {evaluation.safeStorageKwh > 0 ? `${evaluation.storageToPvRatio}` : '0,00'} <span className="text-xs text-amber-400 font-mono">kWh/kWp</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1.5 font-mono">
                  {evaluation.safeStorageKwh > 0 ? `${evaluation.safeStorageKwh} kWh an ${evaluation.safeKwp} kWp` : 'Reiner Direktverbrauch'}
                </span>
              </div>
            </div>

            {/* Factual Tax note with technical typography */}
            <div className="text-[11px] text-slate-700 leading-relaxed font-mono bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-0.5">Steuerlicher Ausweis:</span>
              {evaluation.taxNote}
            </div>
          </div>

          {/* TIER 2: PLAUSIBILISIERTE ERTRAGS- & AUSLEGUNGSMETRIKEN */}
          <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Kategorie 2: Plausibilisiert
              </span>
              <span className="text-[11px] font-mono text-emerald-700">
                Unified Math Engine ({evaluation.yieldStatus === 'standort_plausibilisiert' ? 'Standortbezogen' : 'Grobe Orientierung'})
              </span>
            </div>

            {/* Referenzertrag aus der Engine */}
            <div className="bg-white p-3.5 rounded-xl border border-emerald-200/70 text-xs space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-slate-900">Referenzertrag ({evaluation.safeKwp} kWp):</span>
                <span className="font-mono font-black text-emerald-950">
                  ca. {evaluation.engineCalculatedAnnualYieldKwh.toLocaleString('de-DE')} kWh/a
                </span>
              </div>
              <div className="text-[11px] text-slate-600">
                Spezifischer Ertrag: {evaluation.engineSpecificYieldKwhPerKwp} kWh/kWp
              </div>
            </div>

            {/* Spezifisches Ertragsfeedback (wenn angegeben) */}
            <div className="bg-white p-3.5 rounded-xl border border-emerald-200/70 text-xs leading-relaxed text-slate-800">
              <span className="font-bold block mb-1">Ertrags-Plausibilisierung:</span>
              <p className="text-[11px] text-slate-700">{evaluation.yieldEvaluationNote}</p>
            </div>

            {/* Speicher Auslegungs-Hinweis */}
            {evaluation.storageDimensionNote && (
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200/70 text-[11px] text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-0.5">Speicher-Dimensionierung:</span>
                {evaluation.storageDimensionNote}
              </div>
            )}
          </div>

          {/* TIER 3: NICHT BEWERTBAR (TRANSPARENTE GRENZEN) */}
          <div className="bg-slate-100 p-4 rounded-2xl border border-slate-300 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Info className="w-4 h-4 text-slate-600" />
              <span>Kategorie 3: Was diese Analyse seriös nicht bewerten kann</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 leading-relaxed">
              {evaluation.unratedAspects.map((aspect, idx) => (
                <li key={idx}>{aspect}</li>
              ))}
            </ul>
          </div>

          {/* Action: Übergabe an den Ertragsrechner */}
          {onApplyToCalculator && (
            <button
              type="button"
              onClick={() => onApplyToCalculator({ 
                kwp: evaluation.safeKwp, 
                storageKwh: evaluation.safeStorageKwh, 
                customInvestmentEur: evaluation.safePriceEur,
                locationId: locationId || undefined
              })}
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-850 active:scale-95 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-sm transition cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Diesen Angebotspreis im Ertragsrechner detailliert durchrechnen →</span>
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
