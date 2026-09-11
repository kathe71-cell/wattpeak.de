export type RegionZone = 'nord' | 'mitte' | 'sued';

export type MountingType = 
  | 'pitched'         // Schrägdach (Aufdach-Montage, gute Hinterlüftung)
  | 'flat_south'      // Flachdach (Süd-Aufständerung ~15-20°)
  | 'flat_ew'         // Flachdach (Ost-West Aufständerung ~10-15°)
  | 'facade_balcony'  // Balkongeländer / Fassade (vertikal 75-90°)
  | 'ground';         // Freifläche / Garten (optimale Belüftung)

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
  nord: 1000,   // Norddeutschland (Küste bis Magdeburg) ~1.000 kWh/m²
  mitte: 1080,  // Mitteldeutschland (NRW, Hessen, Thüringen, Sachsen) ~1.080 kWh/m²
  sued: 1200,   // Süddeutschland (Baden-Württemberg, Bayern) ~1.200 kWh/m²
};

export const MOUNTING_OPTIONS: Record<MountingType, {
  name: string;
  defaultTilt: number;
  ventilationDeltaT: number; // Erwärmungszuschlag über Umgebungstemperatur
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

export interface SolarParams {
  kwp: number;
  region: RegionZone;
  locationId?: string;
  mountingType?: MountingType;
  tilt: number; // 0 - 90 deg
  azimuth: number; // -90 Ost, 0 Sued, 90 West
  cellType: 'topcon' | 'hjt' | 'ibc' | 'perc';
  annualConsumption: number; // kWh
  storageKwh: number; // 0 for no storage
  electricityPrice: number; // EUR/kWh (e.g. 0.34)
  feedInTariff: number; // EUR/kWh (e.g. 0.0811)
}

export interface SolarCalculationResult {
  specificYieldKwhPerKwp: number;
  totalAnnualYieldKwh: number;
  selfConsumptionKwh: number;
  feedInKwh: number;
  selfConsumptionRatePercent: number;
  autarkyRatePercent: number;
  annualElectricityCostWithoutPv: number;
  annualElectricityCostWithPv: number;
  annualSavingsEur: number;
  annualFeedInRevenueEur: number;
  totalAnnualBenefitEur: number;
  co2SavedKgPerYear: number;
  estimatedInvestmentEur: number;
  estimatedPaybackYears: number;
  temperatureLossFactor: number;
  orientationFactor: number;
  effectiveRadiationKwhM2: number;
}

export const CELL_TECH_PROPERTIES: Record<string, { 
  name: string; 
  tempCoeff: number; 
  efficiency: number; 
  desc: string 
}> = {
  topcon: {
    name: 'N-Type TOPCon',
    tempCoeff: -0.30, // %/K Leistungsabfall je Grad Zelltemperatur über 25 °C
    efficiency: 22.8,
    desc: 'Aktueller Industriestandard mit hoher Flächenausbeute und gutem Schwachlichtverhalten.'
  },
  hjt: {
    name: 'Heterojunction (HJT)',
    tempCoeff: -0.26, // %/K
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

/**
 * Berechnet Ertrag, Eigenverbrauch, Autarkie und Wirtschaftlichkeit
 * basierend auf physikalisch-technischen Näherungsverfahren.
 */
export function calculateSolarYield(params: SolarParams): SolarCalculationResult {
  // 1. Basis-Globalstrahlung horizontal
  let baseRadiation = REGION_GLOBAL_RADIATION[params.region] || 1080;
  if (params.locationId) {
    const loc = LOCATION_PRESETS.find(l => l.id === params.locationId);
    if (loc) {
      baseRadiation = loc.annualRadiationKwhM2;
    }
  }

  // 2. Geometrischer Einstrahlungs-Korrekturfaktor (Neigung & Azimut)
  const radTilt = (params.tilt * Math.PI) / 180;
  const radAzimuth = (params.azimuth * Math.PI) / 180;

  // Näherungsmodell für Einstrahlungsgewinn/-verlust auf geneigter Ebene in Deutschland
  const optTilt = 33 * (Math.PI / 180);
  const tiltFactor = Math.cos(radTilt - optTilt);
  const azimuthFactor = Math.cos(radAzimuth * 0.7);
  let orientationFactor = 1.0 + (0.12 * tiltFactor) * (0.85 + 0.15 * azimuthFactor);

  if (params.tilt >= 80) {
    // Fassade / vertikales Balkongeländer (verringerte Sommer-, aber günstige Wintereinstrahlung)
    orientationFactor = 0.68 + (0.14 * azimuthFactor);
  } else if (params.tilt < 10) {
    // Flachdach ohne Aufständerung
    orientationFactor = 0.89;
  }

  // 3. Halbleiter- und Zelltemperaturkorrektur
  const mounting = params.mountingType ? MOUNTING_OPTIONS[params.mountingType] : MOUNTING_OPTIONS.pitched;
  const cellTech = CELL_TECH_PROPERTIES[params.cellType] || CELL_TECH_PROPERTIES.topcon;
  
  // Delta T gegenüber STC (25 °C): abhängig von Montage-Hinterlüftung
  const avgDeltaT = mounting.ventilationDeltaT;
  const tempLossPercent = avgDeltaT * Math.abs(cellTech.tempCoeff);
  const tempFactor = 1 - (tempLossPercent / 100);

  // 4. Performance Ratio (PR)
  // Verluste durch Wechselrichterwirkungsgrad (~97,5%), DC/AC-Leitungen (~1,5%),
  // Schmutz/Verschattungsrauschen (~2%) und thermische Effekte
  const baseSystemEfficiency = 0.85; // Systemeffizienz ohne Temperaturabzug
  const performanceRatio = baseSystemEfficiency * tempFactor;

  // 5. Spezifischer und absoluter Jahresertrag
  const effectiveRadiationKwhM2 = Math.round(baseRadiation * orientationFactor);
  const specificYieldKwhPerKwp = Math.round(baseRadiation * orientationFactor * performanceRatio);
  const totalAnnualYieldKwh = Math.round(specificYieldKwhPerKwp * params.kwp);

  // 6. Eigenverbrauch & Autarkiegrad
  // Grund-Eigenverbrauch ohne Speicher: typisch 25-35% im Einfamilienhaus
  const pvToDemandRatio = totalAnnualYieldKwh / (params.annualConsumption || 1);
  const baseSelfConsumptionPercent = Math.max(15, Math.min(52, 38 - (pvToDemandRatio * 9)));

  // Speicher-Beitrag: Erhöhung von Eigenverbrauch und Autarkie
  // Je 1 kWh nutzbare Speicherkapazität pro 1.000 kWh Jahresverbrauch ca. 12-16% Zuwachs
  const storageRatio = (params.storageKwh / (Math.max(1000, params.annualConsumption) / 1000));
  const storageBoostPercent = Math.min(50, storageRatio * 15);

  const selfConsumptionRatePercent = Math.min(94, Math.round(baseSelfConsumptionPercent + storageBoostPercent));
  
  const selfConsumptionKwh = Math.min(
    params.annualConsumption,
    Math.round((totalAnnualYieldKwh * selfConsumptionRatePercent) / 100)
  );
  
  const feedInKwh = Math.max(0, totalAnnualYieldKwh - selfConsumptionKwh);
  const autarkyRatePercent = Math.min(90, Math.round((selfConsumptionKwh / params.annualConsumption) * 100));

  // 7. Wirtschaftlichkeit & vermiedener Bezug
  const annualElectricityCostWithoutPv = Math.round(params.annualConsumption * params.electricityPrice);
  const remainingGridCost = Math.round((params.annualConsumption - selfConsumptionKwh) * params.electricityPrice);
  const annualSavingsEur = Math.round(selfConsumptionKwh * params.electricityPrice);
  const annualFeedInRevenueEur = Math.round(feedInKwh * params.feedInTariff);
  const totalAnnualBenefitEur = annualSavingsEur + annualFeedInRevenueEur;
  const annualElectricityCostWithPv = remainingGridCost - annualFeedInRevenueEur;

  // 8. Investitionskosten-Modell (Richtwerte deutscher Markt 2025/2026)
  // Dachanlagen: Degression bei größeren Anlagen (ca. 1.250–1.550 €/kWp) + Speicher (ca. 500 €/kWh)
  // Balkonanlagen (< 1.5 kWp): ca. 350–550 € Grundset + Speicher (ca. 600–850 €)
  let estimatedInvestmentEur = 0;
  if (params.kwp <= 1.2) {
    // Stecker-Solargerät / Balkonkraftwerk
    const baseSet = params.kwp > 0.9 ? 520 : 380;
    const storagePrice = params.storageKwh > 0 ? (params.storageKwh <= 1.6 ? 750 : 1050) : 0;
    estimatedInvestmentEur = baseSet + storagePrice;
  } else {
    // Dachanlage
    const costPerKwp = params.kwp >= 15 ? 1150 : params.kwp >= 10 ? 1280 : 1450;
    const storagePrice = params.storageKwh * 520;
    estimatedInvestmentEur = Math.round((params.kwp * costPerKwp) + storagePrice);
  }

  // 9. Geschätzte Amortisationszeit
  const estimatedPaybackYears = totalAnnualBenefitEur > 0 
    ? Number((estimatedInvestmentEur / totalAnnualBenefitEur).toFixed(1))
    : 0;

  // 10. CO2-Einsparung (Strommix Deutschland ca. 380 g CO2 / kWh Stand 2025/2026)
  const co2SavedKgPerYear = Math.round((totalAnnualYieldKwh * 380) / 1000);

  return {
    specificYieldKwhPerKwp,
    totalAnnualYieldKwh,
    selfConsumptionKwh,
    feedInKwh,
    selfConsumptionRatePercent,
    autarkyRatePercent,
    annualElectricityCostWithoutPv,
    annualElectricityCostWithPv,
    annualSavingsEur,
    annualFeedInRevenueEur,
    totalAnnualBenefitEur,
    co2SavedKgPerYear,
    estimatedInvestmentEur,
    estimatedPaybackYears,
    temperatureLossFactor: Number((tempFactor).toFixed(3)),
    orientationFactor: Number(orientationFactor.toFixed(2)),
    effectiveRadiationKwhM2
  };
}
