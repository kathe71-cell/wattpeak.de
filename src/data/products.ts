/**
 * WATTPEAK.DE ZENTRALE PRODUKTDATENBANK (SINGLE SOURCE OF TRUTH)
 * 
 * Alle Produktstammdaten sind zentral und konsistent gepflegt.
 * Keine erfundenen Sternchen-Bewertungen, künstlichen Rankings oder unbelegten "Testsieger"-Siegel.
 * Technische Angaben basieren auf offiziellen Herstellerdatenblättern und Zertifizierungsunterlagen.
 * 
 * Stand: Oktober 2026
 */

export type ProductCategory = 
  | 'complete_set'       // Steckerfertige Komplettsets (Balkonkraftwerk)
  | 'inverter'           // Mikrowechselrichter & Hybridwechselrichter
  | 'storage_system'     // Vollständige All-in-One Speichersysteme (inkl. Inverter/Hub)
  | 'storage_expansion'  // Reine Zusatzbatterien (Erfordert Basissystem / Controller)
  | 'module'             // Solarmodule (Glas-Glas, N-Type TOPCon, HJT)
  | 'metering'           // Smart Meter & Energiemanager
  | 'mounting';          // Halterungen & Unterkonstruktion

export type VerificationStatus = 'VERIFIED' | 'PARTIAL' | 'UNVERIFIED';

export type PriceType = 'Marktpreis-Richtwert' | 'Hersteller-UVP' | 'Aktionspreis';

export interface ProductCompatibility {
  requiresMasterSystem?: boolean;
  masterSystemNote?: string;
  gridNorm: string;          // z.B. "VDE-AR-N 4105 & EN 50549-1"
  solarPackage1Compliant: boolean;
  plugType: string;          // z.B. "Schuko (CEE 7/7) oder Wieland"
}

export interface UnifiedProduct {
  id: string;
  name: string;
  brand: string;
  brandName: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDesc: string;
  specs: string[];
  powerWp?: string;
  capacityKwh?: string;
  acPowerWatts?: string;
  efficiency?: string;
  cellTechnology?: string;
  
  // Transparente Preis- & Marktangaben (optional, wenn kein unabhängiger Richtwert vorliegt)
  priceRange?: string;         // z.B. "ca. 330 – 390 € *"
  priceType?: PriceType;
  priceReferenceDate?: string; // z.B. "Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)"
  priceLastChecked?: string;   // ISO-Datum YYYY-MM-DD
  
  // Datenqualität & Prüfstatus
  verificationStatus: VerificationStatus;
  manufacturerSource: string;
  datasheetUrl?: string;
  lastVerified: string;       // ISO-Datum YYYY-MM-DD
  
  warranty: string;           // Rein offizielle Herstellergarantie
  technicalBadges: string[];  // Sachliche technische Zertifikate
  compatibility: ProductCompatibility;
  
  // Affiliate & Amazon Verknüpfung
  amazonSearchQuery: string;
  asin?: string;              // Amazon ASIN für direkte Produktseite /dp/{ASIN}
  affiliateUrl: string;       // Vollständige Partner-URL mit Tag
}

export const AMAZON_TRACKING_ID = 'wattpeak.de-21';

export function getAmazonSearchUrl(query: string): string {
  return `https://www.amazon.de/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TRACKING_ID}`;
}

export function getAmazonDirectUrl(asin?: string, fallbackQuery?: string): string {
  if (asin) {
    return `https://www.amazon.de/dp/${asin}?tag=${AMAZON_TRACKING_ID}`;
  }
  if (fallbackQuery) {
    return getAmazonSearchUrl(fallbackQuery);
  }
  return `https://www.amazon.de/?tag=${AMAZON_TRACKING_ID}`;
}

