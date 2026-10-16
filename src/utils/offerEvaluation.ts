import { calculateSolarYield, SolarParams, RegionZone, MountingType, LOCATION_PRESETS } from '../utils/solarMath';

export interface OfferPlausibilityInput {
  kwp: number;
  storageKwh: number;
  totalOfferPriceEur: number;
  taxRatePercent?: number; // 0 für private Wohngebäude nach § 12 Abs. 3 UStG, 19 bei gewerblich/Regelbesteuerung
  locationId?: string;
  region?: RegionZone;
  tilt?: number; // Dachneigung in Grad (0-90)
  azimuth?: number; // Ausrichtung (-90 Ost, 0 Süd, 90 West)
  mountingType?: MountingType;
  shading?: 'none' | 'light' | 'medium';
  offeredAnnualYieldKwh?: number; // Vom Handwerker prognostizierter Ertrag
}

export type ErtragsbewertungsStatus = 
  | 'nicht_angegeben' 
  | 'standort_plausibilisiert' 
  | 'grobe_orientierung' 
  | 'unvollstaendige_parameter';

export interface OfferPlausibilityResult {
  // 1. BERECHNET
  safeKwp: number;
  safeStorageKwh: number;
  safePriceEur: number;
  rawPricePerKwp: number; // Gesamtpreis / kWp inkl. aller Komponenten
  storageToPvRatio: number; // kWh je kWp
  taxNote: string;

  // 2. PLAUSIBILISIERT (via Unified Math Engine)
  engineCalculatedAnnualYieldKwh: number;
  engineSpecificYieldKwhPerKwp: number;
  yieldStatus: ErtragsbewertungsStatus;
  yieldEvaluationNote: string;
  yieldDeviationPercent: number | null;
  storageDimensionNote: string | null;

  // 3. NICHT BEWERTBAR
  unratedAspects: string[];
}

/**
 * Berechnet und plausibilisiert ein vorliegendes Photovoltaikangebot 
 * auf Basis der zentralen Unified Math Engine von wattpeak.de.
 */
