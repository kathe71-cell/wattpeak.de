/**
 * WATTPEAK.DE ZENTRALE RECHNER-ANNAHMEN & DEFAULTS
 * 
 * Single Source of Truth für alle Rechner, Simulatoren und Vergleiche
 * auf der gesamten Plattform (Startseite, /anlagen-vergleich, /ertragsrechner).
 * 
 * Jeder Parameter ist belegt, mit Quelle, Einheit, Wertebereich und Formel dokumentiert.
 * 
 * Stand: Oktober 2026
 */

import { getEegTariffEurPerKwh } from './eeg-rates';

export interface CalculationFactorDocumentation {
  name: string;
  symbol: string;
  unit: string;
  defaultValue: number | string;
  range: string;
  userConfigurable: boolean;
  formula: string;
  source: string;
  sourceDate: string;
  description: string;
}

export const CALCULATOR_FACTORS_DOCUMENTATION: Record<string, CalculationFactorDocumentation> = {
  globalRadiation: {
    name: 'Horizontale Globalstrahlung',
    symbol: 'G_horiz',
    unit: 'kWh/(m²·a)',
    defaultValue: 1080,
    range: '1.000 – 1.250 kWh/(m²·a)',
    userConfigurable: true,
    formula: 'G_horiz(Standort)',
    source: 'Deutscher Wetterdienst (DWD) & PVGIS-5 SARAH2 langjähriges Flächenmittel (1995–2025)',
    sourceDate: 'Stand 2026',
    description: 'Mittlere jährliche Sonnenenergie auf horizontaler Ebene in Deutschland. Nord: ca. 1.005, Mitte: ca. 1.080, Süd: bis zu 1.245 kWh/m².',
  },
  orientationFactor: {
    name: 'Geometrischer Ausrichtungsfaktor',
    symbol: 'f_orient',
    unit: 'Faktor (dimensionslos)',
    defaultValue: 1.10,
    range: '0,65 – 1,14',
    userConfigurable: true,
    formula: 'f_orient(Neigung, Azimut) basierend auf Sonnenstandskurven (PVGIS-5)',
    source: 'PVGIS-5 Strahlungsdatenbank & DIN EN IEC 60904-3',
    sourceDate: 'Stand 2026',
    description: 'Schrägstellung und Himmelsrichtung verändern die empfangene Einstrahlung. Süd 30–35° erreicht in Deutschland das Ertragsmaximum (+10 bis +14 %).',
  },
  performanceRatio: {
    name: 'Performance Ratio (Systemnutzungsgrad)',
    symbol: 'PR',
    unit: '%',
    defaultValue: 84.0,
    range: '80 – 88 %',
    userConfigurable: false,
    formula: 'PR = η_WR · (1 - Verluste_DC_AC) · (1 - Verluste_Temp) · (1 - Verluste_Schmutz)',
    source: 'Fraunhofer ISE Photovoltaics Report & VDI 4650',
    sourceDate: 'Stand 2026',
    description: 'Realer Wirkungsgrad des Gesamtsystems unter Einbeziehung von Wechselrichter-Wirkungsgrad (~97,5 %), Leitungsverlusten (~1,5 %) und betriebsbedingter Erwärmung.',
  },
  temperatureCoefficient: {
    name: 'Temperaturkoeffizient',
    symbol: 'γ_Pmp',
    unit: '%/K',
    defaultValue: -0.30,
    range: '-0,26 bis -0,36 %/K',
    userConfigurable: true,
    formula: 'ΔP_temp = γ_Pmp · (T_Zelle - 25 °C)',
    source: 'Herstellerdatenblätter N-Type TOPCon / HJT / PERC unter STC (DIN EN IEC 60904-3)',
    sourceDate: 'Stand 2026',
    description: 'Leistungsabfall von Silizium-Solarzellen bei Erwärmung über die Standard-Testbedingung (25 °C). N-Type TOPCon (-0,30 %/K) und HJT (-0,26 %/K) sind deutlich hitzestabiler als PERC (-0,36 %/K).',
  },
  electricityPrice: {
    name: 'Arbeitspreis Haushaltsstrom',
    symbol: 'P_strom',
    unit: '€/kWh',
    defaultValue: 0.36,
    range: '0,25 – 0,55 €/kWh',
    userConfigurable: true,
    formula: 'Ersparnis_Eigenverbrauch = E_self_used · P_strom',
    source: 'BDEW-Strompreisanalyse Deutschland (Haushalte)',
    sourceDate: 'Stand 2026',
    description: 'Verbrauchsabhängiger Brutto-Arbeitspreis inklusive Netzentgelten, Konzessionsabgaben, Steuern und Umlagen.',
  },
  feedInTariff: {
    name: 'Gesetzliche EEG-Einspeisevergütung',
    symbol: 'EEG_Tarif',
    unit: '€/kWh',
    defaultValue: 0.0770,
    range: '0,00 – 0,1222 €/kWh',
    userConfigurable: true,
    formula: 'Erlös_Einspeisung = E_feed · EEG_Tarif(kWp)',
    source: 'Bundesnetzagentur EEG-Fördersätze für Inbetriebnahmen ab 01.08.2026 gem. § 49 EEG',
    sourceDate: 'August–Dezember 2026',
    description: 'Feste gesetzliche Vergütung für 20 Kalenderjahre. Für Dachanlagen bis 10 kWp Teileinspeisung: 7,70 ct/kWh. Für Stecker-Solargeräte (Balkon): 0,00 ct/kWh unentgeltlich nach § 8 Abs. 5a EEG.',
  },
  storageRoundtripEfficiency: {
    name: 'Batterie Roundtrip-Wirkungsgrad',
    symbol: 'η_bat_roundtrip',
    unit: '%',
    defaultValue: 88.0,
    range: '84 – 92 %',
    userConfigurable: false,
    formula: 'E_dis = E_char · η_bat_roundtrip; E_loss = E_char - E_dis',
    source: 'HTW Berlin Stromspeicher-Inspektion (LiFePO4-Heimspeicher & Balkonsysteme)',
    sourceDate: 'Stand 2026',
    description: 'Gesamtwirkungsgrad für den Lade- und Entladezyklus inklusive Batteriemanagementsystem (BMS), elektrochemischer Verluste und AC/DC-Wandlung (~12 % physikalischer Wandlungsverlust).',
  },
  storageUsableDod: {
    name: 'Nutzbare Entladetiefe (Depth of Discharge)',
    symbol: 'DoD',
    unit: '%',
    defaultValue: 92.0,
    range: '85 – 95 %',
    userConfigurable: false,
    formula: 'C_nutzbar = C_nenn · DoD',
    source: 'Herstellerangaben LiFePO4-Zellen (Anker, EcoFlow, BYD)',
    sourceDate: 'Stand 2026',
    description: 'Vom Batteriemanagementsystem freigegebener Kapazitätsbereich zum Schutz vor Tiefentladung und zur Schonung der Zellen.',
  },
  co2Factor: {
    name: 'CO2-Vermeidungsfaktor deutscher Strommix',
    symbol: 'f_co2',
    unit: 'g CO2/kWh',
    defaultValue: 380,
    range: '350 – 420 g/kWh',
    userConfigurable: false,
    formula: 'CO2_gespart = (E_gen · f_co2) / 1000',
    source: 'Umweltbundesamt (UBA) – Emissionsbilanz erneuerbarer Energieträger',
    sourceDate: 'Stand 2026',
    description: 'Durch Solarstromerzeugung verdrängter CO2-Ausstoß im bundesdeutschen Verbundnetz.',
  },
  operatingCostRate: {
    name: 'Jährliche Betriebskosten-Pauschale',
    symbol: 'k_op',
    unit: '% der Investition / Jahr',
    defaultValue: 1.0,
    range: '0,5 – 1,5 %/Jahr',
    userConfigurable: true,
    formula: 'K_betrieb = Investition · k_op',
    source: 'VDI 2067 / Fraunhofer ISE Wirtschaftlichkeitsstudien Photovoltaik',
    sourceDate: 'Stand 2026',
    description: 'Kosten für turnusmäßige Wartung, Versicherung und Zählerplatzbetrieb. Bei Balkonkraftwerken standardmäßig mit 0,0 % angesetzt.',
  },
};

