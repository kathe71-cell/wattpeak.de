import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BalkonSimulator from '../components/BalkonSimulator';
import AmazonProductShowcase from '../components/AmazonProductShowcase';
import TrustBox from '../components/TrustBox';
import { Scale } from 'lucide-react';

export default function BalkonkraftwerkPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 w-full">
        {/* Editorial Hero */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-mono text-xs font-bold border border-amber-300">
              <Scale className="w-3.5 h-3.5 text-amber-800" />
              Rechtsstand 2024–2026 · Solarpaket I
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
              800-Watt-Balkonkraftwerk:<br />
              <span className="text-amber-500">Regeln, Technik &amp; Speicher.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Alles über die aktuellen Grenzwerte des novellierten EEG: 800&nbsp;W Wechselrichter-Einspeisung, 
              bis zu 2.000&nbsp;Wp Modulüberbelegung, vereinfachte MaStR-Registrierung und smarte Batteriespeicher.
            </p>
          </div>

          {/* 4 Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">AC-Ausgang</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">800 Watt</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Max. Modul-Peak</span>
              <div className="text-emerald-700 font-black text-lg mt-0.5">2.000 Wp</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Steckverbindung</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">Schuko konform</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Netzanmeldung</span>
              <div className="text-amber-700 font-black text-lg mt-0.5">Nur MaStR</div>
            </div>
          </div>
        </section>

        {/* The 4 Big Pillars of Solarpaket I */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 font-bold">
              1
            </div>
            <h3 className="text-lg font-black text-slate-950">800W Inverter vs. 2.000 Wp Modulleistung</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Die Einspeiseleistung in das Hausnetz ist durch die Wechselrichter-Firmware auf maximal 800 Voltampere (VA bzw. Watt) 
              begrenzt. Auf der Gleichstromseite (DC) erlaubt der Gesetzgeber jedoch bis zu 2.000&nbsp;Wp installierte Modulleistung. 
              Dies ermöglicht den Anschluss von bis zu 4 hocheffizienten Bifazial-Modulen für maximale Ausbeute bei diffusem Schlechtwetter.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 font-bold">
              2
            </div>
            <h3 className="text-lg font-black text-slate-950">Entbürokratisierung im Marktstammdatenregister</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Die doppelte bürokratische Meldung beim örtlichen Verteilnetzbetreiber (VNB) entfällt komplett. 
              Es genügt eine einfache 5-minütige Online-Registrierung im offiziellen Marktstammdatenregister (MaStR) 
              der Bundesnetzagentur mit nur wenigen Pflichtangaben (Standort, Modulleistung, Wechselrichterleistung).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 font-bold">
              3
            </div>
            <h3 className="text-lg font-black text-slate-950">Schuko-Stecker &amp; Übergangs-Rückdrehzähler</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Der herkömmliche Haushalts-Schukostecker ist nun gesetzlich und normativ anerkannt, sofern der Wechselrichter 
              über einen integrierten NA-Schutz nach VDE-AR-N 4105 verfügt. Zudem dürfen alte Ferraris-Zähler (die rückwärts drehen) 
              für eine Übergangsfrist weiterlaufen, bis der Messstellenbetreiber den Zähler kostenlos austauscht.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-600 font-bold">
              4
            </div>
            <h3 className="text-lg font-black text-slate-950">Rechtsanspruch für Mieter &amp; WEG-Eigentümer</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Stecker-Solargeräte wurden im Bürgerlichen Gesetzbuch (BGB § 554) und im Wohnungseigentumsgesetz (WEG § 20) 
              in den Katalog der privilegierten Maßnahmen aufgenommen. Vermieter und Eigentümergemeinschaften dürfen die Installation 
              am Balkongeländer nicht mehr grundlos untersagen.
            </p>
          </div>
        </section>

        {/* Interactive Simulator */}
        <BalkonSimulator />

        {/* Amazon Product Showcase */}
        <AmazonProductShowcase />

        {/* Trust Box */}
        <TrustBox />
      </main>

      <Footer />
    </div>
  );
}
