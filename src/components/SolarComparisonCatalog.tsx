import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Check, Scale, X, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { UNIFIED_PRODUCTS, UnifiedProduct, ProductCategory, getAmazonSearchUrl } from '../data/products';

export default function SolarComparisonCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeBrand, setActiveBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Side-by-side comparison state (max 3 items)
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  const categories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Alle Komponenten' },
    { id: 'complete_set', label: '800W Komplettsets' },
    { id: 'storage_system', label: 'Balkon- & Heimspeicher' },
    { id: 'storage_expansion', label: 'Zusatzbatterien' },
    { id: 'inverter', label: 'Mikrowechselrichter' },
    { id: 'module', label: 'Solarmodule' },
    { id: 'metering', label: 'Smart Metering' },
    { id: 'mounting', label: 'Montagesysteme' },
  ];

  // Distinct brand list
  const brands = Array.from(new Set(UNIFIED_PRODUCTS.map((p) => p.brand))).sort();

  const toggleCompare = (id: string) => {
    if (comparedProductIds.includes(id)) {
      setComparedProductIds(comparedProductIds.filter((item) => item !== id));
    } else {
      if (comparedProductIds.length >= 3) {
        alert('Sie können maximal 3 Komponenten gleichzeitig vergleichen.');
        return;
      }
      setComparedProductIds([...comparedProductIds, id]);
    }
  };

  const filtered = UNIFIED_PRODUCTS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesBrand = activeBrand === 'all' || item.brand === activeBrand;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = query === '' || 
      item.name.toLowerCase().includes(query) || 
      item.brandName.toLowerCase().includes(query) ||
      item.shortDesc.toLowerCase().includes(query) ||
      item.categoryLabel.toLowerCase().includes(query);
    return matchesCategory && matchesBrand && matchesSearch;
  });

  const comparedProducts: UnifiedProduct[] = comparedProductIds
    .map((id) => UNIFIED_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is UnifiedProduct => Boolean(p));

  return (
    <section id="vergleich" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
      {/* Title & Subtitle */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <span className="bg-amber-100 text-amber-950 border border-amber-300 font-extrabold text-xs uppercase tracking-widest px-3 py-1 rounded">
          Geprüfte Herstellerdaten · Stand: Februar 2025
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3">
          Photovoltaik- &amp; Komponenten-Katalog
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Vergleichen Sie zertifizierte Mikrowechselrichter, 800W-Balkonsets, LiFePO4-Speichersysteme und Montagesets nach überprüften Messwerten und Marktpreis-Richtwerten.
        </p>
      </div>

      {/* SEARCH BAR & FILTERS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Suche nach Modell, Hersteller oder Spezifikation (z. B. HMS-800W, Solarbank 2, Shelly Pro 3EM, bifazial)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-12 pr-4 py-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-slate-100">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider self-center mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amber-600" />
              <span>Kategorie:</span>
            </span>
            {categories.map((cat) => {
              const count = cat.id === 'all' 
                ? UNIFIED_PRODUCTS.length 
                : UNIFIED_PRODUCTS.filter(c => c.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-slate-950 text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Brand Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hersteller:</span>
            <select
              value={activeBrand}
              onChange={(e) => setActiveBrand(e.target.value)}
              className="bg-slate-100 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">Alle Hersteller ({UNIFIED_PRODUCTS.length})</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {UNIFIED_PRODUCTS.find(p => p.brand === b)?.brandName || b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS GRID */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          <p className="text-base font-bold text-slate-700">Keine Komponenten für Ihre Filtereinstellungen gefunden.</p>
          <button
            onClick={() => { setActiveCategory('all'); setActiveBrand('all'); setSearchQuery(''); }}
            className="mt-3 text-xs font-bold text-amber-700 underline cursor-pointer"
          >
            Filter zurücksetzen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prod) => {
            const isCompared = comparedProductIds.includes(prod.id);
            return (
              <div
                key={prod.id}
                className={`bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative ${
                  isCompared ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Category & Status Strip */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                      {prod.categoryLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleCompare(prod.id)}
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                        isCompared 
                          ? 'bg-amber-500 text-slate-950 border-amber-500' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      <Scale className="w-3 h-3" />
                      <span>{isCompared ? 'Im Vergleich' : '+ Vergleichen'}</span>
                    </button>
                  </div>

                  {/* Brand & Name */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                    <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      {prod.brandName}
                    </div>
                    <h3 className="text-lg font-black text-slate-950 mt-1 leading-snug group-hover:text-amber-600 transition-colors">
                      {prod.name}
                    </h3>
                    <div className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                      {prod.shortDesc}
                    </div>

                    {/* Compatibility Warning for Expansions */}
                    {prod.compatibility.requiresMasterSystem && (
                      <div className="mt-2.5 p-2 bg-amber-50 border border-amber-300 rounded-lg text-[11px] text-amber-950 flex items-start gap-1.5 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{prod.compatibility.masterSystemNote}</span>
                      </div>
                    )}
                  </div>

                  {/* Tech Specs Matrix */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase">Leistung / Input</span>
                      <span className="font-extrabold text-slate-900">{prod.powerWp || prod.acPowerWatts || '–'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase">Kapazität / Effizienz</span>
                      <span className="font-extrabold text-emerald-700">{prod.capacityKwh || prod.efficiency || '–'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase">Technologie</span>
                      <span className="font-bold text-slate-800">
                        {prod.cellTechnology || (prod.category.startsWith('storage') ? 'LiFePO4 Speicher' : prod.category === 'inverter' ? 'Mikrowechselrichter' : 'Komponenten-Set')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase">Garantie</span>
                      <span className="font-bold text-slate-800">{prod.warranty}</span>
                    </div>
                  </div>

                  {/* Technical Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {prod.technicalBadges.map((b, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Specs list */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                    {prod.specs.slice(0, 3).map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Amazon Search Link */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">
                      {prod.priceReferenceDate}
                    </span>
                    <span className="text-xl font-black text-slate-950 font-mono whitespace-nowrap">
                      {prod.priceRange}
                    </span>
                  </div>

                  <a
                    href={getAmazonSearchUrl(prod.amazonSearchQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-slate-950" />
                    <span>Hardware bei Amazon ansehen *</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* STICKY COMPARISON DRAWER BAR (WHEN PRODUCTS SELECTED) */}
      {comparedProducts.length > 0 && (
        <aside aria-label="Vergleichsleiste" className="fixed bottom-14 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 max-w-xl bg-slate-950 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-4 animate-in slide-in-from-bottom">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center">
              {comparedProducts.length}
            </div>
            <div>
              <div className="text-xs font-bold text-white">Komponenten im Direktvergleich</div>
              <div className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-sm">
                {comparedProducts.map(p => p.name.split(' ')[0]).join(', ')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowComparisonModal(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Tabelle öffnen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setComparedProductIds([])}
              className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              title="Vergleich leeren"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* COMPARISON MODAL */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-amber-700">1:1 Hardware-Gegenüberstellung</span>
                <h3 className="text-2xl font-black text-slate-950 mt-0.5">Komponenten im direkten Vergleich</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowComparisonModal(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-950 transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-3 bg-slate-50 text-slate-500 font-bold uppercase w-1/4">Kriterium</th>
                    {comparedProducts.map((p) => (
                      <th key={p.id} className="p-3 font-bold text-slate-950 w-1/3">
                        <div className="text-[10px] text-slate-500 uppercase">{p.brandName}</div>
                        <div className="text-sm font-black font-sans leading-tight mt-0.5">{p.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 bg-slate-50 text-slate-500 font-bold">Kategorie</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 font-semibold text-slate-800">{p.categoryLabel}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50 text-slate-500 font-bold">Leistung / Input</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 font-extrabold text-slate-950">{p.powerWp || p.acPowerWatts || '–'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50 text-slate-500 font-bold">Kapazität / Effizienz</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 font-extrabold text-emerald-700">{p.capacityKwh || p.efficiency || '–'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50 text-slate-500 font-bold">Zellchemie / Technik</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 text-slate-700">
                        {p.cellTechnology || (p.category.startsWith('storage') ? 'LiFePO4 Speicher' : p.category === 'inverter' ? 'Mikrowechselrichter' : 'Komponenten-Set')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50 text-slate-500 font-bold">Herstellergarantie</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 text-slate-900 font-bold">{p.warranty}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50 text-slate-500 font-bold">Marktpreis-Richtwert</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 text-base font-black text-slate-950">{p.priceRange}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50 text-slate-500 font-bold">Kompatibilität &amp; Netz</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 text-[11px] text-slate-600">
                        {p.compatibility.gridNorm} · {p.compatibility.plugType}
                        {p.compatibility.requiresMasterSystem && (
                          <span className="block text-amber-700 font-bold mt-1">⚠️ {p.compatibility.masterSystemNote}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50 text-slate-500 font-bold">Aktion</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <a
                          href={getAmazonSearchUrl(p.amazonSearchQuery)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-3 py-2 rounded-xl transition cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Bei Amazon ansehen *</span>
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimers */}
      <div className="text-center text-xs text-slate-500 pt-3 font-mono max-w-4xl mx-auto leading-relaxed space-y-1.5">
        <div>
          * Werbelink / Partnerlink: Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. Angezeigte Preisspannen basieren auf Marktbeobachtungen (Stand: Februar 2025) und dienen als unverbindliche Orientierung.
        </div>
        <div>
          Für Photovoltaikanlagen und wesentliche Komponenten gilt gem. § 12 Abs. 3 UStG unter den gesetzlichen Voraussetzungen für private Betreiber auf Wohngebäuden der Nullsteuersatz (0 % MwSt.).
        </div>
      </div>
    </section>
  );
}