/**
 * Zentrale Standardwerte für Rechner & Simulatoren
 */
export const CALCULATOR_DEFAULTS = {
  electricityPriceEur: 0.36,
  annualConsumptionDachKwh: 3500,
  annualConsumptionBalkonKwh: 2000,
  storageRoundtripEfficiency: 0.88,
  storageUsableDod: 0.92,
  co2FactorGPerKwh: 380,
  defaultFeedInTariffRoofSmallEur: getEegTariffEurPerKwh(5.0, 'eeg_partial'),  // 0.0770 €/kWh
  defaultFeedInTariffRoofLargeEur: getEegTariffEurPerKwh(10.0, 'eeg_partial'), // 0.0770 €/kWh
  defaultFeedInTariffRoofAbove10Eur: getEegTariffEurPerKwh(12.0, 'eeg_partial'), // 0.0666 €/kWh
  defaultFeedInTariffBalconyEur: 0.00, // Unentgeltlich nach § 8 Abs. 5a EEG
  operatingCostRateRooftop: 0.01,
  operatingCostRateBalcony: 0.00,
  dwdReferenceAverageKwhM2: 1050, // Bundesweiter Mittelwert DWD
} as const;

/**
 * Transparenter Hinweis zur Modellrechnung
 */
export const MODEL_DISCLAIMER_TEXT = 
  '* Modellrechnung: Alle Ertrags-, Autarkie- und Amortisationsangaben basieren auf physikalischen Näherungsmodellen ' +
  'sowie langjährigen Globalstrahlungsdaten (DWD/PVGIS). Sie stellen keine verbindliche Ertrags- oder Renditegarantie dar. ' +
  'Reale Erträge hängen vom individuellen Lastprofil, Wetterverlauf, Verschattung und den tatsächlichen Installationsbedingungen ab.';
