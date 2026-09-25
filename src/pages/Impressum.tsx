import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Scale, Mail, Phone, MapPin } from 'lucide-react';
import { useDocumentMeta } from '../utils/seo';

export default function Impressum() {
  useDocumentMeta({
    title: 'Impressum (§ 5 DDG) · Wattpeak',
    description: 'Gesetzliche Pflichtangaben und Kontaktdaten des Diensteanbieters von Wattpeak.de gemäß § 5 Digitale-Dienste-Gesetz (DDG).',
    canonicalPath: '/impressum',
  });
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700">
              Gesetzliche Pflichtangaben
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1">
              Impressum (§ 5 DDG)
            </h1>
          </div>

          {/* Betreiberangaben */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-600" />
              Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
            </h2>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-sm space-y-2 font-mono">
              <div className="font-bold text-slate-950 text-base">Jens Kathe</div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Hansastraße 6, 34119 Kassel, Deutschland</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 pt-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>E-Mail: </span>
                <a href="mailto:jens@kathe.org" className="text-amber-700 hover:underline font-bold">
                  jens@kathe.org
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>Telefon: </span>
                <a href="tel:+4917866526230" className="text-amber-700 hover:underline font-bold">
                  +49 178 6652623
                </a>
              </div>
            </div>
          </section>

          {/* Redaktionsstatus */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-950">
              Redaktionelle Verantwortung
            </h2>
            <div className="text-sm text-slate-700 leading-relaxed space-y-3">
              <p>
                <strong>Verantwortlich für redaktionelle Inhalte gemäß § 18 Abs. 2 Medienstaatsvertrag (MStV):</strong><br />
                Jens Kathe<br />
                Hansastraße 6<br />
                34119 Kassel
              </p>
            </div>
          </section>

          {/* Amazon PartnerNet Erklärung */}
          <section className="space-y-4 p-5 bg-amber-50/60 border border-amber-200 rounded-2xl">
            <h2 className="text-base font-extrabold text-amber-950">
              Amazon-Partnerprogramm &amp; Werbekennzeichnung
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              <strong>Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.</strong><br />
              wattpeak.de nimmt am Partnerprogramm von Amazon EU SARL teil. Die mit einem Sternchen (*) 
              gekennzeichneten Verlinkungen zu Amazon.de sind sogenannte Affiliate-Links (Partnerlinks). 
              Wenn Sie über einen solchen Link ein Produkt erwerben, erhält der Betreiber dieser Website eine 
              geringe Vermittlungsprovision. Für Sie als Käufer ändert sich am Kaufpreis absolut nichts.
            </p>
          </section>

          {/* Streitbeilegung */}
          <section className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <h2 className="text-base font-bold text-slate-950">EU-Streitschlichtung &amp; Verbraucherstreitbeilegung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline">
                https://ec.europa.eu/consumers/odr
              </a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
            </p>
          </section>

          {/* Haftungsausschluss */}
          <section className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <h2 className="text-base font-bold text-slate-950">Haftung für Inhalte &amp; Links</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen 
              Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte 
              fremde Informationen zu überwachen. Alle Berechnungs- und Simulationstools auf wattpeak.de beruhen auf anerkannten 
              Normen und physikalischen Berechnungsmodellen (u.a. DIN EN IEC 60904-3, DWD/PVGIS), stellen jedoch unverbindliche Modellrechnungen dar.
            </p>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
