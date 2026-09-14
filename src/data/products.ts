/**
 * WATTPEAK.DE UNIFIED PRODUCT DATABASE (SINGLE SOURCE OF TRUTH)
 * 
 * Alle Produktstammdaten sind zentral und konsistent gepflegt.
 * Keine erfundenen Sternchen-Bewertungen oder unbelegten "Testsieger"-Siegel.
 * Technische Angaben basieren auf offiziellen Herstellerdatenblättern (Stand: 2025/2026).
 */

export type ProductCategory = 
  | 'complete_set'       // Steckerfertige Komplettsets (Balkonkraftwerk)
  | 'inverter'           // Mikrowechselrichter & Hybridwechselrichter
  | 'storage_system'     // Vollständige All-in-One Speichersysteme (inkl. Inverter/Hub)
  | 'storage_expansion'  // Reine Zusatzbatterien (Erfordert Basissystem / Controller)
  | 'module'             // Solarmodule (Glas-Glas, N-Type TOPCon, HJT)
  | 'metering'           // Smart Meter & Energiemanager
  | 'mounting';          // Halterungen & Unterkonstruktion

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
  priceRange: string;         // Marktpreis-Richtwert (z.B. "ca. 129 – 169 € *")
  priceReferenceDate: string; // z.B. "Marktübersicht Stand Q1 2025/2026"
  warranty: string;           // Rein offizielle Herstellergarantie
  technicalBadges: string[];  // Sachliche technische Zertifikate
  compatibility: ProductCompatibility;
  amazonSearchQuery: string;
}

export const AMAZON_TRACKING_ID = 'wattpeak.de-21';

