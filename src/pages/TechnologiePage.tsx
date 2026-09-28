import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TechComparisonTable from '../components/TechComparisonTable';
import AmazonProductShowcase from '../components/AmazonProductShowcase';
import TrustBox from '../components/TrustBox';
import { Cpu, Layers, Thermometer, ShieldCheck } from 'lucide-react';
import { useDocumentMeta } from '../utils/seo';

export default function TechnologiePage() {
  useDocumentMeta({
    title: 'TOPCon, HJT & Perowskit im Vergleich · Wattpeak',
    description: 'Physikalischer Vergleich moderner Solarzellen: N-Type TOPCon, Heterojunction (HJT), IBC und Perowskit-Tandem mit Wirkungsgraden und Temperaturkoeffizienten.',
    canonicalPath: '/technologie',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Solarzell-Technologie: TOPCon, HJT & Back-Contact',
      url: 'https://www.wattpeak.de/technologie',
    },
  });
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 w-full">
        {/* Editorial Hero */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-950 font-mono text-xs font-bold border border-blue-300">
              <Cpu className="w-3.5 h-3.5 text-blue-800" />
              Halbleiterphysik &amp; Zellarchitektur
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
              Solarzell-Technologie:<br />
              <span className="text-amber-500">TOPCon, HJT &amp; Back-Contact.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Vom monokristallinen Silizium-Wafer über ultradünne Passivierungsschichten bis hin zu Perowskit-Tandemzellen: 
              Erfahren Sie, wie moderne Zellstrukturen Wirkungsgrade über 24&nbsp;% und minimale Temperaturkoeffizienten erzielen.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Silizium-Limit</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">29,4 % (S-Q)</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">TOPCon Wirkungsgrad</span>
              <div className="text-emerald-700 font-black text-lg mt-0.5">&gt; 22,8 %</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">HJT Temp.-Koeff.</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">-0,26 %/K</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Tandem-Potential</span>
              <div className="text-amber-700 font-black text-lg mt-0.5">&gt; 33,0 %</div>
            </div>
          </div>
        </section>

        {/* The 3 Deep-Dive Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-mono font-bold text-xs text-amber-700 uppercase">
              <Thermometer className="w-4 h-4 text-amber-500" />
              STC vs. NOCT / NMOT
            </div>
            <h3 className="font-extrabold text-slate-950 text-base">Reale Betriebstemperaturen</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Während STC (Standard Test Conditions) bei 25&nbsp;°C Zelltemperatur gemessen wird, 
              arbeiten Solarmodule im Sommer bei 50–65&nbsp;°C. Die NMOT (Nominal Module Operating Temperature) 
              beschreibt realistische Bedingungen: 800&nbsp;W/m² Einstrahlung bei 20&nbsp;°C Umgebungstemperatur. 
              Hier entscheidet der Temperaturkoeffizient γ_Pmp über den realen Stromertrag.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-mono font-bold text-xs text-blue-700 uppercase">
              <Layers className="w-4 h-4 text-blue-500" />
              Bifazialitätsfaktor
            </div>
            <h3 className="font-extrabold text-slate-950 text-base">Zweiseitige Stromerzeugung</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bifaziale Glas-Glas-Module nutzen auch indirektes, reflektiertes Licht (Albedo) von der Rückseite. 
              Während ältere PERC-Module nur 70 % Bifazialität aufweisen, erreichen Heterojunction-Zellen (HJT) 
              über 90 %. Bei Aufständerung auf hellen Flachdächern oder Balkonen führt dies zu 10 bis 25 % echtem Mehrertrag.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-mono font-bold text-xs text-emerald-700 uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Anti-Degradation
            </div>
            <h3 className="font-extrabold text-slate-950 text-base">LID, PID &amp; LeTID Schutz</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              N-Type Wafer (Phosphor-Dotiert) sind im Gegensatz zu P-Type Wafern (Bor-Dotiert) immun gegen 
              den Bor-Sauerstoff-Komplex (LID). Moderne Glas-Glas-Laminate schützen die Solarzellen 
              zudem dauerhaft gegen Feuchtigkeitseintritt und spannungsinduzierte Degradation (PID).
            </p>
          </div>
        </section>

        {/* Master Comparison Table */}
        <TechComparisonTable />

        {/* Amazon Product Recommendations */}
        <AmazonProductShowcase />

        <TrustBox />
      </main>

      <Footer />
    </div>
  );
}
