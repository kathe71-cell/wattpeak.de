import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Calculator from '../components/Calculator';
import AmazonProductShowcase from '../components/AmazonProductShowcase';
import TrustBox from '../components/TrustBox';
import LegalFaq from '../components/LegalFaq';
import { Calculator as CalcIcon } from 'lucide-react';

export default function ErtragsrechnerPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 w-full">
        {/* Page Hero */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-mono text-xs font-bold border border-amber-300">
              <CalcIcon className="w-3.5 h-3.5 text-amber-800" />
              Physikalisches Näherungsmodell · DIN EN IEC 60904-3
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
              Photovoltaik Ertragsrechner:<br />
              <span className="text-amber-500">Ertrag, Eigenverbrauch &amp; Amortisation.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Berechnen Sie den realistischen Jahresertrag Ihrer Solaranlage auf Basis langjähriger 
              Globalstrahlungsdaten des Deutschen Wetterdienstes (DWD), Modulwirkungsgraden, Zelltemperatur-Verlusten 
              und individueller Speichergröße.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Referenz-Norm</span>
              <div className="text-slate-950 font-black text-sm sm:text-base mt-0.5">DIN EN IEC 60904-3</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">DWD-Mittelwert DE</span>
              <div className="text-emerald-700 font-black text-sm sm:text-base mt-0.5">~1.050 kWh/m²·a</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Performance Ratio</span>
              <div className="text-slate-950 font-black text-sm sm:text-base mt-0.5">ca. 82 – 86 %</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">EEG-Vergütung</span>
              <div className="text-amber-700 font-black text-sm sm:text-base mt-0.5">8,11 ct/kWh (bis 10 kWp)</div>
            </div>
          </div>
        </section>

        {/* The Main Calculator Tool */}
        <Calculator />

        {/* Amazon Hardware Recommendations */}
        <AmazonProductShowcase />

        {/* Legal & Standards Trust Section */}
        <TrustBox />

        {/* FAQ Section */}
        <LegalFaq />
      </main>

      <Footer />
    </div>
  );
}
