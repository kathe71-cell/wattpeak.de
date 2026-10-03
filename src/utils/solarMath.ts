/**
 * WATTPEAK.DE UNIFIED SOLAR CALCULATION ENGINE
 * 
 * Physikalisch konsistentes, belegbares Berechnungsmodell für Photovoltaik-Ertrag,
 * Speicherbilanz, Autarkiegrad und Wirtschaftlichkeit nach DIN EN IEC 60904-3
 * und langjährigen DWD-/PVGIS-Globalstrahlungsdaten.
 * 
 * Modellversion: v2.5 (Stand: 2026)
 */

export type RegionZone = 'nord' | 'mitte' | 'sued';

export type MountingType = 
  | 'pitched'         // Schrägdach (Aufdach-Montage, gute Hinterlüftung)
  | 'flat_south'      // Flachdach (Süd-Aufständerung ~15-20°)
  | 'flat_ew'         // Flachdach (Ost-West Aufständerung ~10-15°)
  | 'facade_balcony'  // Balkongeländer / Fassade (vertikal 75-90°)
  | 'ground';         // Freifläche / Garten (optimale Belüftung)

export type SystemType = 'balcony' | 'rooftop' | 'retrofit_storage';

export type LoadProfileType = 'standard' | 'daytime' | 'evening';

export type FeedInRemunerationType = 'uncompensated' | 'eeg_partial' | 'eeg_full';

export interface LocationPreset {
  id: string;
  name: string;
  region: RegionZone;
  annualRadiationKwhM2: number; // Langjähriger Mittelwert Globalstrahlung horizontal (DWD/PVGIS)
  postalPrefix: string;
}

export const LOCATION_PRESETS: LocationPreset[] = [
  { id: 'hamburg', name: 'Hamburg / Schleswig-Holstein', region: 'nord', annualRadiationKwhM2: 1005, postalPrefix: '20-25' },
  { id: 'berlin', name: 'Berlin / Brandenburg', region: 'nord', annualRadiationKwhM2: 1045, postalPrefix: '10-16' },
  { id: 'hannover', name: 'Hannover / Niedersachsen', region: 'nord', annualRadiationKwhM2: 1020, postalPrefix: '30-31' },
  { id: 'koeln', name: 'Köln / Ruhrgebiet / NRW', region: 'mitte', annualRadiationKwhM2: 1055, postalPrefix: '40-53' },
  { id: 'frankfurt', name: 'Frankfurt / Hessen', region: 'mitte', annualRadiationKwhM2: 1095, postalPrefix: '60-65' },
  { id: 'dresden', name: 'Dresden / Leipzig / Sachsen', region: 'mitte', annualRadiationKwhM2: 1085, postalPrefix: '01-04' },
  { id: 'stuttgart', name: 'Stuttgart / Baden-Württemberg', region: 'sued', annualRadiationKwhM2: 1175, postalPrefix: '70-76' },
  { id: 'muenchen', name: 'München / Südbayern', region: 'sued', annualRadiationKwhM2: 1215, postalPrefix: '80-86' },
  { id: 'freiburg', name: 'Freiburg / Breisgau (Sonnenmaximum)', region: 'sued', annualRadiationKwhM2: 1245, postalPrefix: '79' },
];

export const REGION_GLOBAL_RADIATION: Record<RegionZone, number> = {
  nord: 1005,   // Norddeutschland (Küste bis Magdeburg) ~1.000–1.020 kWh/m²
  mitte: 1080,  // Mitteldeutschland (NRW, Hessen, Thüringen, Sachsen) ~1.080 kWh/m²
  sued: 1200,   // Süddeutschland (Baden-Württemberg, Bayern) ~1.200 kWh/m²
};

