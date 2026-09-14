import React, { useState } from 'react';
import { X, TrendingUp } from 'lucide-react';

interface OfferBenchmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKwp: number;
  currentStorageKwh: number;
  currentAnnualBenefitEur: number;
  onApplyCustomPrice: (priceEur: number) => void;
}

export default function OfferBenchmarkModal({
  isOpen,
  onClose,
  currentKwp,
  currentStorageKwh,
  currentAnnualBenefitEur,
  onApplyCustomPrice
}: OfferBenchmarkModalProps) {
  const [offerTotalEur, setOfferTotalEur] = useState<number>(() => Math.round(currentKwp * 1350 + currentStorageKwh * 500));
  const [applied, setApplied] = useState(false);

  if (!isOpen) return null;

  const pricePerKwp = currentKwp > 0 ? Math.round(offerTotalEur / currentKwp) : 0;
  
  // Benchmark classification (Marktübersicht Deutschland 2025/2026, 0% MwSt.)
  let categoryLabel = 'Marktüblich';
  let categoryColor = 'text-amber-700 bg-amber-50 border-amber-300';
  let categoryDesc = 'Der Angebotspreis liegt im soliden Marktdurchschnitt deutscher Fachbetriebe inklusive Gerüst, Montage und Zählerschrankumbau.';

  // Storage adds roughly 450-550 € per kWh to expected cost
  const storageAllowancePerKwp = (currentStorageKwh * 500) / currentKwp;
  const effectivePvOnlyCostPerKwp = Math.max(0, pricePerKwp - storageAllowancePerKwp);

  if (effectivePvOnlyCostPerKwp < 1250) {
    categoryLabel = 'Sehr wirtschaftlich / Günstig';
    categoryColor = 'text-emerald-800 bg-emerald-50 border-emerald-300';
    categoryDesc = 'Dieser Preis liegt unter dem Bundesdurchschnitt. Prüfen Sie, ob Gerüst, Anmeldung beim Netzbetreiber und Zählerumbau im Festpreis enthalten sind.';
  } else if (effectivePvOnlyCostPerKwp > 1650) {
    categoryLabel = 'Überdurchschnittlich teuer';
    categoryColor = 'text-red-800 bg-red-50 border-red-300';
    categoryDesc = 'Dieser Preis ist spürbar höher als der übliche Schnitt. Holen Sie vor Unterschrift mindestens zwei Gegenangebote von regionalen Innungsbetrieben ein.';
  }

  const customPaybackYears = currentAnnualBenefitEur > 0 
    ? Number((offerTotalEur / currentAnnualBenefitEur).toFixed(1)) 
    : null;

  const handleSave = () => {
    onApplyCustomPrice(offerTotalEur);
    setApplied(true);
    setTimeout(() => {
      onClose();
      setApplied(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Angebots-Checker
            </div>
            <h3 className="font-black text-lg text-white">
              Handwerker-Angebot einordnen
            </h3>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-slate-900 text-xs sm:text-sm">
          <p className="text-slate-600 leading-relaxed">
            Geben Sie den schlüsselfertigen Endpreis Ihres Angebots ein. Wir vergleichen den Preis pro kWp mit dem 
            aktuellen Bundesdurchschnitt und berechnen Ihre reale Amortisationsdauer.
          </p>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Angebotspreis schlüsselfertig (netto / 0 % MwSt.)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1000}
                max={60000}
                step={250}
                value={offerTotalEur}
                onChange={(e) => setOfferTotalEur(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-base font-black text-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <span className="text-base font-black text-slate-700">€</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>Für {currentKwp} kWp PV {currentStorageKwh > 0 ? `+ ${currentStorageKwh} kWh Speicher` : ''}</span>
              <span className="font-bold text-slate-900">ca. {pricePerKwp} € / kWp brutto</span>
            </div>
          </div>

          {/* Classification Box */}
          <div className={`p-4 rounded-2xl border ${categoryColor} space-y-1.5`}>
            <div className="flex items-center gap-2 font-black text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Bewertung: {categoryLabel}</span>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              {categoryDesc}
            </p>
          </div>

          {/* Payback with Custom Price */}
          <div className="flex items-center justify-between p-3.5 bg-slate-100 rounded-xl font-mono text-xs">
            <span className="text-slate-600">Amortisation mit Ihrem Angebot:</span>
            <span className="font-black text-slate-950 text-sm">
              {customPaybackYears ? `ca. ${customPaybackYears} Jahre` : 'Über 25 Jahre'}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow-sm transition"
            >
              {applied ? 'Übernommen!' : 'Diesen Preis im Rechner anwenden'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
