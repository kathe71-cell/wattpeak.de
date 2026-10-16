import { describe, it, expect } from 'vitest';
import { evaluatePvOffer, OfferPlausibilityInput } from '../utils/offerEvaluation';
import { calculateSolarYield } from '../utils/solarMath';

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

  describe('P0 Regression: Angebotspreisübergabe an die Unified Math Engine', () => {
    it('übernimmt 9,6 kWp und 24.000 € Angebotspreis exakt und kalibriert die Amortisationsdauer neu', () => {
      // 1. Benchmark-Schritt
      const offer = evaluatePvOffer({
        kwp: 9.6,
        storageKwh: 7.5,
        totalOfferPriceEur: 24000
      });
      expect(offer.safeKwp).toBe(9.6);
      expect(offer.safePriceEur).toBe(24000);
      expect(offer.rawPricePerKwp).toBe(2500);

      // 2. Ertragsrechner-Berechnung mit Standard-Marktpreis (ohne customInvestmentEur)
      const standardCalc = calculateSolarYield({
        systemType: 'rooftop',
        kwp: 9.6,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        storageKwh: 7.5,
        annualConsumption: 4200,
        electricityPrice: 0.36
      });
      expect(standardCalc.economy.isInvestmentCustom).toBe(false);
      expect(standardCalc.economy.estimatedInvestmentEur).toBeLessThan(20000); // Typisch ~17.006 €
      expect(standardCalc.economy.estimatedPaybackYears).toBe(11.9);

      // 3. Ertragsrechner-Berechnung nach Übergabe aus PV-Angebots-Check (mit customInvestmentEur)
      const customCalc = calculateSolarYield({
        systemType: 'rooftop',
        kwp: offer.safeKwp,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        storageKwh: offer.safeStorageKwh,
        customInvestmentEur: offer.safePriceEur,
        annualConsumption: 4200,
        electricityPrice: 0.36
      });
      expect(customCalc.economy.isInvestmentCustom).toBe(true);
      expect(customCalc.economy.estimatedInvestmentEur).toBe(24000);
      // Amortisation = 24.000 € / Nettoertrag (1.356 €/a nach 1% Betriebskosten) = 17.7 Jahre
      expect(customCalc.economy.estimatedPaybackYears).toBe(17.7);
      expect(customCalc.economy.estimatedPaybackYears).toBeGreaterThan(standardCalc.economy.estimatedPaybackYears!);
    });

    it('funktioniert auch bei Dachanlage ohne Speicher (z. B. 10 kWp, 14.500 €)', () => {
      const offerNoStorage = evaluatePvOffer({
        kwp: 10,
        storageKwh: 0,
        totalOfferPriceEur: 14500
      });
      const calcNoStorage = calculateSolarYield({
        systemType: 'rooftop',
        kwp: offerNoStorage.safeKwp,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        storageKwh: offerNoStorage.safeStorageKwh,
        customInvestmentEur: offerNoStorage.safePriceEur,
        annualConsumption: 4200,
        electricityPrice: 0.36
      });

      expect(calcNoStorage.economy.isInvestmentCustom).toBe(true);
      expect(calcNoStorage.economy.estimatedInvestmentEur).toBe(14500);
      // Amortisation entspricht 14.500 / Jahresnettoersparnis
      const expectedYears = Number((14500 / calcNoStorage.economy.annualNetBenefitEur).toFixed(1));
      expect(calcNoStorage.economy.estimatedPaybackYears).toBe(expectedYears);
    });

    it('fällt zuverlässig auf Marktschätzung zurück wenn kein Angebotspreis übergeben wird', () => {
      const calcDefault = calculateSolarYield({
        systemType: 'rooftop',
        kwp: 9.6,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        storageKwh: 7.5,
        annualConsumption: 4200,
        electricityPrice: 0.36,
        customInvestmentEur: undefined
      });
      expect(calcDefault.economy.isInvestmentCustom).toBe(false);
      expect(calcDefault.economy.estimatedInvestmentEur).toBe(17006);
    });
  });

  describe('Speicher-Mehrwert & Kostenallokation Testsuite (Szenarien A bis H)', () => {
    // Szenario A: Marktpreismodell mit Speicher (9,6 kWp, 7,5 kWh, 4.200 kWh)
    it('Szenario A: Marktpreismodell weist Bruttoersparnis (432 €), Rücklagen (39 €) und Netto (393 €) exakt aus', () => {
      const res = calculateSolarYield({
        systemType: 'rooftop',
        kwp: 9.6,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        storageKwh: 7.5,
        annualConsumption: 4200,
        electricityPrice: 0.36
      });

      expect(res.storageDelta.costAllocationStatus).toBe('market_mode');
      expect(res.storageDelta.additionalAnnualSavingsEur).toBe(432);
      expect(res.storageDelta.storageOperatingCostEur).toBe(39);
      expect(res.storageDelta.additionalNetBenefitEur).toBe(393);
      expect(res.storageDelta.storageSpecificCostEur).toBe(3950);
      expect(res.storageDelta.storagePaybackYears).toBe(10.1);
    });

    // Szenario B: Individueller Gesamtangebotspreis mit Speicher (ohne Einzelpreis)
    it('Szenario B: Individueller Gesamtangebotspreis fingiert keine Kostenaufteilung (Netto = null, Brutto = 432 €)', () => {
      const res = calculateSolarYield({
        systemType: 'rooftop',
        kwp: 9.6,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        storageKwh: 7.5,
        annualConsumption: 4200,
        electricityPrice: 0.36,
        customInvestmentEur: 24000
      });

      expect(res.economy.isInvestmentCustom).toBe(true);
      expect(res.economy.estimatedInvestmentEur).toBe(24000);
      expect(res.storageDelta.costAllocationStatus).toBe('package_price_unallocated');
      // Brutto-Stromkostenvorteil bleibt physikalisch exakt erhalten
      expect(res.storageDelta.additionalAnnualSavingsEur).toBe(432);
      // Keine fiktiven Netto-Speichervorteile oder Rücklagen erfunden
      expect(res.storageDelta.additionalNetBenefitEur).toBeNull();
      expect(res.storageDelta.storageOperatingCostEur).toBeNull();
      expect(res.storageDelta.storageSpecificCostEur).toBeNull();
      expect(res.storageDelta.storagePaybackYears).toBeNull();
      // Gesamtanlage amortisiert sich korrekt auf Basis des Gesamtpreises
      expect(res.economy.estimatedPaybackYears).toBe(17.7);
    });

    // Szenario C: Individueller Angebotspreis ohne Speicher (0 kWh)
    it('Szenario C: Individueller Angebotspreis ohne Speicher weist kein Speicher-Delta aus', () => {
      const res = calculateSolarYield({
        systemType: 'rooftop',
        kwp: 9.6,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        storageKwh: 0,
        annualConsumption: 4200,
        electricityPrice: 0.36,
        customInvestmentEur: 14000
      });

      expect(res.storageDelta.hasStorage).toBe(false);
      expect(res.storageDelta.additionalAnnualSavingsEur).toBe(0);
      expect(res.storageDelta.additionalNetBenefitEur).toBeNull();
      expect(res.economy.isInvestmentCustom).toBe(true);
      expect(res.economy.estimatedInvestmentEur).toBe(14000);
    });

    // Szenario D: Bekannter separater Speicherpreis im Angebot
    it('Szenario D: Bekannter separater Speicherpreis berechnet Netto-Vorteil und Speicher-Amortisation präzise', () => {
      const res = calculateSolarYield({
        systemType: 'rooftop',
        kwp: 9.6,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        storageKwh: 7.5,
        annualConsumption: 4200,
        electricityPrice: 0.36,
        customInvestmentEur: 24000,
        customStoragePriceEur: 4500 // Explizite Speicherposition
      });

      expect(res.storageDelta.costAllocationStatus).toBe('custom_storage_specified');
      expect(res.storageDelta.storageSpecificCostEur).toBe(4500);
      expect(res.storageDelta.additionalAnnualSavingsEur).toBe(432);
      // Betriebskosten/Rücklagen 1 % von 4.500 € = 45 €/a
      expect(res.storageDelta.storageOperatingCostEur).toBe(45);
      // Netto = 432 € - 45 € = 387 €/a
      expect(res.storageDelta.additionalNetBenefitEur).toBe(387);
      // Speicheramortisation: 4.500 € / 387 € = 11.6 Jahre
      expect(res.storageDelta.storagePaybackYears).toBe(11.6);
    });

    // Szenario E: Fehlender separater Speicherpreis
    it('Szenario E: Fehlender separater Speicherpreis bei Gesamtpreis setzt Netto auf nicht isolierbar', () => {
      const res = calculateSolarYield({
        systemType: 'rooftop',
        kwp: 10,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        storageKwh: 10,
        annualConsumption: 5000,
        electricityPrice: 0.36,
        customInvestmentEur: 21000,
        customStoragePriceEur: undefined // Kein separater Speicherpreis bekannt
      });

      expect(res.storageDelta.costAllocationStatus).toBe('package_price_unallocated');
      expect(res.storageDelta.additionalNetBenefitEur).toBeNull();
      expect(res.storageDelta.additionalAnnualSavingsEur).toBeGreaterThan(0);
    });

    // Szenario F & G: Wechsel zwischen Marktpreis und individuellem Angebotspreis sowie Zurücksetzen
    it('Szenario F & G: Umschalten zwischen Marktpreis und Angebotspreis bleibt mathematisch exakt', () => {
      const baseParams = {
        systemType: 'rooftop' as const,
        kwp: 9.6,
        region: 'mitte' as const,
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon' as const,
        storageKwh: 7.5,
        annualConsumption: 4200,
        electricityPrice: 0.36
      };

      // 1. Marktpreis
      const marketRes = calculateSolarYield({ ...baseParams });
      expect(marketRes.storageDelta.costAllocationStatus).toBe('market_mode');
      expect(marketRes.storageDelta.additionalNetBenefitEur).toBe(393);
      expect(marketRes.economy.estimatedInvestmentEur).toBe(17006);

      // 2. Wechsel auf Angebotspreis 24.000 €
      const customRes = calculateSolarYield({ ...baseParams, customInvestmentEur: 24000 });
      expect(customRes.storageDelta.costAllocationStatus).toBe('package_price_unallocated');
      expect(customRes.storageDelta.additionalNetBenefitEur).toBeNull();
      expect(customRes.economy.estimatedInvestmentEur).toBe(24000);
      expect(customRes.economy.estimatedPaybackYears).toBe(17.7);

      // 3. Zurücksetzen auf undefined
      const resetRes = calculateSolarYield({ ...baseParams, customInvestmentEur: undefined });
      expect(resetRes.storageDelta.costAllocationStatus).toBe('market_mode');
      expect(resetRes.storageDelta.additionalNetBenefitEur).toBe(393);
      expect(resetRes.economy.estimatedInvestmentEur).toBe(17006);
      expect(resetRes.economy.estimatedPaybackYears).toBe(11.9);
    });

    // Szenario H: Wiederholte Übernahme aus PV-Angebots-Check
    it('Szenario H: Wiederholte Übergabe aus PV-Angebots-Check liefert reproduzierbare, unverfälschte Werte', () => {
      const offer1 = evaluatePvOffer({ kwp: 9.6, storageKwh: 7.5, totalOfferPriceEur: 24000 });
      const calc1 = calculateSolarYield({
        systemType: 'rooftop',
        kwp: offer1.safeKwp,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        storageKwh: offer1.safeStorageKwh,
        customInvestmentEur: offer1.safePriceEur,
        annualConsumption: 4200,
        electricityPrice: 0.36
      });

      const offer2 = evaluatePvOffer({ kwp: 9.6, storageKwh: 7.5, totalOfferPriceEur: 18000 });
      const calc2 = calculateSolarYield({
        systemType: 'rooftop',
        kwp: offer2.safeKwp,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        storageKwh: offer2.safeStorageKwh,
        customInvestmentEur: offer2.safePriceEur,
        annualConsumption: 4200,
        electricityPrice: 0.36
      });

      expect(calc1.economy.estimatedInvestmentEur).toBe(24000);
      expect(calc1.economy.estimatedPaybackYears).toBe(17.7);
      expect(calc2.economy.estimatedInvestmentEur).toBe(18000);
      expect(calc2.economy.estimatedPaybackYears).toBe(12.7);
    });
  });
});


