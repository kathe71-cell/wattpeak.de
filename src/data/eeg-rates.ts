/**
 * WATTPEAK.DE ZENTRALE EEG-VERGÜTUNGSSÄTZE
 * 
 * Quelle: Bundesnetzagentur (BNetzA) – EEG-Fördersätze
 * Gesetzliche Grundlage: Erneuerbare-Energien-Gesetz (EEG 2023), §§ 21, 48, 49
 * 
 * Gültigkeitszeitraum: 01.08.2026 bis 31.01.2027 (Stand: August–Dezember 2026)
 * Degressionsrhythmus: Halbjährlich zum 01.02. und 01.08. gem. § 49 EEG
 */

export interface EegRateTier {
  maxKwp: number; // Obere Leistungsgrenze in kWp (z.B. 10 für <= 10 kWp)
  label: string;
  tariffCtPerKwh: number; // in Cent/kWh
  tariffEurPerKwh: number; // in EUR/kWh
}

export interface EegPeriodRates {
  validFrom: string; // ISO Datum YYYY-MM-DD
  validTo: string;   // ISO Datum YYYY-MM-DD
  source: string;
  sourceDate: string;
  partialFeedIn: EegRateTier[]; // Überschusseinspeisung / Teileinspeisung
  fullFeedIn: EegRateTier[];    // Volleinspeisung
}

/**
 * Aktuell gültige EEG-Vergütungssätze für Inbetriebnahmen ab 01.08.2026
 * (Quelle: Bundesnetzagentur Veröffentlichung gemäß § 49 EEG)
 */
export const CURRENT_EEG_RATES: EegPeriodRates = {
  validFrom: '2026-08-01',
  validTo: '2027-01-31',
  source: 'Bundesnetzagentur EEG-Fördersätze (Veröffentlichung gem. § 49 EEG)',
  sourceDate: 'August–Dezember 2026',
  partialFeedIn: [
    {
      maxKwp: 10,
      label: 'bis 10 kWp',
      tariffCtPerKwh: 7.70,
      tariffEurPerKwh: 0.0770,
    },
    {
      maxKwp: 40,
      label: '10 bis 40 kWp',
      tariffCtPerKwh: 6.66,
      tariffEurPerKwh: 0.0666,
    },
    {
      maxKwp: 100,
      label: '40 bis 100 kWp',
      tariffCtPerKwh: 5.44,
      tariffEurPerKwh: 0.0544,
    },
  ],
  fullFeedIn: [
    {
      maxKwp: 10,
      label: 'bis 10 kWp',
      tariffCtPerKwh: 12.22,
      tariffEurPerKwh: 0.1222,
    },
    {
      maxKwp: 40,
      label: '10 bis 40 kWp',
      tariffCtPerKwh: 10.24,
      tariffEurPerKwh: 0.1024,
    },
    {
      maxKwp: 100,
      label: '40 bis 100 kWp',
      tariffCtPerKwh: 10.24,
      tariffEurPerKwh: 0.1024,
    },
  ],
};

/**
 * Historische Degressionstabelle (Halbjährliche 1-%-Degression gem. § 49 EEG)
 */
export const EEG_DEGRESSION_HISTORY = [
  {
    period: '01.02.2024 – 31.07.2024',
    partialUpTo10Ct: 8.11,
    fullUpTo10Ct: 12.87,
    status: 'Archiv',
  },
  {
    period: '01.08.2024 – 31.01.2025',
    partialUpTo10Ct: 8.03,
    fullUpTo10Ct: 12.74,
    status: 'Archiv',
  },
  {
    period: '01.02.2025 – 31.07.2025',
    partialUpTo10Ct: 7.95,
    fullUpTo10Ct: 12.61,
    status: 'Archiv',
  },
  {
    period: '01.08.2025 – 31.01.2026',
    partialUpTo10Ct: 7.87,
    fullUpTo10Ct: 12.48,
    status: 'Archiv',
  },
  {
    period: '01.02.2026 – 31.07.2026',
    partialUpTo10Ct: 7.79,
    fullUpTo10Ct: 12.36,
    status: 'Archiv',
  },
  {
    period: '01.08.2026 – 31.01.2027',
    partialUpTo10Ct: 7.70,
    fullUpTo10Ct: 12.22,
    status: 'Aktuell gültig',
  },
];

/**
 * Ermittelt den exakten Vergütungssatz in EUR/kWh anhand der Anlagengröße
 * und der gewählten Einspeiseart.
 */
export function getEegTariffEurPerKwh(
  kwp: number,
  remunerationType: 'uncompensated' | 'eeg_partial' | 'eeg_full' = 'eeg_partial'
): number {
  if (remunerationType === 'uncompensated') {
    return 0.00;
  }

  const tiers = remunerationType === 'eeg_full'
    ? CURRENT_EEG_RATES.fullFeedIn
    : CURRENT_EEG_RATES.partialFeedIn;

  for (const tier of tiers) {
    if (kwp <= tier.maxKwp) {
      return tier.tariffEurPerKwh;
    }
  }

  // Fallback für Anlagen > 100 kWp (Standard-Oberwert)
  return tiers[tiers.length - 1].tariffEurPerKwh;
}