export const UNIFIED_PRODUCTS: UnifiedProduct[] = [
  // --- 1. BALKONKRAFTWERK KOMPLETTSETS ---
  {
    id: 'set-880wp-hoymiles',
    name: '880Wp Glas-Glas Komplettset mit Hoymiles HMS-800W',
    brand: 'hoymiles',
    brandName: 'Hoymiles / Trina Solar',
    category: 'complete_set',
    categoryLabel: '800W Komplettset',
    shortDesc: '2x bifaziale Trina Vertex S+ TOPCon Module kombiniert mit dem HMS-800W-2T Mikrowechselrichter und Schukokabel.',
    specs: [
      '2x 440 Wp N-Type TOPCon Glas-Glas Module',
      '800W Mikrowechselrichter mit 2 separaten MPPT',
      'Integriertes WLAN-Modul & S-Miles Cloud Monitoring',
      '5m UV-beständiges Anschlusskabel mit Schukostecker'
    ],
    powerWp: '880 Wp (2x 440 Wp)',
    acPowerWatts: '800 W AC',
    efficiency: '22,0 % Modulwirkungsgrad',
    cellTechnology: 'N-Type TOPCon Glas-Glas (2x 1.6 mm)',
    priceRange: 'ca. 330 – 390 € *',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Hoymiles EU Datenblatt HMS-800W-2T & Trina Solar Vertex S+ Spezifikation',
    datasheetUrl: 'https://www.hoymiles.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 25 J. Produkt / 30 J. linear auf Module, 12 J. auf Wechselrichter',
    technicalBadges: ['VDE-AR-N 4105 zertifiziert', 'Solarpaket I konform', 'Bifazial Glas-Glas'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105:2018-11 / DIN EN 50549-1 (Einheitenzertifikat)',
      solarPackage1Compliant: true,
      plugType: 'Schuko-Anschlusskabel beiliegend'
    },
    amazonSearchQuery: 'Balkonkraftwerk 800W Komplettset Hoymiles HMS-800W Trina',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Balkonkraftwerk 800W Komplettset Hoymiles HMS-800W Trina')
  },
  {
    id: 'set-1760wp-4modul',
    name: '1.760Wp 4-Modul Komplettset mit 800W Inverter',
    brand: 'hoymiles',
    brandName: 'Hoymiles / Trina Solar',
    category: 'complete_set',
    categoryLabel: '800W 4-Modul Set',
    shortDesc: 'Auslegung im Rahmen des Solarpakets I: 4 Module für optimierten Ertrag bei diffusem Licht mit 800W AC-Drosselung.',
    specs: [
      '4x 440 Wp Glas-Glas Module (parallel verschaltet)',
      'Hoymiles 800W Mikrowechselrichter mit MPPT-Steuerung',
      'Herstellerseitig optimiertes Schwachlichtverhalten durch Parallelschaltung',
      'Inklusive Y-Abzweigstecker & 5m Schukoleitung'
    ],
    powerWp: '1.760 Wp (4x 440 Wp)',
    acPowerWatts: '800 W AC',
    efficiency: '22,0 % Modulwirkungsgrad',
    cellTechnology: 'N-Type TOPCon Glas-Glas',
    priceRange: 'ca. 590 – 690 € *',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Hoymiles Systemauslegung für 4-Modul Parallelschaltung & Trina Datenblatt',
    datasheetUrl: 'https://www.hoymiles.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 25 J. Produkt / 30 J. linear auf Module',
    technicalBadges: ['Überbelegung bis 2.000 Wp gem. EEG', 'VDE-AR-N 4105 zertifiziert', 'Schwachlicht-Optimiert'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105:2018-11 zertifiziert mit integriertem NA-Schutzrelais',
      solarPackage1Compliant: true,
      plugType: 'Schuko-Anschlusskabel'
    },
    amazonSearchQuery: 'Balkonkraftwerk 800W 4 Module Komplettset 1600W 1800W',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Balkonkraftwerk 800W 4 Module Komplettset 1600W 1800W')
  },
  {
    id: 'set-840wp-deye',
    name: 'Deye SUN-M80G4-EU-Q0 800W Komplettset',
    brand: 'deye',
    brandName: 'Deye Solar',
    category: 'complete_set',
    categoryLabel: '800W Komplettset',
    shortDesc: 'G4-Mikrowechselrichter der vierten Generation mit integriertem mechanischen NA-Schutzrelais und 2x 420Wp Modulen.',
    specs: [
      '2x 420 Wp monokristalline Halbzellenmodule',
      '800 W Inverter mit 2 unabhängigen MPPT-Eingängen',
      'Integriertes WLAN & Deye Cloud App',
      'IP67 Schutzart für dauerhafte Außenmontage'
    ],
    powerWp: '840 Wp (2x 420 Wp)',
    acPowerWatts: '800 W AC',
    efficiency: '21,5 % Modulwirkungsgrad',
    cellTechnology: 'Monokristallin Half-Cut',
    priceRange: 'ca. 290 – 350 € *',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Deye Inverter Datenblatt SUN-M80G4-EU-Q0 & TÜV Rheinland Zertifikat',
    datasheetUrl: 'https://www.deyeinverter.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 J. auf Wechselrichter, 15 J. auf Module',
    technicalBadges: ['VDE-AR-N 4105 zertifiziert', 'Relais integriert', 'IP67 Wetterfest'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'Zertifiziert nach VDE-AR-N 4105:2018-11 mit integriertem NA-Schutzrelais',
      solarPackage1Compliant: true,
      plugType: 'Schukostecker'
    },
    amazonSearchQuery: 'Deye 800W Balkonkraftwerk Komplettset G4',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Deye 800W Balkonkraftwerk Komplettset G4')
  },

  // --- 2. SPEICHERSYSTEME & ALL-IN-ONE ---
  {
    id: 'anker-solix-solarbank-2',
    name: 'Anker SOLIX Solarbank 2 Plus All-in-One Speicher',
    brand: 'anker',
    brandName: 'Anker SOLIX',
    category: 'storage_system',
    categoryLabel: 'Balkon-Speicher (All-in-One)',
    shortDesc: 'Integriertes LiFePO4-Speichersystem mit 1,6 kWh Akku, 2 MPPT-Trackern (1.200W Solareingang) und 800W Netzeinspeisung.',
    specs: [
      '1.600 Wh LiFePO4-Kapazität (modular erweiterbar bis 9,6 kWh)',
      '2x MPPT integriert – bis zu 1.200 Wp PV-Eingangsleistung direkt anschließbar',
      'Integrierter 800W Mikrowechselrichter (kein separater Inverter nötig)',
      'Herstellerangabe: 6.000 Zyklen Lebensdauer (SOH >80 %)',
      'Einspeisesteuerung über Smart Meter oder Smart Plugs'
    ],
    capacityKwh: '1,6 kWh (bis 9,6 kWh erweiterbar)',
    acPowerWatts: '800 W AC integriert',
    priceRange: 'ca. 429 – 699 € *',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Anker SOLIX Datenblatt Solarbank 2 E1600 Plus (A17C1)',
    datasheetUrl: 'https://www.anker.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie',
    technicalBadges: ['All-in-One Lösung', '2x MPPT integriert', 'LiFePO4 6000 Zyklen'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105 zertifiziert mit integriertem Relais',
      solarPackage1Compliant: true,
      plugType: 'Direkter Netzsteckeranschluss (Schuko)'
    },
    amazonSearchQuery: 'Anker SOLIX Solarbank 2 E1600 Pro Balkonkraftwerk Speicher',
    asin: 'B0DKNQB1TQ',
    affiliateUrl: getAmazonDirectUrl('B0DKNQB1TQ', 'Anker SOLIX Solarbank 2 E1600 Pro Balkonkraftwerk Speicher')
  },
  {
    id: 'anker-solix-expansion-bp1600',
    name: 'Anker SOLIX Zusatz-Akku BP1600 (Erweiterung)',
    brand: 'anker',
    brandName: 'Anker SOLIX',
    category: 'storage_expansion',
    categoryLabel: 'Erweiterungs-Akku',
    shortDesc: 'Zusatz-Akkupack mit 1,6 kWh Kapazität zur Erweiterung der Anker Solarbank 2 Pro oder Plus.',
    specs: [
      '1.600 Wh LiFePO4 Zusatzkapazität',
      'Stapel-Design mit Direktsteckverbindung ohne zusätzliche Kabel',
      'Erfordert Anker Solarbank 2 Pro oder Plus als Basiseinheit'
    ],
    capacityKwh: '1,6 kWh',
    priceRange: 'ca. 549 – 649 € *',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Anker SOLIX Zubehörspezifikation BP1600 (A17C1-Z)',
    datasheetUrl: 'https://www.anker.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie',
    technicalBadges: ['Reiner Erweiterungsakku', 'LiFePO4 6000 Zyklen'],
    compatibility: {
      requiresMasterSystem: true,
      masterSystemNote: 'Achtung: Dies ist eine Erweiterungsbatterie ohne Wechselrichter. Sie benötigt zwingend eine Anker Solarbank 2 Pro oder Plus als Basiseinheit!',
      gridNorm: 'Über Basiseinheit (VDE-AR-N 4105)',
      solarPackage1Compliant: true,
      plugType: 'System-Stapelanschluss'
    },
    amazonSearchQuery: 'Anker SOLIX BP1600 Zusatzakku Erweiterungsbatterie',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Anker SOLIX BP1600 Zusatzakku Erweiterungsbatterie')
  },
  {
    id: 'ecoflow-powerstream-delta2max',
    name: 'EcoFlow PowerStream 800W + DELTA 2 Max Bundle',
    brand: 'ecoflow',
    brandName: 'EcoFlow',
    category: 'storage_system',
    categoryLabel: 'Balkon-Speicher + Powerstation',
    shortDesc: 'Modulares 2-in-1-System: Balkonkraftwerk-Speicher für das Hausnetz und mobile Notstrom-Powerstation.',
    specs: [
      '2.048 Wh LiFePO4 Kapazität (erweiterbar auf bis zu 6.144 Wh)',
      'PowerStream 800W Einspeise-Wechselrichter mit 2x MPPT',
      'Integrierte Schuko-Notstromsteckdosen an der Powerstation (2.400 W)',
      'Echtzeit-Null-Einspeisung via EcoFlow Smart Plug'
    ],
    capacityKwh: '2,05 kWh',
    acPowerWatts: '800 W Netzeinspeisung / 2.400 W Notstrom',
    priceRange: 'ca. 999 – 1.390 € *',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'EcoFlow PowerStream Handbuch & DELTA 2 Max Datenblatt',
    datasheetUrl: 'https://www.ecoflow.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 5 Jahre Herstellergarantie auf Akku & Inverter',
    technicalBadges: ['Balkon + Powerstation', 'Notstrom 2400W', 'LiFePO4 3000 Zyklen'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105 zertifiziert (PowerStream Einheit)',
      solarPackage1Compliant: true,
      plugType: 'Schuko-Netzkabel'
    },
    amazonSearchQuery: 'EcoFlow PowerStream 800W DELTA 2 Max Balkonkraftwerk',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'EcoFlow PowerStream 800W DELTA 2 Max Balkonkraftwerk')
  },
  {
    id: 'growatt-noah-2000',
    name: 'Growatt NOAH 2000 Balkonkraftwerk-Speicher',
    brand: 'growatt',
    brandName: 'Growatt Solar',
    category: 'storage_system',
    categoryLabel: 'Balkon-Speicher',
    shortDesc: 'LiFePO4-Speicher mit 2.048 Wh Kapazität, Schutzart IP66 und integrierter Vorwärmung für den Betrieb bei Minusgraden.',
    specs: [
      '2.048 Wh LiFePO4 (erweiterbar auf bis zu 8.192 Wh mit 4 Packs)',
      'Integrierte Vorwärmung bei Minusgraden (lädt herstellerseitig bis -20 °C)',
      'Kompatibel mit gängigen Mikrowechselrichtern über Standard-MC4-Schnittstelle',
      'IP66 wetterfest für den Außeneinsatz'
    ],
    capacityKwh: '2,05 kWh',
    priceRange: 'ca. 379 – 549 € *',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Growatt NOAH 2000 Datenblatt & Benutzerhandbuch',
    datasheetUrl: 'https://www.growatt.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie',
    technicalBadges: ['IP66 wetterfest', 'Winter-Akkuheizung', 'MC4-Kompatibel'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'Wird zwischen Module und Mikrowechselrichter geschaltet (MC4 Standard)',
      solarPackage1Compliant: true,
      plugType: 'MC4 Solarkabel'
    },
    amazonSearchQuery: 'Growatt NOAH 2000 Balkonkraftwerk Speicher LiFePO4',
    asin: 'B0F9PWSNZ8',
    affiliateUrl: getAmazonDirectUrl('B0F9PWSNZ8', 'Growatt NOAH 2000 Balkonkraftwerk Speicher LiFePO4')
  },

  // --- 3. MIKROWECHSELRICHTER & WECHSELRICHTER ---
  {
    id: 'hoymiles-hms-800w',
    name: 'Hoymiles HMS-800W-2T Mikrowechselrichter',
    brand: 'hoymiles',
    brandName: 'Hoymiles',
    category: 'inverter',
    categoryLabel: 'Mikrowechselrichter',
    shortDesc: 'Mikrowechselrichter für Stecker-Solargeräte mit 2 unabhängigen MPPT-Trackern, integriertem WLAN und Relais.',
    specs: [
      '800 W AC-Nennausgangsleistung (werkseitig konfiguriert)',
      '2 unabhängige MPPT-Tracker (für bis zu 2x 540+ Wp Module)',
      'Integriertes WLAN-Modul (keine externe DTU zwingend erforderlich)',
      'Zertifiziert nach VDE-AR-N 4105:2018-11 & EN 50549-1 mit integriertem NA-Schutz',
      'Maximaler Wirkungsgrad von 96,7 %'
    ],
    acPowerWatts: '800 W AC',
    efficiency: '96,7 % Spitzenwirkungsgrad',
    priceRange: 'ca. 119 – 149 € *',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Hoymiles HMS-800W-2T technisches Datenblatt & Einheitenzertifikat',
    datasheetUrl: 'https://www.hoymiles.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 12 Jahre Herstellergarantie',
    technicalBadges: ['VDE-AR-N 4105 zertifiziert', '2x MPPT', 'WLAN integriert'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'Zertifiziert nach VDE-AR-N 4105:2018-11 (Einheitenzertifikat für Bestands- & Neuanlagen gültig)',
      solarPackage1Compliant: true,
      plugType: 'Betteri BC01 oder Schukokabel'
    },
    amazonSearchQuery: 'Hoymiles HMS-800W-2T Mikrowechselrichter 800W',
    asin: 'B0CJGKQXVL',
    affiliateUrl: getAmazonDirectUrl('B0CJGKQXVL', 'Hoymiles HMS-800W-2T Mikrowechselrichter 800W')
  },
  {
    id: 'apsystems-ez1-m',
    name: 'APsystems EZ1-M 800W Mikrowechselrichter',
    brand: 'apsystems',
    brandName: 'APsystems',
    category: 'inverter',
    categoryLabel: 'Mikrowechselrichter',
    shortDesc: 'Mikrowechselrichter mit bis zu 20A Eingangsstrom – ausgelegt für moderne Hochleistungsmodule mit großen Wafern.',
    specs: [
      '800 W AC (über AP EasyPower App zwischen 600W und 800W umschaltbar)',
      '2x MPPT mit je 20A Eingangsstrom für Großzellen-Module',
      'Integriertes Bluetooth & WLAN für direkte lokale Einrichtung',
      'Zertifiziert nach VDE-AR-N 4105'
    ],
    acPowerWatts: '800 W AC (umschaltbar)',
    efficiency: '97,3 % Wirkungsgrad',
    priceRange: 'ca. 129 – 165 € *',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'APsystems EZ1-M Spezifikationsblatt & EU-Konformitätserklärung',
    datasheetUrl: 'https://emea.apsystems.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 12 Jahre Herstellergarantie',
    technicalBadges: ['20A Eingangsstrom', 'VDE 4105', 'Bluetooth & WLAN'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105:2018-11 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'Schuko-Anschlusskabel'
    },
    amazonSearchQuery: 'APsystems EZ1-M Mikrowechselrichter 800W',
    asin: 'B0CMXX3Y58',
    affiliateUrl: getAmazonDirectUrl('B0CMXX3Y58', 'APsystems EZ1-M Mikrowechselrichter 800W')
  },

  // --- 4. SOLARMODULE ---
  {
    id: 'trina-vertex-s-plus-440',
    name: 'Trina Solar Vertex S+ 445Wp Bifazial Glas-Glas',
    brand: 'trina',
    brandName: 'Trina Solar',
    category: 'module',
    categoryLabel: 'Solarmodul',
    shortDesc: 'Doppelglas-Modul mit n-Type TOPCon-Technologie, Brandschutzklasse A und bifazialer Zellstruktur.',
    specs: [
      '445 Wp Nennleistung (STC nach DIN EN IEC 60904-3)',
      'Bifazial: Transparente Rückseite für zusätzlichen Ertrag aus Umgebungsreflexion',
      '2x 1,6 mm thermisch gehärtetes Glas (Hagelschutz nach IEC 61215 geprüft)',
      'Niedriger Temperaturkoeffizient von -0,30 %/K'
    ],
    powerWp: '445 Wp',
    efficiency: '22,3 % Wirkungsgrad',
    cellTechnology: 'N-Type i-TOPCon Glas-Glas',
    priceRange: 'ca. 75 – 99 € * (Einzelmodul)',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Trina Solar Vertex S+ TSM-NEG9R.28 Datenblatt (IEC zertifiziert)',
    datasheetUrl: 'https://www.trinasolar.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 25 Jahre Produktgarantie / 30 Jahre lineare Leistungsgarantie',
    technicalBadges: ['Bifazial Glas-Glas', 'Brandschutzklasse A', 'Hagelfest'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'IEC 61215 / IEC 61730 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'MC4-EVO2 Originalstecker'
    },
    amazonSearchQuery: 'Trina Solar Vertex S+ 440Wp 445Wp Bifazial Glas Glas',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Trina Solar Vertex S+ 440Wp 445Wp Bifazial Glas Glas')
  },
  {
    id: 'jinko-tiger-neo-440',
    name: 'Jinko Solar Tiger Neo 440Wp N-Type TOPCon',
    brand: 'jinko',
    brandName: 'Jinko Solar',
    category: 'module',
    categoryLabel: 'Solarmodul',
    shortDesc: 'N-Type Modul mit Hot 2.0-Technologie für reduziertes Mikrorissrisiko und schwarzem Aluminiumrahmen.',
    specs: [
      '440 Wp Nennleistung bei 22,0 % Modulwirkungsgrad',
      'Hot 2.0-Technologie für geringere Mikroriss-Anfälligkeit',
      'Hersteller nennt optimiertes Verhalten bei diffuser Einstrahlung und Bewölkung'
    ],
    powerWp: '440 Wp',
    efficiency: '22,0 % Wirkungsgrad',
    cellTechnology: 'N-Type TOPCon',
    priceRange: 'ca. 70 – 95 € *',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Jinko Solar Tiger Neo JKM440N-54HL4R-V Spezifikationsblatt',
    datasheetUrl: 'https://www.jinkosolar.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 15 Jahre Produkt- / 30 Jahre lineare Leistungsgarantie',
    technicalBadges: ['N-Type TOPCon', 'Black Frame', 'IEC zertifiziert'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'IEC 61215 / IEC 61730',
      solarPackage1Compliant: true,
      plugType: 'MC4 Standard'
    },
    amazonSearchQuery: 'Jinko Solar Tiger Neo 440Wp N-Type',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Jinko Solar Tiger Neo 440Wp N-Type')
  },

  // --- 5. MONTAGESYSTEME & ZUBEHÖR ---
  {
    id: 'halterung-balkon-verstellbar',
    name: 'Balkongeländer-Halterung verstellbar (Edelstahl/Alu)',
    brand: 'universal',
    brandName: 'Montagesysteme',
    category: 'mounting',
    categoryLabel: 'Montagesystem',
    shortDesc: 'Halterung für 2 Module an Gitter- oder Rundgeländern mit Neigungsverstellung 15° bis 30°.',
    specs: [
      'Witterungsbeständiger Edelstahl V2A & eloxiertes Aluminium AL6005-T5',
      'Neigungswinkel zwischen 15° und 30° einstellbar (oder 90° senkrecht)',
      'Inklusive Hakensicherung gegen Herabfallen'
    ],
    priceRange: 'ca. 49 – 79 € *',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'PARTIAL',
    manufacturerSource: 'Hersteller-Materialspezifikation V2A/AL6005-T5 & Montageanleitung',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Materialgarantie',
    technicalBadges: ['Edelstahl V2A', 'Neigbar 15-30°', 'Windlastgeprüft nach Eurocode 1'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'Statisch ausgelegt nach Eurocode 1 (DIN EN 1991-1-4 Windlasten)',
      solarPackage1Compliant: true,
      plugType: 'Mechanische Befestigung'
    },
    amazonSearchQuery: 'Balkonkraftwerk Halterung Geländer verstellbar Edelstahl',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Balkonkraftwerk Halterung Geländer verstellbar Edelstahl')
  },
  {
    id: 'shelly-pro-3em',
    name: 'Shelly Pro 3EM Drehstrom-Energiemessgerät',
    brand: 'shelly',
    brandName: 'Shelly',
    category: 'metering',
    categoryLabel: 'Smart Meter',
    shortDesc: 'Hutschienen-Stromzähler für den Zählerschrank zur Phasensaldierung und Steuerung von Speichereinspeisung.',
    specs: [
      '3-Phasen-Messung von Netzbezug und Einspeisung (bis 120A pro Phase)',
      'WLAN, LAN & Bluetooth integriert für lokale Datenübertragung',
      'Unterstützt von ausgewählten Systemen (z. B. EcoFlow PowerStream via App, Home Assistant / MQTT) zur dynamischen Nulleinspeisung'
    ],
    priceRange: 'ca. 95 – 125 € *',
    priceType: 'Marktpreis-Richtwert',
    priceReferenceDate: 'Unverbindlicher Marktpreis-Richtwert (Stand: Oktober 2026)',
    priceLastChecked: '2026-10-01',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Allterco Robotics / Shelly Datenblatt Pro 3EM & CE-Konformitätserklärung',
    datasheetUrl: 'https://www.shelly.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 2 Jahre Herstellergarantie',
    technicalBadges: ['DIN-Hutschiene', 'Echtzeit-Phasensaldierung', 'LAN & WLAN'],
    compatibility: {
      requiresMasterSystem: false,
      masterSystemNote: 'Einbau im Zählerschrank darf ausschließlich durch eine eingetragene Elektrofachkraft nach NAV § 13 erfolgen.',
      gridNorm: 'CE & DIN EN 61010-1 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'Hutschienen-Klemmen'
    },
    amazonSearchQuery: 'Shelly Pro 3EM Energiemessgerät Hutschiene',
    asin: 'B0G14VF9TL',
    affiliateUrl: getAmazonDirectUrl('B0G14VF9TL', 'Shelly Pro 3EM Energiemessgerät Hutschiene')
  },

  // --- 6. ERWEITERTE SPEICHERSYSTEME & ZUSATZAKKUS ---
  {
    id: 'anker-solix-solarbank-2-pro',
    name: 'Anker SOLIX Solarbank 2 E1600 Pro Speicher',
    brand: 'anker',
    brandName: 'Anker SOLIX',
    category: 'storage_system',
    categoryLabel: 'Balkon-Speicher (All-in-One)',
    shortDesc: 'All-in-One Speichersystem mit 1,6 kWh LiFePO4-Kapazität, 4 separaten MPPT-Eingängen (2.400 Wp) und 800W AC-Ausgang.',
    specs: [
      '1.600 Wh LiFePO4 Basiskapazität (modular erweiterbar bis 9,6 kWh)',
      '4 unabhängige MPPT-Tracker für bis zu 2.400 Wp Modulleistung',
      'Integrierter 800W Mikrowechselrichter & 1.000W Notstromsteckdose am Gerät',
      'Herstellergarantie: 6.000 Ladezyklen (10 Jahre Herstellergarantie)'
    ],
    capacityKwh: '1,6 kWh (bis 9,6 kWh erweiterbar)',
    acPowerWatts: '800 W AC Einspeisung / 1.000 W Notstrom',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Anker SOLIX Solarbank 2 Pro Datenblatt (A17C1 Pro)',
    datasheetUrl: 'https://www.anker.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie',
    technicalBadges: ['4x MPPT integriert', '2.400W Solareingang', 'LiFePO4 6000 Zyklen'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105 zertifiziert mit integriertem Relais',
      solarPackage1Compliant: true,
      plugType: 'Schuko-Netzstecker'
    },
    amazonSearchQuery: 'Anker SOLIX Solarbank 2 Pro Balkonkraftwerk Speicher',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Anker SOLIX Solarbank 2 Pro Balkonkraftwerk Speicher')
  },
  {
    id: 'zendure-solarflow-hyper-2000',
    name: 'Zendure SolarFlow Hyper 2000 Bi-direktional',
    brand: 'zendure',
    brandName: 'Zendure',
    category: 'storage_system',
    categoryLabel: 'Balkon-Speicher (All-in-One)',
    shortDesc: 'Bi-direktionaler Hybrid-Balkonspeicher mit bis zu 1.800W MPPT-Eingang und dynamischer Phasenregelung über ZenLink.',
    specs: [
      'Erfordert Zendure AB1000 oder AB2000 LiFePO4 Zusatzbatterien',
      '4 integrierte MPPT-Eingänge (bis 1.800 Wp Solareingang)',
      '1.200W AC-Lade-/Einspeiseleistung (auf 800W drosselbar)',
      'ZenLink Multi-Set Vernetzung für mehrere Phasen'
    ],
    acPowerWatts: '800 W AC (Drosselbar gem. Solarpaket I)',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Zendure SolarFlow Hyper 2000 Technisches Datenblatt',
    datasheetUrl: 'https://de.zendure.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie',
    technicalBadges: ['Bi-direktional', '4x MPPT', 'ZenLink Multi-Set'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'Schukostecker'
    },
    amazonSearchQuery: 'Zendure SolarFlow Hyper 2000 Balkonkraftwerk Speicher',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Zendure SolarFlow Hyper 2000 Balkonkraftwerk Speicher')
  },
  {
    id: 'zendure-solarflow-hub2000-set',
    name: 'Zendure SolarFlow Hub 2000 mit AB2000 Speicher-Set',
    brand: 'zendure',
    brandName: 'Zendure',
    category: 'storage_system',
    categoryLabel: 'Balkon-Speicher',
    shortDesc: 'Speichersystem mit PV-Hub 2000 und 1.920 Wh AB2000 LiFePO4 Akku zur Zwischenschaltung vor Mikrowechselrichtern.',
    specs: [
      '1.920 Wh LiFePO4 Kapazität (erweiterbar auf bis zu 7.680 Wh)',
      '2x MPPT Eingänge (bis 1.800W PV-Eingang) mit MC4-Anschlüssen',
      'Integrierte Selbsterwärmung der Batteriezellen für Winterbetrieb bis -20 °C',
      'Kompatibel mit Hoymiles, APsystems, Deye und gängigen Mikrowechselrichtern'
    ],
    capacityKwh: '1,92 kWh (bis 7,68 kWh)',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Zendure SolarFlow Systemdokumentation & TÜV Zertifikat',
    datasheetUrl: 'https://de.zendure.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie auf AB2000',
    technicalBadges: ['Winterfest bis -20°C', 'MC4-Universal', 'LiFePO4 6000 Zyklen'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'Wird vor den Mikrowechselrichter geschaltet (MC4 Standard)',
      solarPackage1Compliant: true,
      plugType: 'MC4 Standardkabel'
    },
    amazonSearchQuery: 'Zendure SolarFlow Hub 2000 AB2000 Balkonkraftwerk Speicher',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Zendure SolarFlow Hub 2000 AB2000 Balkonkraftwerk Speicher')
  },
  {
    id: 'zendure-ab2000-expansion',
    name: 'Zendure Zusatz-Akku AB2000 (1.920 Wh)',
    brand: 'zendure',
    brandName: 'Zendure',
    category: 'storage_expansion',
    categoryLabel: 'Erweiterungs-Akku',
    shortDesc: 'Erweiterungsbatterie mit 1.920 Wh LiFePO4 und integrierter Zellheizung für Zendure SolarFlow Hub 1200/2000 und Hyper 2000.',
    specs: [
      '1.920 Wh LiFePO4 Zusatzkapazität (stapelbar bis 4 Einheiten)',
      'Integrierte Heizfolie für unterbrechungsfreies Laden bis -20 °C',
      'Direkte Steckverbindung ohne Kabelsalat'
    ],
    capacityKwh: '1,92 kWh',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Zendure AB2000 Datenblatt & Prüfbericht',
    datasheetUrl: 'https://de.zendure.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie',
    technicalBadges: ['Zellheizung -20°C', 'LiFePO4 6000 Zyklen', 'IP65 Wetterfest'],
    compatibility: {
      requiresMasterSystem: true,
      masterSystemNote: 'Reine Zusatzbatterie ohne eigenen Wechselrichter. Benötigt zwingend Zendure Hub 1200, Hub 2000 oder Hyper 2000!',
      gridNorm: 'Über Basiseinheit',
      solarPackage1Compliant: true,
      plugType: 'Zendure Systemanschluss'
    },
    amazonSearchQuery: 'Zendure AB2000 Zusatzakku Erweiterungsbatterie',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Zendure AB2000 Zusatzakku Erweiterungsbatterie')
  },
  {
    id: 'growatt-noah-zusatzmodul',
    name: 'Growatt NOAH 2000 Stapel-Erweiterung (2.048 Wh)',
    brand: 'growatt',
    brandName: 'Growatt Solar',
    category: 'storage_expansion',
    categoryLabel: 'Erweiterungs-Akku',
    shortDesc: 'Zusätzliches LiFePO4-Speichermodul zur Kapazitätserweiterung eines bestehenden Growatt NOAH 2000 Systems auf bis zu 8,19 kWh.',
    specs: [
      '2.048 Wh LiFePO4 Zusatzkapazität (bis zu 4 Module stapelbar)',
      'Schutzart IP66 für dauerhafte Außenaufstellung',
      'Integrierte Vorwärmung für kalte Wintertage bis -20 °C'
    ],
    capacityKwh: '2,05 kWh',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Growatt NOAH 2000 Systemhandbuch & Kaskadierungsanleitung',
    datasheetUrl: 'https://www.growatt.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie',
    technicalBadges: ['IP66 wetterfest', 'Winter-Akkuheizung', 'Stapelbar bis 8,2 kWh'],
    compatibility: {
      requiresMasterSystem: true,
      masterSystemNote: 'Hinweis: Dies ist ein baugleiches NOAH 2000 Speicherelement zur System-Stapelung. Zur Einspeisung ins Hausnetz ist ein Mikrowechselrichter (z. B. Hoymiles oder APsystems) erforderlich.',
      gridNorm: 'Über Mikrowechselrichter (VDE-AR-N 4105)',
      solarPackage1Compliant: true,
      plugType: 'System-Steckverbindung'
    },
    amazonSearchQuery: 'Growatt NOAH 2000 Batteriespeicher Zusatzmodul LiFePO4',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Growatt NOAH 2000 Batteriespeicher Zusatzmodul LiFePO4')
  },
  {
    id: 'hoymiles-ms-a2-speicher',
    name: 'Hoymiles MS-A2 AC-Speicher All-in-One (2,24 kWh)',
    brand: 'hoymiles',
    brandName: 'Hoymiles',
    category: 'storage_system',
    categoryLabel: 'Balkon-Speicher (All-in-One)',
    shortDesc: 'AC-gekoppeltes All-in-One Speichersystem zur einfachen Nachrüstung an beliebigen bestehenden Balkonkraftwerken über die Steckdose.',
    specs: [
      '2.240 Wh LiFePO4 Kapazität (erweiterbar bis 4,48 kWh)',
      'AC-gekoppelt: Keine PV-Kabel zum Speicher nötig (lädt direkt aus dem Hausnetz)',
      '800W Einspeise- & Ladeleistung mit integriertem NA-Schutz nach VDE 4105',
      'Integrierte USV-Notstromsteckdose mit <10ms Umschaltzeit'
    ],
    capacityKwh: '2,24 kWh',
    acPowerWatts: '800 W AC',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Hoymiles MS-A2 Datenblatt & Benutzerhandbuch',
    datasheetUrl: 'https://www.hoymiles.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie',
    technicalBadges: ['AC-gekoppelt', 'USV Notstrom <10ms', 'Universelle Nachrüstung'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105:2018-11 & DIN EN 50549-1 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'Schuko-Netzkabel beiliegend'
    },
    amazonSearchQuery: 'Hoymiles MS-A2 Balkonkraftwerk Speicher AC gekoppelt',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Hoymiles MS-A2 Balkonkraftwerk Speicher AC gekoppelt')
  },

  // --- 7. ERWEITERTE WECHSELRICHTER ---
  {
    id: 'deye-sun-m80g4-inverter',
    name: 'Deye SUN-M80G4-EU-Q0 Mikrowechselrichter (Einzelgerät)',
    brand: 'deye',
    brandName: 'Deye Solar',
    category: 'inverter',
    categoryLabel: 'Mikrowechselrichter',
    shortDesc: '800W Mikrowechselrichter der 4. Generation mit 2 unabhängigen MPPTs, integriertem WLAN und mechanischem NA-Relais.',
    specs: [
      '800 W AC Nennausgangsleistung',
      '2 unabhängige MPPTs (für Module bis je 500+ Wp)',
      'Integriertes Relais zertifiziert nach VDE-AR-N 4105',
      'WLAN integriert für Deye Cloud Monitoring'
    ],
    acPowerWatts: '800 W AC',
    efficiency: '96,5 % Wirkungsgrad',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Deye SUN-M80G4-EU-Q0 Datenblatt & Einheitenzertifikat',
    datasheetUrl: 'https://www.deyeinverter.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie',
    technicalBadges: ['VDE 4105 zertifiziert', '2x MPPT', 'NA-Relais integriert'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105:2018-11 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'Betteri BC01 oder Schukokabel'
    },
    amazonSearchQuery: 'Deye SUN-M80G4-EU-Q0 Mikrowechselrichter 800W',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Deye SUN-M80G4-EU-Q0 Mikrowechselrichter 800W')
  },
  {
    id: 'hoymiles-hms-1600-4t',
    name: 'Hoymiles HMS-1600-4T Mikrowechselrichter (4 MPPT)',
    brand: 'hoymiles',
    brandName: 'Hoymiles',
    category: 'inverter',
    categoryLabel: 'Mikrowechselrichter',
    shortDesc: 'Hochleistungs-Mikrowechselrichter mit 4 unabhängigen MPPTs für 4 Solarmodule — ideal für Ausrichtungen auf Ost/West und Süd.',
    specs: [
      '1.600 W Spitzenleistung (für Großanlagen oder drosselbar auf 800W)',
      '4 unabhängige MPPT-Tracker (1 Tracker pro Solarmodul)',
      'Sub-1G Funkübertragung (DTU-S erfordert)',
      'Spitzenwirkungsgrad 96,7 %'
    ],
    acPowerWatts: '1.600 W AC (Drosselbar)',
    efficiency: '96,7 % Wirkungsgrad',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Hoymiles HMS-1600-4T Technisches Datenblatt',
    datasheetUrl: 'https://www.hoymiles.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 12 Jahre Herstellergarantie',
    technicalBadges: ['4 separate MPPT', 'Für 4 Module', 'VDE 4105 zertifiziert'],
    compatibility: {
      requiresMasterSystem: false,
      masterSystemNote: 'Hinweis: Für den ungedrosselten Betrieb als Stecker-Solargerät gilt in Deutschland die 800W-Grenze. Drosselung über Fachbetrieb oder DTU möglich.',
      gridNorm: 'VDE-AR-N 4105:2018-11 & DIN EN 50549-1',
      solarPackage1Compliant: true,
      plugType: 'Betteri BC01 Anschluss'
    },
    amazonSearchQuery: 'Hoymiles HMS-1600-4T Mikrowechselrichter 4 MPPT',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Hoymiles HMS-1600-4T Mikrowechselrichter 4 MPPT')
  },

  // --- 8. ERWEITERTE KOMPLETTSETS ---
  {
    id: 'set-apsystems-ez1-trina',
    name: '890Wp Komplettset mit APsystems EZ1-M (20A) & Trina Glas-Glas',
    brand: 'apsystems',
    brandName: 'APsystems / Trina Solar',
    category: 'complete_set',
    categoryLabel: '800W Komplettset',
    shortDesc: 'Leistungsstarkes Stecker-Solargerät mit 2x 445Wp Trina Bifazialmodulen und dem 20A-fähigen APsystems EZ1-M Inverter.',
    specs: [
      '2x 445 Wp Trina Vertex S+ Bifazial Glas-Glas Module',
      'APsystems EZ1-M Mikrowechselrichter (800W / 20A MPPTs)',
      'Integriertes Bluetooth und WLAN für lokale Ertragskontrolle',
      '5m Schuko-Anschlussleitung beiliegend'
    ],
    powerWp: '890 Wp (2x 445 Wp)',
    acPowerWatts: '800 W AC',
    efficiency: '22,3 % Modulwirkungsgrad',
    cellTechnology: 'N-Type TOPCon Bifazial',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'APsystems EZ1-M Konformität & Trina Solar Spezifikation',
    datasheetUrl: 'https://emea.apsystems.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 25 J. Modul / 12 J. Inverter',
    technicalBadges: ['20A Großzellen MPPT', 'VDE-AR-N 4105', 'Bifazial Glas-Glas'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105:2018-11 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'Schuko-Anschlusskabel beiliegend'
    },
    amazonSearchQuery: 'Balkonkraftwerk 800W APsystems EZ1-M Trina Glas Glas Komplettset',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Balkonkraftwerk 800W APsystems EZ1-M Trina Glas Glas Komplettset')
  },
  {
    id: 'set-anker-solix-all-in-one',
    name: 'Anker SOLIX All-in-One Solarbank 2 Set (Paneele + Speicher)',
    brand: 'anker',
    brandName: 'Anker SOLIX',
    category: 'complete_set',
    categoryLabel: 'Balkonkraftwerk mit Speicher',
    shortDesc: 'Vollständiges Komplettpaket aus 2x bifazialen Solarmodulen und der Anker Solarbank 2 mit integriertem Mikrowechselrichter.',
    specs: [
      '2x Hocheffizienz-Solarmodule (Glas-Glas bifazial)',
      'Anker Solarbank 2 mit 1,6 kWh LiFePO4 Speicher & 800W Einspeisung',
      'Plug & Play Direktanschluss an die Haushaltssteckdose',
      'Anker App Monitoring in Echtzeit'
    ],
    powerWp: 'ca. 880 – 1.000 Wp',
    capacityKwh: '1,6 kWh',
    acPowerWatts: '800 W AC',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Anker SOLIX Balkonkraftwerk Komplettsystem Dokumentation',
    datasheetUrl: 'https://www.anker.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie auf System',
    technicalBadges: ['All-in-One Paket', 'LiFePO4 Speicher', 'Solarpaket I konform'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105 zertifiziert mit integriertem Relais',
      solarPackage1Compliant: true,
      plugType: 'Schukostecker'
    },
    amazonSearchQuery: 'Anker SOLIX Balkonkraftwerk Komplettset mit Speicher 800W',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Anker SOLIX Balkonkraftwerk Komplettset mit Speicher 800W')
  },

  // --- 9. ERWEITERTE ENERGIEMESSTECHNIK & SMARTE STECKDOSEN ---
  {
    id: 'shelly-plus-1pm',
    name: 'Shelly Plus 1PM WLAN & Bluetooth Relais (16A)',
    brand: 'shelly',
    brandName: 'Shelly',
    category: 'metering',
    categoryLabel: 'Smart Metering',
    shortDesc: 'Unterputz-Schaltrelais mit präziser Leistungsmessung zur Erfassung der Einspeisung von Balkonkraftwerken.',
    specs: [
      'Misst Wirkleistung und kumulierten Energieertrag (bis 16A / 3.500W)',
      'WLAN & Bluetooth integriert, keine separate Bridge erforderlich',
      'Überlast-, Überspannungs- und Übertemperaturschutz integriert',
      'Offene REST-API, MQTT und Home Assistant Unterstützung'
    ],
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Shelly Plus 1PM Datenblatt & CE Zertifikat',
    datasheetUrl: 'https://www.shelly.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 2 Jahre Herstellergarantie',
    technicalBadges: ['16A Leistungsmessung', 'WLAN & Bluetooth', 'CE zertifiziert'],
    compatibility: {
      requiresMasterSystem: false,
      masterSystemNote: 'Einbau in Unterputzdose hinter Steckdose/Schalter durch elektrotechnisch unterwiesene Person empfohlen.',
      gridNorm: 'CE & DIN EN 60669 konform',
      solarPackage1Compliant: true,
      plugType: 'Schraubklemmen'
    },
    amazonSearchQuery: 'Shelly Plus 1PM Relais Leistungsmessung Balkonkraftwerk',
    asin: 'B0965J4HT5',
    affiliateUrl: getAmazonDirectUrl('B0965J4HT5', 'Shelly Plus 1PM Relais Leistungsmessung Balkonkraftwerk')
  },
  {
    id: 'ecoflow-smart-plug',
    name: 'EcoFlow Smart Plug WLAN Zwischenstecker',
    brand: 'ecoflow',
    brandName: 'EcoFlow',
    category: 'metering',
    categoryLabel: 'Smart Plug',
    shortDesc: 'Intelligente Zwischensteckdose zur Verbrauchsmessung und automatischen Nulleinspeise-Steuerung für EcoFlow PowerStream.',
    specs: [
      'Echtzeit-Verbrauchsmessung haushaltsüblicher Geräte',
      'Funkübermittlung an den EcoFlow PowerStream zur dynamischen Leistungsanpassung',
      'Max. Belastbarkeit 2.500 W (10A)',
      'Schuko-Zwischenstecker für Plug & Play Montage'
    ],
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'EcoFlow Smart Plug Benutzerhandbuch & Spezifikationsblatt',
    datasheetUrl: 'https://www.ecoflow.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 2 Jahre Herstellergarantie',
    technicalBadges: ['Nulleinspeise-Sensor', 'Plug & Play', 'Echtzeit-Messung'],
    compatibility: {
      requiresMasterSystem: false,
      masterSystemNote: 'Optimiert für das EcoFlow PowerStream Speichersystem zur automatischen Deckung des aktuellen Bedarfs.',
      gridNorm: 'CE konform',
      solarPackage1Compliant: true,
      plugType: 'Schuko Zwischenstecker'
    },
    amazonSearchQuery: 'EcoFlow Smart Plug Zwischenstecker PowerStream',
    asin: 'B0C2CQLPP1',
    affiliateUrl: getAmazonDirectUrl('B0C2CQLPP1', 'EcoFlow Smart Plug Zwischenstecker PowerStream')
  },
  {
    id: 'shelly-plus-plug-s',
    name: 'Shelly Plus Plug S Smarte WLAN-Steckdose (12A)',
    brand: 'shelly',
    brandName: 'Shelly',
    category: 'metering',
    categoryLabel: 'Smart Plug',
    shortDesc: 'Zwischensteckdose mit mehrfarbigem LED-Ring zur Verbrauchsanzeige und exakter Strommessung für Stecker-Solargeräte.',
    specs: [
      'Misst Ertrag oder Verbrauch bis zu 2.500 W (12A Dauerlast)',
      'Farbiger LED-Ring visualisiert aktuellen Leistungsfluss in Echtzeit',
      'WLAN integriert für direkte Einbindung in Apps und Smarthome-Systeme'
    ],
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Shelly Plus Plug S Datenblatt & Handbuch',
    datasheetUrl: 'https://www.shelly.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 2 Jahre Herstellergarantie',
    technicalBadges: ['LED Leistungsanzeige', 'Plug & Play', '12A Belastbarkeit'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'CE konform',
      solarPackage1Compliant: true,
      plugType: 'Schuko Zwischenstecker'
    },
    amazonSearchQuery: 'Shelly Plus Plug S smarte Steckdose Leistungsmessung',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Shelly Plus Plug S smarte Steckdose Leistungsmessung')
  },
  {
    id: 'anker-solix-smart-meter',
    name: 'Anker SOLIX Smart Meter (3-Phasen Zähler)',
    brand: 'anker',
    brandName: 'Anker SOLIX',
    category: 'metering',
    categoryLabel: 'Smart Metering',
    shortDesc: 'Dreiphasiger Hutschienenzähler mit Klappstromwandlern für phasengenaue Nulleinspeisung der Anker Solarbank 2.',
    specs: [
      'Phasensaldierende Echtzeitmessung über 3 Klapp-Stromwandler (CT)',
      'Reaktionszeit < 3 Sekunden zur exakten Anpassung der Solarbank-Einspeisung',
      'WLAN & RS485-Schnittstelle zur Einbindung in den Zählerschrank',
      'DIN-Hutschienenmontage'
    ],
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Anker SOLIX Smart Meter Installationsanleitung (A17X7)',
    datasheetUrl: 'https://www.anker.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 2 Jahre Herstellergarantie',
    technicalBadges: ['Klappstromwandler', 'Nulleinspeisung <3s', 'DIN-Hutschiene'],
    compatibility: {
      requiresMasterSystem: false,
      masterSystemNote: 'Einbau im Zählerschrank darf ausschließlich durch eine eingetragene Elektrofachkraft nach NAV § 13 erfolgen.',
      gridNorm: 'CE & DIN EN 61010-1 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'Hutschienen-Klemmen'
    },
    amazonSearchQuery: 'Anker SOLIX Smart Meter Dreiphasen Zähler',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Anker SOLIX Smart Meter Dreiphasen Zähler')
  },
  {
    id: 'zendure-satellite-plug',
    name: 'Zendure Satelliten-Steckdose Smart Plug',
    brand: 'zendure',
    brandName: 'Zendure',
    category: 'metering',
    categoryLabel: 'Smart Plug',
    shortDesc: 'Smarter Zwischenstecker zur Kommunikation mit Zendure SolarFlow Systemen für bedarfsgesteuerte Einspeisung.',
    specs: [
      'Erfasst den Momentanverbrauch einzelner Verbraucher (z. B. Kühlschrank)',
      'Signalisiert dem SolarFlow Hub den exakten Leistungsbedarf',
      'Schuko-Zwischenstecker mit Überlastschutz'
    ],
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Zendure Satellite Plug Spezifikation',
    datasheetUrl: 'https://de.zendure.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 2 Jahre Herstellergarantie',
    technicalBadges: ['SolarFlow Nulleinspeisung', 'Plug & Play', 'Echtzeit-Messung'],
    compatibility: {
      requiresMasterSystem: false,
      masterSystemNote: 'Funktioniert nahtlos mit Zendure SolarFlow Hub 1200, Hub 2000 und Hyper 2000.',
      gridNorm: 'CE konform',
      solarPackage1Compliant: true,
      plugType: 'Schuko Zwischenstecker'
    },
    amazonSearchQuery: 'Zendure Satellite Plug smarte Steckdose SolarFlow',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Zendure Satellite Plug smarte Steckdose SolarFlow')
  },

  // --- 10. ERWEITERTE MONTAGESYSTEME & ZUBEHÖR ---
  {
    id: 'halterung-flachdach-alu',
    name: 'Flachdach- & Boden-Aufständerung Alu (10° – 30° einstellbar)',
    brand: 'universal',
    brandName: 'Montagesysteme',
    category: 'mounting',
    categoryLabel: 'Montagesystem',
    shortDesc: 'Verstellbare Aufständerungsdreiecke aus witterungsbeständigem Aluminium für Flachdächer, Garagen, Terrassen und Garten.',
    specs: [
      'Aluminiumlegierung AL6005-T5 mit Edelstahl-Schraubverbindungen V2A',
      'Neigungswinkel flexibel zwischen 10° und 30° justierbar für maximalen Ertrag',
      'Geeignet für Standardmodule mit Rahmenhöhe 30mm und 35mm',
      'Ballastierbar mit Gehwegplatten (keine Dachdurchdringung nötig)'
    ],
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Hersteller-Statischer Nachweis nach Eurocode 9 & Materialprüfbericht',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Materialgarantie',
    technicalBadges: ['Alu AL6005-T5', '10-30° verstellbar', 'Ballastierbar ohne Bohren'],
    compatibility: {
      requiresMasterSystem: false,
      masterSystemNote: 'Auf Flachdächern und Garagen ist auf ausreichende Beschwerung (Ballastierung) gemäß örtlicher Windlastzone zu achten.',
      gridNorm: 'Eurocode 9 (Aluminiumstrukturen)',
      solarPackage1Compliant: true,
      plugType: 'Mechanische Montage'
    },
    amazonSearchQuery: 'Balkonkraftwerk Flachdach Halterung verstellbar Aluminium Aufständerung',
    asin: 'B0BX3KK21Y',
    affiliateUrl: getAmazonDirectUrl('B0BX3KK21Y', 'Balkonkraftwerk Flachdach Halterung verstellbar Aluminium Aufständerung')
  },
  {
    id: 'halterung-verstaerkt-0-90',
    name: 'Verstärkte Universal-Aufständerung 0° – 90° (118 cm Profil)',
    brand: 'universal',
    brandName: 'Montagesysteme',
    category: 'mounting',
    categoryLabel: 'Montagesystem',
    shortDesc: 'Schwerlast-Montagewinkel mit 118 cm Schienenlänge für große Solarmodule bis 550W an Wand, Boden oder Balkon.',
    specs: [
      'Verstärktes Aluminium-C-Profil für breite Solarmodule',
      'Neigungswinkel von 0° (flach) bis 90° (senkrecht) stufenlos einstellbar',
      'Inklusive Edelstahlschrauben und Modulklemmen'
    ],
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Materialzertifikat AL6005 & Belastungsprüfung',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Materialgarantie',
    technicalBadges: ['0-90° stufenlos', '118 cm Profil', 'Für Großmodule bis 550W'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'Eurocode 1 & Eurocode 9',
      solarPackage1Compliant: true,
      plugType: 'Mechanische Befestigung'
    },
    amazonSearchQuery: 'Verstärkte Solarpanel Halterung 118cm Alu Balkonkraftwerk 0-90 Grad',
    asin: 'B0CWGPV28G',
    affiliateUrl: getAmazonDirectUrl('B0CWGPV28G', 'Verstärkte Solarpanel Halterung 118cm Alu Balkonkraftwerk 0-90 Grad')
  },
  {
    id: 'halterung-ziegeldach-set',
    name: 'Ziegeldach-Montageset für 2 Solarmodule (Dachhaken 3-fach verstellbar)',
    brand: 'universal',
    brandName: 'Montagesysteme',
    category: 'mounting',
    categoryLabel: 'Montagesystem',
    shortDesc: 'Komplettes Montagesystem für Schrägdächer mit Ziegeldeckung: 4x 3-fach verstellbare Edelstahl-Dachhaken und Aluschienen.',
    specs: [
      '4x Dachhaken aus Edelstahl 1.4016 / V2A (3-fach in Höhe und Schenkel verstellbar)',
      '2x Aluminium-Montageschienen inklusive Schienenverbinder',
      '4x Endklemmen und 2x Mittelklemmen für 30mm/35mm Modulrahmen',
      'Inklusive Tellerkopf-Holzbauschrauben zur Verankerung im Dachsparren'
    ],
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Statische Typenprüfung Dachhaken & DIN EN 1991-1-3/4',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 10 Jahre Materialgarantie',
    technicalBadges: ['Edelstahl Dachhaken', '3-fach verstellbar', 'Schrägdach Ziegel'],
    compatibility: {
      requiresMasterSystem: false,
      masterSystemNote: 'Dachmontage erfordert handwerkliche Fachkenntnisse. Die statische Eignung des Dachstuhls und der Sparren ist vorab sicherzustellen.',
      gridNorm: 'Statisch ausgelegt nach DIN EN 1991 (Wind- und Schneelasten)',
      solarPackage1Compliant: true,
      plugType: 'Dachsparren-Verschraubung'
    },
    amazonSearchQuery: 'Ziegeldach Montageset 2 Solarmodule Dachhaken verstellbar Aluminium',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'Ziegeldach Montageset 2 Solarmodule Dachhaken verstellbar Aluminium')
  },
  {
    id: 'kabel-betteri-bc01-5m',
    name: 'Avoltik Betteri BC01 Anschlusskabel 5m (Schukostecker)',
    brand: 'universal',
    brandName: 'PV-Zubehör',
    category: 'mounting',
    categoryLabel: 'PV-Zubehör & Kabel',
    shortDesc: 'Gummischlauchleitung H07RN-F 3G1,5 mm² mit original Betteri BC01 Buchse zum Anschluss von Mikrowechselrichtern an Schuko.',
    specs: [
      '5 Meter hochflexible Gummischlauchleitung H07RN-F 3G1,5 mm²',
      'Original Betteri BC01 Buchse (IP68) passend für Hoymiles, Deye, APsystems und Envertech',
      'Vollgummi-Schutzkontaktstecker IP44 für den Außenbereich',
      'UV-, ozon- und witterungsbeständig nach VDE-Vorschrift'
    ],
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Hersteller-Konformitätserklärung & VDE-Prüfzertifikat Leitung',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 2 Jahre Herstellergarantie',
    technicalBadges: ['H07RN-F 3G1,5mm²', 'Betteri BC01 IP68', 'VDE zertifiziert'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE 0282-4 (H07RN-F) & DIN VDE 0620-1 (Schukostecker)',
      solarPackage1Compliant: true,
      plugType: 'Betteri BC01 zu Schuko'
    },
    amazonSearchQuery: 'Avoltik Betteri BC01 Anschlusskabel 5m Schuko Mikrowechselrichter',
    asin: 'B0BK1683PR',
    affiliateUrl: getAmazonDirectUrl('B0BK1683PR', 'Avoltik Betteri BC01 Anschlusskabel 5m Schuko Mikrowechselrichter')
  },
  {
    id: 'kabel-mc4-verlaengerung-5m',
    name: 'ENERNOVA MC4 Solar-Verlängerungskabel 5m (4 mm² TÜV)',
    brand: 'universal',
    brandName: 'PV-Zubehör',
    category: 'mounting',
    categoryLabel: 'PV-Zubehör & Kabel',
    shortDesc: 'Paar vorkonfektionierte Solarkabel (Rot/Schwarz) mit original MC4-kompatiblen Steckern und Buchsen, zertifiziert nach EN 50618.',
    specs: [
      '2x 5m Solarkabel mit 4 mm² Leiterquerschnitt (H1Z2Z2-K)',
      'TÜV-zertifiziert nach DIN EN 50618 für bis zu 1.500 V DC',
      'Vollvergossene IP67 Steckverbinder mit Verriegelungsschutz',
      'Temperaturbeständig von -40 °C bis +90 °C'
    ],
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'TÜV Rheinland Zertifikat nach EN 50618 & ENERNOVA Datenblatt',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 2 Jahre Herstellergarantie',
    technicalBadges: ['TÜV EN 50618', '4 mm² H1Z2Z2-K', 'IP67 Wasserdicht'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'DIN EN 50618 (Solarkabel) & IEC 62852 (Steckverbinder)',
      solarPackage1Compliant: true,
      plugType: 'MC4 Standard Stecker & Buchse'
    },
    amazonSearchQuery: 'Solarkabel 4mm2 MC4 Verlaengerungskabel 5m TUEV zertifiziert',
    asin: 'B0CSZ2MB4C',
    affiliateUrl: getAmazonDirectUrl('B0CSZ2MB4C', 'Solarkabel 4mm2 MC4 Verlaengerungskabel 5m TUEV zertifiziert')
  },
  {
    id: 'stecker-mc4-y-abzweig',
    name: 'MC4 Y-Abzweigstecker Set (1x M/2xF & 1x F/2xM)',
    brand: 'universal',
    brandName: 'PV-Zubehör',
    category: 'mounting',
    categoryLabel: 'PV-Zubehör & Kabel',
    shortDesc: 'Y-Verteilerpaar zur elektrischen Parallelschaltung von zwei Solarmodulen an einem MPPT-Eingang des Mikrowechselrichters.',
    specs: [
      '1 Paar Y-Abzweigstecker (1 Stecker auf 2 Buchsen / 1 Buchse auf 2 Stecker)',
      'Geeignet für Parallelschaltungen zur optimalen Ausnutzung von 800W Inverter-Eingängen',
      'IP67 wetterfest mit Dichtungsring gegen Feuchtigkeitseintritt',
      'Max. Strombelastbarkeit bis 30 A'
    ],
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'Hersteller-Prüfbericht IP67 & CE Konformität',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 2 Jahre Herstellergarantie',
    technicalBadges: ['Parallelschaltung', 'IP67 Wetterfest', 'Bis 30A Belastbar'],
    compatibility: {
      requiresMasterSystem: false,
      masterSystemNote: 'Wichtiger Sicherheitshinweis: Bei der Parallelschaltung verdoppelt sich der Eingangsstrom (A). Prüfen Sie vorab, ob der Mikrowechselrichter für den resultierenden Kurzschlussstrom (Isc) der Module ausgelegt ist.',
      gridNorm: 'IEC 62852 Steckverbinder-Norm',
      solarPackage1Compliant: true,
      plugType: 'MC4 Standard Abzweig'
    },
    amazonSearchQuery: 'MC4 Y Stecker Abzweigbuchsen Set Parallelschaltung Solarmodule',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'MC4 Y Stecker Abzweigbuchsen Set Parallelschaltung Solarmodule')
  },

  // --- 11. ERWEITERTE SOLARMODULE ---
  {
    id: 'ja-solar-jam54d40-440',
    name: 'JA Solar JAM54D40 440Wp Glas-Glas Bifazial Modul',
    brand: 'jasolar',
    brandName: 'JA Solar',
    category: 'module',
    categoryLabel: 'Solarmodul',
    shortDesc: 'Bifaziales Doppelglas-Modul mit n-Type DeepBlue 4.0 Pro Zellen für optimierten Ertrag auch bei Schwachlicht.',
    specs: [
      '440 Wp Nennleistung bei 22,0 % Modulwirkungsgrad',
      'Bifaziale Doppelglas-Technologie für zusätzliche Rückseitenerträge',
      '1,6 mm + 1,6 mm gehärtetes Glas mit Anti-Reflex-Beschichtung',
      'Niedriger Temperaturkoeffizient von -0,30 %/K'
    ],
    powerWp: '440 Wp',
    efficiency: '22,0 % Wirkungsgrad',
    cellTechnology: 'N-Type TOPCon Glas-Glas',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'JA Solar JAM54D40 MB Datenblatt & TÜV Nord Zertifikat',
    datasheetUrl: 'https://www.jasolar.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 25 Jahre Produkt- / 30 Jahre Leistungsgarantie',
    technicalBadges: ['Bifazial Glas-Glas', 'N-Type TOPCon', 'TÜV zertifiziert'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'IEC 61215 / IEC 61730 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'MC4-EVO2 Originalanschluss'
    },
    amazonSearchQuery: 'JA Solar JAM54D40 440W Glas Glas Bifazial Solarmodul',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'JA Solar JAM54D40 440W Glas Glas Bifazial Solarmodul')
  },
  {
    id: 'longi-himo-x6-435',
    name: 'LONGi Solar Hi-MO X6 Explorer 435Wp Full Black',
    brand: 'longi',
    brandName: 'LONGi Solar',
    category: 'module',
    categoryLabel: 'Solarmodul',
    shortDesc: 'Premium Full-Black Solarmodul mit HPBC-Frontkontakt-freier Zelltechnologie für höchste Ästhetik am Balkon.',
    specs: [
      '435 Wp Nennleistung bei 22,3 % Wirkungsgrad',
      'HPBC-Zelltechnologie ohne sichtbare Metallleiterbahnen auf der Frontseite',
      'Edle homogene Full-Black Optik für sichtbare Balkongeländer und Fassaden',
      'Hervorragendes Schwachlicht- und Hochtemperaturverhalten'
    ],
    powerWp: '435 Wp',
    efficiency: '22,3 % Wirkungsgrad',
    cellTechnology: 'HPBC Full-Black',
    verificationStatus: 'VERIFIED',
    manufacturerSource: 'LONGi Solar Hi-MO X6 Explorer Datenblatt & IEC Zertifikat',
    datasheetUrl: 'https://www.longi.com',
    lastVerified: '2026-10-01',
    warranty: 'Herstellergarantie: 15 Jahre Produkt- / 25 Jahre lineare Leistungsgarantie',
    technicalBadges: ['HPBC Full Black', 'Keine Frontgitter', '22,3 % Wirkungsgrad'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'IEC 61215 / IEC 61730',
      solarPackage1Compliant: true,
      plugType: 'MC4 Standard'
    },
    amazonSearchQuery: 'LONGi Solar Hi MO X6 435W Full Black Solarmodul',
    asin: undefined,
    affiliateUrl: getAmazonDirectUrl(undefined, 'LONGi Solar Hi MO X6 435W Full Black Solarmodul')
  }
];

export const PRODUCTS_BY_CATEGORY = {
  all: UNIFIED_PRODUCTS,
  complete_set: UNIFIED_PRODUCTS.filter(p => p.category === 'complete_set'),
  inverter: UNIFIED_PRODUCTS.filter(p => p.category === 'inverter'),
  storage_system: UNIFIED_PRODUCTS.filter(p => p.category === 'storage_system'),
  storage_expansion: UNIFIED_PRODUCTS.filter(p => p.category === 'storage_expansion'),
  module: UNIFIED_PRODUCTS.filter(p => p.category === 'module'),
  mounting: UNIFIED_PRODUCTS.filter(p => p.category === 'mounting'),
  metering: UNIFIED_PRODUCTS.filter(p => p.category === 'metering'),
};
