import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Calculator,
  ShoppingCart,
  Layers
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SolarSystemDecoder from '../components/SolarSystemDecoder';
import SolarComparisonCatalog from '../components/SolarComparisonCatalog';
import SolarCalculator from '../components/Calculator';
import BalkonSimulator from '../components/BalkonSimulator';
import PositionZeroBox from '../components/PositionZeroBox';
import TechComparisonTable from '../components/TechComparisonTable';
import LegalFaq from '../components/LegalFaq';
import EmbedWidgetBox from '../components/EmbedWidgetBox';
import TrustBox from '../components/TrustBox';
import CitationBox from '../components/CitationBox';

export default function Home() {
  const navigate = useNavigate();

  // Forward legacy hash fragments to clean URL routes
  useEffect(() => {
    if (window.location.hash === '#rechner') {
      navigate('/ertragsrechner', { replace: true });
    } else if (window.location.hash === '#decoder') {
      navigate('/system-decoder', { replace: true });
    } else if (window.location.hash === '#vergleich') {
      navigate('/hardware-katalog', { replace: true });
    }
  }, [navigate]);

  // Solar-Finder Parameter Box State
  const [mountLocation, setMountLocation] = useState('balkon');
  const [consumption, setConsumption] = useState('3500');
  const [storageNeed, setStorageNeed] = useState('medium');
  const [regionZone, setRegionZone] = useState('mitte');

  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Map selected finder values to calculator params
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
      // pitched
      kwpVal = parseInt(consumption, 10) > 6000 ? 15.0 : parseInt(consumption, 10) > 3500 ? 10.0 : 6.0;
      storageVal = storageNeed === 'none' ? 0 : storageNeed === 'large' ? 10.0 : 7.5;
      mountVal = 'pitched';
      tiltVal = 35;
    }

    // Navigate to dedicated Ertragsrechner page with clean URL
    navigate('/ertragsrechner', {
      state: {
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

      <main className="space-y-16 pb-16">
        {/* HERO SECTION: USER-CENTRIC, VALUE-DRIVEN & TOOL-FOCUSED */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">


            {/* Main Headline: Primary User Question */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-4">
              Welche Solaranlage passt zu mir –<br />
              <span className="text-amber-500">und was bringt sie tatsächlich?</span>
            </h1>

            {/* Clear Subtext without marketing fluff */}
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed font-medium">
              Ermitteln Sie Ihren individuellen Ertrag, die reale Stromersparnis und Amortisation. 
              Vergleichen Sie 800W-Balkonkraftwerke, Dachanlagen und Speichertechnik – objektiv und physikalisch fundiert.
            </p>

            {/* Action CTAs: Direct access to tools */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <Link
                to="/ertragsrechner"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-sm px-7 py-3.5 rounded-2xl shadow transition"
              >
                <Calculator className="w-4 h-4 text-slate-950" />
                <span>Solaranlage berechnen</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
              <Link
                to="/system-decoder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 active:scale-95 text-slate-900 border border-slate-300 font-bold text-sm px-6 py-3.5 rounded-2xl shadow-sm transition"
              >
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Produkte &amp; Systeme vergleichen</span>
              </Link>
            </div>

            {/* SOLAR-FINDER PARAMETER BOX */}
            <form 
              onSubmit={handleFinderSubmit}
              className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto text-left"
            >
              <div className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-500" />
                  <span>Solar-Finder · Ihr persönliches Anlagenprofil</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">Schritt 1 von 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Montageort / Dachtyp
                  </label>
                  <select
                    value={mountLocation}
                    onChange={(e) => setMountLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="balkon">Balkon (800W Stecker-Solar)</option>
                    <option value="pitched">Schrägdach (Ziegel / Haus)</option>
                    <option value="flat">Flachdach / Garage</option>
                    <option value="ground">Garten / Freifläche</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Jahresstrombedarf
                  </label>
                  <select
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="1800">1.800 kWh (1–2 Personen)</option>
                    <option value="3500">3.500 kWh (Paar / EFH)</option>
                    <option value="5000">5.000 kWh (Familie)</option>
                    <option value="8000">8.000+ kWh (Wärmepumpe / E-Auto)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Speicher-Wunsch
                  </label>
                  <select
                    value={storageNeed}
                    onChange={(e) => setStorageNeed(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="none">Ohne Speicher (Direktverbrauch)</option>
                    <option value="medium">Optimierter Speicher (1,6 – 7,5 kWh)</option>
                    <option value="large">Großer Speicher (10+ kWh Notstrom)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Region / Einstrahlung
                  </label>
                  <select
                    value={regionZone}
                    onChange={(e) => setRegionZone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="mitte">Mitteldeutschland (~1.080 kWh/m²)</option>
                    <option value="nord">Norddeutschland (~1.000 kWh/m²)</option>
                    <option value="sued">Süddeutschland (~1.200 kWh/m²)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  0 % MwSt. gem. § 12 Abs. 3 UStG für private Wohngebäude &amp; vereinfachte MaStR-Meldung
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-slate-950 hover:bg-slate-800 active:scale-95 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Ertrag für dieses Setup berechnen</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </form>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 max-w-4xl mx-auto text-xs font-mono">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-left">
                <span className="text-slate-400 uppercase text-[10px]">Solarpaket I</span>
                <div className="text-slate-950 font-black text-sm mt-0.5">800W AC / 2.000 Wp DC</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-left">
                <span className="text-slate-400 uppercase text-[10px]">Steuersatz</span>
                <div className="text-emerald-700 font-black text-sm mt-0.5">0 % MwSt. (§ 12 Abs. 3)</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-left">
                <span className="text-slate-400 uppercase text-[10px]">Jahresertrag DE</span>
                <div className="text-slate-950 font-black text-sm mt-0.5">900 – 1.150 kWh/kWp</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-left">
                <span className="text-slate-400 uppercase text-[10px]">Zulassung</span>
                <div className="text-slate-950 font-black text-sm mt-0.5">VDE-AR-N 4105 Schuko</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: SYSTEM- & AMORTISATIONS-DECODER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SolarSystemDecoder />
        </div>

        {/* SECTION 2: HARDWARE- & KOMPONENTEN-KATALOG */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SolarComparisonCatalog />
        </div>

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

        {/* SECTION 5: POSITION-0 DEFINITIONS-BOX & TRUST */}
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

        {/* SECTION 8: WEBMASTER EMBED & CITATION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <EmbedWidgetBox />
          <CitationBox />
        </div>
      </main>

      {/* STICKY MOBILE BOTTOM BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 shadow-2xl no-print">
        <Link
          to="/ertragsrechner"
          className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 text-slate-950 font-extrabold h-12 rounded-xl text-xs shadow-sm"
        >
          <Calculator className="w-4 h-4 text-slate-950" />
          Ertrag berechnen
        </Link>
        <Link
          to="/hardware-katalog"
          className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 text-white font-bold h-12 rounded-xl text-xs"
        >
          <ShoppingCart className="w-4 h-4 text-amber-400" />
          Komponenten *
        </Link>
      </div>

      <Footer />
    </div>
  );
}
