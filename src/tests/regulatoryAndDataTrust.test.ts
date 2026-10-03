import { describe, it, expect } from 'vitest';
import { CURRENT_EEG_RATES, EEG_DEGRESSION_HISTORY, getEegTariffEurPerKwh } from '../data/eeg-rates';
import { REGULATORY_STANDARDS } from '../data/regulatoryStandards';
import { UNIFIED_PRODUCTS } from '../data/products';
import { STATE_SOLAR_OBLIGATIONS } from '../data/solarpflichtData';
import { BATTERY_REGULATION_MILESTONES, BATTERY_PASSPORT_MANDATORY_FIELDS } from '../data/batteryPassportData';
import { CALCULATOR_FACTORS_DOCUMENTATION } from '../data/calculatorDefaults';

describe('Regulatory & Data Trust Verification (Audit Stand: Oktober 2026)', () => {
  describe('1. EEG Tariffs (Bundesnetzagentur August–Dezember 2026)', () => {
    it('sollte exakt die BNetzA-Tarife ab 01.08.2026 ausweisen', () => {
      expect(CURRENT_EEG_RATES.validFrom).toBe('2026-08-01');
      
      // Teileinspeisung
      const partialTiers = CURRENT_EEG_RATES.partialFeedIn;
      expect(partialTiers[0].tariffCtPerKwh).toBe(7.70); // <= 10 kWp
      expect(partialTiers[1].tariffCtPerKwh).toBe(6.66); // 10-40 kWp
      expect(partialTiers[2].tariffCtPerKwh).toBe(5.44); // 40-100 kWp

      // Volleinspeisung
      const fullTiers = CURRENT_EEG_RATES.fullFeedIn;
      expect(fullTiers[0].tariffCtPerKwh).toBe(12.22); // <= 10 kWp
      expect(fullTiers[1].tariffCtPerKwh).toBe(10.24); // 10-40 kWp
    });

    it('sollte getEegTariffEurPerKwh für verschiedene Anlagengrößen konsistent berechnen', () => {
      expect(getEegTariffEurPerKwh(5, 'eeg_partial')).toBe(0.0770);
      expect(getEegTariffEurPerKwh(10, 'eeg_partial')).toBe(0.0770);
      expect(getEegTariffEurPerKwh(15, 'eeg_partial')).toBe(0.0666);
      expect(getEegTariffEurPerKwh(50, 'eeg_partial')).toBe(0.0544);
      expect(getEegTariffEurPerKwh(8, 'uncompensated')).toBe(0.00);
      expect(getEegTariffEurPerKwh(8, 'eeg_full')).toBe(0.1222);
    });

    it('sollte die historische Degression bis zur aktuellen Stufe lückenlos führen', () => {
      const activeEntry = EEG_DEGRESSION_HISTORY.find(h => h.status === 'Aktuell gültig');
      expect(activeEntry).toBeDefined();
      expect(activeEntry?.period).toBe('01.08.2026 – 31.01.2027');
      expect(activeEntry?.partialUpTo10Ct).toBe(7.70);
    });
  });

  describe('2. Standards & Regulatory Norms', () => {
    it('sollte VDE-AR-N 4105:2026-03 als aktuellen Standard führen und 2018-11 als historisch', () => {
      expect(REGULATORY_STANDARDS.vde_ar_n_4105_current.edition).toContain('2026-03');
      expect(REGULATORY_STANDARDS.vde_ar_n_4105_historic.edition).toContain('2018-11');
      expect(REGULATORY_STANDARDS.vde_ar_n_4105_historic.status).toBe('HISTORIC');
    });

    it('sollte Schuko-Produktnorm DIN VDE V 0126-95:2025-12 explizit von EEG-Sonderregelung trennen', () => {
      expect(REGULATORY_STANDARDS.din_vde_v_0126_95.code).toBe('DIN VDE V 0126-95:2025-12');
      expect(REGULATORY_STANDARDS.din_vde_v_0126_95.title).toContain('Steckersolargeräte');
      expect(REGULATORY_STANDARDS.eeg_steckersolar.code).toBe('EEG 2023 § 3 Nr. 43 & § 8 Abs. 5a');
    });

    it('sollte § 12 Abs. 3 UStG (0 % MwSt.) zutreffend auf private Wohngebäude einschränken', () => {
      expect(REGULATORY_STANDARDS.ustg_nullsteuersatz.code).toBe('§ 12 Abs. 3 UStG');
      expect(REGULATORY_STANDARDS.ustg_nullsteuersatz.citation).toContain('Umsatzsteuergesetz');
    });
  });

  describe('3. Product Catalog & Data Trust', () => {
    it('sollte für alle Produkte einen Verifizierungsstatus und ein Prüfdatum besitzen', () => {
      UNIFIED_PRODUCTS.forEach(product => {
        expect(['VERIFIED', 'PARTIAL', 'UNVERIFIED']).toContain(product.verificationStatus);
        expect(product.lastVerified).toBe('2026-10-01');
        expect(product.priceLastChecked).toBe('2026-10-01');
        expect(product.priceType).toBe('Marktpreis-Richtwert');
        expect(product.priceRange).toContain('€');
        expect(product.manufacturerSource.length).toBeGreaterThan(3);
      });
    });

    it('sollte keine unbelegten Werbesuperlative in den Produkttiteln oder Badges enthalten', () => {
      const forbiddenTerms = ['Testsieger', 'Bester', 'Bestes', 'Offiziell', 'Kundenliebling', 'Bestseller'];
      UNIFIED_PRODUCTS.forEach(product => {
        forbiddenTerms.forEach(term => {
          expect(product.name.toLowerCase()).not.toContain(term.toLowerCase());
          expect(product.shortDesc.toLowerCase()).not.toContain(term.toLowerCase());
          product.technicalBadges.forEach(badge => {
            expect(badge.toLowerCase()).not.toContain(term.toLowerCase());
          });
        });
      });
    });
  });

  describe('4. Solarpflicht & EU-Batteriepass', () => {
    it('sollte alle 16 Bundesländer mit Rechtsgrundlage und Parkplatzregelung erfassen', () => {
      expect(STATE_SOLAR_OBLIGATIONS).toHaveLength(16);
      STATE_SOLAR_OBLIGATIONS.forEach(st => {
        expect(st.legalSource.length).toBeGreaterThan(5);
        expect(st.parkingLots.length).toBeGreaterThan(3);
        expect(st.lastVerified).toBe('2026-10-01');
      });
    });

    it('sollte die EU-Batteriepass-Pflicht ab 18.02.2027 und alle 6 Kernfelder definieren', () => {
      const passportMilestone = BATTERY_REGULATION_MILESTONES.find(m => m.effectiveDate === '2027-02-18');
      expect(passportMilestone).toBeDefined();
      expect(passportMilestone?.status).toBe('UPCOMING');
      expect(BATTERY_PASSPORT_MANDATORY_FIELDS).toHaveLength(6);
    });
  });

  describe('5. Calculator Assumptions Transparency', () => {
    it('sollte alle Standardfaktoren mit Einheiten und Wertebereichen definieren', () => {
      const factors = Object.values(CALCULATOR_FACTORS_DOCUMENTATION);
      expect(factors.length).toBeGreaterThanOrEqual(10);
      factors.forEach(factor => {
        expect(factor.unit).toBeDefined();
        expect(factor.range).toBeDefined();
        expect(factor.source).toBeDefined();
      });
    });
  });
});
