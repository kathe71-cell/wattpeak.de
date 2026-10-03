import React, { useState } from 'react';
import { ChevronDown, Scale } from 'lucide-react';

export default function LegalFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Was bedeutet die physikalische Einheit WattPeak (Wp)?',
      a: 'WattPeak (Wp) ist die international genormte Maßeinheit für die elektrische Höchstleistung eines Photovoltaikmoduls unter Labor-Standard-Testbedingungen (STC nach DIN EN IEC 60904-3): 1.000 W/m² Bestrahlungsstärke, 25 °C Zelltemperatur und spektrale Verteilung AM 1,5. Sie dient der objektiven physikalischen Vergleichbarkeit verschiedener Solarmodule.'
    },
    {
      q: 'Was ist der Unterschied zwischen WattPeak (Wp) und Kilowattstunde (kWh)?',
      a: 'WattPeak (Wp oder kWp) bezeichnet die installierte Nennleistung (Momentanleistung) des Moduls. Die Kilowattstunde (kWh) ist hingegen die Maßeinheit für die tatsächlich erzeugte Energiemenge über die Zeit (Arbeit = Leistung × Zeit). In Deutschland liefert ein PV-Modul mit 1.000 Wp (1 kWp) pro Jahr typischerweise zwischen 900 und 1.150 kWh Strom (abhängig von Neigung, Ausrichtung und regionaler Einstrahlung).'
    },
    {
      q: 'Welche technischen Grenzwerte gelten für Balkonkraftwerke laut Solarpaket I?',
      a: 'Mit dem Solarpaket I (EEG § 3 Nr. 43 / § 8 Abs. 5a) wurden die Grenzen bundesweit vereinheitlicht: Die maximale Wechselrichter-Einspeiseleistung (AC) beträgt 800 VA. Die installierte Modul-Gleichstromleistung (DC) darf bis zu 2.000 Wp betragen. Für den Anschluss über Schutzkontaktsteckdose regelt die Produktnorm DIN VDE V 0126-95:2025-12 die Systemsicherheit in Verbindung mit dem Netzanschlussstandard VDE-AR-N 4105:2026-03 (integrierter NA-Schutz). Es genügt die unbürokratische Registrierung im Marktstammdatenregister (MaStR) der Bundesnetzagentur; eine gesonderte Meldung beim Netzbetreiber ist entfallen.'
    },
    {
      q: 'Gilt 0 % Mehrwertsteuer pauschal für alle Solarprodukte?',
      a: 'Nein, keineswegs pauschal. Gemäß § 12 Abs. 3 UStG gilt der Nullsteuersatz (0 % MwSt.) nur für die Lieferung und Installation von Solarmodulen, Wechselrichtern, Speichern und wesentlichen Systemkomponenten, sofern die Anlage auf oder in der Nähe von Privatwohnungen, Wohnungen oder öffentlichen bzw. gemeinnützigen Gebäuden betrieben wird. Für universelles Werkzeug, Messgeräte ohne direkte Systemfunktion, Kabel als Einzelmeterware oder gewerbliche Freiflächenanlagen gilt weiterhin der reguläre Steuersatz von 19 %.'
    },
    {
      q: 'Dürfen Vermieter oder die WEG ein Balkonkraftwerk verbieten?',
      a: 'Seit der Reform des Mietrechts (§ 554 BGB) und des Wohnungseigentumsgesetzes (§ 20 WEG) zählen Stecker-Solargeräte zu den gesetzlich privilegierten Maßnahmen. Mieter und Wohnungseigentümer haben einen Rechtsanspruch auf die Zustimmung zur Installation am Balkon. Vermieter und Eigentümergemeinschaften dürfen die Montage nur noch bei triftigen sachlichen Gründen untersagen (z. B. Denkmalschutzauflagen oder nachweisliche Gefährdung der Bausubstanz), können jedoch sachgerechte Vorgaben zur Montagesicherheit verlangen.'
    },
    {
      q: 'Was verlangt die EU-Batterieverordnung 2023/1542 (EU-Batteriepass)?',
      a: 'Die Verordnung (EU) 2023/1542 schafft einen verbindlichen europäischen Rechtsrahmen für alle Batterietypen. Für stationäre Heimspeicher ab 2 kWh Kapazität wird schrittweise ab 2027 ein digitaler Batteriepass mit QR-Code Pflicht. Dieser dokumentiert den CO2-Fußabdruck über den Lebenszyklus, den State of Health (SOH), den Rezyklat-Anteil (Lithium, Kobalt, Nickel) sowie Sorgfaltspflichten in den Rohstoff-Lieferketten.'
    },
    {
      q: 'Was bedeutet § 14a EnWG für PV-Speicher und steuerbare Verbraucher?',
      a: 'Seit dem 1. Januar 2024 müssen steuerbare Verbrauchseinrichtungen mit einem Netzleistungsbezug über 4,2 kW (z. B. Wärmepumpen, private Wallboxen und netzbezogene Batteriespeicher) netzdienlich steuerbar sein. Im Falle einer akuten Netzüberlastung darf der Verteilnetzbetreiber die Leistung temporär auf einen garantierten Mindestwert (in der Regel 4,2 kW) dimmen. Ein vollständiges Abschalten ist gesetzlich untersagt. Im Gegenzug profitieren Betreiber von reduzierten Netzentgelten.'
    }
  ];

  return (
    <section id="faq" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
            <Scale className="w-4 h-4 text-amber-500" />
            Rechtliche &amp; Technische Grundlagen · Stand: Oktober 2026
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
            Häufige Fragen zu Wp, EEG &amp; Steuerrecht
          </h2>
        </div>
        <p className="text-xs text-slate-500 font-mono max-w-md">
          Differenzierte Antworten nach EEG (Solarpaket I), DIN EN IEC, § 12 Abs. 3 UStG und EU-Recht.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-150"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <span className="font-extrabold text-sm sm:text-base text-slate-950">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-amber-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
