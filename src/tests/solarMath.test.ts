import { describe, it, expect } from 'vitest';
import { 
  calculateSolarYield, 
  getDefaultFeedInTariff, 
  SolarParams 
} from '../utils/solarMath';

describe('WattPeak Unified Solar Calculation Engine', () => {

  describe('1. Gesetzliche & geschlossene Energiebilanz', () => {
    it('sollte für ein typisches Einfamilienhaus (9.6 kWp, 4200 kWh, 7.5 kWh Speicher) eine exakte Energiebilanz wahren', () => {
      const params: SolarParams = {
        systemType: 'rooftop',
        kwp: 9.6,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        annualConsumption: 4200,
        storageKwh: 7.5,
        electricityPrice: 0.36
      };

      const res = calculateSolarYield(params);
      const b = res.balance;

      // Invariante 1: Gesamtverbrauch = Eigenversorgung + Netzbezug
      expect(b.totalSelfUsedKwh + b.gridPurchaseKwh).toBe(b.annualDemandKwh);

      // Invariante 2: Gesamterzeugung = Direktverbrauch + Speicherladung + Netzeinspeisung
      expect(b.directConsumptionKwh + b.storageChargeKwh + b.feedInKwh).toBe(b.totalAnnualYieldKwh);

      // Invariante 3: Speichererhaltung (Ladung = Entladung + Verluste)
      expect(b.storageDischargeKwh + b.storageLossKwh).toBe(b.storageChargeKwh);

      // Invariante 4: Eigenversorgung darf niemals den Jahresverbrauch überschreiten
      expect(b.totalSelfUsedKwh).toBeLessThanOrEqual(b.annualDemandKwh);

      // Invariante 5: Autarkiegrad muss strikt zwischen 0 und 100% liegen und dem Verhältnis entsprechen
      expect(b.autarkyRatePercent).toBeGreaterThan(0);
      expect(b.autarkyRatePercent).toBeLessThanOrEqual(100);
      const expectedAutarky = Number(((b.totalSelfUsedKwh / b.annualDemandKwh) * 100).toFixed(1));
      expect(b.autarkyRatePercent).toBe(expectedAutarky);

      // Invariante 6: Eigenverbrauchsquote muss strikt zwischen 0 und 100% liegen
      expect(b.selfConsumptionRatePercent).toBeGreaterThan(0);
      expect(b.selfConsumptionRatePercent).toBeLessThanOrEqual(100);

      // Bei 9.6 kWp Erzeugung (~9.500 kWh) und 4.200 kWh Verbrauch mit 7.5 kWh Speicher:
      // Typischerweise 65–85% Autarkie
      expect(b.autarkyRatePercent).toBeGreaterThan(60);
      expect(b.autarkyRatePercent).toBeLessThan(90);
    });

    it('sollte den Audit-Widerspruch beheben: 4200 kWh Verbrauch, vermiedener Netzstrom und Autarkie müssen konsistent sein', () => {
      const params: SolarParams = {
        systemType: 'rooftop',
        kwp: 9.6,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        annualConsumption: 4200,
        storageKwh: 7.5,
        electricityPrice: 0.36
      };

      const res = calculateSolarYield(params);
      const calculatedAutarkyFromKwh = (res.balance.totalSelfUsedKwh / 4200) * 100;

      // Die ausgewiesene Autarkie darf nicht willkürlich bei 90% gekappt sein,
      // wenn die Kilowattstunden-Zahl etwas anderes aussagt
      expect(Math.abs(res.balance.autarkyRatePercent - calculatedAutarkyFromKwh)).toBeLessThan(0.2);
    });
  });

  describe('2. Balkonkraftwerke vs. Dachanlagen', () => {
    it('sollte für ein Balkonkraftwerk standardmäßig unentgeltliche Einspeisung ansetzen', () => {
      const params: SolarParams = {
        systemType: 'balcony',
        kwp: 0.88,
        inverterAcWatts: 800,
        region: 'mitte',
        mountingType: 'facade_balcony',
        tilt: 85,
        azimuth: 0,
        cellType: 'topcon',
        annualConsumption: 2800,
        storageKwh: 0,
        electricityPrice: 0.36
      };

      const res = calculateSolarYield(params);

      // Einspeiseerlös muss 0 € sein
      expect(res.economy.annualFeedInRevenueEur).toBe(0);
      expect(getDefaultFeedInTariff(0.88, 'balcony', 'uncompensated')).toBe(0.00);

      // Erzeugung bei 880 Wp Fassade sollte realistisch zwischen 550 und 750 kWh liegen
      expect(res.balance.totalAnnualYieldKwh).toBeGreaterThan(500);
      expect(res.balance.totalAnnualYieldKwh).toBeLessThan(800);
    });

    it('sollte für Dachanlagen die korrekten EEG-Vergütungsstufen anwenden', () => {
      expect(getDefaultFeedInTariff(8.0, 'rooftop', 'eeg_partial')).toBeCloseTo(0.0803, 4);
      expect(getDefaultFeedInTariff(15.0, 'rooftop', 'eeg_partial')).toBeCloseTo(0.0695, 4);
    });

    it('sollte Überbelegung bei Balkonkraftwerken (z.B. 1.76 kWp an 800 W AC) mit Inverter-Clipping berücksichtigen', () => {
      const standardParams: SolarParams = {
        systemType: 'balcony',
        kwp: 0.88,
        inverterAcWatts: 800,
        region: 'mitte',
        tilt: 30,
        azimuth: 0,
        cellType: 'topcon',
        annualConsumption: 3000,
        storageKwh: 0,
        electricityPrice: 0.36
      };

      const overpaneledParams: SolarParams = {
        ...standardParams,
        kwp: 1.76
      };

      const resStandard = calculateSolarYield(standardParams);
      const resOverpaneled = calculateSolarYield(overpaneledParams);

      // Mehr Module bringen signifikant mehr Ertrag
      expect(resOverpaneled.balance.totalAnnualYieldKwh).toBeGreaterThan(resStandard.balance.totalAnnualYieldKwh * 1.6);

      // Aber spezifischer Ertrag (kWh/kWp) sinkt leicht wegen Mittags-Clipping an der 800W Grenze
      expect(resOverpaneled.physics.clippingLossPercent).toBeGreaterThan(0);
      expect(resOverpaneled.physics.specificYieldKwhPerKwp).toBeLessThanOrEqual(resStandard.physics.specificYieldKwhPerKwp);
    });
  });

  describe('3. Speicher-Logik & Delta-Vergleich', () => {
    it('sollte ohne Speicher keine Speicherverluste aufweisen', () => {
      const params: SolarParams = {
        systemType: 'rooftop',
        kwp: 8.0,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        annualConsumption: 4000,
        storageKwh: 0,
        electricityPrice: 0.36
      };

      const res = calculateSolarYield(params);
      expect(res.balance.storageChargeKwh).toBe(0);
      expect(res.balance.storageDischargeKwh).toBe(0);
      expect(res.balance.storageLossKwh).toBe(0);
      expect(res.storageDelta.hasStorage).toBe(false);
      expect(res.storageDelta.additionalSelfUsedKwh).toBe(0);
    });

    it('sollte mit Speicher einen höheren Eigenverbrauch und Autarkiegrad aufweisen', () => {
      const baseParams: SolarParams = {
        systemType: 'rooftop',
        kwp: 8.0,
        region: 'mitte',
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        annualConsumption: 4000,
        storageKwh: 0,
        electricityPrice: 0.36
      };

      const storageParams: SolarParams = {
        ...baseParams,
        storageKwh: 6.0
      };

      const resBase = calculateSolarYield(baseParams);
      const resStorage = calculateSolarYield(storageParams);

      expect(resStorage.balance.autarkyRatePercent).toBeGreaterThan(resBase.balance.autarkyRatePercent);
      expect(resStorage.balance.totalSelfUsedKwh).toBeGreaterThan(resBase.balance.totalSelfUsedKwh);
      expect(resStorage.storageDelta.additionalSelfUsedKwh).toBeGreaterThan(1000);
      expect(resStorage.storageDelta.additionalAnnualSavingsEur).toBeGreaterThan(300);
    });
  });

  describe('4. PVGIS-Benchmark Referenzabgleich', () => {
    it('sollte für 1 kWp Süd 35° in Frankfurt den dokumentierten PVGIS-Mittelwert (1.000–1.080 kWh/kWp) treffen', () => {
      const params: SolarParams = {
        systemType: 'rooftop',
        kwp: 1.0,
        region: 'mitte',
        locationId: 'frankfurt', // DWD Globalstrahlung ~1095 kWh/m²
        tilt: 35,
        azimuth: 0,
        cellType: 'topcon',
        annualConsumption: 3000,
        storageKwh: 0,
        electricityPrice: 0.36
      };

      const res = calculateSolarYield(params);

      // PVGIS-5 SARAH2 Referenz für Frankfurt a.M. (1 kWp, 35° Neigung, Azimut 0°, N-Type TOPCon mit PR ~84-86%):
      // ca. 1.020 – 1.070 kWh/a
      expect(res.physics.specificYieldKwhPerKwp).toBeGreaterThanOrEqual(1000);
      expect(res.physics.specificYieldKwhPerKwp).toBeLessThanOrEqual(1090);
    });
  });

  describe('5. Grenzfälle & Extremwerte', () => {
    it('sollte bei 0 Ertrag oder extremem Missverhältnis keine Fehler oder Division durch Null werfen', () => {
      const params: SolarParams = {
        systemType: 'rooftop',
        kwp: 0.1,
        region: 'nord',
        tilt: 35,
        azimuth: 0,
        cellType: 'perc',
        annualConsumption: 12000,
        storageKwh: 0,
        electricityPrice: 0.36
      };

      const res = calculateSolarYield(params);
      expect(res.balance.autarkyRatePercent).toBeGreaterThanOrEqual(0);
      expect(res.balance.autarkyRatePercent).toBeLessThan(5);
      expect(Number.isFinite(res.balance.totalAnnualYieldKwh)).toBe(true);
    });

    it('sollte eine verständliche Amortisationsmeldung ausgeben wenn Payback > 25 Jahre', () => {
      const params: SolarParams = {
        systemType: 'rooftop',
        kwp: 1.0,
        region: 'nord',
        tilt: 35,
        azimuth: 0,
        cellType: 'perc',
        annualConsumption: 500,
        storageKwh: 15.0, // Absurde Überdimensionierung
        electricityPrice: 0.20,
        customInvestmentEur: 15000
      };

      const res = calculateSolarYield(params);
      expect(res.economy.estimatedPaybackYears).toBeNull();
      expect(res.economy.paybackStatusText).toContain('nicht innerhalb');
    });
  });

  describe('6. URL-Serialisierung & Teilen von Konfigurationen', () => {
    it('sollte ein Solar-Szenario sauber in eine URL kodieren und ohne Informationsverlust dekodieren', async () => {
      const { encodeProjectToQuery, decodeProjectFromQuery } = await import('../utils/shareUtils');

      const originalParams: SolarParams = {
        systemType: 'rooftop',
        kwp: 11.2,
        region: 'sued',
        locationId: 'stuttgart',
        mountingType: 'pitched',
        tilt: 38,
        azimuth: -15,
        cellType: 'hjt',
        annualConsumption: 5500,
        storageKwh: 10.0,
        electricityPrice: 0.38,
        feedInTariff: 0.0695,
        feedInRemunerationType: 'eeg_partial',
        customInvestmentEur: 16500
      };

      const queryCode = encodeProjectToQuery(originalParams, 'Mein Traum-Dach');
      expect(queryCode.length).toBeGreaterThan(20);

      const decoded = decodeProjectFromQuery(`?p=${queryCode}`);
      expect(decoded).not.toBeNull();
      expect(decoded?.name).toBe('Mein Traum-Dach');
      expect(decoded?.params.kwp).toBe(11.2);
      expect(decoded?.params.storageKwh).toBe(10.0);
      expect(decoded?.params.annualConsumption).toBe(5500);
      expect(decoded?.params.customInvestmentEur).toBe(16500);
      expect(decoded?.params.cellType).toBe('hjt');
    });
  });
});
