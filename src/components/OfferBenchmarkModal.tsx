import React, { useState } from 'react';
import { X, TrendingUp } from 'lucide-react';
import { evaluatePvOffer } from '../utils/offerEvaluation';

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

  const [taxRatePercent, setTaxRatePercent] = useState<number>(0);

  const evaluation = evaluatePvOffer({
    kwp: currentKwp,
    storageKwh: currentStorageKwh,
    totalOfferPriceEur: offerTotalEur,
    taxRatePercent
  });

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
              PV-Angebots-Check
            </div>
            <h3 className="font-black text-lg text-white">
              Handwerker-Angebot einordnen
            </h3>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            aria-label="Schließen"
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-slate-900 text-xs sm:text-sm">
          <p className="text-slate-600 leading-relaxed">
            Geben Sie den tatsächlichen Endpreis Ihres vorliegenden Angebots ein, um die rechnerischen Kennzahlen und die Amortisation mit Ihren Rechnerwerten zu vergleichen.
          </p>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Angebotspreis (Rechnungsbetrag)
              </label>
              <div className="flex items-center gap-1 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => setTaxRatePercent(0)}
                  className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                    taxRatePercent === 0 
                      ? 'bg-amber-100 text-amber-950 border border-amber-300' 
                      : 'text-slate-500 hover:text-slate-950'
                  }`}
                >
                  0 % USt
                </button>
                <button
                  type="button"
                  onClick={() => setTaxRatePercent(19)}
                  className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                    taxRatePercent === 19 
                      ? 'bg-amber-100 text-amber-950 border border-amber-300' 
                      : 'text-slate-500 hover:text-slate-950'
                  }`}
                >
                  19 % USt
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min={0}
                max={120000}
                step={250}
                value={offerTotalEur}
                onChange={(e) => setOfferTotalEur(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-base font-black text-slate-950 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <span className="text-base font-black text-slate-700">€</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>Für {currentKwp} kWp PV {currentStorageKwh > 0 ? `+ ${currentStorageKwh} kWh Speicher` : ''}</span>
              <span className="font-bold text-slate-900">{evaluation.rawPricePerKwp.toLocaleString('de-DE')} € / kWp brutto</span>
            </div>
          </div>

          {/* 3-Tier Classification Preview */}
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 font-mono text-[11px] uppercase text-slate-600">
                1. Berechnete Kennwerte:
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Rechn. Gesamtpreis je kWp:</span>
                <strong className="font-mono text-slate-950">{evaluation.rawPricePerKwp.toLocaleString('de-DE')} €/kWp</strong>
              </div>
              {currentStorageKwh > 0 && (
                <div className="flex justify-between text-slate-700">
                  <span>Speicher-zu-PV Verhältnis:</span>
                  <strong className="font-mono text-slate-950">{evaluation.storageToPvRatio} kWh/kWp</strong>
                </div>
              )}
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200 font-mono">
                {evaluation.taxNote}
              </div>
            </div>

            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1 text-slate-800">
              <div className="font-bold text-emerald-950 font-mono text-[11px] uppercase">
                2. Plausibilisierter Ertragskorridor:
              </div>
              <p className="text-[11px] text-emerald-900">
                Die Wattpeak-Modellrechnung errechnet für diese Generatorleistung eine typische Referenzerzeugung von ca. <strong>{evaluation.engineCalculatedAnnualYieldKwh.toLocaleString('de-DE')} kWh/Jahr</strong> ({evaluation.engineSpecificYieldKwhPerKwp} kWh/kWp).
              </p>
            </div>

            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-[10px] text-slate-500 leading-relaxed">
              <strong>3. Nicht bewertbar:</strong> Ob dieser Gesamtpreis für Ihre Region marktüblich ist, hängt von individuellen Gerüstkosten, Dachgegebenheiten und Zählerschrankarbeiten ab, die nur vor Ort seriös beurteilt werden können.
            </div>
          </div>

          {/* Payback with Custom Price */}
          <div className="flex items-center justify-between p-3.5 bg-slate-100 rounded-xl font-mono text-xs">
            <span className="text-slate-600">Amortisation mit diesem Preis:</span>
            <span className="font-black text-slate-950 text-sm">
              {customPaybackYears ? `ca. ${customPaybackYears} Jahre` : 'Über 25 Jahre'}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow-sm transition cursor-pointer"
            >
              {applied ? 'Übernommen!' : 'Diesen Preis im Rechner anwenden'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition cursor-pointer"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
