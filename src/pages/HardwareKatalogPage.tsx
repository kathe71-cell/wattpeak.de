import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SolarComparisonCatalog from '../components/SolarComparisonCatalog';
import TechComparisonTable from '../components/TechComparisonTable';
import TrustBox from '../components/TrustBox';
import LegalFaq from '../components/LegalFaq';
import { ShoppingBag } from 'lucide-react';
import { useDocumentMeta } from '../utils/seo';

export default function HardwareKatalogPage() {
  useDocumentMeta({
    title: 'Solar-Hardware & Speicherkatalog · Wattpeak',
    description: 'Unabhängiger Katalog für Mikrowechselrichter, 800W Komplettsets, LiFePO4-Speichersysteme und Montagesets mit geprüften Herstellerdaten.',
    canonicalPath: '/hardware-katalog',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Wattpeak Hardware- & Speicherkatalog',
      url: 'https://www.wattpeak.de/hardware-katalog',
    },
  });
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 w-full">
        {/* Page Hero */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-mono text-xs font-bold border border-amber-300">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-800" />
              Unabhängige Markt- &amp; Hardware-Übersicht
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
              Solar-Hardware &amp; Komponenten:<br />
              <span className="text-amber-500">Wechselrichter, Speicher, Module &amp; Sets.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Transparenter Vergleich von Balkonkraftwerk-Komplettsets, Mikrowechselrichtern nach VDE-AR-N 4105, 
              LiFePO4-Batteriespeichern und bifazialen N-Type TOPCon Solarmodulen mit tagesaktueller Preisprüfung.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Kategorien</span>
              <div className="text-slate-950 font-black text-sm sm:text-base mt-0.5">6 Hardware-Bereiche</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Zellstandard</span>
              <div className="text-emerald-700 font-black text-sm sm:text-base mt-0.5">N-Type TOPCon / HJT</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Inverter-Norm</span>
              <div className="text-slate-950 font-black text-sm sm:text-base mt-0.5">800W / VDE 4105</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Herstellergarantie</span>
              <div className="text-amber-700 font-black text-sm sm:text-base mt-0.5">Bis zu 30 Jahre linear</div>
            </div>
          </div>
        </section>

        {/* Master Comparison Catalog */}
        <SolarComparisonCatalog />

        {/* Technical Semiconductor Comparison Table */}
        <TechComparisonTable />

        {/* Legal & Standards Trust Box */}
        <TrustBox />

        {/* FAQ Section */}
        <LegalFaq />
      </main>

      <Footer />
    </div>
  );
}
