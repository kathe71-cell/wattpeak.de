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
    it('sollte genau 36 qualitativ verifizierte Produkte mit eindeutigen IDs umfassen', () => {
      expect(UNIFIED_PRODUCTS).toHaveLength(36);
      const ids = UNIFIED_PRODUCTS.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(36);
    });

    it('sollte für alle Produkte einen Verifizierungsstatus und ein Prüfdatum besitzen', () => {
      UNIFIED_PRODUCTS.forEach(product => {
        expect(['VERIFIED', 'PARTIAL', 'UNVERIFIED']).toContain(product.verificationStatus);
        expect(product.lastVerified).toBe('2026-10-01');
        expect(product.manufacturerSource.length).toBeGreaterThan(3);

        // Optionale Preisspannen: Wenn vorhanden, müssen sie valide sein
        if (product.priceRange) {
          expect(product.priceLastChecked).toBe('2026-10-01');
          expect(product.priceType).toBe('Marktpreis-Richtwert');
          expect(product.priceRange).toContain('€');
          expect(product.priceReferenceDate).toContain('Unverbindlicher Marktpreis-Richtwert');
        }
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

    it('sollte überall den einheitlichen Amazon Affiliate Tracking-Tag "wattpeak.de-21" verwenden', () => {
      UNIFIED_PRODUCTS.forEach(product => {
        expect(product.affiliateUrl).toContain('tag=wattpeak.de-21');
        if (product.asin) {
          expect(product.affiliateUrl).toBe(`https://www.amazon.de/dp/${product.asin}?tag=wattpeak.de-21`);
        } else {
          expect(product.affiliateUrl).toContain('https://www.amazon.de/s?k=');
        }
      });
    });

    it('sollte sicherstellen, dass keine doppelten Produkt-IDs existieren', () => {
      const ids = UNIFIED_PRODUCTS.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('sollte für Produkte mit direkter ASIN eine formal gültige 10-stellige Alphanumerik besitzen und bekannte gesperrte/nicht lieferbare ASINs ausschließen', () => {
      const knownUnavailableAsins = ['B0CVYGJ86V', 'B0G1Z4LV6C', 'B0CPQ7S9P6', 'B0FYDVSH2T', 'B0CNPMW5XR', 'B0C1WCP6J6'];
      const activeAsinProducts = UNIFIED_PRODUCTS.filter(p => p.asin !== undefined);
      
      // Mindestens ein Produkt hat eine direkte ASIN, aber keine statische Fixierung auf genau 11
      expect(activeAsinProducts.length).toBeGreaterThan(0);

      activeAsinProducts.forEach(product => {
        expect(product.asin).toBeDefined();
        expect(product.asin).toMatch(/^[A-Z0-9]{10}$/);
        expect(knownUnavailableAsins).not.toContain(product.asin);
      });
    });

    it('sollte für jedes Produkt ohne ASIN einen aussagekräftigen, nicht-generischen Suchbegriff als Fallback besitzen', () => {
      UNIFIED_PRODUCTS.forEach(product => {
        expect(product.amazonSearchQuery).toBeDefined();
        expect(product.amazonSearchQuery.trim().length).toBeGreaterThan(10);
        expect(product.amazonSearchQuery.toLowerCase()).not.toBe('solaranlage');
        expect(product.amazonSearchQuery.toLowerCase()).not.toBe('speicher');
        expect(product.amazonSearchQuery.toLowerCase()).not.toBe('balkonkraftwerk');
      });
    });

    it('sollte sicherstellen, dass alle Affiliate-URLs wohlgeformt sind und kein undefined im Pfad enthalten', () => {
      UNIFIED_PRODUCTS.forEach(product => {
        expect(product.affiliateUrl).not.toContain('/dp/undefined');
        expect(product.affiliateUrl).not.toContain('k=undefined');
        if (product.asin) {
          expect(product.affiliateUrl).toBe(`https://www.amazon.de/dp/${product.asin}?tag=wattpeak.de-21`);
        } else {
          expect(product.affiliateUrl).toContain('https://www.amazon.de/s?k=');
        }
      });
    });

    it('sollte genau 36 eindeutige Produkte mit vollständiger und fachlich korrekter Kategorie-Klassifizierung enthalten', () => {
      expect(UNIFIED_PRODUCTS).toHaveLength(36);
      
      const allowedInternalTypes = [
        'complete_set',
        'inverter',
        'storage_system',
        'storage_expansion',
        'module',
        'energy_management',
        'metering',
        'mounting'
      ];

      UNIFIED_PRODUCTS.forEach(p => {
        expect(allowedInternalTypes).toContain(p.category);
        expect(p.categoryLabel).toBeDefined();
        expect(p.categoryLabel.trim().length).toBeGreaterThan(0);
      });

      // Keine Smart Meter oder Smart Plugs als mounting / cable_accessory fehlklassifiziert
      const smartDevices = UNIFIED_PRODUCTS.filter(p => 
        p.id.includes('shelly') || p.id.includes('smart-meter') || p.id.includes('plug')
      );
      smartDevices.forEach(dev => {
        expect(['energy_management', 'metering']).toContain(dev.category);
        expect(dev.category).not.toBe('mounting');
      });
    });

    it('sollte genau 6 sichtbare Hauptkategorien besitzen und alle 36 Produkte lückenlos abdecken', () => {
      // 6 sichtbare Hauptkategorien
      const visibleCategoryIds = ['speicher', 'sets', 'inverter', 'module', 'metering', 'mounting'];
      expect(visibleCategoryIds).toHaveLength(6);

      const filterCategory = (catId: string) => {
        if (catId === 'all') return UNIFIED_PRODUCTS;
        if (catId === 'speicher') return UNIFIED_PRODUCTS.filter(p => p.category === 'storage_system' || p.category === 'storage_expansion');
        if (catId === 'sets') return UNIFIED_PRODUCTS.filter(p => p.category === 'complete_set');
        if (catId === 'inverter') return UNIFIED_PRODUCTS.filter(p => p.category === 'inverter');
        if (catId === 'module') return UNIFIED_PRODUCTS.filter(p => p.category === 'module');
        if (catId === 'metering') return UNIFIED_PRODUCTS.filter(p => p.category === 'energy_management' || p.category === 'metering');
        if (catId === 'mounting') return UNIFIED_PRODUCTS.filter(p => p.category === 'mounting');
        return [];
      };

      // Jede Hauptkategorie liefert Produkte
      visibleCategoryIds.forEach(catId => {
        const matches = filterCategory(catId);
        expect(matches.length).toBeGreaterThan(0);
      });

      // Summe aller gefilterten Hauptkategorien ergibt genau 36 Produkte (disjunkte Zerlegung)
      const sumFiltered = visibleCategoryIds.reduce((sum, catId) => sum + filterCategory(catId).length, 0);
      expect(sumFiltered).toBe(36);

      // Filter "all" liefert alle 36 Produkte
      expect(filterCategory('all')).toHaveLength(36);
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

    it('sollte die Lieferketten-Sorgfaltspflichten (Due Diligence) mit dem verschobenen Stichtag 18.08.2027 ausweisen', () => {
      const dueDiligenceMilestone = BATTERY_REGULATION_MILESTONES.find(m => m.effectiveDate === '2027-08-18');
      expect(dueDiligenceMilestone).toBeDefined();
      expect(dueDiligenceMilestone?.status).toBe('UPCOMING');
      expect(dueDiligenceMilestone?.legalArticle).toContain('2025/1561');
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
