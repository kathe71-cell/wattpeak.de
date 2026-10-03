/**
 * WATTPEAK.DE ZENTRALES NORMEN- & REGULIERUNGSMODELL
 * 
 * Saubere systematische Trennung zwischen energierechtlichen Sonderregelungen (EEG),
 * elektrotechnischen Netzanschlussnormen (VDE-AR-N 4105) und
 * anlagenspezifischen Produkt- & Installationsnormen (DIN VDE V 0126-95, DIN VDE 0100-551).
 * 
 * Stand: Oktober 2026
 */

export interface RegulatoryStandard {
  code: string;
  title: string;
  scope: string;
  edition: string;
  status: 'CURRENT' | 'HISTORIC' | 'TRANSITIONAL';
  keyProvisions: string[];
  citation: string;
  officialSource: string;
}

export const REGULATORY_STANDARDS = {
  // 1. ENERGIERECHT: EEG 2023 / SOLARPAKET I
  eeg_steckersolar: {
    code: 'EEG 2023 § 3 Nr. 43 & § 8 Abs. 5a',
    title: 'Gesetzliche Sonderregelung für Steckersolargeräte (Solarpaket I)',
    scope: 'Energierechtliche Privilegierung und Netzanschluss von Stecker-Solargeräten',
    edition: 'EEG-Novelle Solarpaket I (BGBl. 2024 I Nr. 151)',
    status: 'CURRENT',
    keyProvisions: [
      'Maximale installierte Gesamtnennleistung der Module: 2.000 Wp (DC-Generatorleistung gem. § 3 Nr. 43 EEG)',
      'Maximale Wechselrichter-Ausgangsleistung: 800 VA (Scheinleistung am Netzanschlusspunkt gem. § 8 Abs. 5a EEG)',
      'Ausschließliche Registrierung im Marktstammdatenregister (MaStR) der Bundesnetzagentur erforderlich – gesonderte Meldung beim Verteilnetzbetreiber (VNB) entfällt',
      'Unentgeltliche Abnahme: Überschüssiger Strom wird ohne gesonderten Vergütungsanspruch eingespeist, sofern keine reguläre EEG-Vergütung beantragt wurde',
      'Übergangsweise Duldung rückwärtsdrehender Zähler (Ferraris-Zähler) bis zum kostenlosen Tausch durch den Messstellenbetreiber',
    ],
    citation: '§ 3 Nr. 43, § 8 Abs. 5a Erneuerbare-Energien-Gesetz (EEG 2023)',
    officialSource: 'Bundesgesetzblatt (BGBl. 2024 I Nr. 151) / Bundesnetzagentur',
  },

  // 2. NETZANSCHLUSSNORM: VDE-AR-N 4105:2026-03
  vde_ar_n_4105_current: {
    code: 'VDE-AR-N 4105:2026-03',
    title: 'Erzeugungsanlagen am Niederspannungsnetz – Technische Mindestanforderungen',
    scope: 'Netzanschluss, Netz- und Anlagenschutz (NA-Schutz) und Netzsicherheit',
    edition: 'Ausgabe 2026-03 (Aktueller technischer Standard)',
    status: 'CURRENT',
    keyProvisions: [
      'Verbindlicher Netzanschlussstandard für alle Erzeugungsanlagen am Niederspannungsnetz in Deutschland',
      'Erfordert gültiges Einheitenzertifikat für Wechselrichter und integrierten Netz- und Anlagenschutz (NA-Schutz)',
      'Selbsttätige Abschaltung bei Netzstörung (z.B. Spannungsausfall oder Frequenzabweichung) innerhalb von ≤ 200 ms',
      'Vermeidung von Netzrückkopplungen und Inselnetzbildung',
    ],
    citation: 'VDE-AR-N 4105:2026-03, VDE FNN',
    officialSource: 'VDE Verband der Elektrotechnik Elektronik Informationstechnik e.V. / Forum Netztechnik/Netzbetrieb (FNN)',
  },

  // HISTORISCHE REFERENZ FÜR BESTANDSZERTIFIKATE: VDE-AR-N 4105:2018-11
  vde_ar_n_4105_historic: {
    code: 'VDE-AR-N 4105:2018-11',
    title: 'Erzeugungsanlagen am Niederspannungsnetz (Vorherige Fassung)',
    scope: 'Historische Zertifizierungsbasis für Wechselrichter aus den Baujahren 2019–2025',
    edition: 'Ausgabe 2018-11 (Historische Zertifizierungsbasis)',
    status: 'HISTORIC',
    keyProvisions: [
      'Galt bis zur Einführung der novellierten Fassung 2026-03',
      'Geräte mit gültigem Einheitenzertifikat nach 2018-11 genießen für Bestandsanlagen Bestandsschutz',
      'Neu geplante Anlagen und aktuelle Normprüfungen beziehen sich auf VDE-AR-N 4105:2026-03',
    ],
    citation: 'VDE-AR-N 4105:2018-11, VDE FNN',
    officialSource: 'VDE FNN',
  },

  // 3. PRODUKTNORM FÜR STECKERSOLARGERÄTE: DIN VDE V 0126-95:2025-12
  din_vde_v_0126_95: {
    code: 'DIN VDE V 0126-95:2025-12',
    title: 'Steckersolargeräte – Sicherheitsanforderungen und Prüfungen für steckerfertige PV-Systeme',
    scope: 'Produktsicherheit des Gesamtsystems (Modul, Wechselrichter, Leitung, Steckvorrichtung)',
    edition: 'Ausgabe 2025-12',
    status: 'CURRENT',
    keyProvisions: [
      'Erste dedizierte Produktnorm für Stecker-Solargeräte als Gesamtsystem in Deutschland',
      'Definiert spezifische technische Sicherheitskriterien für den Anschluss an Haushalts-Schutzkontaktsteckdosen (Schuko, CEE 7/7)',
      'Regelt maximale Wechselrichterleistung (800 VA) und mechanische sowie thermische Belastungsgrenzen der Zuleitung',
      'Unterscheidung zwischen EEG-Obergrenze (2.000 Wp) und den systemspezifischen Modulkonfigurationen der Produktzertifizierung',
      'Anforderung an mechanische Auszugssicherung, Berührungsschutz und galvanische Trennung',
    ],
    citation: 'DIN VDE V 0126-95:2025-12 (VDE V 0126-95)',
    officialSource: 'DKE Deutsche Kommission Elektrotechnik Elektronik Informationstechnik in DIN und VDE',
  },

  // 4. INSTALLATIONSNORM: DIN VDE 0100-551 / DIN VDE V 0100-551-1
  din_vde_0100_551: {
    code: 'DIN VDE 0100-551 / DIN VDE V 0100-551-1',
    title: 'Errichten von Niederspannungsanlagen – Niederspannungsstromerzeugungseinrichtungen',
    scope: 'Einspeisung von Erzeugungsanlagen in Endstromkreise',
    edition: 'Gültige Fassung',
    status: 'CURRENT',
    keyProvisions: [
      'Regelt die Einspeisung in bestehende Endstromkreise von Gebäuden',
      'Schutz vor Leitungsüberlastung: Summe aus Bezugsstrom und eingespeistem Solarstrom darf die Strombelastbarkeit der Leitung nicht überschreiten',
      'Feste Einspeisesteckvorrichtung (z.B. Wieland RST) oder Schutzkontaktsteckdose unter Einhaltung der Vorgaben aus DIN VDE V 0126-95',
    ],
    citation: 'DIN VDE 0100-551:2017-02 / DIN VDE V 0100-551-1',
    officialSource: 'DKE / VDE',
  },

  // 5. REGISTRIERUNG: MARKTSTAMMDATENREGISTER (MaStR)
  mastr: {
    code: 'MaStRV (Marktstammdatenregisterverordnung)',
    title: 'Marktstammdatenregister der Bundesnetzagentur',
    scope: 'Gesetzliche Registrierungspflicht für alle ortsfesten Stromerzeugungsanlagen',
    edition: 'Gültige Fassung mit vereinfachter Steckersolar-Erfassung',
    status: 'CURRENT',
    keyProvisions: [
      'Registrierung innerhalb von 4 Wochen nach Inbetriebnahme gesetzlich verpflichtend',
      'Für Steckersolargeräte gilt das stark vereinfachte 5-Minuten-Online-Formular (nur 5 Kernangaben)',
      'Keine Genehmigung erforderlich – reine Anzeigepflicht',
      'Automatische Benachrichtigung des Verteilnetzbetreibers durch das MaStR',
    ],
    citation: '§ 5 Marktstammdatenregisterverordnung (MaStRV)',
    officialSource: 'Bundesnetzagentur (www.marktstammdatenregister.de)',
  },

  // 6. STEUERRECHT: § 12 ABS. 3 USTG
  ustg_nullsteuersatz: {
    code: '§ 12 Abs. 3 UStG',
    title: 'Nullsteuersatz (0 % Mehrwertsteuer) für Photovoltaik',
    scope: 'Umsatzsteuerbefreiung für private und gemeinnützige Solaranlagen',
    edition: 'Geltendes Recht (seit 01.01.2023)',
    status: 'CURRENT',
    keyProvisions: [
      'Gilt für Lieferung und Installation von Solarmodulen, Wechselrichtern, Batteriespeichern und wesentlichen Systemkomponenten',
      'Voraussetzung: Installation auf oder in der Nähe von Privatwohnungen, Wohnungen sowie öffentlichen und gemeinnützigen Gebäuden',
      'Gilt nicht pauschal für Zubehör ohne direkte Systemfunktion (z.B. universelle Werkzeuge, Einzelmeterware ohne Zuordnung)',
      'BMF-Schreiben vom 27.02.2023 und Folgeerlasse beachten',
    ],
    citation: '§ 12 Abs. 3 Umsatzsteuergesetz (UStG)',
    officialSource: 'Bundesministerium der Finanzen (BMF)',
  },

  // 7. EU-BATTERIEVERORDNUNG: VERORDNUNG (EU) 2023/1542
  eu_battery_regulation: {
    code: 'Verordnung (EU) 2023/1542',
    title: 'EU-Batterieverordnung (Batterien und Altbatterien)',
    scope: 'Nachhaltigkeit, Leistungsfähigkeit, Kennzeichnung und digitaler Batteriepass',
    edition: 'In Kraft seit 17.08.2023, stufenweise Geltung bis 2036',
    status: 'CURRENT',
    keyProvisions: [
      'Digitaler Batteriepass (Art. 77) wird verbindlich ab dem 18. Februar 2027',
      'Betrifft: Traktionsbatterien (E-Fahrzeuge), LMT-Batterien (Leichte Verkehrsmittel) und stationäre industrielle Batteriespeicher mit > 2 kWh Nennkapazität',
      'Keine Rückwirkung für Bestandsgeräte, die vor dem 18.02.2027 in Verkehr gebracht wurden',
      'CE-Kennzeichnung und Sicherheitskriterien (Art. 12 & 38) gelten bereits seit dem 18. August 2024',
      'Rezyklatanteile für Kobalt, Blei, Lithium und Nickel (Art. 8) stufenweise verpflichtend ab 18. August 2031',
    ],
    citation: 'Verordnung (EU) 2023/1542 des Europäischen Parlaments und des Rates',
    officialSource: 'Amtsblatt der Europäischen Union (ABl. L 191 vom 28.7.2023, S. 1)',
  },
} as const;

/**
 * Präzise Hilfsfunktion zur Darstellung des Verhältnisses zwischen
 * EEG-Sonderregelung und Schuko-Anschluss nach Produktnorm
 */
export function getBalconyRegulatorySummary() {
  return {
    eegLimit: 'Bis zu 2.000 Wp Modulleistung (DC) und 800 VA Wechselrichterleistung (AC) gemäß § 3 Nr. 43 und § 8 Abs. 5a EEG (Solarpaket I).',
    connectionStandard: 'Für den Anschluss über Haushalts-Schutzkontaktsteckdosen (Schuko) gelten die systemspezifischen Sicherheits- und Prüfvorgaben der Produktnorm DIN VDE V 0126-95:2025-12.',
    gridNorm: 'Wechselrichter müssen am Niederspannungsnetz über ein gültiges Einheitenzertifikat nach VDE-AR-N 4105:2026-03 mit integriertem NA-Schutz verfügen (Altgeräte mit Zertifikat nach 2018-11 genießen Bestandsschutz).',
    registration: 'Registrierung ist im Marktstammdatenregister (MaStR) der Bundesnetzagentur gesetzlich verpflichtend.',
  };
}
