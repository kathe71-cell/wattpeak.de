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
              className="inline-flex items-center gap-3 cursor-pointer group"
              aria-label="Wattpeak.de Startseite"
            >
              <div 
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden transition-transform group-hover:scale-105"
                aria-hidden="true"
              >
                <svg 
                  viewBox="0 0 40 40" 
                  fill="none" 
                  className="w-6 h-6 text-amber-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="8" y1="14" x2="32" y2="14" stroke="#334155" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
                  <line x1="8" y1="26" x2="32" y2="26" stroke="#334155" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
                  <path 
                    d="M22 6L11 21h8l-3 13 13-17h-8l5-11z" 
                    fill="#f59e0b" 
                    stroke="#d97706" 
                    strokeWidth="0.8" 
                    strokeLinejoin="round" 
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white font-sans leading-none">
                  wattpeak<span className="text-amber-500">.de</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-400 tracking-normal mt-0.5 font-sans">
                  Photovoltaik unabhängig entscheiden
                </span>
              </div>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Die unabhängige Entscheidungsplattform für Photovoltaik-Planung, STC-Kennlinien nach DIN EN IEC 60904-3, 800W-Stecker-Solar und objektive Angebotsprüfung.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Zero-CDN Fonts
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-amber-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Cookielos DSGVO
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                <Lock className="w-3.5 h-3.5" /> VDE-AR-N 4105:2026-03
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
                <Link to="/ertragsrechner" className="hover:text-amber-400 transition-colors font-medium">
                  WattPeak Ertragsrechner
                </Link>
              </li>
              <li>
                <Link to="/#angebotscheck" className="hover:text-amber-400 transition-colors font-medium text-amber-300">
                  PV-Angebots-Check
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
                <Link to="/einspeiseverguetung" className="hover:text-amber-400 transition-colors">
                  Einspeisevergütung 2026 (EEG-Sätze ab 01.08.2026)
                </Link>
              </li>
              <li>
                <Link to="/balkonkraftwerk-speicher" className="hover:text-amber-400 transition-colors">
                  Balkonspeicher Vergleich (Anker/EcoFlow/Growatt)
                </Link>
              </li>
              <li>
                <Link to="/wechselrichter-vergleich" className="hover:text-amber-400 transition-colors">
                  Wechselrichter: Mikro vs. String vs. Hybrid
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
            &copy; {currentYear} wattpeak.de · Redaktion &amp; Quellenmethodik
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>§ 5 DDG</span>
            <span>·</span>
            <span>DIN EN IEC 60904-3</span>
            <span>·</span>
            <span>VDE-AR-N 4105:2026-03</span>
            <span>·</span>
            <span>Zero-CDN</span>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300">
          <span className="font-bold text-white block mb-1">Projektübernahme</span>
          <p className="mb-2">Interesse an der Übernahme von wattpeak.de inklusive Projekt?</p>
          <a href="/projektuebernahme" className="text-amber-400 hover:text-amber-300 font-medium">
            Mehr erfahren &rarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
