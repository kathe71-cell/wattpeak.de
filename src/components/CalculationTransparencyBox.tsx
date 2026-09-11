import React, { useState } from 'react';
import { 
  Sun, Zap, Compass, Thermometer, Sliders, 
  Battery, UserCheck, Euro, ArrowUpRight, 
  ChevronDown, Scale 
} from 'lucide-react';

export default function CalculationTransparencyBox() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      icon: Sun,
      title: '1. Einstrahlung (Globalstrahlung)',
      short: 'Regionale Sonnenenergie auf horizontaler Fläche',
      formula: 'G_horiz (DWD-Mittel ~1.000 bis 1.200 kWh/m²·a)',
      explanation: 'Die Grundlage jeder Ertragsprognose ist die jährliche Globalstrahlung der Region. Der Deutsche Wetterdienst (DWD) erfasst diese Werte über Jahrzehnte. In Norddeutschland liegt das langjährige Mittel bei ca. 1.000 kWh/m², in Mitteldeutschland bei ca. 1.080 kWh/m² und im sonnenreichen Süden bei bis zu 1.200 kWh/m².'
    },
    {
      id: 2,
      icon: Zap,
      title: '2. Installierte PV-Leistung (Wp / kWp)',
      short: 'Nennleistung des Modulfelds unter Labor-STC',
      formula: 'P_peak in kWp (1 kWp = 1.000 Wp)',
      explanation: 'Die Nennleistung in WattPeak (Wp) beschreibt die Modulleistung unter Standard-Testbedingungen (1.000 W/m² Einstrahlung, 25 °C Zelltemperatur, Spektrum AM 1,5 nach DIN EN IEC 60904-3). Sie bestimmt das Erzeugungspotenzial des Generators.'
    },
    {
      id: 3,
      icon: Compass,
      title: '3. Ausrichtung & Dachneigung',
      short: 'Geometrischer Einfallswinkel der Sonnenstrahlen',
      formula: 'Korrekturfaktor f_orient (0,68 bis 1,12)',
      explanation: 'Da Solarmodule selten flach liegen, verändert die Schrägstellung die tatsächlich eintreffende Sonnenenergie. Eine Neigung von 30° bis 35° nach Süden fängt in Deutschland die meiste Energie auf (bis zu +12 % gegenüber der Horizontalen). Steile Fassaden (90°) oder Flachdächer haben geringere Höchstwerte, bieten im Winter oder morgens/abends jedoch spezifische Vorteile.'
    },
    {
      id: 4,
      icon: Thermometer,
      title: '4. Zelltechnologie & Hitzeeffekt',
      short: 'Leistungsabfall bei sommerlicher Erwärmung',
      formula: 'γ_Pmp (Temperaturkoeffizient -0,26 bis -0,36 %/K)',
      explanation: 'Siliziumzellen verlieren bei Erwärmung an elektrischer Spannung. An heißen Sommertagen erreichen Module oft 45 bis 60 °C (ΔT = +20 bis +35 K über STC). Moderne N-Type TOPCon (-0,30 %/K) und Heterojunction HJT (-0,26 %/K) halten den Verlust spürbar geringer als ältere PERC-Module (-0,36 %/K).'
    },
    {
      id: 5,
      icon: Sliders,
      title: '5. Systemverluste & Performance Ratio',
      short: 'Wandler-Wirkungsgrad, Kabelwiderstände & Staub',
      formula: 'PR = ca. 82 % bis 86 %',
      explanation: 'Nicht der gesamte erzeugte Gleichstrom (DC) kommt an der Steckdose als Wechselstrom (AC) an. Wechselrichter wandeln den Strom mit ca. 96,5 % bis 98 % Wirkungsgrad um. Zusätzliche Verluste entstehen in Kabeln, Steckern sowie durch leichte Oberflächenverschmutzung. Die Performance Ratio fasst diese realen Systemverluste zusammen.'
    },
    {
      id: 6,
      icon: Battery,
      title: '6. Batteriespeicher & Zyklusübertrag',
      short: 'Zwischenspeichern von Mittagsstrom für den Abend',
      formula: 'Kapazität (kWh) × Wirkungsgrad (~90 % Round-Trip)',
      explanation: 'Ohne Speicher wird tagsüber überschüssiger Strom ins Netz eingespeist, während abends teurer Netzstrom bezogen werden muss. Ein Speicher nimmt diesen Überschuss auf und gibt ihn zeitversetzt ab. Pro 1.000 kWh Jahresstromverbrauch steigert 1 kWh Speicherkapazität die Autarkie typischerweise um 12 bis 16 Prozentpunkte.'
    },
    {
      id: 7,
      icon: UserCheck,
      title: '7. Eigenverbrauch & Lastprofil',
      short: 'Gleichzeitigkeit von Sonnenstunden und Stromverbrauch',
      formula: 'Eigenverbrauchsquote (%) = Eigenverbrauch / PV-Ertrag',
      explanation: 'Der Eigenverbrauch hängt davon ab, wie viel Strom zeitgleich mit der Sonnenstrahlung verbraucht wird (Grundlast von Kühlschrank, Router, Waschmaschine, Wärmepumpe). Je höher die Solaranlage dimensioniert ist, desto kleiner wird ohne Speicher der prozentuale Eigenverbrauchsanteil.'
    },
    {
      id: 8,
      icon: Euro,
      title: '8. Strompreis & vermiedener Netzbezug',
      short: 'Die größte wirtschaftliche Hebelwirkung',
      formula: 'Ersparnis = Eigenverbrauch (kWh) × Strompreis (€/kWh)',
      explanation: 'Jede selbst erzeugte und verbrauchte Kilowattstunde spart den vollen Brutto-Strompreis des Energieversorgers (ca. 0,30 bis 0,38 €/kWh inklusive Netzentgelten und Steuern). Das macht den Eigenverbrauch wirtschaftlich deutlich attraktiver als die reine Netzeinspeisung.'
    },
    {
      id: 9,
      icon: ArrowUpRight,
      title: '9. Einspeisevergütung nach EEG',
      short: 'Gesetzlich garantierte Vergütung für Überschuss',
      formula: 'Erlös = Einspeisung (kWh) × Vergütungssatz (~0,0811 €/kWh)',
      explanation: 'Strom, der weder direkt im Haus verbraucht noch im Akku gespeichert werden kann, fließt über den Netzeinspeisepunkt ins öffentliche Stromnetz. Bei Dachanlagen wird dieser Überschuss 20 Jahre lang nach dem Erneuerbare-Energien-Gesetz (EEG) fest vergütet.'
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
            <Scale className="w-4 h-4 text-amber-500" />
            Transparente Methodik · Keine mathematische Blackbox
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
            Wie berechnet WattPeak den PV-Ertrag?
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-mono max-w-md">
          Verständliche Erklärung der 9 physikalischen und ökonomischen Einflussfaktoren jeder Modellrechnung.
        </p>
      </div>

      {/* Grid of Factors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isOpen = activeStep === step.id;

          return (
            <div
              key={step.id}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isOpen 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                  : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => setActiveStep(isOpen ? null : step.id)}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                    isOpen ? 'bg-amber-500 text-slate-950' : 'bg-white text-slate-900 border border-slate-200'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isOpen ? 'bg-slate-800 text-amber-300' : 'bg-slate-200 text-slate-600'
                  }`}>
                    Faktor {step.id}/9
                  </span>
                </div>

                <h4 className={`text-sm font-extrabold mb-1 ${isOpen ? 'text-white' : 'text-slate-950'}`}>
                  {step.title}
                </h4>
                <p className={`text-xs mb-3 ${isOpen ? 'text-slate-300' : 'text-slate-600'}`}>
                  {step.short}
                </p>

                <div className={`p-2 rounded-lg text-[11px] font-mono mb-3 ${
                  isOpen ? 'bg-slate-800 text-amber-400' : 'bg-white border border-slate-200 text-slate-700'
                }`}>
                  {step.formula}
                </div>

                <div className={`text-xs leading-relaxed transition-all ${
                  isOpen ? 'block text-slate-200 pt-1' : 'hidden md:block text-slate-500 line-clamp-3'
                }`}>
                  {step.explanation}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200/40 flex items-center justify-between text-[11px] font-mono">
                <span className={isOpen ? 'text-amber-400' : 'text-amber-700 font-bold'}>
                  {isOpen ? 'Details einklappen' : 'Details lesen'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Callout */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 text-xs text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="font-bold text-slate-950 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Transparenz-Prinzip: Modellrechnung statt Scheingenauigkeit
          </div>
          <p className="text-slate-600 text-xs">
            Alle Berechnungen basieren auf anerkannten thermodynamischen und elektrotechnischen Näherungsverfahren.
            Wetterkapriolen, lokaler Baumschatten oder individuelle Verbrauchsspitzen führen im realen Betrieb stets zu Abweichungen.
          </p>
        </div>
      </div>
    </div>
  );
}