export const MOUNTING_OPTIONS: Record<MountingType, {
  name: string;
  defaultTilt: number;
  ventilationDeltaT: number; // Erwärmungszuschlag über Umgebungstemperatur (°C)
  desc: string;
}> = {
  pitched: {
    name: 'Schrägdach (Aufdach)',
    defaultTilt: 35,
    ventilationDeltaT: 23, // Standard-Hinterlüftung bei Ziegeldach
    desc: 'Klassische Montage parallel zur Dachneigung mit ca. 8–12 cm Hinterlüftungsspalt.'
  },
  flat_south: {
    name: 'Flachdach (Süd-Aufständerung)',
    defaultTilt: 15,
    ventilationDeltaT: 20, // Sehr gute Durchströmung
    desc: 'Ballastierte Aufständerung nach Süden mit 10° bis 20° Neigungswinkel.'
  },
  flat_ew: {
    name: 'Flachdach (Ost-West Zick-Zack)',
    defaultTilt: 12,
    ventilationDeltaT: 22,
    desc: 'Platzsparende Schmetterlings-Aufständerung für gleichmäßige Erzeugung morgens und abends.'
  },
  facade_balcony: {
    name: 'Balkongeländer / Fassade (vertikal)',
    defaultTilt: 85,
    ventilationDeltaT: 21,
    desc: 'Senkrechte oder leicht angewinkelte Montage an Geländern oder Wandflächen.'
  },
  ground: {
    name: 'Garten / Freifläche',
    defaultTilt: 30,
    ventilationDeltaT: 18, // Maximale Rundum-Kühlluft
    desc: 'Aufständerung im Garten, auf Garagen oder Carports mit optimaler Luftkühlung.'
  }
};

export const CELL_TECH_PROPERTIES: Record<string, { 
  name: string; 
  tempCoeff: number; // %/K Leistungsabfall je Grad Zelltemperatur über 25 °C
  efficiency: number; 
  desc: string 
}> = {
  topcon: {
    name: 'N-Type TOPCon',
    tempCoeff: -0.30,
    efficiency: 22.8,
    desc: 'Aktueller Industriestandard mit hoher Flächenausbeute und gutem Schwachlichtverhalten.'
  },
  hjt: {
    name: 'Heterojunction (HJT)',
    tempCoeff: -0.26,
    efficiency: 23.5,
    desc: 'Geringster Leistungsabfall bei Sommerhitze und hohe Bifazialität auf der Modulrückseite.'
  },
  ibc: {
    name: 'Back-Contact (IBC / ABC)',
    tempCoeff: -0.28,
    efficiency: 24.2,
    desc: 'Rückseitenkontaktierte Zellen ohne Busbars auf der Vorderseite, maximale Flächenleistung.'
  },
  perc: {
    name: 'Klassisches P-Type PERC',
    tempCoeff: -0.36,
    efficiency: 21.2,
    desc: 'Älterer Halbleiter-Standard mit höherem Leistungsabfall bei steigenden Betriebstemperaturen.'
  }
};

import { getEegTariffEurPerKwh } from '../data/eeg-rates';

/**
 * Gesetzliche EEG-Einspeisevergütung in EUR/kWh
 * Quelle: Bundesnetzagentur, Vergütungssätze für PV-Anlagen (Stand: August–Dezember 2026 gem. § 49 EEG)
 */
export function getDefaultFeedInTariff(kwp: number, systemType: SystemType, remunerationType?: FeedInRemunerationType): number {
  if (systemType === 'balcony' && (!remunerationType || remunerationType === 'uncompensated')) {
    return 0.00; // Unentgeltliche Einspeisung nach § 8 Abs. 5a EEG (Solarpaket I)
  }
  return getEegTariffEurPerKwh(kwp, remunerationType || 'eeg_partial');
}

export interface SolarParams {
  systemType?: SystemType;
  kwp: number;
  inverterAcWatts?: number; // AC-Begrenzung (z.B. 800 W bei Balkon)
  region: RegionZone;
  locationId?: string;
  mountingType?: MountingType;
  tilt: number; // 0 - 90 deg
  azimuth: number; // -90 Ost, 0 Sued, 90 West
  cellType: 'topcon' | 'hjt' | 'ibc' | 'perc';
  shading?: 'none' | 'light' | 'medium';
  annualConsumption: number; // kWh/a
  loadProfile?: LoadProfileType;
  storageKwh: number; // 0 für keinen Speicher
  storageRoundtripEfficiency?: number; // Standard 0.88 (88 % LFP + BMS + WR)
  storageUsableDod?: number; // Standard 0.90 (90 % Nutzkapazität)
  electricityPrice: number; // EUR/kWh verbrauchsabhängiger Arbeitspreis (z.B. 0.36)
  feedInRemunerationType?: FeedInRemunerationType;
  feedInTariff?: number; // EUR/kWh
  customInvestmentEur?: number; // Optional manuelle Angebotskosten
  operatingCostRatePercent?: number; // Jährliche Betriebs-/Wartungskosten (Standard 1.0 %)
  inverterReserveAnnualEur?: number; // Rücklage für WR-Ersatz (Standard 0)
}

