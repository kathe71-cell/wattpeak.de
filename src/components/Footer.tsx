import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Brand Statement Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <Link 
              to="/" 
              onClick={() => {
                if (window.location.hash || window.location.search) {
                  try {
                    window.history.replaceState(null, '', '/');
                  } catch {
                    // Ignore
                  }
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                <Zap className="w-5 h-5 fill-slate-950 stroke-slate-950" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                wattpeak<span className="text-amber-500">.de</span>
              </span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Das unabhängige Referenzportal für Photovoltaik-Dimensionierung, STC-Kennlinien nach DIN EN IEC 60904-3, 800W-Balkonsolar und europäische Speicherstandards.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Zero-CDN Fonts
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-amber-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Cookielos DSGVO
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                <Lock className="w-3.5 h-3.5" /> VDE-AR-N 4105
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest font-mono">
              Themen &amp; Rechner
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/ertragsrechner" className="hover:text-amber-400 transition-colors">
                  WattPeak Ertragsrechner
                </Link>
              </li>
              <li>
                <Link to="/anlagen-vergleich" className="hover:text-amber-400 transition-colors">
                  Anlagen vergleichen (System-Decoder)
                </Link>
              </li>
              <li>
                <Link to="/hardware-katalog" className="hover:text-amber-400 transition-colors">
                  Hardware-Vergleichskatalog
                </Link>
              </li>
              <li>
                <Link to="/balkonkraftwerk" className="hover:text-amber-400 transition-colors">
                  800W Stecker-Solargeräte (Solarpaket I)
                </Link>
              </li>
              <li>
                <Link to="/batteriepass" className="hover:text-amber-400 transition-colors">
                  EU-Batteriepass (VO 2023/1542)
                </Link>
              </li>
              <li>
                <Link to="/technologie" className="hover:text-amber-400 transition-colors">
                  Zell-Technologien (TOPCon vs. HJT vs. IBC)
                </Link>
              </li>
              <li>
                <Link to="/solardachziegel" className="hover:text-amber-400 transition-colors">
                  Solardachziegel (BIPV vs. Aufdach)
                </Link>
              </li>
              <li>
                <Link to="/komplettsets" className="hover:text-amber-400 transition-colors">
                  Photovoltaik Komplettsets &amp; Bausätze
                </Link>
              </li>
              <li>
                <Link to="/solarpflicht" className="hover:text-amber-400 transition-colors">
                  Solarpflicht 16 Bundesländer &amp; GEG
                </Link>
              </li>
              <li>
                <Link to="/rechner-embed" className="hover:text-amber-400 transition-colors">
                  Iframe Embed Rechner
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Recht & Transparenz */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest font-mono">
              Rechtliche Transparenz
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              * Werbe- &amp; Partnerhinweis: Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. 
              Verlinkungen zu Amazon.de sind mit einem Sternchen (*) gekennzeichnet. 
              Für Endkunden entstehen dadurch keinerlei Mehrkosten. wattpeak.de ist ein unabhängiges Solar-Informationsportal und steht in keinem gesellschaftsrechtlichen Verhältnis zu den genannten Herstellern oder Anbietern.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              * Modellrechnung: Alle Rechner- und Simulationsergebnisse beruhen auf physikalischen Näherungsmodellen sowie langjährigen Globalstrahlungswerten (DWD/PVGIS). Die tatsächlichen Werte können je nach individuellem Verbrauchsprofil, Komponenten, Verschattung und Wetter abweichen.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link to="/impressum" className="text-amber-400 hover:text-amber-300 font-medium text-xs underline underline-offset-4">
                → Impressum nach § 5 DDG
              </Link>
              <Link to="/datenschutz" className="text-amber-400 hover:text-amber-300 font-medium text-xs underline underline-offset-4">
                → Datenschutz nach DSGVO
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {currentYear} wattpeak.de · Fachredaktion Erneuerbare Energien
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>§ 5 DDG</span>
            <span>·</span>
            <span>DIN EN IEC 60904-3</span>
            <span>·</span>
            <span>VDE-AR-N 4105</span>
            <span>·</span>
            <span>Zero-CDN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