export function evaluatePvOffer(input: OfferPlausibilityInput): OfferPlausibilityResult {
  const safeKwp = Math.max(0.1, Number(input.kwp) || 0.1);
  const safeStorageKwh = Math.max(0, Number(input.storageKwh) || 0);
  const safePriceEur = Math.max(0, Number(input.totalOfferPriceEur) || 0);

  // 1. BERECHNET
  const rawPricePerKwp = Math.round(safePriceEur / safeKwp);
  const storageToPvRatio = safeStorageKwh > 0 ? Number((safeStorageKwh / safeKwp).toFixed(2)) : 0;

  const taxRate = input.taxRatePercent ?? 0;
  let taxNote = 'Ausgewiesener Angebotspreis.';
  if (taxRate === 0) {
    taxNote += ' Im Angebot mit 0 % USt ausgewiesen. Der Nullsteuersatz nach § 12 Abs. 3 UStG setzt voraus, dass die Anlage auf oder in der Nähe von Wohngebäuden bzw. begünstigten Gebäuden installiert wird oder die Bruttoleistung lt. MaStR 30 kWp nicht überschreitet. Keine Steuerberatung.';
  } else if (taxRate === 19) {
    taxNote += ' Im Angebot mit 19 % USt ausgewiesen. Greift bei fehlenden Begünstigungsvoraussetzungen nach § 12 Abs. 3 UStG (z. B. bestimmte gewerbliche Nutzungen oder Überschreitung der Tatbestände). Keine Steuerberatung.';
  } else {
    taxNote += ` Im Angebot mit ${taxRate} % USt ausgewiesen. Steuerliche Einordnung ist im Einzelfall zu prüfen. Keine Steuerberatung.`;
  }

  // 2. PLAUSIBILISIERT via Unified Math Engine
  // Wir nutzen exakt dieselbe physikalische Engine wie der Hauptrechner
  const hasSpecificLocation = Boolean(input.locationId);
  const hasSpecificTilt = typeof input.tilt === 'number';
  const hasSpecificAzimuth = typeof input.azimuth === 'number';

  const engineParams: SolarParams = {
    systemType: 'rooftop',
    kwp: safeKwp,
    region: input.region || (input.locationId ? (LOCATION_PRESETS.find(l => l.id === input.locationId)?.region || 'mitte') : 'mitte'),
    locationId: input.locationId || '',
    mountingType: input.mountingType || 'pitched',
    tilt: hasSpecificTilt ? (input.tilt as number) : 35,
    azimuth: hasSpecificAzimuth ? (input.azimuth as number) : 0,
    cellType: 'topcon',
    shading: input.shading || 'none',
    annualConsumption: 4200,
    storageKwh: safeStorageKwh,
    electricityPrice: 0.36
  };

  const engineResult = calculateSolarYield(engineParams);
  const engineCalculatedAnnualYieldKwh = engineResult.balance.totalAnnualYieldKwh;
  const engineSpecificYieldKwhPerKwp = engineResult.physics.specificYieldKwhPerKwp;

  let yieldStatus: ErtragsbewertungsStatus = 'nicht_angegeben';
  let yieldEvaluationNote = '';
  let yieldDeviationPercent: number | null = null;

  const offeredYield = Number(input.offeredAnnualYieldKwh);

  if (!offeredYield || offeredYield <= 0) {
    yieldStatus = 'nicht_angegeben';
    if (hasSpecificLocation && hasSpecificTilt && hasSpecificAzimuth) {
      yieldEvaluationNote = `Für Ihren Standort und Dachkonfiguration errechnet die Wattpeak-Modellrechnung einen Referenzertrag von ca. ${engineCalculatedAnnualYieldKwh.toLocaleString('de-DE')} kWh/Jahr (${engineSpecificYieldKwhPerKwp} kWh/kWp). Tragen Sie den Wert aus Ihrem Angebot ein, um diesen abzugleichen.`;
    } else {
      yieldEvaluationNote = `Ohne Angabe von Standort, Neigung und Ausrichtung dient der Wert von ca. ${engineCalculatedAnnualYieldKwh.toLocaleString('de-DE')} kWh/Jahr (${engineSpecificYieldKwhPerKwp} kWh/kWp) als grobe bundesweite Orientierung (Mitteldeutschland, 35° Süd unverschattet).`;
    }
  } else {
    // Es liegt eine Handwerkerprognose vor
    const diffKwh = offeredYield - engineCalculatedAnnualYieldKwh;
    yieldDeviationPercent = Number(((diffKwh / engineCalculatedAnnualYieldKwh) * 100).toFixed(1));
    const specificOffered = Math.round(offeredYield / safeKwp);

    if (hasSpecificLocation && hasSpecificTilt && hasSpecificAzimuth) {
      yieldStatus = 'standort_plausibilisiert';
      if (Math.abs(yieldDeviationPercent) <= 8) {
        yieldEvaluationNote = `Die Handwerker-Ertragsprognose (${offeredYield.toLocaleString('de-DE')} kWh/a, ${specificOffered} kWh/kWp) stimmt sehr gut mit der standortbezogenen Wattpeak-Modellrechnung (${engineCalculatedAnnualYieldKwh.toLocaleString('de-DE')} kWh/a) überein (Abweichung: ${yieldDeviationPercent > 0 ? '+' : ''}${yieldDeviationPercent} %).`;
      } else if (yieldDeviationPercent > 8) {
        yieldEvaluationNote = `Die Handwerkerprognose (${offeredYield.toLocaleString('de-DE')} kWh/a, ${specificOffered} kWh/kWp) liegt um ${yieldDeviationPercent} % über der standortbezogenen Berechnung (${engineCalculatedAnnualYieldKwh.toLocaleString('de-DE')} kWh/a). Prüfen Sie, ob optimistische Strahlungsdaten, bifaziale Mehrerträge oder abweichende Verschattungsannahmen zugrunde gelegt wurden.`;
      } else {
        yieldEvaluationNote = `Die Handwerkerprognose (${offeredYield.toLocaleString('de-DE')} kWh/a, ${specificOffered} kWh/kWp) liegt um ${Math.abs(yieldDeviationPercent)} % unter der standortbezogenen Referenz (${engineCalculatedAnnualYieldKwh.toLocaleString('de-DE')} kWh/a). Wurde eine Teilverschattung oder konservative Auslegung einkalkuliert?`;
      }
    } else {
      yieldStatus = 'grobe_orientierung';
      yieldEvaluationNote = `Grobe Orientierung: Das Angebot prognostiziert ${offeredYield.toLocaleString('de-DE')} kWh/Jahr (${specificOffered} kWh/kWp). Da exakte Standortkoordinaten, Neigung und Ausrichtung nicht hinterlegt sind, basiert der Vergleich auf Standardannahmen (Mitteldeutschland, 35° Süd, ${engineCalculatedAnnualYieldKwh.toLocaleString('de-DE')} kWh/a). Abweichung ca. ${yieldDeviationPercent > 0 ? '+' : ''}${yieldDeviationPercent} %.`;
    }
  }

  // Speicher-Dimensionierung: Neutraler Kennwert & physikalisch-wirtschaftliche Einordnung
  let storageDimensionNote: string | null = null;
  if (safeStorageKwh > 0) {
    if (storageToPvRatio > 1.6) {
      storageDimensionNote = `Kennwert: ${storageToPvRatio} kWh/kWp. Die wirtschaftliche Auslegung hängt vor allem vom jährlichen Stromverbrauch, Lastprofil, saisonalen PV-Ertrag und Speicherverlusten ab (keine allgemeingültige Grenze). Bei einem rechnerisch hohen Verhältnis zur Generatorleistung steht in ertragsschwachen Wintermonaten (November bis Februar) oft nicht genügend PV-Überschuss bereit, um den Speicher regelmäßig vollständig zu laden.`;
    } else {
      storageDimensionNote = `Kennwert: ${storageToPvRatio} kWh/kWp. Die tatsächliche Wirtschaftlichkeit und der Autarkiegrad hängen maßgeblich vom individuellen Stromverbrauch, dem zeitlichen Lastprofil (Tag-/Nachtbedarf), der PV-Erzeugung und den Umwandlungs- bzw. Bereitschaftsverlusten des Speichersystems ab.`;
    }
  }

  // 3. NICHT BEWERTBAR (Offengelegte methodische Grenzen)
  const unratedAspects = [
    'Marktüblichkeit des Gesamtpreises: Erfordert Vor-Ort-Kenntnis über notwendige Zählerschrankerneuerungen, Gerüst- und Absturzsicherungen sowie Leitungswege.',
    'Fachgerechte Montage und Statik: Dachsubstanz, Sparrenabstände und Blitzschutz können nur durch eine Inaugenscheinnahme beurteilt werden.',
    'Rechtliche und steuerliche Vollständigkeit: Keine Rechts- oder Steuerberatung.'
  ];

  return {
    safeKwp,
    safeStorageKwh,
    safePriceEur,
    rawPricePerKwp,
    storageToPvRatio,
    taxNote,
    engineCalculatedAnnualYieldKwh,
    engineSpecificYieldKwhPerKwp,
    yieldStatus,
    yieldEvaluationNote,
    yieldDeviationPercent,
    storageDimensionNote,
    unratedAspects
  };
}
