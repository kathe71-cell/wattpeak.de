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
  Zap
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
      url: 'https://wattpeak.de/',
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
        {/* HERO SECTION: BRAND CLAIM, 3 PRIMARY ENTRY PATHS & 3-STEP FINDER */}
        <section className="py-10 md:py-16 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            
            {/* Brand Claim Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-mono font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Wattpeak. Solar verstehen. Besser entscheiden.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-4">
              Welche Solaranlage passt zu mir –<br />
              <span className="text-amber-500">und was bringt sie tatsächlich?</span>
            </h1>

            {/* Factual Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Ermitteln Sie Ihren individuellen Ertrag, die reale Stromersparnis und Amortisation. 
              Vergleichen Sie 800W-Balkonkraftwerke, Dachanlagen und Speichertechnik – objektiv, datenbasiert und physikalisch fundiert.
            </p>

            {/* 3 PRIMARY ENTRY PATHS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-12 text-left">
              {/* Path 1: Balkonkraftwerk */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold mb-4">
                    <Sun className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700">Einstieg ohne Genehmigung</span>
                  <h3 className="text-lg font-black text-slate-950 mt-1">Balkonkraftwerk (800W)</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Für Mieter &amp; Wohnungseigentümer. Bis zu 2.000 Wp Modulleistung, 800W AC-Einspeisung über Schuko-Steckdose (Solarpaket I), 0 % MwSt.
                  </p>
                </div>
                <div className="pt-5 border-t border-slate-100 mt-5 space-y-2">
                  <a
                    href="#balkonsimulator"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs py-2.5 px-3 rounded-xl transition"
                  >
                    <span>Balkonsimulator öffnen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    to="/balkonkraftwerk"
                    className="w-full inline-flex items-center justify-center text-slate-600 hover:text-slate-950 font-semibold text-[11px] py-1 transition"
                  >
                    800W-Leitfaden &amp; Gesetze
                  </Link>
                </div>
              </div>

              {/* Path 2: Solaranlage fürs Haus */}
              <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 shadow-md hover:shadow-lg transition flex flex-col justify-between relative">
                <span className="absolute -top-3 right-4 bg-slate-900 text-amber-400 text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                  Eigenheim-Standard
                </span>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold mb-4">
                    <HomeIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">Hohe Eigenversorgung</span>
                  <h3 className="text-lg font-black text-slate-950 mt-1">Solaranlage fürs Haus</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Dachanlagen von 5 bis 15 kWp. Hoher Eigenverbrauch, gesetzliche EEG-Einspeisevergütung und Amortisationsanalyse vor Handwerker-Beauftragung.
                  </p>
                </div>
                <div className="pt-5 border-t border-slate-100 mt-5 space-y-2">
                  <Link
                    to="/ertragsrechner"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl transition"
                  >
                    <Calculator className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dachanlage berechnen</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </Link>
                  <Link
                    to="/anlagen-vergleich"
                    className="w-full inline-flex items-center justify-center text-slate-600 hover:text-slate-950 font-semibold text-[11px] py-1 transition"
                  >
                    Anlagengrößen vergleichen
                  </Link>
                </div>
              </div>

              {/* Path 3: Speicher nachrüsten */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold mb-4">
                    <Battery className="w-5 h-5 text-emerald-700" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700">Autarkie &amp; Nachtstrom</span>
                  <h3 className="text-lg font-black text-slate-950 mt-1">Speicher nachrüsten</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Für Bestands- &amp; Neuanlagen. AC- &amp; DC-gekoppelte LiFePO4-Batterien objektiv dimensionieren und Mehrwert realistisch ohne Mythen prüfen.
                  </p>
                </div>
                <div className="pt-5 border-t border-slate-100 mt-5 space-y-2">
                  <Link
                    to="/hardware-katalog"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs py-2.5 px-3 rounded-xl transition"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-amber-600" />
                    <span>Speicher &amp; Hardware *</span>
                  </Link>
                  <Link
                    to="/batteriepass"
                    className="w-full inline-flex items-center justify-center text-slate-600 hover:text-slate-950 font-semibold text-[11px] py-1 transition"
                  >
                    EU-Batteriepass &amp; Haltbarkeit
                  </Link>
                </div>
              </div>
            </div>

            {/* INTERACTIVE 3-STEP SOLAR-FINDER */}
            <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto text-left">
              {/* Step indicator header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Interaktiver Solar-Finder
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStep(s as any)}
                      className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center transition-all ${
                        step === s
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : step > s
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <span className="text-xs font-mono font-bold text-slate-500 ml-1">
                    Schritt {step} von 3
                  </span>
                </div>
              </div>

              {/* Step 1: Anlagentyp & Montageort */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-950">
                      Schritt 1: Wo soll die Solaranlage montiert werden?
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Wählen Sie die geplante Montagefläche, um die baulichen Rahmenbedingungen festzulegen.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'balkon', title: 'Balkon / Fassade', desc: '800W Stecker-Solar für Geländer', icon: Sun },
                      { id: 'pitched', title: 'Schrägdach Haus', desc: 'Klassisches Ziegeldach (EFH/DHH)', icon: HomeIcon },
                      { id: 'flat', title: 'Flachdach / Garage', desc: 'Ost-West oder Süd-Aufständerung', icon: Layers },
                      { id: 'ground', title: 'Garten / Freifläche', desc: 'Bodenmontage mit Gestell', icon: Zap },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMountLocation(item.id as any)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          mountLocation === item.id
                            ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 mb-2 ${mountLocation === item.id ? 'text-amber-600' : 'text-slate-400'}`} />
                        <div className="font-bold text-xs text-slate-900">{item.title}</div>
                        <div className="text-[11px] text-slate-500 mt-1 leading-snug">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
                    >
                      <span>Weiter zu Schritt 2</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Haushaltsgröße & Jahresstrombedarf */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-950">
                      Schritt 2: Wie hoch ist Ihr Jahresstrombedarf?
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Der Stromverbrauch bestimmt die optimale Auslegung für maximalen Eigenverbrauch.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: '1800', title: '1.800 kWh', desc: '1–2 Personen (Wohnung)' },
                      { id: '3500', title: '3.500 kWh', desc: 'Paar / Standard-Einfamilienhaus' },
                      { id: '5000', title: '5.000 kWh', desc: 'Familie (3–5 Personen)' },
                      { id: '8000', title: '8.000+ kWh', desc: 'Großverbraucher (Wärmepumpe / E-Auto)' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setConsumption(item.id as any)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          consumption === item.id
                            ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="font-mono font-black text-sm text-slate-900">{item.title}</div>
                        <div className="text-[11px] text-slate-500 mt-1 leading-snug">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3">
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
                      className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
                    >
                      <span>Weiter zu Schritt 3</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Speicher & Standort */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-950">
                      Schritt 3: Speicher-Präferenz &amp; Region
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Legen Sie fest, ob Sie Solarstrom speichern möchten und wo die Anlage steht.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Speicher Preference */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Speicher-Auslegung
                      </label>
                      <div className="space-y-2">
                        {[
                          { id: 'none', title: 'Ohne Speicher', sub: 'Fokus auf reinen Direktverbrauch am Tag' },
                          { id: 'medium', title: 'Wirtschaftlich optimiert', sub: 'Kompakte Batterie (1,6 bis 7,5 kWh) für Abendstunden' },
                          { id: 'large', title: 'Hohe Autarkie (10+ kWh)', sub: 'Großer Speicher für maximale Unabhängigkeit' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setStorageNeed(item.id as any)}
                            className={`w-full p-3 rounded-xl border text-left transition-all ${
                              storageNeed === item.id
                                ? 'bg-amber-50 border-amber-500 font-bold text-slate-950'
                                : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                            }`}
                          >
                            <div className="text-xs font-bold text-slate-900">{item.title}</div>
                            <div className="text-[10px] text-slate-500">{item.sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Region */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Region &amp; Globalstrahlung (DWD / PVGIS)
                      </label>
                      <div className="space-y-2">
                        {[
                          { id: 'nord', title: 'Norddeutschland', sub: '~ 1.000 kWh/m² Globalstrahlung' },
                          { id: 'mitte', title: 'Mitteldeutschland', sub: '~ 1.080 kWh/m² Globalstrahlung' },
                          { id: 'sued', title: 'Süddeutschland', sub: '~ 1.200 kWh/m² Globalstrahlung' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setRegionZone(item.id as any)}
                            className={`w-full p-3 rounded-xl border text-left transition-all ${
                              regionZone === item.id
                                ? 'bg-amber-50 border-amber-500 font-bold text-slate-950'
                                : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                            }`}
                          >
                            <div className="text-xs font-bold text-slate-900">{item.title}</div>
                            <div className="text-[10px] text-slate-500">{item.sub}</div>
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
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs px-6 py-3 rounded-xl shadow transition cursor-pointer"
                    >
                      <Calculator className="w-4 h-4 text-slate-950" />
                      <span>Ergebnis im Ertragsrechner ansehen</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>
                </div>
              )}

              {/* Legal Note in Finder */}
              <div className="pt-3.5 border-t border-slate-100 mt-4 text-[11px] text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>0 % MwSt. gem. § 12 Abs. 3 UStG für private Wohngebäude &amp; vereinfachte MaStR-Registrierung</span>
              </div>
            </div>

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

        {/* SECTION 1: SYSTEM- & ANLAGENVERGLEICH */}
        <section id="anlagenvergleich" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <SolarSystemDecoder />
        </section>

        {/* SECTION 2: HARDWARE- & KOMPONENTEN-KATALOG */}
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
          Hardware *
        </Link>
      </div>

      <Footer />
    </div>
  );
}
