import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Calculator,
  ShoppingCart,
  Layers,
  Sun,
  Home as HomeIcon,
  Battery,
  Sparkles,
  Zap,
  FileCheck
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SolarSystemDecoder from '../components/SolarSystemDecoder';
import SolarComparisonCatalog from '../components/SolarComparisonCatalog';
import SolarCalculator from '../components/Calculator';
import BalkonSimulator from '../components/BalkonSimulator';
import PvOfferBenchmark from '../components/PvOfferBenchmark';
import PositionZeroBox from '../components/PositionZeroBox';
import TechComparisonTable from '../components/TechComparisonTable';
import LegalFaq from '../components/LegalFaq';
import TrustBox from '../components/TrustBox';
import { useDocumentMeta } from '../utils/seo';

export default function Home() {
  const navigate = useNavigate();

  useDocumentMeta({
    title: 'Wattpeak · Solar verstehen. Besser entscheiden.',
    description: 'Unabhängige Solar-Entscheidungsplattform: 800W Balkonkraftwerke, Haus-Dachanlagen und Speichernachrüstung berechnen, vergleichen und objektiv bewerten.',
    canonicalPath: '/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Wattpeak.de',
      url: 'https://www.wattpeak.de/',
      description: 'Solar verstehen. Besser entscheiden. Unabhängige Solar-Entscheidungsplattform für Balkonkraftwerke, Dachanlagen und Speicher.',
    },
  });

  // Forward legacy hash fragments to clean URL routes
  useEffect(() => {
    if (window.location.hash === '#rechner') {
      navigate('/ertragsrechner', { replace: true });
    } else if (window.location.hash === '#decoder') {
      navigate('/anlagen-vergleich', { replace: true });
    } else if (window.location.hash === '#vergleich') {
      navigate('/hardware-katalog', { replace: true });
    }
  }, [navigate]);

  // Multi-step Interactive Solar-Finder State (3 Steps)
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mountLocation, setMountLocation] = useState<'balkon' | 'pitched' | 'flat' | 'ground'>('pitched');
  const [consumption, setConsumption] = useState<'1800' | '3500' | '5000' | '8000'>('3500');
  const [storageNeed, setStorageNeed] = useState<'none' | 'medium' | 'large'>('medium');
  const [regionZone, setRegionZone] = useState<'nord' | 'mitte' | 'sued'>('mitte');

  const handleFinderComplete = () => {
    // Map selected finder values to calculator parameters
    let kwpVal = 9.6;
    let storageVal = 7.5;
    let mountVal = 'pitched';
    let tiltVal = 35;

    if (mountLocation === 'balkon') {
      kwpVal = 0.88;
      storageVal = storageNeed === 'none' ? 0 : 1.6;
      mountVal = 'facade_balcony';
      tiltVal = 85;
    } else if (mountLocation === 'flat') {
      kwpVal = 6.0;
      storageVal = storageNeed === 'none' ? 0 : 5.0;
      mountVal = 'flat_south';
      tiltVal = 15;
    } else if (mountLocation === 'ground') {
      kwpVal = 10.0;
      storageVal = storageNeed === 'none' ? 0 : 10.0;
      mountVal = 'ground';
      tiltVal = 30;
    } else {
      kwpVal = parseInt(consumption, 10) > 6000 ? 15.0 : parseInt(consumption, 10) > 3500 ? 10.0 : 6.0;
      storageVal = storageNeed === 'none' ? 0 : storageNeed === 'large' ? 10.0 : 7.5;
      mountVal = 'pitched';
      tiltVal = 35;
    }

    navigate('/ertragsrechner', {
      state: {
        systemType: mountLocation === 'balkon' ? 'balcony' : 'rooftop',
        kwp: kwpVal,
        demand: parseInt(consumption, 10),
        storage: storageVal,
        mount: mountVal,
        tilt: tiltVal,
        region: regionZone,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <Header />

      <main className="space-y-16 pb-32 sm:pb-16">
        {/* HERO SECTION: ENGINEERING CLEAN 2.0 DUAL-CORE DECISION STAGE */}
        <section className="py-12 md:py-20 bg-white border-b border-slate-200/90 relative overflow-hidden tech-grid-pattern">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/5 via-slate-100/30 to-transparent pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            {/* Technical Type-Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-6 shadow-md">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>UNABHÄNGIGE PV-ENTSCHEIDUNGSPLATTFORM</span>
            </div>

            {/* Main Headline - Core Value Proposition */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-none mb-5 max-w-4xl mx-auto">
              Photovoltaik verstehen, berechnen<br />
              <span className="text-amber-500">und fundiert entscheiden.</span>
            </h1>

            {/* Factual, Serious Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
              Keine Lead-Vermittlung. Keine Kontaktdaten-Pflicht. 
              Zwei datenbasierte Kernwerkzeuge für Ihre unabhängige Solar-Entscheidung.
            </p>

            {/* DUAL CORE ENTRY WORKSTAGE: DIE ZWEI ZENTRALEN SÄULEN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
              
              {/* SÄULE 1: DER PLANER (PV-Wirtschaftlichkeit berechnen) */}
              <div className="bg-slate-950 text-white rounded-3xl p-7 sm:p-9 shadow-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/50 transition-all">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center font-bold shadow-inner">
                      <Calculator className="w-7 h-7 text-amber-400" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 font-mono text-[11px] font-bold uppercase tracking-wider">
                      WERKZEUG 1
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Sie planen eine Solaranlage?
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
                    PV-Ertragsrechner
                  </h2>
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                    Ermitteln Sie Jahresertrag, Eigenverbrauchsquote und die Amortisation mit oder ohne Batteriespeicher. Auf Basis von DWD-Globalstrahlungsdaten und den aktuellen EEG-Sätzen.
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-slate-850 font-mono text-[11px] text-slate-400">
                    <div>✓ Hausdach &amp; Balkonkraftwerk</div>
                    <div>✓ Dynamische Degradation</div>
                    <div>✓ Reale Speicherverluste</div>
                    <div>✓ 100% ohne Datenerfassung</div>
                  </div>
                </div>

                <div className="pt-8 mt-6">
                  <Link
                    to="/ertragsrechner"
                    className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-lg transition-all cursor-pointer"
                  >
                    <span>Wirtschaftlichkeit jetzt berechnen</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </Link>
                </div>
              </div>

              {/* SÄULE 2: DER PRÜFER (PV-Angebot plausibilisieren) */}
              <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-xl border-2 border-slate-900 hover:border-amber-500 transition-all flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-slate-100/80 rounded-full blur-3xl pointer-events-none"></div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-950 border border-amber-200 flex items-center justify-center font-bold">
                      <FileCheck className="w-7 h-7 text-amber-700" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                      WERKZEUG 2
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
                    Liegt Ihnen bereits ein Angebot vor?
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 tracking-tight">
                    PV-Angebots-Check
                  </h2>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    Prüfen Sie vor Vertragsunterschrift den rechnerischen Preis je kWp, das Speicher-Verhältnis und die Handwerker-Ertragsprognose gegen die unabhängige Wattpeak-Modellrechnung.
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-slate-100 font-mono text-[11px] text-slate-600">
                    <div>✓ 3-Stufen-Bewertung</div>
                    <div>✓ Ertrags-Plausibilisierung</div>
                    <div>✓ Vollständigkeits-Check</div>
                    <div>✓ § 12 Abs. 3 UStG neutral</div>
                  </div>
                </div>

                <div className="pt-8 mt-6">
                  <a
                    href="#angebotscheck"
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-850 active:scale-98 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg transition-all cursor-pointer"
                  >
                    <FileCheck className="w-4 h-4 text-amber-400" />
                    <span>Angebot sofort prüfen</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </a>
                </div>
              </div>

            </div>

            {/* Quick Metrics Bar directly underneath the dual stage */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 max-w-5xl mx-auto text-xs font-mono">
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-left shadow-2xs">
                <span className="text-slate-500 uppercase text-[10px]">Solarpaket I</span>
                <div className="text-slate-950 font-black text-sm mt-0.5">800W AC / 2.000 Wp DC</div>
              </div>
              <Link to="/einspeiseverguetung" className="p-3.5 bg-white rounded-2xl border border-slate-200 text-left hover:border-amber-400 transition block shadow-2xs">
                <span className="text-slate-500 uppercase text-[10px]">EEG-Vergütung (2026)</span>
                <div className="text-emerald-700 font-black text-sm mt-0.5">7,70 ct/kWh →</div>
              </Link>
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-left shadow-2xs">
                <span className="text-slate-500 uppercase text-[10px]">DWD Strahlungsband</span>
                <div className="text-slate-950 font-black text-sm mt-0.5">920 – 1.150 kWh/kWp</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-left shadow-2xs">
                <span className="text-slate-500 uppercase text-[10px]">Netzanschluss</span>
                <div className="text-slate-950 font-black text-sm mt-0.5">VDE-AR-N 4105:2026</div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 1: PV-ANGEBOTS-CHECK (SOFORT ERREICHBAR NACH DEM HERO) */}
        <section id="angebotscheck" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
          <PvOfferBenchmark 
            onApplyToCalculator={(params) => {
              navigate("/ertragsrechner", {
                state: {
                  systemType: "rooftop",
                  kwp: params.kwp,
                  storage: params.storageKwh,
                  customInvestmentEur: params.customInvestmentEur
                }
              });
            }}
          />
        </section>

        {/* SECTION 2: INTERAKTIVER SOLAR-FINDER (FÜR EINSTEIGER) */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-lg text-left">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <Search className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-950 font-mono">
                    3-Schritt Solar-Finder
                  </h3>
                  <span className="text-[11px] text-slate-500">Für Einsteiger: Passende Systemgröße ermitteln</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStep(s as any)}
                    className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center transition-all ${
                      step === s
                        ? "bg-amber-500 text-slate-950 font-black"
                        : step > s
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-slate-500 ml-1 font-mono">
                  {step}/3
                </span>
              </div>
            </div>

            {/* Step 1: Anlagentyp & Montageort */}
            {step === 1 && (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-750 uppercase tracking-wider font-mono">
                  Schritt 1: Wo soll Ihre Solaranlage montiert werden?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "pitched", title: "Schrägdach (Haus)", sub: "Klassische Ziegel-/Blechmontage 30–45°", icon: HomeIcon },
                    { id: "flat", title: "Flachdach / Garage", sub: "Ost-West oder Süd-Aufständerung 10–15°", icon: Layers },
                    { id: "balkon", title: "Balkon / Fassade", sub: "800W Stecker-Solar (Solarpaket I)", icon: Sun },
                    { id: "ground", title: "Freifläche / Garten", sub: "Erdbefestigung / Gestell", icon: Zap },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMountLocation(item.id as any)}
                        className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                          mountLocation === item.id
                            ? "bg-amber-50 border-amber-500 ring-2 ring-amber-400 font-bold text-slate-950 shadow-sm"
                            : "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-2xs">
                          <Icon className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-950">{item.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-850 active:scale-95 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition cursor-pointer"
                  >
                    <span>Weiter zu Schritt 2</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Stromverbrauch */}
            {step === 2 && (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-750 uppercase tracking-wider font-mono">
                  Schritt 2: Wie hoch ist Ihr jährlicher Haushalts-Stromverbrauch?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "1800", title: "1.800 kWh", sub: "1–2 Personen" },
                    { id: "3500", title: "3.500 kWh", sub: "3–4 Personen" },
                    { id: "5000", title: "5.000 kWh", sub: "Familie + E-Auto" },
                    { id: "8000", title: "8.000 kWh", sub: "Wärmepumpe / groß" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setConsumption(item.id as any)}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        consumption === item.id
                          ? "bg-amber-50 border-amber-500 ring-2 ring-amber-400 font-bold text-slate-950 shadow-sm"
                          : "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700"
                      }`}
                    >
                      <div className="text-base font-black text-slate-950 font-mono">{item.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Zurück</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-850 active:scale-95 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition cursor-pointer"
                  >
                    <span>Weiter zu Schritt 3</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Speicher & Region */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Speicher-Wunsch */}
                  <div>
                    <label className="block text-xs font-bold text-slate-750 uppercase tracking-wider mb-2 font-mono">
                      Stromspeicher-Präferenz
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "none", title: "Ohne Speicher", sub: "Reine Netzeinspeisung & Direktverbrauch" },
                        { id: "medium", title: "Standard (Nachtstrom)", sub: "Deckung des typischen Abends-/Nachtbedarfs" },
                        { id: "large", title: "Groß (Hohe Autarkie)", sub: "Maximale Unabhängigkeit & Puffer" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setStorageNeed(item.id as any)}
                          className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            storageNeed === item.id
                              ? "bg-amber-50 border-amber-500 font-bold text-slate-950 shadow-2xs"
                              : "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700"
                          }`}
                        >
                          <div className="text-xs font-black text-slate-900">{item.title}</div>
                          <div className="text-[11px] text-slate-500">{item.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Region */}
                  <div>
                    <label className="block text-xs font-bold text-slate-750 uppercase tracking-wider mb-2 font-mono">
                      Region & Globalstrahlung (DWD / PVGIS)
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "nord", title: "Norddeutschland", sub: "~ 1.000 kWh/m² Globalstrahlung" },
                        { id: "mitte", title: "Mitteldeutschland", sub: "~ 1.080 kWh/m² Globalstrahlung" },
                        { id: "sued", title: "Süddeutschland", sub: "~ 1.200 kWh/m² Globalstrahlung" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setRegionZone(item.id as any)}
                          className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            regionZone === item.id
                              ? "bg-amber-50 border-amber-500 font-bold text-slate-950 shadow-2xs"
                              : "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700"
                          }`}
                        >
                          <div className="text-xs font-black text-slate-900">{item.title}</div>
                          <div className="text-[11px] text-slate-500">{item.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Zurück</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleFinderComplete}
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl shadow transition cursor-pointer"
                  >
                    <Calculator className="w-4 h-4 text-slate-950" />
                    <span>Konfiguration im Ertragsrechner öffnen</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                </div>
              </div>
            )}

            <div className="pt-3.5 border-t border-slate-100 mt-4 text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Datenbasierte Richtwerte nach DIN EN IEC 60904-3 &middot; Keine Werbeeinwilligung erforderlich</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: SYSTEM- & ANLAGENVERGLEICH */}
        <section id="anlagenvergleich" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
          <SolarSystemDecoder />
        </section>

        {/* SECTION 3: HARDWARE- & KOMPONENTEN-KATALOG */}
        <section id="hardware" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <SolarComparisonCatalog />
        </section>

        {/* SECTION 3: DER WATTPEAK & PV ERTRAGSRECHNER */}
        <section id="rechner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <span className="bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded">
              Interaktives Planungstool
            </span>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight mt-2">
              Physikalisch basierter PV-Ertrags- &amp; Sparrechner
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Berechnen Sie Erträge, Eigenverbrauch und Amortisation auf Basis realitätsnaher Einstrahlungs- und Technologieparameter.
            </p>
          </div>
          <SolarCalculator />
        </section>

        {/* SECTION 4: 800W BALKONKRAFTWERK SPEICHER-SIMULATOR */}
        <section id="balkonsimulator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <BalkonSimulator />
        </section>

        {/* SECTION 5: DEFINITIONEN & TRUST */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <PositionZeroBox />
          <TrustBox />
        </div>

        {/* SECTION 6: SEMICONDUCTOR & CELL TECH COMPARISON TABLE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TechComparisonTable />
        </div>

        {/* SECTION 7: LEGAL & TECHNICAL FAQ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LegalFaq />
        </div>
      </main>

      {/* STICKY MOBILE BOTTOM BAR - ENGINEERING CLEAN 2.0 SEGMENTED CONTROL */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl no-print">
        <Link
          to="/ertragsrechner"
          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 border border-slate-750 text-white font-extrabold h-11 rounded-xl text-xs active:scale-95 transition"
        >
          <Calculator className="w-3.5 h-3.5 text-amber-400" />
          <span>Ertragsrechner</span>
        </Link>
        <a
          href="#angebotscheck"
          className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-slate-950 font-black h-11 rounded-xl text-xs active:scale-95 shadow-md transition"
        >
          <FileCheck className="w-3.5 h-3.5 text-slate-950" />
          <span>Angebots-Check</span>
        </a>
      </div>

      <Footer />
    </div>
  );
}
