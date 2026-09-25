import OptimizedImage from './OptimizedImage';
import { useLanguage } from '../i18n';
import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowRight } from 'lucide-react';

interface FaqItem {
  id: number;
  num: string;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  onCtaClick?: () => void;
}

export default function FaqSection({ onCtaClick }: FaqSectionProps) {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    { id: 1, num: "1", question: "Für wen eignet sich der Strategie-Check?", answer: "Der Strategie-Check eignet sich sowohl für Erstinvestoren als auch für erfahrene Kapitalanleger, Unternehmer, Selbstständige und Immobilieneigentümer. Gemeinsam betrachten wir Ihre persönliche Ausgangssituation und klären, welche Immobilienstrategie zu Ihren Zielen und finanziellen Möglichkeiten passt." },
    { id: 2, num: "2", question: "Ist der Strategie-Check kostenfrei und unverbindlich?", answer: "Ja. Der Strategie-Check ist für Sie kostenfrei und unverbindlich. Er dient dem gegenseitigen Kennenlernen sowie einer ersten Einschätzung Ihrer Ausgangssituation, Ihrer Möglichkeiten und Ihrer langfristigen Ziele." },
    { id: 3, num: "3", question: "Vermitteln Sie auch konkrete Immobilien?", answer: "Ja. Sobald Ihre persönlichen Kriterien und Ihre Strategie feststehen, stellen wir Ihnen sorgfältig ausgewählte Immobilien vor, die zu Ihrer finanziellen Situation und Ihren langfristigen Zielen passen." },
    { id: 4, num: "4", question: "Welche Voraussetzungen sollte ich mitbringen?", answer: "Ein regelmäßiges Einkommen, eine ausreichende Bonität und – abhängig vom jeweiligen Objekt – verfügbares Eigenkapital sind grundsätzlich hilfreich. Welche Möglichkeiten für Sie konkret bestehen, prüfen wir individuell im Strategie-Check." },
  ];

  const toggleAccordion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section 
      className="relative bg-[#16273D] text-[#fcfcfc] py-20 lg:py-24 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-white/5" 
      id="faq-section"
    >
      {/* Subtle background ambient glow for elite depth */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, rgb(216 162 78 / 0.05) 0%, transparent 72%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid: Left side ~40% (col-span-5), Right side ~60% (col-span-7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT PANEL: Headline, Subheading, Brand Image & CTA */}
          <div className="lg:col-span-5 flex flex-col text-left">
            
            {/* Small uppercase sub-header with thin underline */}
            <div
              className="flex flex-col items-start mb-4"
            >
              <span className="text-[10px] md:text-xs font-sans font-extrabold tracking-[0.25em] text-[#d8a24e] uppercase">{t("HÄUFIGE FRAGEN")}</span>
              <div className="w-10 h-[1.5px] bg-[#d8a24e] mt-2.5" />
            </div>

            {/* Headline matching mockup precisely */}
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-[45px] font-normal tracking-tight text-white leading-[1.15] mb-5"
            >{t("Klarheit ")}<br />
              <span className="text-[#d8a24e] font-serif font-normal">{t("von Anfang an.")}</span>
            </h2>

            {/* Subheading text */}
            <p
              className="text-xs md:text-sm lg:text-[14.5px] font-sans font-light text-white/60 max-w-sm mb-12 leading-relaxed"
            >{t("Hier finden Sie Antworten auf die wichtigsten Fragen zu unserem Strategie-Check und dem Ablauf einer Zusammenarbeit.")}</p>

            {/* SIDE-BY-SIDE VISUAL & CTA GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch w-full">
              
              {/* Property consultation image */}
              <div
                className="sm:col-span-7 relative rounded-[1.5rem] overflow-hidden aspect-[4/3] sm:aspect-auto min-w-0 border border-white/5 shadow-xl group"
              >
                <OptimizedImage
                  src="/images/faq-property-consultation.jpg"
                  sizes="(min-width: 1440px) 279px, (min-width: 1024px) calc(24.305556vw - 71px), (min-width: 768px) calc(58.333333vw - 66.333333px), (min-width: 640px) calc(58.333333vw - 38.333333px), calc(100vw - 50px)"
                  alt={t("Beratungsgespräch über einen Immobiliengrundriss")}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center motion-safe:group-hover:scale-[1.03] motion-safe:transition-transform duration-[2000ms] ease-out"
                />
                {/* Subtle dark ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b14]/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Right advisory CTA card matching reference design */}
              <div
                className="sm:col-span-5 rounded-[1.5rem] border border-[#d8a24e]/20 bg-[#051a2e]/45 p-6 flex flex-col justify-between text-left shadow-xl relative overflow-hidden group hover:border-[#d8a24e]/40 transition-all duration-300"
              >
                {/* Custom golden speech bubble with "?" badge */}
                <div className="relative w-12 h-12 mb-6 flex items-center justify-start shrink-0">
                  <svg className="w-10 h-10 text-[#d8a24e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <line x1="8" y1="9" x2="16" y2="9" strokeWidth="1.5" stroke="currentColor" />
                    <line x1="8" y1="13" x2="13" y2="13" strokeWidth="1.5" stroke="currentColor" />
                  </svg>
                  {/* Floating solid gold circular badge with text "?" */}
                  <div className="absolute top-0 right-1 w-5 h-5 rounded-full bg-[#d8a24e] text-[#020b14] font-sans text-[11px] font-bold flex items-center justify-center shadow-md border border-[#020b14]">
                    ?
                  </div>
                </div>

                {/* Question Helper Text */}
                <div className="flex-1 flex flex-col justify-center">
                  <p className="font-sans text-[13px] md:text-sm font-medium text-white/90 leading-relaxed">{t("Ihre Frage war nicht dabei?")}<br /><br />{t("Wir sind gerne persönlich für Sie da.")}</p>
                </div>

                {/* Premium Action Button with split text & elegant arrow circle */}
                <button
                  onClick={onCtaClick}
                  className="inline-flex items-center justify-between w-full mt-6 text-left group/link cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-sans font-extrabold tracking-wider text-[#d8a24e] uppercase leading-tight group-hover/link:text-white transition-colors">{t("KONTAKT")}</span>
                    <span className="text-[10px] font-sans font-extrabold tracking-wider text-[#d8a24e] uppercase leading-tight group-hover/link:text-white transition-colors">{t("AUFNEHMEN")}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#d8a24e]/30 flex items-center justify-center text-[#d8a24e] group-hover/link:border-[#d8a24e] group-hover/link:bg-[#d8a24e] group-hover/link:text-[#020b14] transition-all duration-300">
                    <ArrowRight className="w-4 h-4 stroke-[2]" />
                  </div>
                </button>

              </div>

            </div>

          </div>

          {/* RIGHT PANEL: Redesigned Premium FAQ Accordion List */}
          <div className="lg:col-span-7 space-y-4 pt-4 lg:pt-14">
            
            {faqs.map((faq, index) => {
              const isExpanded = expandedId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`bg-[#051a2e]/35 border rounded-[1.5rem] overflow-hidden transition-all duration-300 relative ${
                    isExpanded
                      ? 'border-[#d8a24e]/50 bg-[#07243d]/70 shadow-[0_15px_30px_rgba(216,162,78,0.05)]'
                      : 'border-white/5 hover:border-white/10 hover:bg-[#051a2e]/60'
                  }`}
                  id={`faq-item-${faq.id}`}
                >
                  
                  {/* Accordion header button */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full text-left px-6 md:px-8 py-5 flex items-center justify-between focus:outline-none cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4 md:space-x-5 flex-1 pr-4">
                      {/* Round gold thin outline number badge */}
                      <div className={`w-10 h-10 rounded-full font-sans text-xs font-bold flex items-center justify-center shrink-0 transition-all ${
                        isExpanded
                          ? 'bg-[#d8a24e] text-[#020b14]'
                          : 'bg-transparent text-[#d8a24e] border border-[#d8a24e]/40'
                      }`}>
                        {t(faq.num)}
                      </div>

                      {/* Question Text */}
                      <span className={`font-sans text-sm md:text-base lg:text-[16px] text-white font-medium tracking-wide transition-colors duration-200 ${
                        isExpanded ? 'text-[#d8a24e]' : 'group-hover:text-white'
                      }`}>
                        {t(faq.question)}
                      </span>
                    </div>

                    {/* Gold Plus Icon on the right */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                      isExpanded
                        ? 'text-[#d8a24e] bg-[#d8a24e]/10 rotate-45'
                        : 'text-[#d8a24e] bg-transparent group-hover:scale-110'
                    }`}>
                      <Plus className="w-5 h-5 stroke-[2]" />
                    </div>
                  </button>

                  {/* Accordion expand sliding body with AnimatePresence */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div id={`faq-answer-${faq.id}`} className="px-6 md:px-8 pb-6 pt-1 text-left">
                          {/* Separator line */}
                          <div className="h-[1px] bg-white/5 mb-4 ml-14 md:ml-15" />
                          
                          {/* Answer body text */}
                          <p className="text-xs md:text-sm text-white/70 font-sans leading-relaxed font-light pl-14 md:pl-15 pr-4">
                            {t(faq.answer)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}