export interface EnergyBalance {
  totalAnnualYieldKwh: number;              // Erzeugung E_gen
  directConsumptionKwh: number;             // Direktverbrauch E_dir
  storageChargeKwh: number;                 // In den Speicher geladene Energie E_char
  storageDischargeKwh: number;              // Aus dem Speicher entnommene Energie E_dis
  storageLossKwh: number;                   // Speicherverluste E_loss = E_char - E_dis
  totalSelfUsedKwh: number;                 // Nutzbare Eigenversorgung E_self_used = E_dir + E_dis
  feedInKwh: number;                        // Netzeinspeisung E_feed = E_gen - E_dir - E_char
  gridPurchaseKwh: number;                  // Netzbezug E_grid = E_demand - E_self_used
  annualDemandKwh: number;                  // Strombedarf E_demand
  
  // Eindeutig definierte Quoten gemäß Energiebilanz:
  usableSelfConsumptionRatePercent: number; // Nutzbarer Anteil am PV-Ertrag: E_self_used / E_gen * 100
  generationUtilizationRatePercent: number; // PV-Nutzungsgrad inkl. Speicherverlusten: (E_dir + E_char) / E_gen * 100
  selfConsumptionRatePercent: number;       // Bezieht sich auf den nutzbaren Anteil (usableSelfConsumptionRatePercent)
  autarkyRatePercent: number;               // Autarkiegrad: E_self_used / E_demand * 100
}

export interface EconomicEvaluation {
  annualSavingsAvoidedGridEur: number; // Durch Eigenversorgung vermiedene Stromkosten
  annualFeedInRevenueEur: number;      // Vergütung für Netzeinspeisung
  annualGrossBenefitEur: number;       // Summe Vorteil vor Betriebskosten
  annualOperatingCostEur: number;      // Wartung, Versicherung, Messstellenbetrieb
  annualNetBenefitEur: number;         // Jährlicher Reingewinn / Netto-Vorteil
  estimatedInvestmentEur: number;      // Anschaffungskosten (schlüsselfertig oder DIY)
  isInvestmentCustom: boolean;         // Wurde der Preis manuell eingegeben?
  estimatedPaybackYears: number | null; // Jahre bis Amortisation (null wenn nicht innerhalb von 25 Jahren)
  paybackStatusText: string;           // Verständlicher Status
  co2SavedKgPerYear: number;           // CO2-Einsparung (Strommix ca. 380 g/kWh)
}

export interface StorageDeltaEvaluation {
  hasStorage: boolean;
  storageKwh: number;
  additionalSelfUsedKwh: number;       // Mehrverbrauch durch Speicher ggü. ohne Speicher
  additionalAnnualSavingsEur: number;  // Mehrersparnis durch Speicher
  storageSpecificCostEur: number;      // Reiner Aufpreis für den Speicher
  storagePaybackYears: number | null;  // Amortisation des Speichers allein
  annualStorageCycles: number;         // Berechnete Vollzyklen pro Jahr
}

export interface SolarCalculationResult {
  params: SolarParams;
  balance: EnergyBalance;
  economy: EconomicEvaluation;
  storageDelta: StorageDeltaEvaluation;
  physics: {
    baseRadiationKwhM2: number;
    effectiveRadiationKwhM2: number;
    specificYieldKwhPerKwp: number;
    orientationFactor: number;
    temperatureLossPercent: number;
    performanceRatio: number;
    clippingLossPercent: number;
  };
  withoutStorageBenchmark: {
    totalSelfUsedKwh: number;
    autarkyRatePercent: number;
    usableSelfConsumptionRatePercent: number;
    generationUtilizationRatePercent: number;
    selfConsumptionRatePercent: number;
    annualNetBenefitEur: number;
    estimatedPaybackYears: number | null;
  };
}

