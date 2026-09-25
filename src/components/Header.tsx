import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, Search } from 'lucide-react';
import SearchModal from './SearchModal';

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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="flex items-center space-x-3 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
          </div>
          <div>
            <div className="font-black text-2xl tracking-tight text-slate-950">
              wattpeak<span className="text-amber-500">.de</span>
            </div>
            <span className="text-xs font-semibold text-slate-500 block -mt-1">
              Solar verstehen. Besser entscheiden.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Clean, Balanced & Elegant */}
        <nav className="hidden lg:flex items-center space-x-5 text-sm font-semibold text-slate-600">
          <Link
            to="/anlagen-vergleich"
            className="hover:text-amber-600 transition text-slate-900 font-bold hover:bg-slate-50 px-2 py-1 rounded-lg"
          >
            Anlagen vergleichen
          </Link>
          <Link
            to="/ertragsrechner"
            className="hover:text-amber-600 transition hover:bg-slate-50 px-2 py-1 rounded-lg"
          >
            Ertragsrechner
          </Link>
          <Link
            to="/hardware-katalog"
            className="hover:text-amber-600 transition hover:bg-slate-50 px-2 py-1 rounded-lg"
          >
            Hardware &amp; Speicher
          </Link>
          <Link 
            to="/balkonkraftwerk" 
            className="hover:text-amber-600 transition hover:bg-slate-50 px-2 py-1 rounded-lg"
          >
            800W Balkonsolar
          </Link>
          <Link 
            to="/batteriepass" 
            className="hover:text-amber-600 transition hover:bg-slate-50 px-2 py-1 rounded-lg"
          >
            EU-Batteriepass
          </Link>
          <Link 
            to="/technologie" 
            className="hover:text-amber-600 transition hover:bg-slate-50 px-2 py-1 rounded-lg"
          >
            Zelltechnik
          </Link>
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-amber-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors font-semibold"
            title="Suche öffnen (⌘K)"
          >
            <Search className="w-4 h-4 text-amber-500" />
            <span className="font-mono bg-white border border-slate-300 text-slate-500 px-1 py-0.2 rounded text-[10px]">⌘K</span>
          </button>
        </nav>

        {/* Mobile menu toggle & Search */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-slate-700 hover:text-amber-600 rounded-lg hover:bg-slate-100"
            aria-label="Suche öffnen"
          >
            <Search className="w-5 h-5 text-amber-500" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100"
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <button
            onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 text-sm"
          >
            <span className="flex items-center gap-2"><Search className="w-4 h-4 text-amber-500" /> PV-Rechner &amp; Hardware suchen</span>
            <span className="text-xs bg-white border border-slate-300 text-slate-500 px-1.5 py-0.5 rounded font-mono">⌘K</span>
          </button>
          <Link
            to="/anlagen-vergleich"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-bold text-amber-700 hover:bg-slate-50"
          >
            Anlagen vergleichen
          </Link>
          <Link
            to="/ertragsrechner"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
          >
            WattPeak Ertragsrechner
          </Link>
          <Link
            to="/hardware-katalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
          >
            Hardware- &amp; Speicherkatalog
          </Link>
          <Link
            to="/balkonkraftwerk"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
          >
            800W Balkonsolar
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