export function getAmazonSearchUrl(query: string): string {
  return `https://www.amazon.de/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TRACKING_ID}`;
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
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 25 J. Produkt / 30 J. linear auf Module, 12 J. auf Wechselrichter',
    technicalBadges: ['VDE-AR-N 4105', 'Solarpaket I konform', 'Bifazial Glas-Glas'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105 & DIN EN 50549-1 konform mit NA-Schutz',
      solarPackage1Compliant: true,
      plugType: 'Schuko-Anschlusskabel beiliegend'
    },
    amazonSearchQuery: 'Balkonkraftwerk 800W Komplettset Hoymiles HMS-800W Trina'
  },
  {
    id: 'set-1760wp-4modul',
    name: '1.760Wp 4-Modul Kraftpaket mit 800W Inverter',
    brand: 'hoymiles',
    brandName: 'Hoymiles Ultra',
    category: 'complete_set',
    categoryLabel: '800W 4-Modul Set',
    shortDesc: 'Maximalbelegung nach Solarpaket I: 4 Module für Höchstertrag bei diffusem Licht und Bewölkung mit 800W AC-Drosselung.',
    specs: [
      '4x 440 Wp Glas-Glas Module (parallel verschaltet)',
      'Hoymiles 800W Mikrowechselrichter mit MPPT-Steuerung',
      'Hervorragende Schwachlichtausbeute im Winter',
      'Inklusive Y-Abzweigstecker & 5m Schukoleitung'
    ],
    powerWp: '1.760 Wp (4x 440 Wp)',
    acPowerWatts: '800 W AC',
    efficiency: '22,0 % Modulwirkungsgrad',
    cellTechnology: 'N-Type TOPCon Glas-Glas',
    priceRange: 'ca. 590 – 690 € *',
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 25 J. Produkt / 30 J. linear auf Module',
    technicalBadges: ['Max. Solarpaket I Belegung', 'VDE-AR-N 4105', 'Schwachlicht-Optimiert'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105 zertifiziert mit integriertem Relais',
      solarPackage1Compliant: true,
      plugType: 'Schuko-Anschluss'
    },
    amazonSearchQuery: 'Balkonkraftwerk 800W 4 Module Komplettset 1600W 1800W'
  },
  {
    id: 'set-840wp-deye',
    name: 'Deye SUN-M80G4-EU-Q0 800W Komplettset',
    brand: 'deye',
    brandName: 'Deye Solar',
    category: 'complete_set',
    categoryLabel: '800W Komplettset',
    shortDesc: 'Neu konstruierter G4-Mikrowechselrichter mit externem Trennrelais nach VDE-Norm und 2x 420Wp Modulen.',
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
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 10 J. auf Wechselrichter, 15 J. auf Module',
    technicalBadges: ['VDE-AR-N 4105', 'Relais integriert', 'IP67 Wetterfest'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'Schukostecker'
    },
    amazonSearchQuery: 'Deye 800W Balkonkraftwerk Komplettset'
  },

  // --- 2. SPEICHERSYSTEME & ALL-IN-ONE ---
  {
    id: 'anker-solix-solarbank-2',
    name: 'Anker SOLIX Solarbank 2 E1600 Pro All-in-One',
    brand: 'anker',
    brandName: 'Anker SOLIX',
    category: 'storage_system',
    categoryLabel: 'Balkon-Speicher (All-in-One)',
    shortDesc: 'Voll integriertes LiFePO4-Speichersystem der 2. Generation mit 1,6 kWh Akku, 4 integrierten MPPTs und 800W Inverter.',
    specs: [
      '1.600 Wh LiFePO4-Kapazität (modular erweiterbar bis 9,6 kWh)',
      '4x MPPT integriert – bis zu 2.400 Wp PV-Eingangsleistung direkt anschließbar',
      'Integrierter 800W Mikrowechselrichter (kein separater Inverter nötig)',
      '6.000 Zyklen Lebensdauer (SOH >80 %)',
      'Smarte Einspeisesteuerung über Smart Meter oder Smart Plugs'
    ],
    capacityKwh: '1,6 kWh (bis 9,6 kWh erweiterbar)',
    acPowerWatts: '800 W AC integriert',
    priceRange: 'ca. 799 – 1.099 € *',
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie',
    technicalBadges: ['All-in-One Lösung', '4x MPPT integriert', 'LiFePO4 6000 Zyklen'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105 konform',
      solarPackage1Compliant: true,
      plugType: 'Direkter Netzsteckeranschluss'
    },
    amazonSearchQuery: 'Anker SOLIX Solarbank 2 E1600 Pro Balkonkraftwerk Speicher'
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
      'Einfaches Stapel-Design ohne zusätzliche Verkabelung',
      'Erfordert Anker Solarbank 2 Pro / Plus als Basiseinheit'
    ],
    capacityKwh: '1,6 kWh',
    priceRange: 'ca. 549 – 649 € *',
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie',
    technicalBadges: ['Reiner Erweiterungsakku', 'LiFePO4 6000 Zyklen'],
    compatibility: {
      requiresMasterSystem: true,
      masterSystemNote: 'Achtung: Dies ist eine Erweiterungsbatterie ohne Wechselrichter. Sie benötigt zwingend eine Anker Solarbank 2 Pro oder Plus als Basiseinheit!',
      gridNorm: 'Über Basiseinheit',
      solarPackage1Compliant: true,
      plugType: 'System-Stapelanschluss'
    },
    amazonSearchQuery: 'Anker SOLIX BP1600 Zusatzakku Erweiterungsbatterie'
  },
  {
    id: 'ecoflow-powerstream-delta2max',
    name: 'EcoFlow PowerStream 800W + DELTA 2 Max Bundle',
    brand: 'ecoflow',
    brandName: 'EcoFlow',
    category: 'storage_system',
    categoryLabel: 'Balkon-Speicher + Powerstation',
    shortDesc: 'Modulares 2-in-1-System: Balkonkraftwerk-Speicher für die Wohnung und tragbare 2.400W Notstrom-Powerstation für Camping/Outdoor.',
    specs: [
      '2.048 Wh LiFePO4 Kapazität (erweiterbar auf 6.144 Wh)',
      'PowerStream 800W Einspeise-Wechselrichter mit 2x MPPT',
      'Integrierte Schuko-Notstromsteckdosen an der Powerstation (2.400 W)',
      'Echtzeit-Null-Einspeisung via EcoFlow Smart Plug'
    ],
    capacityKwh: '2,05 kWh',
    acPowerWatts: '800 W Netzeinspeisung / 2.400 W Notstrom',
    priceRange: 'ca. 999 – 1.390 € *',
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 5 Jahre Herstellergarantie auf Akku',
    technicalBadges: ['Balkon + Powerstation', 'Notstrom 2400W', 'LiFePO4 3000 Zyklen'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'Schuko-Netzkabel'
    },
    amazonSearchQuery: 'EcoFlow PowerStream 800W DELTA 2 Max Balkonkraftwerk'
  },
  {
    id: 'growatt-noah-2000',
    name: 'Growatt NOAH 2000 Balkonkraftwerk-Speicher',
    brand: 'growatt',
    brandName: 'Growatt Solar',
    category: 'storage_system',
    categoryLabel: 'Balkon-Speicher',
    shortDesc: 'Robuster 2.048 Wh LiFePO4 Akku mit IP66-Wasserschutz und integrierter Akkuheizung für den Winterbetrieb bis -20 °C.',
    specs: [
      '2.048 Wh LiFePO4 (erweiterbar auf bis zu 8.192 Wh mit 4 Packs)',
      'Integrierte Vorwärmung bei Minusgraden (lädt auch bei Frost)',
      'Kompatibel mit gängigen Mikrowechselrichtern (Hoymiles, Deye, APsystems)',
      'IP66 wetterfest für den dauerhaften Außeneinsatz'
    ],
    capacityKwh: '2,05 kWh',
    priceRange: 'ca. 699 – 899 € *',
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 10 Jahre Herstellergarantie',
    technicalBadges: ['IP66 wetterfest', 'Winter-Akkuheizung', 'Universell kompatibel'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'Wird zwischen Module und Mikrowechselrichter geschaltet (MC4 Standard)',
      solarPackage1Compliant: true,
      plugType: 'MC4 Solarkabel'
    },
    amazonSearchQuery: 'Growatt NOAH 2000 Balkonkraftwerk Speicher LiFePO4'
  },

  // --- 3. MIKROWECHSELRICHTER & WECHSELRICHTER ---
  {
    id: 'hoymiles-hms-800w',
    name: 'Hoymiles HMS-800W-2T Mikrowechselrichter',
    brand: 'hoymiles',
    brandName: 'Hoymiles',
    category: 'inverter',
    categoryLabel: 'Mikrowechselrichter',
    shortDesc: 'Referenz-Mikrowechselrichter für Stecker-Solargeräte mit 2 unabhängigen MPPT-Trackern, integriertem WLAN und VDE-Relais.',
    specs: [
      '800 W AC-Nennausgangsleistung (werkseitig eingestellt)',
      '2 unabhängige MPPT-Tracker (für bis zu 2x 540+ Wp Module)',
      'Integriertes WLAN-Modul (keine externe DTU zwingend erforderlich)',
      'VDE-AR-N 4105 & EN 50549-1 zertifiziert mit integriertem NA-Schutz',
      'Maximaler Wirkungsgrad von 96,7 %'
    ],
    acPowerWatts: '800 W AC',
    efficiency: '96,7 % Spitzenwirkungsgrad',
    priceRange: 'ca. 119 – 149 € *',
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 12 Jahre Herstellergarantie',
    technicalBadges: ['VDE-AR-N 4105 zertifiziert', '2x MPPT', 'WLAN integriert'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105:2018-11 mit Einheiten- & NA-Schutzzertifikat',
      solarPackage1Compliant: true,
      plugType: 'Betteri BC01 oder Schukokabel'
    },
    amazonSearchQuery: 'Hoymiles HMS-800W-2T Mikrowechselrichter 800W'
  },
  {
    id: 'apsystems-ez1-m',
    name: 'APsystems EZ1-M 800W Mikrowechselrichter',
    brand: 'apsystems',
    brandName: 'APsystems',
    category: 'inverter',
    categoryLabel: 'Mikrowechselrichter',
    shortDesc: 'Leistungsstarker 800W Mikrowechselrichter mit bis zu 20A Eingangsstrom – ideal für moderne Hochleistungsmodule.',
    specs: [
      '800 W AC (über AP EasyPower App zwischen 600W und 800W umschaltbar)',
      '2x MPPT mit je 20A Eingangsstrom für Großzellen-Module',
      'Integriertes Bluetooth & WLAN für direkte lokale Einrichtung',
      'VDE-AR-N 4105 konform'
    ],
    acPowerWatts: '800 W AC (umschaltbar)',
    efficiency: '97,3 % Wirkungsgrad',
    priceRange: 'ca. 129 – 165 € *',
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 12 Jahre Herstellergarantie',
    technicalBadges: ['20A Eingangsstrom', 'VDE 4105', 'Bluetooth & WLAN'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'VDE-AR-N 4105 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'Schuko-Anschlusskabel'
    },
    amazonSearchQuery: 'APsystems EZ1-M Mikrowechselrichter 800W'
  },

  // --- 4. SOLARMODULE ---
  {
    id: 'trina-vertex-s-plus-440',
    name: 'Trina Solar Vertex S+ 445Wp Bifazial Glas-Glas',
    brand: 'trina',
    brandName: 'Trina Solar',
    category: 'module',
    categoryLabel: 'Solarmodul',
    shortDesc: 'Doppelglas-Modul mit n-Type TOPCon-Technologie, Brandschutzklasse A und bis zu 25 % Mehrertrag durch die Rückseite.',
    specs: [
      '445 Wp Nennleistung (STC nach DIN EN IEC 60904-3)',
      'Bifazial: Transparente Rückseite für zusätzlichen Ertrag aus Umgebungsreflexion',
      '2x 1,6 mm thermisch gehärtetes Glas (höchste Hagelschutzklasse)',
      'Niedriger Temperaturkoeffizient von -0,30 %/K'
    ],
    powerWp: '445 Wp',
    efficiency: '22,3 % Wirkungsgrad',
    cellTechnology: 'N-Type i-TOPCon Glas-Glas',
    priceRange: 'ca. 75 – 99 € * (Einzelmodul)',
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 25 Jahre Produktgarantie / 30 Jahre lineare Leistungsgarantie',
    technicalBadges: ['Bifazial Glas-Glas', 'Brandschutzklasse A', 'Hagelfest'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'IEC 61215 / IEC 61730 zertifiziert',
      solarPackage1Compliant: true,
      plugType: 'MC4-EVO2 Originalstecker'
    },
    amazonSearchQuery: 'Trina Solar Vertex S+ 440Wp 445Wp Bifazial Glas Glas'
  },
  {
    id: 'jinko-tiger-neo-440',
    name: 'Jinko Solar Tiger Neo 440Wp N-Type TOPCon',
    brand: 'jinko',
    brandName: 'Jinko Solar',
    category: 'module',
    categoryLabel: 'Solarmodul',
    shortDesc: 'Hocheffizientes N-Type Modul vom weltweiten Marktführer mit optimiertem Schwachlichtverhalten und schwarzem Rahmen.',
    specs: [
      '440 Wp Nennleistung bei 22,0 % Modulwirkungsgrad',
      'Hot 2.0-Technologie für geringere Mikroriss-Anfälligkeit',
      'Hervorragendes Verhalten bei diffusem Morgenhimmel und Bewölkung'
    ],
    powerWp: '440 Wp',
    efficiency: '22,0 % Wirkungsgrad',
    cellTechnology: 'N-Type TOPCon',
    priceRange: 'ca. 70 – 95 € *',
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 15 Jahre Produkt- / 30 Jahre lineare Leistungsgarantie',
    technicalBadges: ['N-Type TOPCon', 'Black Frame', 'IEC zertifiziert'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'IEC 61215 / IEC 61730',
      solarPackage1Compliant: true,
      plugType: 'MC4 Standard'
    },
    amazonSearchQuery: 'Jinko Solar Tiger Neo 440Wp N-Type'
  },

  // --- 5. MONTAGESYSTEME & ZUBEHÖR ---
  {
    id: 'halterung-balkon-verstellbar',
    name: 'Balkongeländer-Halterung verstellbar (Edelstahl/Alu)',
    brand: 'universal',
    brandName: 'Montagesysteme',
    category: 'mounting',
    categoryLabel: 'Montagesystem',
    shortDesc: 'Universelle Halterung für 2 Module an Gitter- oder Rundgeländern mit Neigungsverstellung 15° bis 30° für mehr Jahresertrag.',
    specs: [
      'Witterungsbeständiger Edelstahl V2A & eloxiertes Aluminium AL6005-T5',
      'Neigungswinkel zwischen 15° und 30° einstellbar (oder 90° senkrecht)',
      'Inklusive Hakensicherung gegen Herabfallen'
    ],
    priceRange: 'ca. 49 – 79 € *',
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 10 Jahre Materialgarantie',
    technicalBadges: ['Edelstahl V2A', 'Neigbar 15-30°', 'Sturmsicher'],
    compatibility: {
      requiresMasterSystem: false,
      gridNorm: 'Statisch nachgewiesen nach Eurocode 1 (DIN EN 1991-1-4)',
      solarPackage1Compliant: true,
      plugType: 'Mechanische Befestigung'
    },
    amazonSearchQuery: 'Balkonkraftwerk Halterung Geländer verstellbar Edelstahl'
  },
  {
    id: 'shelly-pro-3em',
    name: 'Shelly Pro 3EM Drehstrom-Energiemessgerät',
    brand: 'shelly',
    brandName: 'Shelly',
    category: 'metering',
    categoryLabel: 'Smart Meter',
    shortDesc: 'Hutschienen-Stromzähler für den Zählerschrank zur Phasensaldierung und Echtzeit-Steuerung von Balkonspeichern.',
    specs: [
      'Präzise 3-Phasen-Messung von Netzbezug und Einspeisung (bis 120A pro Phase)',
      'WLAN, LAN & Bluetooth integriert für maximale Zuverlässigkeit',
      'Unterstützt von Anker, EcoFlow und Home Assistant für Nulleinspeisung'
    ],
    priceRange: 'ca. 95 – 125 € *',
    priceReferenceDate: 'Marktpreis-Richtwert Stand Q1 2025/2026',
    warranty: 'Herstellergarantie: 2 Jahre Herstellergarantie',
    technicalBadges: ['DIN-Hutschiene', 'Echtzeit-Phasensaldierung', 'LAN & WLAN'],
    compatibility: {
      requiresMasterSystem: false,
      masterSystemNote: 'Einbau im Zählerschrank darf ausschließlich durch eine Elektrofachkraft nach NAV § 13 erfolgen.',
      gridNorm: 'CE & DIN EN 61010-1',
      solarPackage1Compliant: true,
      plugType: 'Hutschienen-Klemmen'
    },
    amazonSearchQuery: 'Shelly Pro 3EM Energiemessgerät Hutschiene'
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