/**
 * Standard-Investitionsschätzungen nach deutscher Marktübersicht 2025/2026
 * (0 % MwSt. gem. § 12 Abs. 3 UStG für private Wohnanlagen)
 */
export function estimateMarketInvestmentEur(params: SolarParams): number {
  if (params.customInvestmentEur && params.customInvestmentEur > 0) {
    return Math.round(params.customInvestmentEur);
  }

  const isBalcony = params.systemType === 'balcony' || (params.kwp <= 1.2 && params.mountingType === 'facade_balcony');
  
  if (isBalcony) {
    // Balkonkraftwerk: 1–2 Module (~300–420 €), 4 Module (~550–680 €)
    let baseSet = 350;
    if (params.kwp > 1.4) baseSet = 620;
    else if (params.kwp > 0.9) baseSet = 480;
    else if (params.kwp > 0.5) baseSet = 350;
    else baseSet = 240;

    // Balkonspeicher (LFP-Akkusysteme wie Anker, EcoFlow, Zendure ca. 450–600 € / kWh)
    let storageCost = 0;
    if (params.storageKwh > 0) {
      if (params.storageKwh <= 1.0) storageCost = 490;
      else if (params.storageKwh <= 1.6) storageCost = 690;
      else if (params.storageKwh <= 2.2) storageCost = 890;
      else storageCost = Math.round(params.storageKwh * 420);
    }
    return baseSet + storageCost;
  }

  if (params.systemType === 'retrofit_storage') {
    // Reine Speichernachrüstung bei bestehender PV
    const baseInstall = 650; // AC-Kopplung / Elektriker-Einbindung Zählerschrank
    const batteryCost = params.storageKwh * 520;
    return Math.round(baseInstall + batteryCost);
  }

  // Dachanlage (schlüsselfertig inkl. DC/AC-Montage, Gerüst, Zählerplatzumbau)
  // Degression: Kleinstanlagen ca. 1.450 €/kWp, mittlere ~1.280 €/kWp, große (>15 kWp) ~1.150 €/kWp
  let costPerKwp = 1450;
  if (params.kwp >= 15) costPerKwp = 1150;
  else if (params.kwp >= 10) costPerKwp = 1250;
  else if (params.kwp >= 6) costPerKwp = 1360;

  const storagePrice = params.storageKwh > 0 ? Math.round(params.storageKwh * 480 + 350) : 0;
  return Math.round((params.kwp * costPerKwp) + storagePrice);
}

/**
 * Kernberechnung mit geschlossener Energiebilanz
 */
