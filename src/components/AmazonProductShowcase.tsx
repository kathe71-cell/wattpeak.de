import React, { useState } from 'react';
import { ShoppingBag, Star, Check, ArrowUpRight, Filter } from 'lucide-react';
import { AMAZON_PRODUCTS, getAmazonAffiliateUrl } from '../data/amazonProducts';

export default function AmazonProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Alle Komponenten' },
    { id: 'inverter', label: '800W Inverter' },
    { id: 'storage', label: 'Balkon-Speicher' },
    { id: 'sets', label: 'Komplettsets' },
    { id: 'metering', label: 'Messtechnik & Smart Meter' },
    { id: 'mounting', label: 'Montagesysteme' },
    { id: 'tools', label: 'Werkzeug & Zubehör' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? AMAZON_PRODUCTS
    : AMAZON_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <section id="produkte" className="space-y-8">
      {/* Title and Disclosure */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
            <ShoppingBag className="w-4 h-4 text-amber-500" />
            Ausgewählte Hardware-Referenzen &amp; Marktübersicht
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1">
            Solarpaket I Hardware-Empfehlungen
          </h2>
        </div>
        <div className="text-xs text-slate-500 max-w-md font-mono">
          * Werbehinweis / Partnerlink: Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. 
          Preise und Verfügbarkeiten sind freibleibend.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:inline" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {product.categoryLabel}
                </span>
                {product.badge && (
                  <span className="text-[10px] font-mono font-extrabold text-amber-950 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-slate-950 text-base leading-snug group-hover:text-amber-600 transition-colors">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 mb-3 text-xs font-mono">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                  <span className="font-black text-slate-900 ml-1">{product.rating}</span>
                </div>
                <span className="text-slate-400">({product.reviewCount} Rezensionen)</span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {product.shortDesc}
              </p>

              {/* Specs Bullet Points */}
              <ul className="space-y-1.5 mb-6 text-[11px] font-mono text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range & CTA */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <div className="flex justify-between items-baseline gap-2">
                <span className="text-[10px] uppercase font-mono text-slate-500">Preisspanne</span>
                <span className="text-sm font-black text-slate-950 font-mono whitespace-nowrap">{product.priceRange}&nbsp;*</span>
              </div>

              <a
                href={getAmazonAffiliateUrl(product.searchQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-extrabold text-xs py-2.5 px-3 rounded-xl shadow-sm transition-all"
              >
                Tagespreis bei Amazon.de prüfen *
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-950" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
