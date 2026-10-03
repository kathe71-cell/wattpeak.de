import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Send, Sparkles, ShoppingBag, ExternalLink 
} from 'lucide-react';
import { getAmazonSearchUrl } from '../data/products';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  recommendation?: {
    label: string;
    query: string;
  };
}

let msgIdCounter = 0;

export default function SolarChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hallo! Ich bin der automatisierte WattPeak KI-Assistent. Ich beantworte Ihre technischen Fragen zu 800W-Balkonkraftwerken, Speicher-Auslegung, Normen (DIN EN IEC / VDE) und passender Hardware. Wie kann ich helfen?',
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Was gilt für 800W Balkonkraftwerke?',
    'Lohnt sich ein Speicher für 800W?',
    'Was bedeutet WattPeak (Wp)?',
    'Muss ich beim Netzbetreiber anmelden?',
    'TOPCon vs. HJT Module'
  ];

  const generateAnswer = (query: string): { text: string; recommendation?: { label: string; query: string } } => {
    const q = query.toLowerCase();

    if (q.includes('800') || q.includes('solarpaket') || q.includes('grenzwert') || q.includes('erlaubt')) {
      return {
        text: 'Seit dem Solarpaket I gilt: Die Wechselrichter-Einspeisung ins Hausnetz ist auf max. 800 W (AC) limitiert. Auf der Modulseite dürfen Sie bis zu 2.000 Wp (DC) installieren. Der Anschluss per Schukostecker ist normativ anerkannt und alte Zähler dürfen vorübergehend rückwärts laufen.',
        recommendation: {
          label: '800W Komplettsets bei Amazon ansehen *',
          query: 'Balkonkraftwerk 800W Komplettset bifazial Glas Glas'
        }
      };
    }

    if (q.includes('speicher') || q.includes('batterie') || q.includes('akku') || q.includes('nacht')) {
      return {
        text: 'Ein Balkon-Speicher (1,6 bis 2,0 kWh LiFePO4) lohnt sich besonders, wenn tagsüber niemand zuhause ist: Er rettet bis zu 80–90 % des Solarstroms für die Abend- und Nachtstunden. Führende All-in-One Systeme wie die Anker SOLIX Solarbank 2 oder EcoFlow integrieren bereits 4 MPPT-Tracker und den 800W Inverter.',
        recommendation: {
          label: 'LiFePO4 Balkonspeicher vergleichen *',
          query: 'Anker SOLIX Solarbank 2 E1600 Pro'
        }
      };
    }

    if (q.includes('wp') || q.includes('wattpeak') || q.includes('kwh') || q.includes('unterschied') || q.includes('bedeut')) {
      return {
        text: 'WattPeak (Wp) ist die genormte Spitzenleistung eines Moduls unter Standard-Testbedingungen (STC: 1.000 W/m², 25 °C, AM 1,5 nach DIN EN IEC 60904-3). Kilowattstunden (kWh) messen hingegen die tatsächlich gelieferte Energiemenge: In Deutschland liefert 1.000 Wp (1 kWp) im Schnitt 900 bis 1.150 kWh Strom per Jahr.'
      };
    }

    if (q.includes('anmeld') || q.includes('mastr') || q.includes('netzbetreiber') || q.includes('zähler') || q.includes('rückwärts')) {
      return {
        text: 'Die Bürokratie wurde stark vereinfacht: Sie müssen Ihr Stecker-Solargerät NICHT mehr beim Verteilnetzbetreiber (VNB) melden. Es genügt eine kostenlose 5-Minuten-Registrierung im Marktstammdatenregister (MaStR) der Bundesnetzagentur. Alte Ferraris-Zähler dürfen übergangsweise rückwärts drehen, bis der Messstellenbetreiber kostenlos tauscht.'
      };
    }

    if (q.includes('topcon') || q.includes('hjt') || q.includes('glas-glas') || q.includes('bifazial') || q.includes('modul')) {
      return {
        text: 'N-Type TOPCon und Heterojunction (HJT) sind die derzeitigen Technologieführer: Sie bieten Wirkungsgrade über 22 %, sehr geringe Alterung (unter 0,4 %/Jahr) und einen exzellenten Temperaturkoeffizienten. Doppelglas-Module (Glas-Glas) sind zudem unbrennbar (Brandschutzklasse A) und bifazial für bis zu 25 % Mehrertrag von der Rückseite.',
        recommendation: {
          label: 'Trina Vertex S+ TOPCon Module ansehen *',
          query: 'Trina Solar Vertex S+ 445W Glas Glas'
        }
      };
    }

    if (q.includes('steuer') || q.includes('mwst') || q.includes('mehrwertsteuer') || q.includes('12')) {
      return {
        text: 'In Deutschland gilt gemäß § 12 Abs. 3 UStG ein Nullsteuersatz (0 % MwSt.) auf private Photovoltaikanlagen, Balkonkraftwerke, Batteriespeicher und wesentliche Systemkomponenten, sofern diese an Wohngebäuden betrieben werden.'
      };
    }

    if (q.includes('marke') || q.includes('hersteller') || q.includes('hoymiles') || q.includes('anker') || q.includes('huawei')) {
      return {
        text: 'Bei Mikrowechselrichtern ist Hoymiles (HMS-800W) die deutsche Referenz. Bei steckerfertigen Speichern führen Anker SOLIX, EcoFlow, Zendure und BLUETTI. Bei Dachanlagen und Heimspeichern setzen Solarteure vor allem auf Huawei FusionSolar, Sungrow und Trina Solar.',
        recommendation: {
          label: 'Hoymiles HMS-800W Inverter ansehen *',
          query: 'Hoymiles HMS-800W-2T Mikrowechselrichter'
        }
      };
    }

    if (q.includes('dach') || q.includes('kosten') || q.includes('amortisation') || q.includes('haus')) {
      return {
        text: 'Eine typische 10 kWp Dachanlage mit 10 kWh Speicher kostet aktuell ca. 9.000 bis 13.000 € (0 % MwSt.) und erzeugt ca. 10.000 kWh/Jahr. Mit 75 % Autarkie amortisiert sich die Anlage je nach Strompreis meist nach 5 bis 7 Jahren. Nutzen Sie auch unseren interaktiven WattPeak Ertragsrechner oben auf der Seite!'
      };
    }

    return {
      text: 'Vielen Dank für Ihre Frage! Bei Stecker-Solargeräten gilt eine Obergrenze von 800W Einspeisung bei max. 2.000Wp Modulleistung. Gerne können Sie auch unseren Ertragsrechner oder den 800W-Balkonsimulator auf dieser Seite nutzen.',
      recommendation: {
        label: 'Solar-Hardware bei Amazon ansehen *',
        query: 'Balkonkraftwerk 800W Speicher'
      }
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${++msgIdCounter}`,
      sender: 'user',
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(text);
      const botMsg: ChatMessage = {
        id: `bot-${++msgIdCounter}`,
        sender: 'bot',
        text: response.text,
        recommendation: response.recommendation,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <>
      {/* HIGH-END FLOATING TRIGGER BUTTON (COMPACT ON MOBILE, PILL ON DESKTOP) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Solar-KI Assistent öffnen"
          className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 bg-slate-950/95 hover:bg-slate-900 text-white rounded-full shadow-2xl border border-slate-700/80 hover:border-amber-400/80 backdrop-blur-md flex items-center transition-all duration-200 hover:scale-[1.03] active:scale-95 group cursor-pointer p-2.5 sm:pl-3 sm:pr-4 sm:py-2.5"
        >
          {/* Glowing Icon Pill */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-bold shadow-sm group-hover:rotate-12 transition-transform duration-300 shrink-0">
            <Sparkles className="w-4 h-4 fill-slate-950 stroke-slate-950" />
          </div>

          {/* Text Labels Stack (Hidden on very narrow screens, visible from sm up) */}
          <div className="text-left hidden sm:flex flex-col justify-center ml-3">
            <div className="flex items-center gap-1 text-[10px] font-mono font-extrabold uppercase tracking-wider text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Solar-KI Bot</span>
            </div>
            <div className="text-xs font-black tracking-tight text-white group-hover:text-amber-200 transition-colors">
              KI-Assistent fragen
            </div>
          </div>
        </button>
      )}

      {/* CHAT WINDOW / MODAL */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[410px] h-[520px] max-h-[76vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header with explicit AI disclosure */}
          <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black">
                <Sparkles className="w-4 h-4 fill-slate-950 stroke-slate-950" />
              </div>
              <div>
                <div className="font-black text-sm flex items-center gap-2">
                  <span>WattPeak Solar-KI</span>
                  <span className="bg-slate-800 text-emerald-400 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700">
                    Bot
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Automatisierte Auskunft · Keine Menschenberatung
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Chat schließen"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* AI Banner Notice */}
          <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-1.5 text-[11px] text-amber-950 flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
            <span>Automatisierter KI-Bot für technische Daten &amp; Normen nach DIN/EEG.</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-950 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-900" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-slate-950 text-white font-medium rounded-tr-sm'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-sm'
                  }`}
                >
                  <p>{m.text}</p>
                  {m.recommendation && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                      <a
                        href={getAmazonSearchUrl(m.recommendation.query)}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-[11px] px-3 py-1.5 rounded-lg transition shadow-xs cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{m.recommendation.label}</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-200"></span>
                <span>Solar-KI generiert Antwort...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-Prompt Pills */}
          <div className="bg-white border-t border-slate-100 px-3 py-2 overflow-x-auto scrollbar-none flex gap-1.5">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(prompt)}
                className="shrink-0 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full transition whitespace-nowrap cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Frage an die Solar-KI stellen (z. B. 800W, Speicher)..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Frage senden"
              className="bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 p-2 rounded-xl transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Disclaimer Footnote */}
          <div className="bg-slate-100 px-3 py-1 text-[9px] text-center text-slate-500 font-mono">
            Unverbindliche automatisierte KI-Modellrechnung · * Werbelinks zu Amazon.de
          </div>
        </div>
      )}
    </>
  );
}
