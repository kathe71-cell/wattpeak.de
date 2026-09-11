import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Check } from 'lucide-react';
import { SOLAR_CATALOG, getAmazonLink } from '../data/solarCatalog';

export default function SolarComparisonCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeBrand, setActiveBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Alle Komponenten' },
    { id: 'balkon-sets', label: '800W Komplettsets' },
    { id: 'speicher', label: 'Balkon-Speicher' },
    { id: 'inverter', label: 'Mikrowechselrichter' },
    { id: 'module', label: 'Solarmodule' },
    { id: 'metering', label: 'Smart Metering' },
    { id: 'mounting', label: 'Montagesysteme' },
    { id: 'tools', label: 'Werkzeug & Kabel' },
  ];

  const filtered = SOLAR_CATALOG.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesBrand = activeBrand === 'all' || item.brand === activeBrand;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = query === '' || 
      item.name.toLowerCase().includes(query) || 
      item.brandName.toLowerCase().includes(query) ||
      item.setDetails.toLowerCase().includes(query) ||
      item.categoryName.toLowerCase().includes(query);
    return matchesCategory && matchesBrand && matchesSearch;
  });

  return (
    <section id="vergleich" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
      {/* Title & Subtitle */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="bg-amber-100 text-amber-950 border border-amber-300 font-extrabold text-xs uppercase tracking-widest px-3 py-1 rounded">
          Transparenter Hardware-Katalog
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3">
          Der große Photovoltaik- &amp; Komponenten-Vergleich
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Vergleichen Sie 800W Balkonkraftwerke, zertifizierte Mikrowechselrichter, LiFePO4-Speicher und Montagesysteme nach technischen Messwerten und Bestpreisen.
        </p>
      </div>

      {/* SEARCH BAR & FILTERS (Just like optical.de) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
          {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Suche nach Modell, Wechselrichter, Speicher (z. B. Hoymiles, Anker, BLUETTI, EcoFlow, Huawei, Sungrow, Jinko, LONGi, TSUN, Shelly, K2)..."
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
                ? SOLAR_CATALOG.length 
                : SOLAR_CATALOG.filter(c => c.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
              <option value="all">Alle Hersteller ({SOLAR_CATALOG.length})</option>
              <option value="anker">Anker SOLIX</option>
              <option value="apsystems">APSystems</option>
              <option value="bluetti">BLUETTI</option>
              <option value="deye">Deye Solar</option>
              <option value="ecoflow">EcoFlow</option>
              <option value="growatt">Growatt</option>
              <option value="hoymiles">Hoymiles</option>
              <option value="huawei">Huawei FusionSolar</option>
              <option value="jackery">Jackery</option>
              <option value="jasolar">JA Solar</option>
              <option value="jinko">Jinko Solar</option>
              <option value="k2systems">K2 Systems</option>
              <option value="longi">LONGi Solar</option>
              <option value="shelly">Shelly</option>
              <option value="sungrow">Sungrow Power</option>
              <option value="trina">Trina Solar</option>
              <option value="tsun">TSUN Solar</option>
              <option value="zendure">Zendure</option>
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
            className="mt-3 text-xs font-bold text-amber-700 underline"
          >
            Filter zurücksetzen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header Strip */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {prod.categoryName}
                  </span>
                  {prod.badge ? (
                    <span className="bg-amber-100 text-amber-950 font-black text-xs px-2.5 py-1 rounded-md border border-amber-300">
                      {prod.badge}
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-emerald-700 font-bold">
                      {prod.estAnnualYield}
                    </span>
                  )}
                </div>

                {/* Brand & Name Box */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                  <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {prod.brandName}
                  </div>
                  <h3 className="text-lg font-black text-slate-950 mt-1 leading-snug group-hover:text-amber-600 transition-colors">
                    {prod.name}
                  </h3>
                  <div className="text-xs text-slate-600 mt-1 font-medium">
                    {prod.setDetails}
                  </div>
                  <div className="text-[11px] text-amber-600 font-bold mt-2 flex items-center gap-1">
                    <span>{prod.rating}</span>
                  </div>
                </div>

                {/* Tech Specs Matrix */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">Leistung / Input</span>
                    <span className="font-extrabold text-slate-900">{prod.powerWp}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">Effizienz / Kapazität</span>
                    <span className="font-extrabold text-emerald-700">{prod.efficiencyOrCapacity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">Technologie</span>
                    <span className="font-bold text-slate-800">{prod.cellTypeOrTech}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">Garantie</span>
                    <span className="font-bold text-slate-800">{prod.warranty}</span>
                  </div>
                </div>

                {/* Key Highlights */}
                <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                  {prod.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Amazon CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">
                    Marktpreis-Orientierung
                  </span>
                  <span className="text-xl font-black text-slate-950 font-mono whitespace-nowrap">
                    {prod.priceRange}&nbsp;*
                  </span>
                </div>

                <a
                  href={getAmazonLink(prod.amazonQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow"
                >
                  <ShoppingCart className="w-4 h-4 text-slate-950" />
                  <span>Tagespreis bei Amazon.de prüfen *</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center text-xs text-slate-500 pt-3 font-mono max-w-4xl mx-auto leading-relaxed space-y-1.5">
        <div>
          * Werbelink / Partnerlink: Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. Angezeigte Preisspannen basieren auf Marktbeobachtungen und dienen als unverbindliche Orientierung. Der verbindliche Endpreis wird auf Amazon.de zum Zeitpunkt des Kaufs ausgewiesen.
        </div>
        <div>
          Für bestimmte Photovoltaikanlagen und wesentliche Komponenten gilt gem. § 12 Abs. 3 UStG unter den gesetzlichen Voraussetzungen für private Betreiber auf Wohngebäuden der Nullsteuersatz (0 % MwSt.). Universelles Zubehör, Werkzeuge oder gewerbliche Nutzung unterliegen regulär 19 % MwSt. Herstellergarantien gelten nach den Bedingungen des jeweiligen Herstellers; gesetzliche Gewährleistungsrechte bleiben hiervon unberührt.
        </div>
      </div>
    </section>
  );
}
