import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDocumentMeta } from '../utils/seo';
import { ArrowLeft, Compass, Calculator, Layers, HelpCircle } from 'lucide-react';

export default function NotFoundPage() {
  useDocumentMeta({
    title: '404 – Seite nicht gefunden · wattpeak.de',
    description: 'Die aufgerufene Seite existiert leider nicht oder wurde verschoben. Nutzen Sie unsere Navigation oder Rechner.',
    canonicalPath: '/404',
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center w-full">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 shadow-sm space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-mono text-xs font-bold border border-amber-300">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            HTTP 404 · Ressource nicht gefunden
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight">
            Hier scheint keine Sonne.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Die von Ihnen angeforderte URL konnte auf dem Server nicht gefunden werden. 
            Möglicherweise wurde die Seite umbenannt oder ein Link ist veraltet.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-sm px-6 py-3.5 rounded-2xl shadow transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Zur Startseite
            </Link>
            <Link
              to="/ertragsrechner"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-sm px-6 py-3.5 rounded-2xl transition"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              Zum Ertragsrechner
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-xs">
            <Link
              to="/anlagen-vergleich"
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100 transition block"
            >
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                Anlagen vergleichen
              </div>
              <p className="text-slate-500">Balkonkraftwerk vs. 5–15 kWp Dachanlage</p>
            </Link>
            <Link
              to="/balkonkraftwerk"
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100 transition block"
            >
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                Balkonsolar-Leitfaden
              </div>
              <p className="text-slate-500">800W Solarpaket I, Normen &amp; Gesetze</p>
            </Link>
            <Link
              to="/einspeiseverguetung"
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100 transition block"
            >
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                Einspeisevergütung 2026
              </div>
              <p className="text-slate-500">Aktuelle EEG-Sätze der BNetzA</p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
