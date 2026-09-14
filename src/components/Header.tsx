import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-600">
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
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden">
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
            800W Stecker-Solargeräte (Solarpaket I)
          </Link>
          <Link
            to="/batteriepass"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
          >
            EU-Batteriepass &amp; SOH-Diagnostik
          </Link>
          <Link
            to="/technologie"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
          >
            Zelltechnik &amp; Halbleiter
          </Link>
        </div>
      )}
    </header>
  );
}