export function calculateSolarYield(params: SolarParams): SolarCalculationResult {
  const annualConsumption = Math.max(1, Math.round(params.annualConsumption || 3500));
  const kwp = Math.max(0.1, Number(params.kwp) || 1.0);
  const isBalcony = params.systemType === 'balcony' || (kwp <= 1.2 && params.mountingType === 'facade_balcony');

  // 1. Basis-Globalstrahlung horizontal
  let baseRadiation = REGION_GLOBAL_RADIATION[params.region] || 1080;
  if (params.locationId) {
    const loc = LOCATION_PRESETS.find(l => l.id === params.locationId);
    if (loc) baseRadiation = loc.annualRadiationKwhM2;
  }

  // 2. Geometrischer Einstrahlungs-Korrekturfaktor (Neigung & Azimut)
  // Validiert gegen PVGIS-5 SARAH2 Referenzprofile für Deutschland
  const radTilt = (params.tilt * Math.PI) / 180;
  const radAzimuth = (params.azimuth * Math.PI) / 180;
  const optTilt = 33 * (Math.PI / 180);

  const tiltFactor = Math.cos(radTilt - optTilt);
  const azimuthFactor = Math.cos(radAzimuth * 0.75); // Azimutdämpfung
  let orientationFactor = 1.0 + (0.145 * tiltFactor) * (0.85 + 0.15 * azimuthFactor);

  if (params.tilt >= 80) {
    // Vertikale Fassade / Balkon (Sommer niedrigere Einstrahlung, Winter flachere Sonne)
    orientationFactor = 0.70 + (0.12 * azimuthFactor);
  } else if (params.tilt <= 8) {
    // Flachdach ohne Aufständerung (Schmutzansammlung, 88 % des Optimums)
    orientationFactor = 0.89;
  }

  // 3. Verschattung
  const shadeFactor = params.shading === 'medium' ? 0.78 : params.shading === 'light' ? 0.90 : 1.0;

  // 4. Zelltemperatur- und Hinterlüftungsverluste
  const mounting = params.mountingType ? MOUNTING_OPTIONS[params.mountingType] : MOUNTING_OPTIONS.pitched;
  const cellTech = CELL_TECH_PROPERTIES[params.cellType] || CELL_TECH_PROPERTIES.topcon;
  const avgDeltaT = mounting.ventilationDeltaT;
  const tempLossPercent = avgDeltaT * Math.abs(cellTech.tempCoeff);
  const tempFactor = 1 - (tempLossPercent / 100);

  // 5. Inverter Clipping (z.B. 800 W AC bei Überbelegung auf 1.600–2.000 Wp)
  let clippingLossPercent = 0;
  if (isBalcony) {
    const acLimitWatts = params.inverterAcWatts || 800;
    const dcWatts = kwp * 1000;
    const oversizing = dcWatts / acLimitWatts;
    if (oversizing > 2.0) {
      clippingLossPercent = 10.5; // z.B. 2.000 Wp an 800 W Inverter
    } else if (oversizing > 1.5) {
      clippingLossPercent = 5.2;  // z.B. 1.600 Wp an 800 W Inverter
    } else if (oversizing > 1.2) {
      clippingLossPercent = 1.8;
    }
  }
  const clippingFactor = 1 - (clippingLossPercent / 100);

  // 6. Gesamte Performance Ratio (PR)
  // Verluste: WR-Wirkungsgrad (~97,5%), DC/AC-Kabel (~1,5%), Verschmutzung/Reflexion (~1,5%)
  // PR für moderne Anlagen liegt bei ca. 83–86 % inkl. Temperaturverlust
  const baseSystemEfficiency = 0.915;
  const performanceRatio = baseSystemEfficiency * tempFactor * shadeFactor * clippingFactor;

  // 7. Spezifischer und absoluter Jahresertrag (E_gen)
  const effectiveRadiationKwhM2 = Math.round(baseRadiation * orientationFactor);
  const specificYieldKwhPerKwp = Math.round(baseRadiation * orientationFactor * performanceRatio);
  const totalAnnualYieldKwh = Math.round(specificYieldKwhPerKwp * kwp);

  // 8. Lastprofil & Direktverbrauch
  // Standard-Haushalt: ca. 36 % des Verbrauchs tagsüber bei Solareinstrahlung
  let daytimeDemandShare = 0.36;
  if (params.loadProfile === 'daytime') daytimeDemandShare = 0.48; // Homeoffice, Wärmepumpe tags
  else if (params.loadProfile === 'evening') daytimeDemandShare = 0.28;

  const annualDaytimeDemandKwh = annualConsumption * daytimeDemandShare;
  const annualNightDemandKwh = annualConsumption * (1 - daytimeDemandShare);

  // Koinzidenz-Modellierung: Direktverbrauch E_dir
  // Bei kleinen Anlagen (Balkon) geht ein hoher Prozentsatz der Erzeugung in die Grundlast
  let directConsumptionKwh = 0;
  if (isBalcony) {
    // Bei Balkonkraftwerken deckt die Erzeugung primär die Standby-/Tages-Grundlast
    directConsumptionKwh = Math.min(totalAnnualYieldKwh, Math.round(annualDaytimeDemandKwh * 0.75));
  } else {
    // Bei Dachanlagen sinkt die direkte Eigenverbrauchsquote mit steigendem Verhältnis Erzeugung / Verbrauch
    const pvToDemandRatio = totalAnnualYieldKwh / annualConsumption;
    const directSelfRate = Math.max(0.12, Math.min(0.38, 0.35 / Math.sqrt(Math.max(0.6, pvToDemandRatio))));
    directConsumptionKwh = Math.min(
      Math.round(annualDaytimeDemandKwh * 0.90),
      Math.round(totalAnnualYieldKwh * directSelfRate)
    );
  }
  // Harte physikalische Schranke
  directConsumptionKwh = Math.max(0, Math.min(directConsumptionKwh, totalAnnualYieldKwh, annualConsumption));

  // 9. Speicher-Simulation (E_char, E_dis, E_loss)
  const surplusKwh = Math.max(0, totalAnnualYieldKwh - directConsumptionKwh);
  const storageCapacity = Math.max(0, Number(params.storageKwh) || 0);
  const dod = params.storageUsableDod || 0.92;
  const roundtripEta = params.storageRoundtripEfficiency || 0.88;
  const usableCapacityKwh = storageCapacity * dod;

  let storageChargeKwh = 0;
  let storageDischargeKwh = 0;
  let storageLossKwh = 0;
  let annualStorageCycles = 0;

  if (storageCapacity > 0 && surplusKwh > 0 && annualNightDemandKwh > 0) {
    // Zyklenabschätzung basierend auf Saisonalität in Deutschland:
    // Typisch 200 bis 240 Vollzyklen/Jahr für Heimspeicher, 190–220 für Balkonspeicher
    const maxTheoreticalCycles = isBalcony ? 210 : 230;
    // Mögliche Zyklen begrenzt durch verfügbaren Überschuss und Nachtbedarf
    const potentialAnnualThroughputKwh = usableCapacityKwh * maxTheoreticalCycles;
    
    // Speicher kann nur laden, was an Überschuss da ist und was nachts auch gebraucht wird
    const maxDischargeNeededKwh = annualNightDemandKwh;
    const maxDischargePossibleKwh = potentialAnnualThroughputKwh;

    storageDischargeKwh = Math.round(Math.min(
      surplusKwh * roundtripEta,
      maxDischargePossibleKwh,
      maxDischargeNeededKwh
    ));

    storageChargeKwh = Math.round(storageDischargeKwh / roundtripEta);
    // Speicher kann nicht mehr laden als Überschuss vorhanden ist
    if (storageChargeKwh > surplusKwh) {
      storageChargeKwh = surplusKwh;
      storageDischargeKwh = Math.round(storageChargeKwh * roundtripEta);
    }

    storageLossKwh = storageChargeKwh - storageDischargeKwh;
    annualStorageCycles = usableCapacityKwh > 0 
      ? Number((storageDischargeKwh / usableCapacityKwh).toFixed(0)) 
      : 0;
  }

  // 10. Geschlossene Energiebilanz & Grenzwerte
  const totalSelfUsedKwh = Math.min(annualConsumption, directConsumptionKwh + storageDischargeKwh);
  const feedInKwh = Math.max(0, totalAnnualYieldKwh - directConsumptionKwh - storageChargeKwh);
  const gridPurchaseKwh = Math.max(0, annualConsumption - totalSelfUsedKwh);

  // Nutzbarer Anteil am PV-Ertrag (ohne Speicherverluste):
  const usableSelfConsumptionRatePercent = totalAnnualYieldKwh > 0
    ? Number(((totalSelfUsedKwh / totalAnnualYieldKwh) * 100).toFixed(1))
    : 0;

  // PV-Nutzungsgrad inklusive Speicherladeverluste (vom Dach abgenommener Strom):
  const generationUtilizationRatePercent = totalAnnualYieldKwh > 0
    ? Number((((directConsumptionKwh + storageChargeKwh) / totalAnnualYieldKwh) * 100).toFixed(1))
    : 0;

  // Autarkiegrad: Nutzbare Vor-Ort-Versorgung am Haushaltsstrombedarf:
  const autarkyRatePercent = annualConsumption > 0
    ? Number(((totalSelfUsedKwh / annualConsumption) * 100).toFixed(1))
    : 0;

  const balance: EnergyBalance = {
    totalAnnualYieldKwh,
    directConsumptionKwh,
    storageChargeKwh,
    storageDischargeKwh,
    storageLossKwh,
    totalSelfUsedKwh,
    feedInKwh,
    gridPurchaseKwh,
    annualDemandKwh: annualConsumption,
    usableSelfConsumptionRatePercent: Math.min(100, usableSelfConsumptionRatePercent),
    generationUtilizationRatePercent: Math.min(100, generationUtilizationRatePercent),
    selfConsumptionRatePercent: Math.min(100, usableSelfConsumptionRatePercent),
    autarkyRatePercent: Math.min(100, autarkyRatePercent),
  };

  // 11. Wirtschaftlichkeit & Amortisation
  const electricityPrice = Number(params.electricityPrice) || 0.36;
  const feedInTariff = typeof params.feedInTariff === 'number' 
    ? params.feedInTariff 
    : getDefaultFeedInTariff(kwp, params.systemType || (isBalcony ? 'balcony' : 'rooftop'), params.feedInRemunerationType);

  const annualSavingsAvoidedGridEur = Math.round(totalSelfUsedKwh * electricityPrice);
  const annualFeedInRevenueEur = Math.round(feedInKwh * feedInTariff);
  const annualGrossBenefitEur = annualSavingsAvoidedGridEur + annualFeedInRevenueEur;

  // Laufende Kosten: Standard 1 % der Investition pro Jahr für Wartung, Versicherung, Messstelle
  const estimatedInvestmentEur = estimateMarketInvestmentEur(params);
  const opCostRate = params.operatingCostRatePercent ?? (isBalcony ? 0.0 : 0.01);
  const annualOperatingCostEur = Math.round(estimatedInvestmentEur * opCostRate + (params.inverterReserveAnnualEur || 0));
  const annualNetBenefitEur = Math.max(0, annualGrossBenefitEur - annualOperatingCostEur);

  let estimatedPaybackYears: number | null = null;
  let paybackStatusText = 'Amortisiert sich nicht innerhalb der 25-jährigen Betrachtungsdauer';

  if (annualNetBenefitEur > 0) {
    const rawYears = estimatedInvestmentEur / annualNetBenefitEur;
    if (rawYears <= 25) {
      estimatedPaybackYears = Number(rawYears.toFixed(1));
      paybackStatusText = `Amortisation in ca. ${estimatedPaybackYears} Jahren`;
    }
  }

  const co2SavedKgPerYear = Math.round((totalAnnualYieldKwh * 380) / 1000);

  const economy: EconomicEvaluation = {
    annualSavingsAvoidedGridEur,
    annualFeedInRevenueEur,
    annualGrossBenefitEur,
    annualOperatingCostEur,
    annualNetBenefitEur,
    estimatedInvestmentEur,
    isInvestmentCustom: Boolean(params.customInvestmentEur && params.customInvestmentEur > 0),
    estimatedPaybackYears,
    paybackStatusText,
    co2SavedKgPerYear
  };

  // 12. Benchmark: Ohne Speicher unter identischen Parametern
  const withoutStorageResult = calculateSolarYieldWithoutStorage(params, totalAnnualYieldKwh, annualDaytimeDemandKwh, annualConsumption, electricityPrice, feedInTariff);

  // 13. Isolierter Mehrwert des Speichers (Storage Delta)
  const additionalSelfUsedKwh = Math.max(0, totalSelfUsedKwh - withoutStorageResult.totalSelfUsedKwh);
  const additionalAnnualSavingsEur = Math.max(0, annualNetBenefitEur - withoutStorageResult.annualNetBenefitEur);
  
  // Reiner Speicher-Investitionsanteil
  let storageSpecificCostEur = 0;
  if (storageCapacity > 0) {
    const baseInvestWithoutStorage = estimateMarketInvestmentEur({ ...params, storageKwh: 0 });
    storageSpecificCostEur = Math.max(0, estimatedInvestmentEur - baseInvestWithoutStorage);
  }

  let storagePaybackYears: number | null = null;
  if (additionalAnnualSavingsEur > 0 && storageSpecificCostEur > 0) {
    const rawStorageYears = storageSpecificCostEur / additionalAnnualSavingsEur;
    if (rawStorageYears <= 25) {
      storagePaybackYears = Number(rawStorageYears.toFixed(1));
    }
  }

  const storageDelta: StorageDeltaEvaluation = {
    hasStorage: storageCapacity > 0,
    storageKwh: storageCapacity,
    additionalSelfUsedKwh,
    additionalAnnualSavingsEur,
    storageSpecificCostEur,
    storagePaybackYears,
    annualStorageCycles
  };

  return {
    params,
    balance,
    economy,
    storageDelta,
    physics: {
      baseRadiationKwhM2: baseRadiation,
      effectiveRadiationKwhM2,
      specificYieldKwhPerKwp,
      orientationFactor: Number(orientationFactor.toFixed(2)),
      temperatureLossPercent: Number(tempLossPercent.toFixed(1)),
      performanceRatio: Number(performanceRatio.toFixed(3)),
      clippingLossPercent: Number(clippingLossPercent.toFixed(1)),
    },
    withoutStorageBenchmark: withoutStorageResult
  };
}

