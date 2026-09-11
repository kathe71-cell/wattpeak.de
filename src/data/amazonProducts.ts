export interface AmazonProduct {
  id: string;
  title: string;
  category: 'inverter' | 'storage' | 'sets' | 'metering' | 'mounting' | 'tools';
  categoryLabel: string;
  shortDesc: string;
  specs: string[];
  priceRange: string;
  asinOrSearch: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  searchQuery: string;
}

export const AMAZON_TRACKING_ID = 'wattpeak.de-21';

export function getAmazonAffiliateUrl(searchQuery: string): string {
  const encoded = encodeURIComponent(searchQuery);
  return `https://www.amazon.de/s?k=${encoded}&tag=${AMAZON_TRACKING_ID}`;
}

export const AMAZON_PRODUCTS: AmazonProduct[] = [
  {
    id: 'hoymiles-hms-800w',
    title: 'Hoymiles HMS-800W-2T Mikrowechselrichter',
    category: 'inverter',
    categoryLabel: '800W Wechselrichter',
    shortDesc: 'Der deutsche Referenz-Mikrowechselrichter für Stecker-Solargeräte mit 2 unabhängigen MPPT-Trackern und integriertem WLAN-Modul.',
    specs: ['800 W AC-Ausgangsleistung', '2x MPPT (Gleichstrom-Optimierung)', 'Integriertes WLAN & S-Miles App', 'VDE-AR-N 4105 & NA-Schutz konform'],
    priceRange: 'ca. 129 – 169 €',
    asinOrSearch: 'Hoymiles HMS-800W-2T 800W Mikrowechselrichter',
    rating: 4.8,
    reviewCount: 1420,
    badge: 'Solarpaket I Konform',
    searchQuery: 'Hoymiles HMS-800W-2T Mikrowechselrichter 800W'
  },
  {
    id: 'anker-solix-solarbank-2',
    title: 'Anker SOLIX Solarbank 2 E1600 Pro All-in-One Speicher',
    category: 'storage',
    categoryLabel: 'Balkon-Speicher',
    shortDesc: 'LFP-Akkusystem der 2. Generation mit 1,6 kWh Kapazität, 4 integrierten MPPTs und bis zu 2.400 Wp PV-Eingangsleistung.',
    specs: ['1.600 Wh LiFePO4 Kapazität (bis 9,6 kWh)', '4x MPPT Tracker integriert', 'Integrierter 800W Inverter', '6.000 Zyklen Lebensdauer (SOH >80%)'],
    priceRange: 'ca. 799 – 1.099 €',
    asinOrSearch: 'Anker Solix Solarbank 2 E1600 Pro',
    rating: 4.7,
    reviewCount: 520,
    badge: 'High-Capacity LFP',
    searchQuery: 'Anker SOLIX Solarbank 2 E1600 Pro Balkonkraftwerk Speicher'
  },
  {
    id: 'ecoflow-powerstream-delta',
    title: 'EcoFlow PowerStream 800W + DELTA 2 Max Bundle',
    category: 'storage',
    categoryLabel: 'Balkon-Speicher',
    shortDesc: 'Modulares Balkonkraftwerk-Speichersystem mit smarter Einspeiseregelung und Notstrom-Fähigkeit.',
    specs: ['2.048 Wh erweiterbar bis 6.144 Wh', 'Echtzeit-Null-Einspeisung', 'LiFePO4 Akku mit 3.000+ Zyklen', 'Schuko-Notstromsteckdose 2.400W'],
    priceRange: 'ca. 999 – 1.490 €',
    asinOrSearch: 'EcoFlow PowerStream 800W Delta 2 Max',
    rating: 4.6,
    reviewCount: 380,
    badge: 'Notstromfähig',
    searchQuery: 'EcoFlow PowerStream 800W DELTA 2 Max Balkonkraftwerk'
  },
  {
    id: 'balkon-set-880wp',
    title: '880Wp / 900Wp Bifaziales Glas-Glas Balkonkraftwerk Komplettset',
    category: 'sets',
    categoryLabel: 'Komplettset',
    shortDesc: 'Komplett montierfertiges Set mit 2x N-Type TOPCon bifazialen Solarmodulen, 800W Inverter und 5m Schukokabel.',
    specs: ['2x 440Wp+ N-Type TOPCon Module', 'Bis zu 25% Mehrertrag durch Bifazialität', '800W Marken-Mikrowechselrichter', 'Inkl. 5m Schuko-Anschlusskabel'],
    priceRange: 'ca. 349 – 499 €',
    asinOrSearch: 'Balkonkraftwerk 800W Komplettset bifazial Glas-Glas',
    rating: 4.7,
    reviewCount: 890,
    badge: 'Bestseller-Konfiguration',
    searchQuery: 'Balkonkraftwerk 800W Komplettset bifazial Glas Glas N-Type'
  },
  {
    id: 'shelly-pro-3em',
    title: 'Shelly Pro 3EM Dreiphasen-Energiezähler (DIN-Schiene)',
    category: 'metering',
    categoryLabel: 'Messtechnik',
    shortDesc: 'Präziser Dreiphasen-Stromsensor zur Hutschiene-Montage für exakte Null-Einspeiseregelung und Echtzeit-Monitoring.',
    specs: ['3-Phasen-Messung bis 120A', 'WLAN, LAN & Bluetooth Konnektivität', 'Genauigkeitsklasse B (IEC 62053-21)', 'Kompatibel mit Home Assistant & MQTT'],
    priceRange: 'ca. 89 – 119 €',
    asinOrSearch: 'Shelly Pro 3EM Energiezähler',
    rating: 4.8,
    reviewCount: 2150,
    badge: 'Präzisions-Sensorik',
    searchQuery: 'Shelly Pro 3EM Dreiphasen Energiezähler'
  },
  {
    id: 'shelly-plus-1pm',
    title: 'Shelly Plus 1PM WLAN-Schaltaktor mit Leistungsmessung',
    category: 'metering',
    categoryLabel: 'Messtechnik',
    shortDesc: 'Kompakter Unterputz- oder Steckdosen-Aktor zur kontinuierlichen Erfassung der Solar-Einspeisung bis 16A.',
    specs: ['Bis zu 3.680 W / 16A Belastbarkeit', 'Echtzeit-Leistungsmessung (W & kWh)', 'Überlast- & Übertemperaturschutz', 'WLAN & Bluetooth integriert'],
    priceRange: 'ca. 16 – 24 €',
    asinOrSearch: 'Shelly Plus 1PM Leistungsmessung',
    rating: 4.8,
    reviewCount: 5400,
    badge: 'Top-Zubehör',
    searchQuery: 'Shelly Plus 1PM Leistungsmessung Unterputz'
  },
  {
    id: 'balkon-halterung-universal',
    title: 'Universal Edelstahl Balkongeländer-Halterung (0–30° verstellbar)',
    category: 'mounting',
    categoryLabel: 'Montagesysteme',
    shortDesc: 'Sturmsicheres Aufhängesystem aus rostfreiem Edelstahl V2A für Gitter-, Rund- und Rechteckbalkone.',
    specs: ['Winkel verstellbar von 0° bis 30°', 'Material: Edelstahl V2A & Aluminium AL6005-T5', 'Windlastgeprüft bis 120 km/h', 'Für Solarmodule bis 115 cm Breite'],
    priceRange: 'ca. 49 – 79 €',
    asinOrSearch: 'Balkonkraftwerk Halterung Balkongeländer verstellbar',
    rating: 4.6,
    reviewCount: 1120,
    badge: 'Sturmsicher V2A',
    searchQuery: 'Balkonkraftwerk Halterung Geländer verstellbar Edelstahl'
  },
  {
    id: 'solar-crimpzange-mc4',
    title: 'Profi Solar-Werkzeugkoffer mit MC4 Crimpzange & Steckern',
    category: 'tools',
    categoryLabel: 'Werkzeug & Zubehör',
    shortDesc: 'Vollständiges Montage-Kit für Solarkabel 2.5 / 4.0 / 6.0 mm² inkl. Abisolierzange und MC4-Steckerschlüsseln.',
    specs: ['Präzise Ratschen-Crimpfunktion', 'Für 2.5mm², 4.0mm², 6.0mm² Solarkabel', 'Inkl. 6–12 Paar MC4 Solarstecker IP67', 'Inkl. Montage-Gabelschlüssel'],
    priceRange: 'ca. 29 – 45 €',
    asinOrSearch: 'Solar Crimpzange MC4 Werkzeugset',
    rating: 4.7,
    reviewCount: 1650,
    badge: 'Handwerker-Standard',
    searchQuery: 'Solar Crimpzange Set MC4 Stecker Abisolierzange'
  }
];
