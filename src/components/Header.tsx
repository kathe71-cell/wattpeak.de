import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, FileCheck } from 'lucide-react';
import SearchModal from './SearchModal';
import WattpeakLogo from './WattpeakLogo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (_e: React.MouseEvent) => {
    setMobileMenuOpen(false);

    if (location.pathname === '/') {
      // If already on start page, clear any hash/query and scroll smoothly to the very top
      if (window.location.hash || window.location.search) {
        try {
          window.history.replaceState(null, '', '/');
        } catch {
          // Ignore
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // On subpage, navigate to root and scroll to top
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-50 transition-all">
      {/* Sub-header Technical Status Bar */}
      <div className="bg-slate-950 text-slate-300 text-[11px] font-mono py-1 px-4 sm:px-6 lg:px-8 border-b border-slate-850 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            WATTPEAK DUAL-ENGINE
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">DIN EN IEC 60904-3 &middot; DWD SARAH-2 &middot; EEG 2026</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="hidden sm:inline">100% ohne Kontaktdatenzwang</span>
          <span className="text-amber-400 font-bold">v3.2</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="group cursor-pointer"
          aria-label="Wattpeak.de Startseite"
        >
          <WattpeakLogo size="md" showClaim={true} />
        </Link>

        {/* Desktop Navigation - Clean, Prioritized & Mobile-First Foundation */}
        <nav className="hidden lg:flex items-center space-x-1.5 text-sm font-semibold text-slate-700">
          <Link
            to="/ertragsrechner"
            className="hover:text-slate-950 hover:bg-slate-100 px-3.5 py-2 rounded-xl transition text-slate-900 font-bold flex items-center gap-1.5"
          >
            <span>PV-Ertragsrechner</span>
          </Link>
          <a
            href="/#angebotscheck"
            className="hover:text-amber-950 hover:bg-amber-100/90 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 font-black text-amber-950 bg-amber-100 border border-amber-300 shadow-2xs"
          >
            <FileCheck className="w-4 h-4 text-amber-700" />
            <span>PV-Angebots-Check</span>
          </a>
          <Link
            to="/anlagen-vergleich"
            className="hover:text-slate-950 hover:bg-slate-100 px-3 py-2 rounded-xl transition text-slate-600"
          >
            Anlagenvergleich
          </Link>
          <Link
            to="/hardware-katalog"
            className="hover:text-slate-950 hover:bg-slate-100 px-3 py-2 rounded-xl transition text-slate-600"
          >
            Hardware &amp; Speicher
          </Link>

          {/* Wissen Dropdown / Link */}
          <Link
            to="/einspeiseverguetung"
            className="hover:text-slate-950 hover:bg-slate-100 px-3 py-2 rounded-xl transition"
          >
            EEG-Vergütung
          </Link>

          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-200 ml-2 px-3 py-2 rounded-xl transition-colors font-semibold cursor-pointer"
            title="Suche öffnen (⌘K)"
            aria-label="Suche öffnen"
          >
            <Search className="w-3.5 h-3.5 text-slate-600" />
            <span className="font-mono bg-white border border-slate-300 text-slate-500 px-1.5 py-0.5 rounded text-[10px]">⌘K</span>
          </button>
        </nav>

        {/* Mobile menu toggle & Search */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-100 cursor-pointer"
            aria-label="Suche öffnen"
          >
            <Search className="w-5 h-5 text-slate-700" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 text-sm cursor-pointer"
          >
            <span className="flex items-center gap-2"><Search className="w-4 h-4 text-slate-600" /> Suche &amp; Themen</span>
            <span className="text-xs bg-white border border-slate-300 text-slate-500 px-1.5 py-0.5 rounded font-mono">⌘K</span>
          </button>

          <Link
            to="/ertragsrechner"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-50"
          >
            PV-Ertragsrechner
          </Link>
          <Link
            to="/#angebotscheck"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-xl font-bold text-amber-900 bg-amber-50/80 border border-amber-200/70"
          >
            PV-Angebots-Check (MVP)
          </Link>
          <Link
            to="/anlagen-vergleich"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
          >
            Anlagenvergleich
          </Link>
          <Link
            to="/hardware-katalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
          >
            Hardware- &amp; Speicherkatalog
          </Link>
          <Link
            to="/balkonkraftwerk"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
          >
            800W Balkonsolar
          </Link>
          <Link
            to="/einspeiseverguetung"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
          >
            EEG-Einspeisevergütung
          </Link>
          <Link
            to="/batteriepass"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
          >
            EU-Batteriepass &amp; Haltbarkeit
          </Link>
          <Link
            to="/technologie"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
          >
            Zelltechnik (TOPCon / HJT / IBC)
          </Link>
          <Link
            to="/batteriepass"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
          >
            EU-Batteriepass
          </Link>
          <Link
            to="/technologie"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
          >
            Zelltechnik
          </Link>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
