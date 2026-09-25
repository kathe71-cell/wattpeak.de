import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Zap, ChevronRight, Cpu, Calculator, ShieldCheck } from 'lucide-react';

interface SearchItem {
  id: string;
  title: string;
  category: 'PV-Rechner & Tools' | 'Hardware & Speicher' | 'Zelltechnik & Standards' | 'Ratgeber & Recht';
  description: string;
  path: string;
  tags: string[];
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    id: 'ertragsrechner',
    title: 'Photovoltaik Ertrags- & Amortisationsrechner',
    category: 'PV-Rechner & Tools',
    description: 'Berechne Solarertrag (kWh/p.a.), Eigenverbrauchsquote, Autarkiegrad und Rentabilität deiner PV-Anlage.',
    path: '/ertragsrechner',
    tags: ['rechner', 'ertrag', 'amortisation', 'kwh', 'eigenverbrauch', 'speicher', 'wirtschaftlichkeit']
  },
  {
    id: 'hardware-katalog',
    title: 'Hardware & Speicher Katalog',
    category: 'Hardware & Speicher',
    description: 'Vergleich von Glas-Glas Modulen, Hybrid-Wechselrichtern, LFP-Heimspeichern und Mikrowechselrichtern.',
    path: '/hardware-katalog',
    tags: ['hardware', 'module', 'wechselrichter', 'speicher', 'lfp', 'byd', 'huawei', 'hoymiles', 'trina']
  },
  {
    id: 'balkonkraftwerk',
    title: '800W Balkonkraftwerk Simulator & Guide',
    category: 'PV-Rechner & Tools',
    description: 'Regeln für 800W Entlastung, Schuko-Stecker, vereinfachte Anmeldung im Marktstammdatenregister & Ertrag.',
    path: '/balkonkraftwerk',
    tags: ['balkonsolar', 'balkonkraftwerk', '800w', 'schuko', 'marktstammdatenregister', 'anmeldung', 'stecker']
  },
  {
    id: 'batteriepass',
    title: 'EU-Batteriepass 2026 & Speicher-Regulierung',
    category: 'Zelltechnik & Standards',
    description: 'Verpflichtender digitaler Batteriepass für stationäre Stromspeicher, CO2-Fußabdruck & Lieferketten.',
    path: '/batteriepass',
    tags: ['batteriepass', 'eu-verordnung', 'lfp', 'nmc', 'lieferkette', 'co2-fußabdruck', 'rezyklat']
  },
  {
    id: 'technologie',
    title: 'Zelltechnologie: TOPCon vs. HJT vs. PERC',
    category: 'Zelltechnik & Standards',
    description: 'Wirkungsgrad-Vergleich, Temperaturkoeffizienten, bifaziale Faktoren und Degradation modernster PV-Zellen.',
    path: '/technologie',
    tags: ['topcon', 'hjt', 'perc', 'zelltechnik', 'wirkungsgrad', 'heterojunction', 'bifazial', 'n-type']
  },
  {
    id: 'solardachziegel',
    title: 'Solardachziegel & Indach-PV',
    category: 'Hardware & Speicher',
    description: 'Ästhetische Gebäudeintegration (BIPV), Denkmalschutz-Anforderungen und Dachziegel-Photovoltaik.',
    path: '/solardachziegel',
    tags: ['solardachziegel', 'bipv', 'indach', 'denkmalschutz', 'ästhetik', 'dachziegel']
  },
  {
    id: 'solarpflicht',
    title: 'Solarpflicht in Deutschland (Bundesländer)',
    category: 'Ratgeber & Recht',
    description: 'Gesetzliche PV-Pflichten bei Neubau und Dachsanierung in BW, Bayern, NRW, Niedersachsen etc.',
    path: '/solarpflicht',
    tags: ['solarpflicht', 'gesetz', 'neubau', 'dachsanierung', 'bundesländer', 'vorschrift']
  },
  {
    id: 'system-decoder',
    title: 'PV System-Decoder & String-Auslegung',
    category: 'PV-Rechner & Tools',
    description: 'Optimale Kombination aus Modul-Stringspannung (Vmp/Voc) und MPPT-Spannungsfenster des Wechselrichters.',
    path: '/system-decoder',
    tags: ['string', 'mppt', 'wechselrichter', 'spannung', 'auslegung', 'voc', 'vmp']
  },
  {
    id: 'komplettsets',
    title: 'PV-Komplettanlagen Benchmark & Konfiguration',
    category: 'Hardware & Speicher',
    description: 'Komplettsets von 5 kWp bis 15 kWp inkl. Speicher & Wallbox im Preis-Leistungs-Vergleich.',
    path: '/komplettsets',
    tags: ['komplettset', 'komplettanlage', '5kwp', '10kwp', 'wallbox', 'preisvergleich']
  }
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = query.trim() === ''
    ? SEARCH_ITEMS.slice(0, 6)
    : SEARCH_ITEMS.filter(item => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.tags.some(tag => tag.toLowerCase().includes(q))
        );
      });

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Nach PV-Hardware, Zelltechnik (TOPCon/HJT), 800W Balkonsolar oder Rechner..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-base font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded font-semibold transition-colors"
            >
              Löschen
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 flex-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.path)}
                className="py-3 px-3 hover:bg-amber-50/60 rounded-xl cursor-pointer transition-colors group flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md uppercase tracking-wider group-hover:bg-amber-200 group-hover:text-amber-950 transition-colors">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500">
              <Zap className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-sm font-semibold">Keine PV-Themen oder Rechner zu "{query}" gefunden.</p>
              <p className="text-xs text-slate-400 mt-1">Versuche Begriffe wie „TOPCon“, „Ertragsrechner“, „Speicher“, „800W“ oder „Batteriepass“.</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-3 bg-slate-900 text-slate-400 text-xs flex justify-between items-center border-t border-slate-800">
          <div className="flex items-center gap-2">
            <span className="bg-slate-800 text-amber-400 border border-slate-700 px-1.5 py-0.5 rounded text-[10px] font-mono">⌘K</span>
            <span>Öffnen / Schließen</span>
          </div>
          <div className="text-[11px] text-slate-400">
            * Wattpeak Datenbank • clientseitig &amp; datenschutzkonform
          </div>
        </div>
      </div>
    </div>
  );
}
