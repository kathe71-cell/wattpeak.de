export interface SolarProduct {
  id: string;
  name: string;
  brand: string;
  brandName: string;
  category: 'balkon-sets' | 'speicher' | 'inverter' | 'module' | 'metering' | 'mounting' | 'tools';
  categoryName: string;
  setDetails: string;
  estAnnualYield: string;
  priceRange: string; // Orientierungs-Preisspanne ohne fiktive UVP-Streichpreise
  powerWp: string;
  efficiencyOrCapacity: string;
  cellTypeOrTech: string;
  warranty: string;
  rating: string;
  reviewCount: number;
  amazonQuery: string;
  highlights: string[];
  badge?: string;
}

// Dedicated Amazon PartnerNet Tracking ID for wattpeak.de
export const AMAZON_TRACKING_ID = 'wattpeak.de-21';

export const getAmazonLink = (query: string): string => {
  return `https://www.amazon.de/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TRACKING_ID}`;
};

export const SOLAR_CATALOG: SolarProduct[] = [
  // --- BALKONKRAFTWERK KOMPLETTSETS ---
  {
    id: 'set-880wp-hoymiles',
    name: '880Wp Bifazial Glas-Glas Komplettset mit Hoymiles HMS-800W',
    brand: 'hoymiles',
    brandName: 'Hoymiles / Trina Solar',
    category: 'balkon-sets',
    categoryName: '800W Komplettset',
    setDetails: '2x 440Wp Trina Vertex S+ & HMS-800W-2T + 5m Schukokabel',
    estAnnualYield: 'ca. 850 – 1.050 kWh/a',
    priceRange: 'ca. 330 – 390 €',
    powerWp: '880 Wp (2x 440 Wp)',
    efficiencyOrCapacity: '22,0 % Wirkungsgrad',
    cellTypeOrTech: 'N-Type TOPCon Glas-Glas',
    warranty: 'Herstellergarantie: 25 J. Produkt / 30 J. linear',
    rating: '4.8 ★ (1.850+ Reviews)',
    reviewCount: 1850,
    amazonQuery: 'Balkonkraftwerk 800W Komplettset Hoymiles',
    highlights: [
      'Solarpaket I konform mit integriertem WLAN & NA-Schutz',
      'Bis zu 25 % Mehrertrag durch bifaziale Rückseite',
      'Hagel- und feuerresistentes Doppelglas (2x 1.6 mm)'
    ],
    badge: 'Kundenliebling'
  },
  {
    id: 'set-1760wp-power-set',
    name: '1.760Wp 4-Modul Kraftpaket mit 800W Inverter',
    brand: 'hoymiles',
    brandName: 'Hoymiles Ultra',
    category: 'balkon-sets',
    categoryName: '800W Komplettset',
    setDetails: '4x 440Wp Bifazial N-Type + 800W Wechselrichter + Y-Adapter',
    estAnnualYield: 'ca. 1.450 – 1.800 kWh/a',
    priceRange: 'ca. 590 – 690 €',
    powerWp: '1.760 Wp (4x 440 Wp)',
    efficiencyOrCapacity: '22,3 % Wirkungsgrad',
    cellTypeOrTech: 'N-Type TOPCon Bifazial',
    warranty: 'Herstellergarantie: 25 Jahre',
    rating: '4.9 ★ (920+ Reviews)',
    reviewCount: 920,
    amazonQuery: 'Balkonkraftwerk 800W 4 Module',
    highlights: [
      'Nutzt das gesetzliche 2.000-Wp-Modullimit fast komplett aus',
      'Hohe Volllaststunden auch bei bewölktem Himmel und Randzeiten',
      'Inklusive MC4-Parallelschaltungs-Kabelpeitschen'
    ],
    badge: '4-Modul-Setup'
  },
  {
    id: 'set-880wp-deye',
    name: 'Deye 800W Bifaziales Komplettset mit Relais',
    brand: 'deye',
    brandName: 'Deye Solar',
    category: 'balkon-sets',
    categoryName: '800W Komplettset',
    setDetails: '2x 440Wp JA Solar Glas-Glas + Deye SUN-M80G4 + Externes Relais',
    estAnnualYield: 'ca. 820 – 990 kWh/a',
    priceRange: 'ca. 290 – 350 €',
    powerWp: '880 Wp (2x 440 Wp)',
    efficiencyOrCapacity: '21,8 % Wirkungsgrad',
    cellTypeOrTech: 'Monokristallin Bifazial',
    warranty: 'Herstellergarantie: 12 J. Inverter / 25 J. Module',
    rating: '4.6 ★ (1.100+ Reviews)',
    reviewCount: 1100,
    amazonQuery: 'Deye 800W Balkonkraftwerk Komplettset',
    highlights: [
      'Zertifiziertes VDE-Relais im Lieferumfang enthalten',
      'Integrierte Solarman Smart Cloud Anbindung',
      'Plug-and-Play Anschluss an jeder Schukosteckdose'
    ]
  },
  {
    id: 'set-bluetti-b210-solar',
    name: 'BLUETTI Balkonkraftwerk Speicher Bundle 2.150 Wh',
    brand: 'bluetti',
    brandName: 'BLUETTI',
    category: 'balkon-sets',
    categoryName: '800W Komplettset',
    setDetails: '2x 430Wp N-Type Module + 800W Mikrowechselrichter + BLUETTI B210 LiFePO4 Akku',
    estAnnualYield: 'ca. 1.050 – 1.250 kWh/a Nutzenergie',
    priceRange: 'ca. 1.199 – 1.399 €',
    powerWp: '860 Wp Module / 2.150 Wh Akku',
    efficiencyOrCapacity: '2.150 Wh (erweiterbar bis 8.600 Wh)',
    cellTypeOrTech: 'LiFePO4 Akku (6.000+ Zyklen)',
    warranty: 'Herstellergarantie: 6 Jahre',
    rating: '4.7 ★ (620+ Reviews)',
    reviewCount: 620,
    amazonQuery: 'BLUETTI Balkonkraftwerk Speicher',
    highlights: [
      'Wassergeschützt nach IP65 für Außenaufstellung auf dem Balkon',
      'Smarte App-Steuerung mit einstellbaren Einspeisezeitfenstern',
      'Notstromsteckdose mit reiner Sinuswelle direkt am Gehäuse'
    ],
    badge: 'IP65 Outdoor Akku'
  },
  {
    id: 'set-jackery-solar-800w',
    name: 'Jackery Navi 2000 Balkonkraftwerk Speicher-System',
    brand: 'jackery',
    brandName: 'Jackery',
    category: 'balkon-sets',
    categoryName: '800W Komplettset',
    setDetails: 'Jackery 2.048 Wh Speicher-Station mit integriertem 800W Inverter',
    estAnnualYield: 'ca. 1.000 – 1.180 kWh/a',
    priceRange: 'ca. 1.150 – 1.350 €',
    powerWp: 'Bis 1.600 Wp Solareingang',
    efficiencyOrCapacity: '2.048 Wh LiFePO4 Kapazität',
    cellTypeOrTech: 'LiFePO4 (4.000 Zyklen bis 70%)',
    warranty: 'Herstellergarantie: 5 Jahre',
    rating: '4.8 ★ (480+ Reviews)',
    reviewCount: 480,
    amazonQuery: 'Jackery Navi 2000 Balkonkraftwerk',
    highlights: [
      'Ultraschnelle Installation in wenigen Minuten',
      'Leiser Betrieb unter 30 dB für Balkon-Nutzung',
      'Erweiterbar mit zusätzlichen Jackery Batteriepacks bis 8 kWh'
    ]
  },

  // --- SPEICHER & POWERSTATIONS ---
  {
    id: 'bluetti-b210-standalone',
    name: 'BLUETTI B210 Erweiterungsbatterie & Balkonspeicher (2.150 Wh)',
    brand: 'bluetti',
    brandName: 'BLUETTI',
    category: 'speicher',
    categoryName: 'Balkon-Speicher',
    setDetails: 'Autonomer LiFePO4 Akku mit IP65 Schutzklasse für Balkon & Garten',
    estAnnualYield: 'Rettet ca. 550 kWh Nachtstrom/Jahr',
    priceRange: 'ca. 850 – 990 €',
    powerWp: 'Bis 2.000 Wp PV Eingang',
    efficiencyOrCapacity: '2.150 Wh LiFePO4',
    cellTypeOrTech: 'LiFePO4 (6.000 Zyklen bis 80%)',
    warranty: 'Herstellergarantie: 6 Jahre',
    rating: '4.7 ★ (850+ Reviews)',
    reviewCount: 850,
    amazonQuery: 'BLUETTI B210 Speicher',
    highlights: [
      'Wetterfestes IP65 Gehäuse gegen Regen und Frost',
      'Standalone als DC-Stromquelle nutzbar (12V/USB-C 100W)',
      'Kompatibel mit gängigen Mikrowechselrichtern'
    ]
  },
  {
    id: 'huawei-luna2000-storage',
    name: 'Huawei LUNA2000-5-S0 Heimspeicher-System (5 kWh)',
    brand: 'huawei',
    brandName: 'Huawei FusionSolar',
    category: 'speicher',
    categoryName: 'Heimspeicher',
    setDetails: 'Leistungsmodul + 5 kWh LFP Batteriemodul für Dachanlagen',
    estAnnualYield: 'Steigert Eigenverbrauchsquote auf über 75 %',
    priceRange: 'ca. 2.390 – 2.790 €',
    powerWp: 'Bis 5 kW Entladeleistung',
    efficiencyOrCapacity: '5.000 Wh (modular bis 30 kWh)',
    cellTypeOrTech: 'Lithium-Eisenphosphat (LFP) 100% DOD',
    warranty: 'Herstellergarantie: 10 Jahre',
    rating: '4.8 ★ (320+ Reviews)',
    reviewCount: 320,
    amazonQuery: 'Huawei LUNA2000 Speicher 5kWh',
    highlights: [
      'Integrierter Energieoptimierer in jedem Batteriemodul',
      '100 % nutzbare Entladetiefe (DoD)',
      'Automatische Erkennung in der Huawei FusionSolar App'
    ],
    badge: 'Heimspeicher Referenz'
  },
  {
    id: 'anker-solix-e1600-pro',
    name: 'Anker SOLIX Solarbank 2 E1600 Pro All-in-One Speicher',
    brand: 'anker',
    brandName: 'Anker SOLIX',
    category: 'speicher',
    categoryName: 'Balkon-Speicher',
    setDetails: '1.600 Wh LiFePO4 Akku + 4 MPPT Tracker + 800W Inverter integriert',
    estAnnualYield: 'Rettet bis zu 420 kWh Nachtstrom/a',
    priceRange: 'ca. 429 – 699 €',
    powerWp: 'Bis 2.400 Wp PV-Eingang',
    efficiencyOrCapacity: '1.600 Wh (erweiterbar auf 9,6 kWh)',
    cellTypeOrTech: 'LiFePO4 (6.000 Zyklen bis 80% SOH)',
    warranty: 'Herstellergarantie: 10 Jahre',
    rating: '4.8 ★ (740+ Reviews)',
    reviewCount: 740,
    amazonQuery: 'Anker SOLIX Solarbank 2 E1600 Pro',
    highlights: [
      'Integrierter 800W Wechselrichter – kein Zusatzgerät nötig',
      '4 unabhängige MPPT-Eingänge für optimale Modulausrichtung',
      'Smarte Nulleinspeisung mit Anker Smart Meter oder Smart Plugs'
    ],
    badge: 'All-in-One LFP'
  },
  {
    id: 'ecoflow-powerstream-bundle',
    name: 'EcoFlow PowerStream 800W + DELTA 2 Max Speicherbundle',
    brand: 'ecoflow',
    brandName: 'EcoFlow',
    category: 'speicher',
    categoryName: 'Balkon-Speicher',
    setDetails: 'PowerStream 800W Wechselrichter + DELTA 2 Max (2.048 Wh)',
    estAnnualYield: 'Rettet bis zu 520 kWh Nachtstrom/a',
    priceRange: 'ca. 999 – 1.390 €',
    powerWp: 'Bis 1.000 Wp PV direkt am Inverter',
    efficiencyOrCapacity: '2.048 Wh LiFePO4 (erweiterbar auf 6 kWh)',
    cellTypeOrTech: 'LiFePO4 Akku + USV-Notstrom',
    warranty: 'Herstellergarantie: 5 Jahre',
    rating: '4.7 ★ (1.420+ Reviews)',
    reviewCount: 1420,
    amazonQuery: 'EcoFlow PowerStream 800W DELTA 2 Max',
    highlights: [
      'Kombiniert Balkonkraftwerk-Speicher mit mobiler 2.400W Notstromstation',
      'Echtzeit-Regelung über smarte EcoFlow Steckdosen',
      'Extrem leiser Betrieb ohne störende Lüftergeräusche'
    ],
    badge: 'Notstromfähig 2.400W'
  },
  {
    id: 'zendure-solarflow-hub2000',
    name: 'Zendure SolarFlow Hub 2000 + AB2000 Speicher',
    brand: 'zendure',
    brandName: 'Zendure',
    category: 'speicher',
    categoryName: 'Balkon-Speicher',
    setDetails: 'Smart PV-Hub 2000 + 1x AB2000 Akku (1.920 Wh)',
    estAnnualYield: 'Rettet bis zu 480 kWh Nachtstrom/a',
    priceRange: 'ca. 950 – 1.150 €',
    powerWp: 'Bis 1.800 Wp PV-Eingang',
    efficiencyOrCapacity: '1.920 Wh LiFePO4 mit integrierter Heizung',
    cellTypeOrTech: 'LiFePO4 mit Winterheizfunktion (-20°C)',
    warranty: 'Herstellergarantie: 10 Jahre',
    rating: '4.6 ★ (680+ Reviews)',
    reviewCount: 680,
    amazonQuery: 'Zendure SolarFlow Hub 2000 AB2000',
    highlights: [
      'Integrierte Akkuheizung für Laden bei Wintertemperaturen',
      'Kompatibel mit Hoymiles, Deye, Envertech und APSystems',
      'Stapelbar bis auf 7.680 Wh Gesamtkapazität'
    ]
  },
  {
    id: 'growatt-noah-2000',
    name: 'Growatt NOAH 2000 Balkonkraftwerk Speicher',
    brand: 'growatt',
    brandName: 'Growatt',
    category: 'speicher',
    categoryName: 'Balkon-Speicher',
    setDetails: '2.048 Wh LiFePO4 Speicher mit 1.800W Solareingang',
    estAnnualYield: 'Rettet bis zu 500 kWh Nachtstrom/a',
    priceRange: 'ca. 379 – 549 €',
    powerWp: 'Bis 1.800 Wp Solareingang',
    efficiencyOrCapacity: '2.048 Wh LiFePO4',
    cellTypeOrTech: 'LiFePO4 (6.000 Zyklen)',
    warranty: 'Herstellergarantie: 10 Jahre',
    rating: '4.7 ★ (410+ Reviews)',
    reviewCount: 410,
    amazonQuery: 'Growatt NOAH 2000 Balkonspeicher',
    highlights: [
      'Robustes IP66 Gehäuse für Außenmontage',
      'Plug-and-Play Anschluss zwischen Modulen und Wechselrichter',
      'Integrierte Heizfunktion bis -20 °C Umgebungstemperatur'
    ]
  },

  // --- WECHSELRICHTER & INVERTER ---
  {
    id: 'hoymiles-hms-800w-inverter',
    name: 'Hoymiles HMS-800W-2T Mikrowechselrichter',
    brand: 'hoymiles',
    brandName: 'Hoymiles',
    category: 'inverter',
    categoryName: 'Mikrowechselrichter',
    setDetails: '800 Watt AC-Ausgang, 2 unabhängige MPPT-Kanäle',
    estAnnualYield: 'Wandlerwirkungsgrad: 96,7 % (CEC)',
    priceRange: 'ca. 119 – 149 €',
    powerWp: 'Für Module von 320 bis 540+ Wp',
    efficiencyOrCapacity: '96,7 % Spitzenwirkungsgrad',
    cellTypeOrTech: '2x MPPT / VDE-AR-N 4105',
    warranty: 'Herstellergarantie: 12 Jahre',
    rating: '4.9 ★ (3.400+ Reviews)',
    reviewCount: 3400,
    amazonQuery: 'Hoymiles HMS-800W-2T',
    highlights: [
      'Meistgenutzter 800W Mikrowechselrichter in Deutschland',
      'Integriertes WLAN ohne zusätzliche DTU-Box konfigurierbar',
      'VDE-AR-N 4105 und NA-Schutz Relais vollständig zertifiziert'
    ],
    badge: 'Referenz-Inverter'
  },
  {
    id: 'apsystems-ez1-m',
    name: 'APSystems EZ1-M Mikrowechselrichter 800W',
    brand: 'apsystems',
    brandName: 'APSystems',
    category: 'inverter',
    categoryName: 'Mikrowechselrichter',
    setDetails: '800 VA AC Ausgang, Bluetooth & WLAN direkt integriert',
    estAnnualYield: 'Wandlerwirkungsgrad: 97,3 %',
    priceRange: 'ca. 129 – 165 €',
    powerWp: '2x 300 bis 550+ Wp',
    efficiencyOrCapacity: '97,3 % Wirkungsgrad',
    cellTypeOrTech: '2x MPPT bis 20A Eingangsstrom',
    warranty: 'Herstellergarantie: 12 Jahre',
    rating: '4.8 ★ (1.250+ Reviews)',
    reviewCount: 1250,
    amazonQuery: 'APSystems EZ1-M 800W',
    highlights: [
      'Unterstützt hohe Eingangsströme bis 20A für moderne 500W+ Module',
      'Direkte lokale Bluetooth-Steuerung auch ohne Internetverbindung',
      'Stufenlos drosselbar zwischen 600W und 800W per App'
    ]
  },
  {
    id: 'deye-sun-m80g4',
    name: 'Deye SUN-M80G4-EU-Q0 Mikrowechselrichter',
    brand: 'deye',
    brandName: 'Deye Solar',
    category: 'inverter',
    categoryName: 'Mikrowechselrichter',
    setDetails: '800W Inverter inklusive externem VDE Relais',
    estAnnualYield: 'Wandlerwirkungsgrad: 96,5 %',
    priceRange: 'ca. 115 – 145 €',
    powerWp: '2x 210 bis 500 Wp',
    efficiencyOrCapacity: '96,5 % Wirkungsgrad',
    cellTypeOrTech: '2x MPPT / IP67 Gehäuse',
    warranty: 'Herstellergarantie: 10 Jahre',
    rating: '4.5 ★ (880+ Reviews)',
    reviewCount: 880,
    amazonQuery: 'Deye SUN-M80G4',
    highlights: [
      'Gutes Preis-Leistungs-Verhältnis',
      'Inklusive offiziellem Deye SUN-MI-RELAY-01 Relais',
      'Robuste passive Kühlung mit massiven Kühlrippen'
    ]
  },
  {
    id: 'tsun-tsol-ms800',
    name: 'TSUN TSOL-MS800 800W Mikrowechselrichter',
    brand: 'tsun',
    brandName: 'TSUN Solar',
    category: 'inverter',
    categoryName: 'Mikrowechselrichter',
    setDetails: '800 VA Nennausgangsleistung, integriertes Relais & WLAN',
    estAnnualYield: 'Wandlerwirkungsgrad: 96,7 %',
    priceRange: 'ca. 119 – 149 €',
    powerWp: '2x 300 bis 550 Wp Modulleistung',
    efficiencyOrCapacity: '96,7 % Wirkungsgrad',
    cellTypeOrTech: '2x MPPT / VDE-AR-N 4105:2018',
    warranty: 'Herstellergarantie: 12 Jahre',
    rating: '4.7 ★ (530+ Reviews)',
    reviewCount: 530,
    amazonQuery: 'TSUN TSOL-MS800 800W',
    highlights: [
      'Integriertes Relais für volle VDE-AR-N 4105 Konformität',
      'Talent Home Cloud & lokales WLAN-Monitoring',
      'IP67 Schutzart für Langlebigkeit bei jedem Wetter'
    ]
  },
  {
    id: 'sungrow-sh10rt-inverter',
    name: 'Sungrow SH10RT-v112 10 kW 3-Phasen Hybridwechselrichter',
    brand: 'sungrow',
    brandName: 'Sungrow Power',
    category: 'inverter',
    categoryName: 'Hybridwechselrichter',
    setDetails: 'Dreiphasiger 10 kW Hybrid-Inverter mit integriertem Notstrom / Backup',
    estAnnualYield: 'Wandlerwirkungsgrad: 98,4 % (Euro-ETA 97,9 %)',
    priceRange: 'ca. 1.450 – 1.750 €',
    powerWp: 'Bis 15.000 Wp PV-Eingangsleistung',
    efficiencyOrCapacity: '98,4 % Wirkungsgrad',
    cellTypeOrTech: '2 MPPT / 3-phasiger Notstromanschluss',
    warranty: 'Herstellergarantie: 10 Jahre',
    rating: '4.8 ★ (410+ Reviews)',
    reviewCount: 410,
    amazonQuery: 'Sungrow SH10RT Hybrid Wechselrichter',
    highlights: [
      'Integrierte unterbrechungsfreie Ersatzstromversorgung',
      'Leise lüfterlose Konvektionskühlung',
      'Direkte Kopplung mit Sungrow SBR oder BYD HVS/HVM Speichern'
    ],
    badge: 'Premium Hybrid-Inverter'
  },
  {
    id: 'huawei-sun2000-10ktl',
    name: 'Huawei SUN2000-10KTL-M1 High-Current Hybridwechselrichter',
    brand: 'huawei',
    brandName: 'Huawei FusionSolar',
    category: 'inverter',
    categoryName: 'Hybridwechselrichter',
    setDetails: '10 kW 3-Phasen Wechselrichter mit AI-Lichtbogenerkennung (AFCI)',
    estAnnualYield: 'Wandlerwirkungsgrad: 98,6 %',
    priceRange: 'ca. 1.350 – 1.650 €',
    powerWp: 'Bis 15.000 Wp PV-Leistung',
    efficiencyOrCapacity: '98,6 % Europäischer Wirkungsgrad',
    cellTypeOrTech: '2x MPPT (13.5A High-Current) / KI-AFCI',
    warranty: 'Herstellergarantie: 10 Jahre',
    rating: '4.9 ★ (780+ Reviews)',
    reviewCount: 780,
    amazonQuery: 'Huawei SUN2000-10KTL-M1',
    highlights: [
      'Lichtbogenerkennung (AFCI) schützt vor Brandgefahren',
      'Plug & Play Schnittstelle für Huawei LUNA2000 Heimspeicher',
      'Vollständige Optimierer-Kompatibilität für teilverschattete Dächer'
    ]
  },

  // --- HOCHLEISTUNGS-SOLARMODULE ---
  {
    id: 'trina-vertex-s-plus-445',
    name: 'Trina Solar Vertex S+ 445Wp N-Type TOPCon Glas-Glas Modul',
    brand: 'trina',
    brandName: 'Trina Solar',
    category: 'module',
    categoryName: 'Solarmodul',
    setDetails: 'Doppelglas Modul (1.6 mm / 1.6 mm), schwarzer Rahmen',
    estAnnualYield: 'ca. 450 – 520 kWh/a pro Modul',
    priceRange: 'ca. 75 – 99 €',
    powerWp: '445 Wp Nennleistung',
    efficiencyOrCapacity: '22,3 % Modulwirkungsgrad',
    cellTypeOrTech: 'N-Type TOPCon Halbzellen',
    warranty: 'Herstellergarantie: 25 J. Produkt / 30 J. Leistung',
    rating: '4.9 ★ (1.600+ Reviews)',
    reviewCount: 1600,
    amazonQuery: 'Trina Solar Vertex S+ 445W',
    highlights: [
      'N-Type TOPCon Zelltechnologie mit niedriger Degradation',
      'Gutes Schwachlicht- und Hitzeverhalten (-0,30 %/K)',
      'Feuerwiderstandsklasse A durch beidseitiges gehärtetes Glas'
    ],
    badge: 'Referenz-Modul'
  },
  {
    id: 'ja-solar-440-bifacial',
    name: 'JA Solar 440Wp Bifazial Doppelglas N-Type Modul',
    brand: 'jasolar',
    brandName: 'JA Solar',
    category: 'module',
    categoryName: 'Solarmodul',
    setDetails: 'Bifaziales Glas-Glas Modul mit Albedo-Mehrertrag',
    estAnnualYield: 'ca. 460 – 540 kWh/a (inkl. Rückseitenertrag)',
    priceRange: 'ca. 79 – 99 €',
    powerWp: '440 Wp Frontleistung + bis 25% Rückseite',
    efficiencyOrCapacity: '22,0 % Modulwirkungsgrad',
    cellTypeOrTech: 'N-Type Bycium+ Halbzellen',
    warranty: 'Herstellergarantie: 25 J. Produkt / 30 J. Leistung',
    rating: '4.8 ★ (890+ Reviews)',
    reviewCount: 890,
    amazonQuery: 'JA Solar 440W bifazial Glas Glas',
    highlights: [
      'Bifazialitätsfaktor bis zu 80 % für Mehrertrag bei heller Umgebung',
      'Resistent gegen ammoniak- und salzhaltige Luft sowie Sandabrieb',
      'Optimierte Rahmenecken für sauberen Wasserablauf'
    ]
  },
  {
    id: 'jinko-tiger-neo-440',
    name: 'Jinko Solar Tiger Neo N-Type 440Wp Glas-Glas Solarmodul',
    brand: 'jinko',
    brandName: 'Jinko Solar',
    category: 'module',
    categoryName: 'Solarmodul',
    setDetails: 'JKM440N-54HL4R-BDV N-Type TOPCon Doppelglas Modul',
    estAnnualYield: 'ca. 460 – 530 kWh/a',
    priceRange: 'ca. 70 – 95 €',
    powerWp: '440 Wp N-Type TOPCon',
    efficiencyOrCapacity: '22,02 % Modulwirkungsgrad',
    cellTypeOrTech: 'SMBB N-Type TOPCon Technologie',
    warranty: 'Herstellergarantie: 25 J. Produkt / 30 J. Leistung',
    rating: '4.8 ★ (1.100+ Reviews)',
    reviewCount: 1100,
    amazonQuery: 'Jinko Solar Tiger Neo 440W',
    highlights: [
      'Führende N-Type HOT 2.0 Zelltechnologie',
      'Gute Schwachlichtleistung bei Dämmerung und Bewölkung',
      'Hohe Beständigkeit gegen PID-Degradation'
    ]
  },
  {
    id: 'longi-himo-x6-435',
    name: 'LONGi Solar Hi-MO X6 Explorer 435Wp Full Black HPBC Modul',
    brand: 'longi',
    brandName: 'LONGi Solar',
    category: 'module',
    categoryName: 'Solarmodul',
    setDetails: 'Vorderseiten-kontaktfreies HPBC Back-Contact Premium-Modul in Full-Black',
    estAnnualYield: 'ca. 455 – 525 kWh/a',
    priceRange: 'ca. 89 – 115 €',
    powerWp: '435 Wp HPBC Back-Contact',
    efficiencyOrCapacity: '22,3 % Wirkungsgrad',
    cellTypeOrTech: 'Hybrid Passivated Back Contact (HPBC)',
    warranty: 'Herstellergarantie: 25 Jahre',
    rating: '4.9 ★ (760+ Reviews)',
    reviewCount: 760,
    amazonQuery: 'LONGi Hi MO X6 435W Full Black',
    highlights: [
      'Back-Contact-Zelltechnik: Keine sichtbaren Leiterbahnen auf der Modulfront',
      'Homogenes Tiefschwarz für anspruchsvolle Dacharchitektur',
      'Guter Ertrag bei sommerlichen Temperaturen'
    ],
    badge: 'Design Back-Contact'
  },

  // --- SMART METER & MESSTECHNIK ---
  {
    id: 'shelly-pro-3em-meter',
    name: 'Shelly Pro 3EM Dreiphasen-Energiezähler für Hutschiene',
    brand: 'shelly',
    brandName: 'Shelly by Allterco',
    category: 'metering',
    categoryName: 'Smart Metering',
    setDetails: '3-Phasen-Echtzeitmessung bis 120A je Phase inkl. 3 Stromwandler',
    estAnnualYield: 'Ermöglicht dynamische Null-Einspeisung',
    priceRange: 'ca. 95 – 125 €',
    powerWp: 'DIN-Hutschienenmontage',
    efficiencyOrCapacity: 'Genauigkeitsklasse B (IEC 62053-21)',
    cellTypeOrTech: 'WLAN, LAN (Ethernet) & Bluetooth',
    warranty: 'Herstellergarantie: 2 Jahre',
    rating: '4.8 ★ (2.900+ Reviews)',
    reviewCount: 2900,
    amazonQuery: 'Shelly Pro 3EM',
    highlights: [
      'Etablierter Sensor für Nulleinspeisung mit Anker Solix, Zendure & EcoFlow',
      'Erfasst Einspeisung und Bezug saldierend auf allen 3 Phasen in Echtzeit',
      'Offene Schnittstellen: MQTT, WebSocket, Home Assistant, ioBroker'
    ],
    badge: 'Top-Empfehlung für Speicher'
  },
  {
    id: 'shelly-plus-1pm-switch',
    name: 'Shelly Plus 1PM WLAN-Schaltrelais mit Strommessung',
    brand: 'shelly',
    brandName: 'Shelly',
    category: 'metering',
    categoryName: 'Smart Metering',
    setDetails: 'Kompakter Aktor bis 16A zur Schuko-Leistungserfassung',
    estAnnualYield: 'Misst jede erzeugte Kilowattstunde präzise',
    priceRange: 'ca. 16 – 24 €',
    powerWp: 'Bis 3.680 W (16 A)',
    efficiencyOrCapacity: 'Genauigkeit ±1 %',
    cellTypeOrTech: 'WLAN & Bluetooth integriert',
    warranty: 'Herstellergarantie: 2 Jahre',
    rating: '4.8 ★ (6.200+ Reviews)',
    reviewCount: 6200,
    amazonQuery: 'Shelly Plus 1PM',
    highlights: [
      'Passt in Standard-Unterputzdosen hinter die Steckdose',
      'Echtzeit-Leistungsmessung (Watt) und Verlaufsdiagramme (kWh)',
      'Integrierter Überlast-, Überspannungs- und Übertemperaturschutz'
    ]
  },
  {
    id: 'ecoflow-smart-plug',
    name: 'EcoFlow Smart Plug Smarte Zwischensteckdose',
    brand: 'ecoflow',
    brandName: 'EcoFlow',
    category: 'metering',
    categoryName: 'Smart Metering',
    setDetails: 'Funksteckdose zur adaptiven Einspeiseregelung des PowerStream',
    estAnnualYield: 'Automatische Bedarfs-Einspeisung',
    priceRange: 'ca. 28 – 35 €',
    powerWp: 'Bis 2.500 W (10 A)',
    efficiencyOrCapacity: 'WLAN & Matter-kompatibel',
    cellTypeOrTech: 'WLAN / Bluetooth / Matter',
    warranty: 'Herstellergarantie: 2 Jahre',
    rating: '4.6 ★ (1.800+ Reviews)',
    reviewCount: 1800,
    amazonQuery: 'EcoFlow Smart Plug',
    highlights: [
      'Gibt dem EcoFlow PowerStream Wechselrichter den Geräteverbrauch vor',
      'Verringert unbezahltes Einspeisen überschüssigen Solarstroms ins Netz',
      'Matter-Standard für nahtlose Smart-Home-Einbindung'
    ]
  },

  // --- MONTAGESYSTEME & HALTERUNGEN ---
  {
    id: 'halterung-balkon-edelstahl',
    name: 'Universal Balkongeländer Halterung V2A Edelstahl (verstellbar)',
    brand: 'solarflex',
    brandName: 'SolarMount Pro',
    category: 'mounting',
    categoryName: 'Montagesystem',
    setDetails: 'Komplettset für 2 Module, Neigungswinkel 0° bis 30° stufenlos',
    estAnnualYield: 'Optimiert Einstrahlungswinkel um bis zu 25 %',
    priceRange: 'ca. 49 – 69 €',
    powerWp: 'Für Module bis 115 cm Breite',
    efficiencyOrCapacity: 'Windlastgeprüft bis 120 km/h',
    cellTypeOrTech: 'Edelstahl V2A & Aluminium AL6005-T5',
    warranty: 'Herstellergarantie: 10 Jahre Korrosionsschutz',
    rating: '4.7 ★ (1.950+ Reviews)',
    reviewCount: 1950,
    amazonQuery: 'Balkonkraftwerk Halterung Geländer verstellbar',
    highlights: [
      'Befestigung an Rund-, Rechteck- und Gitter-Geländern',
      'Ermöglicht Anwinkeln zur Steigerung der Jahreserträge',
      'Inklusive aller Schrauben, Sicherungsmuttern und Gummischutz-Streifen'
    ],
    badge: 'Sturmsicher V2A'
  },
  {
    id: 'halterung-flachdach-dreiecke',
    name: 'Aluminium Flachdach & Garten Aufständerung (15° / 20° / 30°)',
    brand: 'solarflex',
    brandName: 'AluMount Solar',
    category: 'mounting',
    categoryName: 'Montagesystem',
    setDetails: '2x Dreieck-Ständer für Garten, Terrasse, Flachdach oder Garage',
    estAnnualYield: 'Ideal für Südausrichtung und Ost-West-Splitting',
    priceRange: 'ca. 42 – 55 €',
    powerWp: 'Für alle gängigen Solarmodule',
    efficiencyOrCapacity: 'Eloxiertes Aluminium AL6005-T5',
    cellTypeOrTech: 'Beschwerung mit Gehwegplatten möglich',
    warranty: 'Herstellergarantie: 10 Jahre',
    rating: '4.8 ★ (1.350+ Reviews)',
    reviewCount: 1350,
    amazonQuery: 'Balkonkraftwerk Aufständerung Flachdach',
    highlights: [
      'Keine Dachdurchdringung nötig – einfache Beschwerung mit Betonplatten',
      'Schneller Aufbau dank vormontierter Klapp-Dreiecke',
      'Robuste rostfreie Edelstahl-Verschraubungen'
    ]
  },
  {
    id: 'k2-systems-singlerail-set',
    name: 'K2 Systems SingleRail Dachmontage Komplettset (Ziegeldach)',
    brand: 'k2systems',
    brandName: 'K2 Systems',
    category: 'mounting',
    categoryName: 'Montagesystem',
    setDetails: 'Original K2 Montageschienen, CrossHook 4S Dachhaken & K2 OneEnd/OneMid Klemmen',
    estAnnualYield: 'Statisch geprüfter Industriestandard',
    priceRange: 'ca. 119 – 149 €',
    powerWp: 'Komplettset für 2–4 Solarmodule',
    efficiencyOrCapacity: 'Aluminium EN AW-6063 T66 & Edelstahl A2',
    cellTypeOrTech: 'K2 Base statisch berechenbar nach Eurocode 1',
    warranty: 'Herstellergarantie: 12 Jahre',
    rating: '4.9 ★ (640+ Reviews)',
    reviewCount: 640,
    amazonQuery: 'K2 Systems Dachmontage Set',
    highlights: [
      'Original K2 Systems Komponenten deutscher Solarteure',
      'Verwindungssteife SingleRail Montageschienen mit Klick-Verbindern',
      'Hohe Schneelast- und Windlastbeständigkeit'
    ],
    badge: 'Installateur-Standard'
  },
  {
    id: 'halterung-ziegeldach-haken',
    name: 'Universal Dachhaken-Set für Ziegeldächer (Frankfurter Pfanne)',
    brand: 'k2systems',
    brandName: 'SolarMount / K2 kompatibel',
    category: 'mounting',
    categoryName: 'Montagesystem',
    setDetails: '4x 3-fach verstellbare Edelstahl A2 Dachhaken + Montageschienen',
    estAnnualYield: 'Sichere Montage auf Haus-, Schuppen- oder Garagendach',
    priceRange: 'ca. 75 – 95 €',
    powerWp: 'Set für 2 Solarmodule',
    efficiencyOrCapacity: 'Massiver 5 mm Edelstahl A2',
    cellTypeOrTech: 'Höhenverstellbar an Ziegel und Sparren',
    warranty: 'Herstellergarantie: 15 Jahre',
    rating: '4.7 ★ (820+ Reviews)',
    reviewCount: 820,
    amazonQuery: 'Solar Dachhaken Ziegeldach Set',
    highlights: [
      '3-fach verstellbar für Höhenausgleich bei Ziegeln',
      'Massive Materialstärke für Schneelast- und Windsicherheit',
      'Inklusive Holzschrauben und Klemmen für 30mm/35mm Modulrahmen'
    ]
  },

  // --- WERKZEUGE & KABEL ---
  {
    id: 'solar-crimp-koffer-pro',
    name: 'Profi Solar-Crimpzangen Koffer mit 12 Paar MC4 Steckern',
    brand: 'protool',
    brandName: 'ProSolar Tools',
    category: 'tools',
    categoryName: 'Werkzeug & Zubehör',
    setDetails: 'Ratschen-Crimpzange, Abisolierzange, Kabelschneider & 2x Montageschlüssel',
    estAnnualYield: 'Für sichere, wasserdichte Kabelverbindungen',
    priceRange: 'ca. 29 – 39 €',
    powerWp: 'Für 2.5 mm², 4.0 mm² und 6.0 mm² Solarkabel',
    efficiencyOrCapacity: 'Präzisions-Crimpbacken nach DIN EN 50525',
    cellTypeOrTech: 'IP67 Stecker mit O-Ring Dichtung',
    warranty: 'Herstellergarantie: 5 Jahre',
    rating: '4.8 ★ (2.200+ Reviews)',
    reviewCount: 2200,
    amazonQuery: 'Solar Crimpzange MC4 Set',
    highlights: [
      'Vollständiger Werkzeugkoffer für Montage von MC4-Steckern',
      'Eingebauter Ratschenmechanismus verhindert Fehlcrimpungen',
      'Inklusive 12x wasserdichten MC4 Steckern und Buchsen (IP67)'
    ],
    badge: 'Montagewerkzeug'
  },
  {
    id: 'solarkabel-set-6mm',
    name: 'Solarkabel Verlängerungsset 2x 10m (6 mm² H1Z2Z2-K)',
    brand: 'kabelpro',
    brandName: 'SolarLine Pro',
    category: 'tools',
    categoryName: 'Werkzeug & Zubehör',
    setDetails: '1x Rot + 1x Schwarz mit vormontierten Marken-MC4 Steckern',
    estAnnualYield: 'Minimiert Leitungsverluste auf unter 0,5 %',
    priceRange: 'ca. 35 – 45 €',
    powerWp: 'TÜV & VDE zertifiziert nach EN 50618',
    efficiencyOrCapacity: '6 mm² Reinkupfer verzinnt',
    cellTypeOrTech: 'Doppelt isoliert, UV- & Ozonbeständig',
    warranty: 'Herstellergarantie: 25 Jahre witterungsbeständig',
    rating: '4.9 ★ (1.750+ Reviews)',
    reviewCount: 1750,
    amazonQuery: 'Solarkabel 6mm2 10m MC4',
    highlights: [
      'Dicker 6mm² Querschnitt verhindert Spannungsabfälle bei längeren Strecken',
      'Wetter-, UV- und nagetierbeständige Außenhülle (H1Z2Z2-K)',
      'Fertig vercrimpt mit wasserdichten Steckern – sofort einsatzbereit'
    ]
  }
];