/**
 * Interne Hilfsfunktion für den sauberen Delta-Vergleich ohne Speicher
 */
function calculateSolarYieldWithoutStorage(
  params: SolarParams,
  totalAnnualYieldKwh: number,
  annualDaytimeDemandKwh: number,
  annualConsumption: number,
  electricityPrice: number,
  feedInTariff: number
) {
  const isBalcony = params.systemType === 'balcony' || (params.kwp <= 1.2 && params.mountingType === 'facade_balcony');
  
  let directKwh = 0;
  if (isBalcony) {
    directKwh = Math.min(totalAnnualYieldKwh, Math.round(annualDaytimeDemandKwh * 0.75));
  } else {
    const pvToDemandRatio = totalAnnualYieldKwh / annualConsumption;
    const directSelfRate = Math.max(0.12, Math.min(0.38, 0.35 / Math.sqrt(Math.max(0.6, pvToDemandRatio))));
    directKwh = Math.min(Math.round(annualDaytimeDemandKwh * 0.90), Math.round(totalAnnualYieldKwh * directSelfRate));
  }
  directKwh = Math.max(0, Math.min(directKwh, totalAnnualYieldKwh, annualConsumption));

  const feedInKwh = Math.max(0, totalAnnualYieldKwh - directKwh);
  const selfConsumptionRatePercent = totalAnnualYieldKwh > 0 ? Number(((directKwh / totalAnnualYieldKwh) * 100).toFixed(1)) : 0;
  const autarkyRatePercent = annualConsumption > 0 ? Number(((directKwh / annualConsumption) * 100).toFixed(1)) : 0;

  const savingsEur = Math.round(directKwh * electricityPrice);
  const feedInRevenueEur = Math.round(feedInKwh * feedInTariff);
  const grossBenefitEur = savingsEur + feedInRevenueEur;
  
  const investWithoutStorage = estimateMarketInvestmentEur({ ...params, storageKwh: 0 });
  const opCostRate = isBalcony ? 0.0 : (params.operatingCostRatePercent ?? 0.01);
  const opCostEur = Math.round(investWithoutStorage * opCostRate);
  const annualNetBenefitEur = Math.max(0, grossBenefitEur - opCostEur);

  let estimatedPaybackYears: number | null = null;
  if (annualNetBenefitEur > 0) {
    const rawYears = investWithoutStorage / annualNetBenefitEur;
    if (rawYears <= 25) estimatedPaybackYears = Number(rawYears.toFixed(1));
  }

  return {
    totalSelfUsedKwh: directKwh,
    autarkyRatePercent,
    usableSelfConsumptionRatePercent: selfConsumptionRatePercent,
    generationUtilizationRatePercent: selfConsumptionRatePercent,
    selfConsumptionRatePercent,
    annualNetBenefitEur,
    estimatedPaybackYears
  };
}
