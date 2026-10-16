import { describe, it, expect } from 'vitest';
import { evaluatePvOffer, OfferPlausibilityInput } from '../utils/offerEvaluation';

describe('PV-Angebots-Check Logic & 3-Tier Classification (Quality Gate Scenarios A-J)', () => {

  describe('Basics: Numerische Kennwerte & Nullsicherheit', () => {
    it('sollte Gesamtpreis je kWp korrekt ausweisen und Speicher-/Montageanteil transparent kennzeichnen', () => {
      const res = evaluatePvOffer({
        kwp: 9.6,
        storageKwh: 7.5,
        totalOfferPriceEur: 18500
      });

      expect(res.rawPricePerKwp).toBe(1927);
      expect(res.storageToPvRatio).toBe(0.78);
    });

    it('sollte mit 0 kWh Speicher oder 0 kWp sauber ohne Division durch Null oder NaN rechnen', () => {
      const res = evaluatePvOffer({
        kwp: 0,
        storageKwh: 0,
        totalOfferPriceEur: 8500
      });

      expect(Number.isFinite(res.rawPricePerKwp)).toBe(true);
      expect(res.rawPricePerKwp).toBeGreaterThan(0);
      expect(res.storageToPvRatio).toBe(0);
      expect(res.safeKwp).toBe(0.1);
    });
  });

  describe('Spezifische Test-Szenarien A bis J', () => {

    // Szenario A: Dachanlage ohne Speicher
    it('Szenario A: Dachanlage ohne Speicher (z. B. 10 kWp, 0 kWh, 13.000 €)', () => {
      const input: OfferPlausibilityInput = {
        kwp: 10,
        storageKwh: 0,
        totalOfferPriceEur: 13000,
        locationId: 'wuerzburg',
        tilt: 35,
        azimuth: 0,
        offeredAnnualYieldKwh: 10200
      };
      const res = evaluatePvOffer(input);

      expect(res.rawPricePerKwp).toBe(1300);
      expect(res.storageToPvRatio).toBe(0);
      expect(res.storageDimensionNote).toBeNull();
      expect(res.yieldStatus).toBe('standort_plausibilisiert');
      expect(res.yieldDeviationPercent).toBeDefined();
      expect(Math.abs(res.yieldDeviationPercent!)).toBeLessThan(10);
      expect(res.unratedAspects.length).toBeGreaterThan(0);
    });

    // Szenario B: Dachanlage mit Speicher
    it('Szenario B: Dachanlage mit Speicher (z. B. 10 kWp, 8 kWh, 18.500 €)', () => {
      const input: OfferPlausibilityInput = {
        kwp: 10,
        storageKwh: 8,
        totalOfferPriceEur: 18500,
        locationId: 'freiburg',
        tilt: 30,
        azimuth: 0,
        offeredAnnualYieldKwh: 10800
      };
      const res = evaluatePvOffer(input);

      expect(res.rawPricePerKwp).toBe(1850);
      expect(res.storageToPvRatio).toBe(0.8);
      expect(res.storageDimensionNote).toContain('Kennwert: 0.8 kWh/kWp');
      expect(res.storageDimensionNote).toContain('Stromverbrauch, dem zeitlichen Lastprofil');
      expect(res.yieldStatus).toBe('standort_plausibilisiert');
    });

    // Szenario C: Hoher Gesamtpreis durch Zusatzarbeiten
    it('Szenario C: Hoher Gesamtpreis durch Zusatzarbeiten (z. B. 10 kWp, 28.000 €)', () => {
      const input: OfferPlausibilityInput = {
        kwp: 10,
        storageKwh: 5,
        totalOfferPriceEur: 28000
      };
      const res = evaluatePvOffer(input);

      expect(res.rawPricePerKwp).toBe(2800);
      // Keine reißerische Abzocke-Einstufung, sondern offengelegte methodische Grenze
      expect(res.unratedAspects.some(a => a.includes('Marktüblichkeit des Gesamtpreises'))).toBe(true);
      expect(res.unratedAspects.some(a => a.includes('Zählerschrankerneuerungen'))).toBe(true);
    });

    // Szenario D: Fehlende Angebotspositionen / Checkliste
    it('Szenario D: Fehlende Angebotspositionen / unvollständige Spezifikationen', () => {
      const input: OfferPlausibilityInput = {
        kwp: 8,
        storageKwh: 0,
        totalOfferPriceEur: 11000
        // Keine Neigung, keine Ausrichtung, kein Standort, keine Handwerker-Ertragsprognose
      };
      const res = evaluatePvOffer(input);

      expect(res.yieldStatus).toBe('nicht_angegeben');
      expect(res.yieldDeviationPercent).toBeNull();
      expect(res.yieldEvaluationNote).toContain('grobe bundesweite Orientierung');
    });

    // Szenario E: Unbekannter Standort
    it('Szenario E: Unbekannter Standort (Fallback auf Referenzregion Mitte / Orientierung)', () => {
      const input: OfferPlausibilityInput = {
        kwp: 10,
        storageKwh: 5,
        totalOfferPriceEur: 16000,
        offeredAnnualYieldKwh: 9800
        // kein locationId
      };
      const res = evaluatePvOffer(input);

      expect(res.yieldStatus).toBe('grobe_orientierung');
      expect(res.yieldEvaluationNote).toContain('Grobe Orientierung');
      expect(res.yieldEvaluationNote).toContain('Standardannahmen');
    });

    // Szenario F: Unvollständige Ertragsparameter
    it('Szenario F: Unvollständige Ertragsparameter (Standort gewählt, aber Neigung fehlt)', () => {
      const input: OfferPlausibilityInput = {
        kwp: 12,
        storageKwh: 10,
        totalOfferPriceEur: 21000,
        locationId: 'hamburg',
        // tilt und azimuth fehlen
        offeredAnnualYieldKwh: 11500
      };
      const res = evaluatePvOffer(input);

      // Weil Neigung/Ausrichtung nicht spezifisch übergeben wurden: grobe Orientierung
      expect(res.yieldStatus).toBe('grobe_orientierung');
      expect(res.yieldEvaluationNote).toContain('Grobe Orientierung');
    });

    // Szenario G: Sehr hohe Ertragsprognose
    it('Szenario G: Sehr hohe Ertragsprognose (z. B. 15.000 kWh bei 10 kWp in Deutschland)', () => {
      const input: OfferPlausibilityInput = {
        kwp: 10,
        storageKwh: 5,
        totalOfferPriceEur: 17000,
        locationId: 'kassel',
        tilt: 35,
        azimuth: 0,
        offeredAnnualYieldKwh: 15000 // 1.500 kWh/kWp -> extrem überhöht für Dachanlage in Kassel
      };
      const res = evaluatePvOffer(input);

      expect(res.yieldStatus).toBe('standort_plausibilisiert');
      expect(res.yieldDeviationPercent).toBeGreaterThan(30);
      expect(res.yieldEvaluationNote).toContain('über der standortbezogenen Berechnung');
      expect(res.yieldEvaluationNote).toContain('optimistische Strahlungsdaten');
    });

    // Szenario H: Angebotspreis 0 oder ungültig
    it('Szenario H: Angebotspreis 0 oder negativ oder ungültig', () => {
      const input: OfferPlausibilityInput = {
        kwp: 10,
        storageKwh: 5,
        totalOfferPriceEur: 0
      };
      const res = evaluatePvOffer(input);

      expect(res.safePriceEur).toBe(0);
      expect(res.rawPricePerKwp).toBe(0);
      expect(Number.isFinite(res.rawPricePerKwp)).toBe(true);
    });

    // Szenario I: Sehr kleine / große Leistung
    it('Szenario I: Sehr kleine Leistung (0.5 kWp Balkon) vs. große Leistung (50 kWp Gewerbe)', () => {
      // Kleinstleistung (0.5 kWp)
      const resSmall = evaluatePvOffer({
        kwp: 0.5,
        storageKwh: 0,
        totalOfferPriceEur: 600
      });
      expect(resSmall.rawPricePerKwp).toBe(1200);
      expect(resSmall.safeKwp).toBe(0.5);

      // Größere Leistung (50 kWp Gewerbe mit 19 % USt)
      const resLarge = evaluatePvOffer({
        kwp: 50,
        storageKwh: 30,
        totalOfferPriceEur: 55000,
        taxRatePercent: 19
      });
      expect(resLarge.rawPricePerKwp).toBe(1100);
      expect(resLarge.taxNote).toContain('19 % USt ausgewiesen');
      expect(resLarge.taxNote).toContain('§ 12 Abs. 3 UStG');
    });

    // Szenario J: Ungewöhnlich großer Speicher
    it('Szenario J: Ungewöhnlich großer Speicher (5 kWp mit 25 kWh -> Speicher-Auslegungshinweis)', () => {
      const input: OfferPlausibilityInput = {
        kwp: 5,
        storageKwh: 25,
        totalOfferPriceEur: 22000
      };
      const res = evaluatePvOffer(input);

      expect(res.storageToPvRatio).toBe(5.0); // 5.0 kWh je kWp
      expect(res.storageDimensionNote).toContain('Kennwert: 5 kWh/kWp');
      expect(res.storageDimensionNote).toContain('hohen Verhältnis zur Generatorleistung');
      expect(res.storageDimensionNote).toContain('Wintermonaten');
    });
  });

  describe('Umsatzsteuerliche Differenzierung (§ 12 Abs. 3 UStG)', () => {
    it('sollte 0 % USt sachlich mit den gesetzlichen Voraussetzungen (§ 12 Abs. 3 UStG) erläutern ohne Pauschalisierung', () => {
      const res = evaluatePvOffer({
        kwp: 10,
        storageKwh: 0,
        totalOfferPriceEur: 14000,
        taxRatePercent: 0
      });
      expect(res.taxNote).toContain('0 % USt ausgewiesen');
      expect(res.taxNote).toContain('§ 12 Abs. 3 UStG');
      expect(res.taxNote).toContain('Keine Steuerberatung');
      // Keine pauschale Beschränkung rein auf Privatpersonen
      expect(res.taxNote).not.toContain('(privates Wohngebäude)');
    });

    it('sollte 19 % USt sachlich ausweisen und nicht automatisch allen Gewerben zuordnen', () => {
      const res = evaluatePvOffer({
        kwp: 10,
        storageKwh: 0,
        totalOfferPriceEur: 16660,
        taxRatePercent: 19
      });
      expect(res.taxNote).toContain('19 % USt ausgewiesen');
      expect(res.taxNote).toContain('Keine Steuerberatung');
    });

    it('sollte beliebige abweichende Steuersätze als Einzelfall neutral kennzeichnen', () => {
      const res = evaluatePvOffer({
        kwp: 10,
        storageKwh: 0,
        totalOfferPriceEur: 15000,
        taxRatePercent: 7
      });
      expect(res.taxNote).toContain('7 % USt ausgewiesen');
      expect(res.taxNote).toContain('Keine Steuerberatung');
    });
  });

  describe('Speicherdimensionierung & Wirtschaftlichkeitsfaktoren (Regression)', () => {
    it('sollte bei Normaldimensionierung keine Pauschalurteile ("Ausgewogen") fällen, sondern Einflussfaktoren benennen', () => {
      const res = evaluatePvOffer({
        kwp: 10,
        storageKwh: 7,
        totalOfferPriceEur: 17500
      });
      expect(res.storageDimensionNote).not.toContain('Ausgewogene Dimensionierung');
      expect(res.storageDimensionNote).toContain('Kennwert: 0.7 kWh/kWp');
      expect(res.storageDimensionNote).toContain('Stromverbrauch');
      expect(res.storageDimensionNote).toContain('Lastprofil');
      expect(res.storageDimensionNote).toContain('Bereitschaftsverlusten');
    });

    it('sollte bei stark überdimensioniertem Speicher sachlich auf saisonale Grenzen hinweisen', () => {
      const res = evaluatePvOffer({
        kwp: 6,
        storageKwh: 18,
        totalOfferPriceEur: 23000
      });
      expect(res.storageDimensionNote).toContain('Kennwert: 3 kWh/kWp');
      expect(res.storageDimensionNote).toContain('ertragsschwachen Wintermonaten');
      expect(res.storageDimensionNote).toContain('Lastprofil');
    });
  });
});
