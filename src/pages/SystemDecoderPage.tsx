import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SolarSystemDecoder from '../components/SolarSystemDecoder';
import PositionZeroBox from '../components/PositionZeroBox';
import AmazonProductShowcase from '../components/AmazonProductShowcase';
import TrustBox from '../components/TrustBox';
import LegalFaq from '../components/LegalFaq';
import { Layers } from 'lucide-react';
import { useDocumentMeta } from '../utils/seo';

export default function SystemDecoderPage() {
  useDocumentMeta({
    title: 'Solaranlagen & Größen im Vergleich · Wattpeak',
    description: 'Vergleich von Balkonkraftwerken (800W), 5–15 kWp Dachanlagen, Speichersystemen und Gewerbelösungen: Ertrag, Kosten und Autarkie im Überblick.',
    canonicalPath: '/anlagen-vergleich',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Wattpeak Anlagen-Vergleich & System-Decoder',
      url: 'https://www.wattpeak.de/anlagen-vergleich',
    },
  });
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 w-full">
        {/* Page Hero */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-950 font-mono text-xs font-bold border border-blue-300">
              <Layers className="w-3.5 h-3.5 text-blue-800" />
              Anlagen-Architektur &amp; Dimensionierung
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
              Solar-System-Decoder:<br />
              <span className="text-amber-500">Das passende Setup für Ihr Dach &amp; Budget.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Vom steckerfertigen 800W-Balkonkraftwerk für Mieter über die klassische 5- bis 10-kWp-Eigenheim-Anlage 
              bis zum 15-kWp-Gewerbedach mit Wärmepumpe: Vergleichen Sie Systemkomponenten, Investitionskosten, 
              Autarkiegrade und Amortisationszeiten.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Balkon-Autarkie (2.500 kWh)</span>
              <div className="text-slate-950 font-black text-sm sm:text-base mt-0.5">15 – 35 %</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Dach + Speicher (4.500 kWh)</span>
              <div className="text-emerald-700 font-black text-sm sm:text-base mt-0.5">55 – 75 % Autarkie</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Amortisation</span>
              <div className="text-slate-950 font-black text-sm sm:text-base mt-0.5">Modellabhängig (s. Matrix)</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">USt.-Satz Wohnhaus</span>
              <div className="text-amber-700 font-black text-sm sm:text-base mt-0.5">0 % (§ 12 Abs. 3 UStG)</div>
            </div>
          </div>
        </section>

        {/* System Decoder Component */}
        <SolarSystemDecoder />

        {/* Position Zero Technical Definition */}
        <PositionZeroBox />

        {/* Hardware Recommendations */}
        <AmazonProductShowcase />

        {/* Trust & Legal Box */}
        <TrustBox />

        {/* Legal FAQs */}
        <LegalFaq />
      </main>

      <Footer />
    </div>
  );
}
