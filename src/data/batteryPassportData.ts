/**
 * WATTPEAK.DE EU-BATTERIEPASS & VERORDNUNG (EU) 2023/1542
 * 
 * Rechtsstand: Oktober 2026
 * Verordnung des Europäischen Parlaments und des Rates vom 12. Juli 2023
 * über Batterien und Altbatterien (ABl. L 191 vom 28.7.2023, S. 1)
 */

export interface BatteryRegulationMilestone {
  effectiveDate: string; // ISO YYYY-MM-DD
  label: string;
  category: string;
  legalArticle: string;
  scope: string;
  description: string;
  status: 'IN_FORCE' | 'UPCOMING' | 'FUTURE';
}

export const BATTERY_REGULATION_MILESTONES: BatteryRegulationMilestone[] = [
  {
    effectiveDate: '2023-08-17',
    label: 'Inkrafttreten der Verordnung',
    category: 'Gesamtrahmen',
    legalArticle: 'Art. 96 VO (EU) 2023/1542',
    scope: 'Alle Batteriekategorien in der EU',
    description: 'Verordnung (EU) 2023/1542 tritt 20 Tage nach Veröffentlichung im EU-Amtsblatt in Kraft und ersetzt stufenweise die alte Batterie-Richtlinie 2006/66/EG.',
    status: 'IN_FORCE',
  },
  {
    effectiveDate: '2024-08-18',
    label: 'Konformitätsbewertung & CE-Kennzeichnung',
    category: 'Sicherheit & CE',
    legalArticle: 'Art. 12, 17, 38 VO (EU) 2023/1542',
    scope: 'Stationäre Batteriespeicher & Gerätebatterien',
    description: 'Verbindliche CE-Kennzeichnungspflicht und verschärfte Sicherheitsanforderungen für stationäre Energiespeichersysteme (Prüfung auf thermisches Durchgehen, Überladung und interne Kurzschlüsse).',
    status: 'IN_FORCE',
  },
  {
    effectiveDate: '2024-08-18',
    label: 'BMS-Alterungsdiagnostik (SOH & SOC)',
    category: 'Transparenz',
    legalArticle: 'Art. 14 VO (EU) 2023/1542',
    scope: 'Stationäre Batteriespeichersysteme',
    description: 'Batteriemanagementsysteme (BMS) stationärer Speicher müssen aktuelle Daten zum Alterungszustand (State of Health, SOH) und Ladezustand (SOC) für Eigentümer und unabhängige Betreiber diskriminierungsfrei bereitstellen.',
    status: 'IN_FORCE',
  },
  {
    effectiveDate: '2026-02-18',
    label: 'Sorgfaltspflichten in der Lieferkette (Due Diligence)',
    category: 'Lieferkette',
    legalArticle: 'Art. 48–53 VO (EU) 2023/1542',
    scope: 'Wirtschaftsakteure ab 40 Mio. € Nettoumsatz',
    description: 'Nachweispflicht für ökologische und soziale Sorgfaltspflichten bei der Beschaffung kritischer Rohstoffe (Kobalt, natürlicher Graphit, Lithium, Nickel).',
    status: 'IN_FORCE',
  },
  {
    effectiveDate: '2027-02-18',
    label: 'Digitaler Batteriepass Pflicht',
    category: 'Batteriepass',
    legalArticle: 'Art. 77, 78 VO (EU) 2023/1542',
    scope: 'Stationäre industrielle Batteriespeicher > 2 kWh, Traktionsbatterien, LMT-Batterien',
    description: 'Jede neu in Verkehr gebrachte Batterie dieser Klassen muss über einen eindeutigen digitalen Produktpass verfügen, der über einen am Gehäuse angebrachten QR-Code abrufbar ist. Bestandsgeräte, die vor dem 18.02.2027 in Verkehr gebracht wurden, sind nicht rückwirkend nachweispflichtig.',
    status: 'UPCOMING',
  },
  {
    effectiveDate: '2028-08-18',
    label: 'Dokumentation des Rezyklatgehalts',
    category: 'Kreislaufwirtschaft',
    legalArticle: 'Art. 8 Abs. 1 VO (EU) 2023/1542',
    scope: 'Stationäre Speicher & Traktionsbatterien',
    description: 'Hersteller müssen den prozentualen Anteil an recyceltem Kobalt, Blei, Lithium und Nickel in den Aktivmaterialien der Batterie offiziell deklarieren.',
    status: 'FUTURE',
  },
  {
    effectiveDate: '2031-08-18',
    label: 'Verbindliche Mindest-Rezyklatquoten',
    category: 'Kreislaufwirtschaft',
    legalArticle: 'Art. 8 Abs. 2 VO (EU) 2023/1542',
    scope: 'Industriebatterien > 2 kWh & Traktionsbatterien',
    description: 'Mindestanteile an Sekundärrohstoffen werden verbindlich: 16 % Kobalt, 85 % Blei, 6 % Lithium und 6 % Nickel.',
    status: 'FUTURE',
  },
];

/**
 * 6 Pflichtkategorien der Daten im digitalen Batteriepass
 */
export const BATTERY_PASSPORT_MANDATORY_FIELDS = [
  {
    id: 1,
    title: '1. Allgemeine Batterie- & Herstelleridentifikation',
    description: 'Eindeutige Kennnummer (Unique Identifier), Herstellername, Produktionsstandort, Herstellungsdatum und Batteriemodell.',
    legalBasis: 'Art. 77 Abs. 2 i.V.m. Anhang XIII Punkt 1',
  },
  {
    id: 2,
    title: '2. Leistungs- & Haltbarkeitsmerkmale',
    description: 'Zertifizierte Nennkapazität (kWh / Ah), Mindestlebensdauer in Vollzyklen (bei 80 % SOH), Innenwiderstand, Lade-/Entladerate (C-Rate) und Temperaturtoleranz.',
    legalBasis: 'Art. 10 i.V.m. Anhang IV & XIII',
  },
  {
    id: 3,
    title: '3. CO2-Fußabdruck (Carbon Footprint)',
    description: 'Treibhausgasbilanz in kg CO2-Äquivalent pro kWh über den Lebenszyklus (Rohstoffabbau, Zellfertigung, Vormaterialien, Transport).',
    legalBasis: 'Art. 7 i.V.m. Anhang II',
  },
  {
    id: 4,
    title: '4. Rohstoff- & Materialdeklaration',
    description: 'Chemische Zusammensetzung (z.B. LiFePO4 / NMC), Rezyklatanteile bei Kobalt, Lithium, Nickel und Blei sowie Ausschluss gefährlicher Stoffe.',
    legalBasis: 'Art. 8 & 13 i.V.m. Anhang XIII',
  },
  {
    id: 5,
    title: '5. BMS-Echtzeit-Zustandsdaten (SOH / SOC)',
    description: 'Schnittstelle zur Bestimmung des aktuellen Alterungszustands (SOH), Restkapazität, Zykluszähler und thermischer Historie für Wartung und Second-Life-Prüfung.',
    legalBasis: 'Art. 14 i.V.m. Anhang VII',
  },
  {
    id: 6,
    title: '6. Demontage-, Reparatur- & Recyclingsicherheitsdaten',
    description: 'Anleitungen zum sicheren Ausbau, Sicherheitsdatenblätter, Entsorgungs- und Recyclingverfahren zur Rückgewinnung kritischer Rohstoffe.',
    legalBasis: 'Art. 77 Abs. 3 i.V.m. Anhang XIII Punkt 4',
  },
];
