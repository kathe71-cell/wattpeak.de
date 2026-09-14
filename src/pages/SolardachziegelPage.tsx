import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AmazonProductShowcase from '../components/AmazonProductShowcase';
import TrustBox from '../components/TrustBox';
import { Home as HomeIcon, CheckCircle2, AlertTriangle, ArrowRight, Layers, Sparkles, Wrench } from 'lucide-react';
import { useDocumentMeta } from '../utils/seo';

export default function SolardachziegelPage() {
  useDocumentMeta({
    title: 'Solardachziegel & Gebäudeintegrierte PV (BIPV) · Wattpeak',
    description: 'Solardachziegel im technischen Vergleich: Wirkungsgrad, Kosten im Neubau vs. Sanierung, Denkmalschutz und Brandschutz.',
    canonicalPath: '/solardachziegel',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Solardachziegel & Gebäudeintegrierte Photovoltaik',
      url: 'https://wattpeak.de/solardachziegel',
    },
  });
  const manufacturers = [
    {
      name: 'Autiq Solar / Meyer Burger',
      origin: 'Deutschland / Schweiz',
      tech: 'Heterojunction (HJT) Zellen',
      efficiency: 'ca. 175 – 195 Wp/m²',
      pros: 'Hervorragender Schwachlicht-Ertrag, extrem unauffällige matte Ästhetik, Schweizer Ingenieurskunst.',
      priceLevel: 'Gehobenes Premium-Segment'
    },
    {
      name: 'Nelskamp Planum PV',
      origin: 'Deutschland',
      tech: 'Monokristalline Siliziumzellen',
      efficiency: 'ca. 165 – 180 Wp/m²',
      pros: 'Nahtlose Integration in klassische Dachziegelformate (Ton & Beton), seit Jahrzehnten etablierter Dachhersteller.',
      priceLevel: 'Mittleres bis gehobenes Segment'
    },
    {
      name: 'Braas PV Premium',
      origin: 'Deutschland',
      tech: 'Monokristalline Einpass-Module',
      efficiency: 'ca. 170 – 185 Wp/m²',
      pros: 'Passgenau auf Braas-Dachsteine abgestimmt, regensicher verlegt, hohe Sturmsicherheit.',
      priceLevel: 'Gehobenes Segment'
    },
    {
      name: 'SunStyle Solardach',
      origin: 'Frankreich / Schweiz',
      tech: 'Schuppenförmige Schindeln',
      efficiency: 'ca. 160 – 175 Wp/m²',
      pros: 'Schiefer-Optik, flächig über das gesamte Dach verlegbar, beliebt bei architektonischen Denkmälern.',
      priceLevel: 'Premium-Segment'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 w-full">
        {/* Editorial Hero */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-mono text-xs font-bold border border-amber-300">
              <HomeIcon className="w-3.5 h-3.5 text-amber-800" />
              BIPV &amp; Gebäudeintegrierte Photovoltaik
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
              Solardachziegel (PV-Ziegel):<br />
              <span className="text-amber-500">Kosten, Hersteller &amp; Praxis-Vergleich.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Unsichtbare Solarstromerzeugung statt wuchtiger Aufdach-Panels: Wann lohnen sich integrierte 
              Photovoltaik-Dachziegel, wie schneiden sie bei Hitze und Hinterlüftung ab und welche Mehrkosten entstehen im Vergleich zur klassischen Solaranlage?
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/ertragsrechner"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-sm px-6 py-3 rounded-2xl shadow transition"
              >
                Ertrag &amp; Einsparung berechnen
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/system-decoder"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-sm px-6 py-3 rounded-2xl transition"
              >
                Alle PV-Systeme im Decoder
              </Link>
            </div>
          </div>

          {/* 4 Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Kosten / m²</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">ca. 280 – 480 € *</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Wirkungsgrad</span>
              <div className="text-amber-700 font-black text-lg mt-0.5">17 – 20 %</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Denkmalschutz</span>
              <div className="text-emerald-700 font-black text-lg mt-0.5">Sehr hohe Akzeptanz</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 uppercase">Umsatzsteuer</span>
              <div className="text-slate-950 font-black text-lg mt-0.5">0 % (§ 12 Abs. 3)</div>
            </div>
          </div>
        </section>

        {/* Comparison: Solardachziegel vs. Aufdach */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Solardachziegel vs. Aufdach-Photovoltaik im direkten Vergleich
            </h2>
            <p className="text-sm text-slate-600">
              Ein Solardachziegel erfüllt eine Doppelrolle: Er dient gleichzeitig als regensichere Dacheindeckung und als Stromgenerator.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Solardachziegel Card */}
            <div className="p-6 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="font-extrabold text-slate-950 text-lg">Integrierte Solardachziegel (BIPV)</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Perfekte Optik:</strong> Keine sichtbaren Schienen oder hervorstehenden Module; homogenes Dachbild.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Denkmalschutz-konform:</strong> Oft die einzige genehmigungsfähige Lösung für historische Altbauten oder Ensembles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Doppelnutzen beim Neubau:</strong> Spart die Anschaffung herkömmlicher Tondachziegel für die belegte Fläche.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Höhere Kosten:</strong> Ca. 2- bis 3-mal teurer als Aufdach-Standardmodule je installiertem kWp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Komplexere Verkabelung:</strong> Hunderte Einzelsteckverbindungen unter der Eindeckung erfordern penible Montage.</span>
                </li>
              </ul>
            </div>

            {/* Aufdach Card */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-slate-700" />
                <h3 className="font-extrabold text-slate-950 text-lg">Klassische Aufdach-PV (Standard)</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Maximale Wirtschaftlichkeit:</strong> Geringste Kosten pro Kilowatt-Peak (ca. 1.100 – 1.450 €/kWp schlüsselfertig).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Optimale Hinterlüftung:</strong> Großzügiger Abstand zum Ziegel hält Module kühler und mindert Hitzeverluste.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Einfache Wartung:</strong> Defekte Module lassen sich einzeln auf den Trägerschienen austauschen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span><strong>Optische Dominanz:</strong> Sichtbare Kanten, Schienen und Aufbauten greifen in das Erscheinungsbild ein.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Manufacturer Matrix */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Führende Solardachziegel-Hersteller im Überblick
            </h2>
            <p className="text-sm text-slate-600">
              Der europäische Markt für BIPV-Dachsteine entwickelt sich rasant. Diese Systeme haben sich im Praxiseinsatz bewährt:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {manufacturers.map((m) => (
              <div key={m.name} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition space-y-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-slate-950 text-base">{m.name}</h3>
                    <span className="text-xs font-mono text-slate-500">{m.origin}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                    {m.tech}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1 pt-1">
                  <div><strong className="text-slate-800">Flächenleistung:</strong> {m.efficiency}</div>
                  <div><strong className="text-slate-800">Preisklasse:</strong> {m.priceLevel}</div>
                  <p className="text-slate-700 pt-1">{m.pros}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Deep Dive: Hinterlüftung & Hitze */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-12 shadow-md space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              <Wrench className="w-4 h-4" />
              Physikalische Praxis
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Die technische Gretchenfrage: Hinterlüftung &amp; Hitzekoeffizient
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Halbleiterzellen verlieren bei steigender Temperatur an Wirkungsgrad (typischerweise -0,26 % bis -0,38 % pro Kelvin Erwärmung über 25 °C STC). 
              Weil Solardachziegel direkt in die Lattung integriert sind, ist der Konvektionsluftstrom geringer als bei 10 cm aufgeständerten Modulen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs sm:text-sm">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-amber-400 font-mono font-bold mb-1">Gegenlathöhe ≥ 40 mm</div>
              <p className="text-slate-300">
                Für eine ausreichende Thermik ist eine erhöhte Konterlattung unter den Ziegeln zwingend erforderlich, um Stauwärme abzuführen.
              </p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-amber-400 font-mono font-bold mb-1">HJT- &amp; TOPCon-Zellen</div>
              <p className="text-slate-300">
                Moderne Ziegel setzen auf Heterojunction- oder TOPCon-Technologie mit geringem Temperaturkoeffizienten (-0,26 %/K).
              </p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-amber-400 font-mono font-bold mb-1">Brandschutzklasse A</div>
              <p className="text-slate-300">
                Als Dacheindeckung müssen PV-Dachziegel die Anforderungen harter Bedachungen (Flugfeuer &amp; strahlende Wärme nach DIN EN 13501-5) erfüllen.
              </p>
            </div>
          </div>
        </section>

        {/* Relevant Hardware & Accessories */}
        <AmazonProductShowcase />

        {/* Trust & Legal */}
        <TrustBox />

        <div className="text-center text-xs text-slate-500 font-mono">
          * Alle Preisangaben und Ertragswerte sind unverbindliche Modellrechnungen. Die genauen Kosten hängen von Dachneigung, Eindeckungsaufwand und Handwerkerkonditionen ab.
        </div>
      </main>

      <Footer />
    </div>
  );
}
