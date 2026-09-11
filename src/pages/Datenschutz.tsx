import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">
              DSGVO &amp; TDDDG Konformität
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1">
              Datenschutzerklärung
            </h1>
          </div>

          {/* Verantwortliche Stelle */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-950">1. Verantwortliche Stelle</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) 
              ist der im Impressum genannte Betreiber. Die vollständigen Kontaktdaten finden Sie transparent hinterlegt unter{' '}
              <Link to="/impressum" className="text-amber-700 underline font-bold">
                Impressum nach § 5 DDG
              </Link>.
            </p>
          </section>

          {/* Zero-CDN Schriften */}
          <section className="space-y-3 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>2. Lokale Typografie (100 % Zero-CDN, keine Google Fonts Einbindung)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Diese Website bindet keinerlei externe Schriftarten über Content Delivery Networks (wie Google Fonts oder Adobe Typekit) ein. 
              Es werden ausschließlich die auf Ihrem Endgerät bereits vorinstallierten Systemschriftarten 
              (System Font Stack) genutzt. Es findet beim Seitenaufruf keine Übertragung Ihrer IP-Adresse an externe Font-Server statt.
            </p>
          </section>

          {/* Vercel Web Analytics */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-950">3. Vercel Web Analytics (Cookielos &amp; DSGVO-konform)</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Diese Website nutzt Vercel Web Analytics, einen Analysedienst der Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA). 
              Vercel Web Analytics arbeitet vollständig <strong>cookielos</strong> und verwendet keine Tracking-Pixel oder persistente Identifier.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Beim Seitenaufruf werden aggregierte Kennzahlen (z. B. aufgerufene Route, Browsertyp, Betriebssystem, Land) ermittelt. 
              Ihre IP-Adresse wird nicht gespeichert, sondern unmittelbar anonymisiert verarbeitet. 
              Die Datenverarbeitung erfolgt auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO an der 
              technischen Optimierung und Reichweitenmessung unseres Webangebots.
            </p>
          </section>

          {/* Amazon Partnerprogramm */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-950">4. Amazon Partnerprogramm</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Der Betreiber ist Teilnehmer des Partnerprogramms von Amazon EU (Amazon Europe Core S.à.r.l., 38 avenue John F. Kennedy, L-1855 Luxemburg). 
              Auf unseren Seiten sind Produktverlinkungen zu Amazon eingebunden, die mit einem Sternchen (*) gekennzeichnet sind. 
              Klicken Sie auf einen solchen Link, werden Sie direkt zu Amazon.de weitergeleitet. 
              Amazon setzt Cookies ein, um die Herkunft der Bestellungen nachvollziehen zu können und zu erfassen, dass Sie den Partnerlink auf dieser Website angeklickt haben.
            </p>
          </section>

          {/* Betroffenenrechte */}
          <section className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h2 className="text-base font-bold text-slate-950">5. Ihre Rechte als betroffene Person</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO), 
              deren Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO) sowie Einschränkung der Verarbeitung (Art. 18 DSGVO) 
              und das Recht auf Datenübertragbarkeit (Art. 20 DSGVO). Hierzu können Sie sich jederzeit an die im Impressum angegebene E-Mail-Adresse wenden.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
