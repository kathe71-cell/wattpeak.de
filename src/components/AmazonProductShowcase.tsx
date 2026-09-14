import React from 'react';
import { ShoppingBag, ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { UNIFIED_PRODUCTS, getAmazonSearchUrl } from '../data/products';

export default function AmazonProductShowcase() {
  // Show leading 4-6 hardware highlights
  const showcaseProducts = UNIFIED_PRODUCTS.slice(0, 4);

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-900 font-mono text-xs font-bold border border-slate-200 mb-3">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
            Geprüfte Komponenten nach DIN &amp; VDE
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Passende Hardware &amp; Speicher-Kits
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-md font-mono">
          Orientierungswerte aus Fachhandels- &amp; Marktdaten. Transparente Verlinkung zur tagesaktuellen Suche bei Amazon.de.
        </p>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {showcaseProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {product.categoryLabel}
                </span>
                {product.technicalBadges[0] && (
                  <span className="text-[10px] font-mono font-bold text-slate-800 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-md">
                    {product.technicalBadges[0]}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-slate-950 text-base leading-snug group-hover:text-amber-600 transition-colors">
                {product.name}
              </h3>

              {/* Verified Specs Notice (No fake reviews) */}
              <div className="flex items-center gap-1.5 mt-2 mb-3 text-[11px] font-mono text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Herstellerangaben geprüft</span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {product.shortDesc}
              </p>

              {/* Specs Bullet Points */}
              <ul className="space-y-1.5 mb-6 text-[11px] font-mono text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {product.specs.slice(0, 3).map((spec, i) => (
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
                <span className="text-[10px] uppercase font-mono text-slate-500">Orientierung</span>
                <span className="text-sm font-black text-slate-950 font-mono whitespace-nowrap">{product.priceRange}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono -mt-2">
                {product.priceReferenceDate}
              </div>

              <a
                href={getAmazonSearchUrl(product.amazonSearchQuery)}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-extrabold text-xs py-2.5 px-3 rounded-xl shadow-sm transition-all"
              >
                Bei Amazon.de suchen *
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-950" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-[10px] text-slate-500 font-mono">
        * Werbelink / Partnerlink: Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. Preise unterliegen Marktschwankungen der Händler.
      </div>
    </section>
  );
}
