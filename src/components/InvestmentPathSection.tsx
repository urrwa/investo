import OptimizedImage from './OptimizedImage';
import { useLanguage } from '../i18n';
import { useActiveAnimation } from '../hooks/useActiveAnimation';
import React, { useEffect, useRef, useState } from 'react';
import '../investment-path-motion.css';
import { m as motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  BarChart3, Target, Calculator, Home, Shield, ArrowRight, X, CheckCircle2
} from 'lucide-react';

interface PathStep {
  num: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  details: {
    title: string;
    items: string[];
    stat: string;
    statLabel: string;
  };
}

interface InvestmentPathSectionProps {
  onCtaClick?: () => void;
}

export default function InvestmentPathSection({ onCtaClick }: InvestmentPathSectionProps) {
  const { t } = useLanguage();
  const { ref: timelineRef, active: timelineVisible } = useActiveAnimation<HTMLDivElement>();
  const [hasEntered, setHasEntered] = useState(false);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Draw the route once, only when the timeline reaches the viewport.
  useEffect(() => {
    if (timelineVisible) setHasEntered(true);
  }, [timelineVisible]);

  useEffect(() => {
    if (!activeStep) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const dialog = dialogRef.current;
    const controls = () => dialog?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]');
    controls()?.[0]?.focus({ preventScroll: true });
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveStep(null);
      if (event.key !== 'Tab') return;
      const elements = controls();
      if (!elements?.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [activeStep]);

  const steps: PathStep[] = [
    {
      num: '01',
      title: 'Analyse',
      description: 'Wir analysieren Ihre Ziele, Ihre Ausgangssituation und Ihre finanziellen Möglichkeiten.',
      icon: BarChart3,
      details: {
        title: 'Bedarfs- & Bonitätsanalyse',
        items: [
          'Ermittlung des optimalen Eigenkapital-Einsatzes',
          'Berechnung Ihres monatlichen Liquiditätsspielraums',
          'Berücksichtigung steuerlicher Rahmenbedingungen (Einkommensteuersatz)'
        ],
        stat: '15 min',
        statLabel: 'Zeitaufwand für das Erstgespräch'
      }
    },
    {
      num: '02',
      title: 'Strategie',
      description: 'Gemeinsam entwickeln wir eine Immobilienstrategie, die zu Ihren persönlichen Zielen passt.',
      icon: Target,
      details: {
        title: 'Ihre maßgeschneiderte Anlagestrategie',
        items: [
          'Festlegung der Ziel-Lagen (A-, B- oder C-Standorte)',
          'Entscheidung zwischen Bestands- und Neubauimmobilien',
          'Szenarienvergleich für Cashflow- vs. Wertzuwachs-Fokus'
        ],
        stat: '100%',
        statLabel: 'Individuelle Anpassung'
      }
    },
    {
      num: '03',
      title: 'Finanzierung',
      description: 'Wir prüfen, welche Finanzierung realistisch zu Ihrem Vorhaben passt.',
      icon: Calculator,
      details: {
        title: 'Zins- & Konditionsvergleich',
        items: [
          'Vollkommen unabhängiger Vergleich von über 450 deutschen Banken',
          'Einbindung staatlicher Fördermittel (z.B. KfW-Kredite)',
          'Optimale Ausgestaltung von Zinsbindung und Tilgungssatz'
        ],
        stat: '>450',
        statLabel: 'Verglichene Kreditinstitute'
      }
    },
    {
      num: '04',
      title: 'Immobilienauswahl',
      description: 'Wir wählen Immobilien aus, die zu Ihrer Strategie und Ihren finanziellen Möglichkeiten passen.',
      icon: Home,
      details: {
        title: 'Strenge Qualitätsprüfung & Off-Market Zugang',
        items: [
          'Zugang zu exklusiven Off-Market Einheiten vor Veröffentlichung',
          'Prüfung von Energieeffizienz und baulichem Zustand',
          'Wirtschaftlichkeitsanalyse inklusive konservativer Mieterwartung'
        ],
        stat: '<5%',
        statLabel: 'Akzeptierte Objekte im Portfolio'
      }
    },
    {
      num: '05',
      title: 'Umsetzung',
      description: 'Wir begleiten Sie durch die Prüfung, Kaufentscheidung und Abwicklung bis zum Notartermin.',
      icon: Shield,
      details: {
        title: 'Rundum-Sorglos Abwicklung',
        items: [
          'Vorbereitung des Kaufvertrags und Koordination des Notartermins',
          'Unterstützung bei der Objektübergabe',
          'Optionales Sondereigentums- & Mietverwaltungs-Management'
        ],
        stat: 'All-In',
        statLabel: 'Full-Service Begleitung'
      }
    }
  ];

  const activeStepData = steps.find(s => s.num === activeStep);

  return (
    <section className="relative bg-[#16273D] text-white py-24 px-4 md:px-8 lg:px-12 overflow-hidden border-t border-white/5" id="investment-path-section">
      
      {/* Section Background Image Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <OptimizedImage
          src="https://res.cloudinary.com/z8ule8ik/image/upload/v1786017052/michelstadt-odenwald-is-beautiful-old-city-germany_q3n0ay.jpg"
          sizes="100vw"
          alt={t("Michelstadt Old City Germany")}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-15 mix-blend-luminosity filter contrast-110"
        />
        {/* Dark navy overlay tint for optimal text legibility and dark-blue theme retention */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#16273D]/90 via-[#16273D]/80 to-[#16273D]/95" />
      </div>

      {/* Atmospheric lighting gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, oklch(28.2% 0.091 267.935 / 0.1) 0%, transparent 72%)' }} />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, oklch(26.2% 0.051 172.552 / 0.05) 0%, transparent 72%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* UPPER HEADER SECTION */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <div
            className="flex flex-col items-center"
          >
            <span className="text-[10px] md:text-xs font-sans font-extrabold tracking-[0.25em] text-[#d4b27c] uppercase">{t("SO FUNKTIONIERT ES")}</span>
            <div className="w-10 h-[1.5px] bg-[#d4b27c] mt-3 mb-6" />
          </div>

          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.15]"
          >{t("Ihr Weg zur passenden ")}<span className="text-[#d4b27c] font-normal italic font-serif">{t("Kapitalanlage")}</span>
          </h2>

          <p
            className="text-xs md:text-sm lg:text-base font-sans font-light text-white/50 max-w-xl mt-4 leading-relaxed"
          >{t("In fünf klaren Schritten von der ersten Analyse bis zum Immobilienkauf.")}</p>
        </div>

        {/* TIMELINE STEPPER GRID */}
        <div
          ref={timelineRef}
          className="investo-path-timeline relative mb-20 md:mb-28"
          data-entered={hasEntered ? 'true' : 'false'}
          id="timeline-stepper-grid"
        >
          {/* A single gold route draws between the five existing milestones. */}
          <svg
            className="investo-path-route"
            viewBox="0 0 1000 12"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path className="investo-path-route-track" d="M0 6H1000" />
            <path className="investo-path-route-draw" d="M0 6H1000" pathLength="1" />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const isActive = activeStep === step.num;

              return (
                <div
                  key={step.num}
                  className="investo-path-step relative"
                  style={{ '--path-step-delay': `${idx * 160}ms` } as React.CSSProperties}
                >
                  <button
                    type="button"
                    onClick={() => setActiveStep(isActive ? null : step.num)}
                    aria-haspopup="dialog"
                    aria-expanded={isActive}
                    aria-controls={isActive ? 'investment-path-detail' : undefined}
                    className="investo-path-card flex w-full flex-col items-center md:items-start text-center md:text-left group cursor-pointer relative"
                  >
                    <span className="font-sans text-lg md:text-xl font-bold tracking-wider text-[#d4b27c]/70 group-hover:text-[#d4b27c] group-focus-visible:text-[#d4b27c] transition-colors mb-3">
                      {t(step.num)}
                    </span>

                    <span
                      className={`investo-path-node w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#040911] border-2 flex items-center justify-center relative shadow-lg ${
                        isActive ? 'border-[#d4b27c] text-[#d4b27c]' : 'border-white/10 text-white'
                      }`}
                    >
                      <svg className="investo-path-node-ring" viewBox="0 0 76 76" aria-hidden="true" focusable="false">
                        <circle cx="38" cy="38" r="36" pathLength="1" />
                      </svg>
                      <IconComp className="w-5 h-5 md:w-6 md:h-6 stroke-[1.4]" aria-hidden="true" />
                      <span className="investo-path-connector-dot absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-2 border-[#030a13] hidden md:block" />
                    </span>

                    <span className="mt-6 md:mt-8 flex flex-col items-center md:items-start">
                      <span className="text-base font-sans font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#d4b27c] group-focus-visible:text-[#d4b27c] transition-colors">
                        {t(step.title)}
                      </span>
                      <span className="text-xs text-white/50 leading-relaxed font-sans max-w-[200px] px-2 md:px-0">
                        {t(step.description)}
                      </span>
                    </span>
                    <span className="mt-3.5 text-[9px] font-sans font-bold tracking-widest text-[#d4b27c]/70 group-hover:text-[#d4b27c] group-focus-visible:text-[#d4b27c] uppercase transition-colors inline-flex items-center gap-1.5">
                      {t(isActive ? 'Schließen' : 'Details ansehen')}
                      <ArrowRight className="investo-path-detail-arrow w-3 h-3" aria-hidden="true" />
                    </span>
                  </button>
                  {idx < steps.length - 1 && (
                    <svg className="investo-path-mobile-route" viewBox="0 0 4 20" aria-hidden="true" focusable="false">
                      <path className="investo-path-route-track" d="M2 0V20" />
                      <path className="investo-path-mobile-draw" d="M2 0V20" pathLength="1" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* REASSURANCE LOWER CAPSULE BANNER */}
        <div
          className="w-full bg-[#0c1a29]/90 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 xl:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-left"
          id="investment-path-footer"
        >
          {/* Left info box with elegant shield in gold circle */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#d4b27c]/30 bg-white/5 flex items-center justify-center text-[#d4b27c] shrink-0 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
            </div>

            <div className="flex flex-col">
              <h3 className="text-sm md:text-base font-sans font-bold text-white uppercase tracking-wider">{t("Erfahrung. Marktkenntnis. Verantwortung.")}</h3>
              <p className="text-xs text-white/50 font-sans leading-relaxed mt-1 max-w-md">{t("Wir begleiten Sie mit Strategie und Weitblick – für Entscheidungen, die langfristig Bestand haben.")}</p>
            </div>
          </div>

          {/* Right vertical divider & CTA button block */}
          <div className="flex flex-col items-center md:items-end border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 lg:pl-12 w-full md:w-auto shrink-0">
            {/* Pill gold CTA button */}
            <button
              onClick={onCtaClick}
              className="group relative inline-flex items-center justify-between px-7 py-3.5 bg-gradient-to-r from-[#d4b27c] to-[#e5cc9c] hover:brightness-110 text-black text-xs font-sans font-bold tracking-[0.15em] rounded-full uppercase shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <span className="mr-4">{t("KOSTENFREIEN CHECK STARTEN")}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            {/* Small terms labels below CTA */}
            <span className="text-[10px] text-white/40 font-sans tracking-wide mt-2.5">{t("Unverbindlich. Persönlich. Auf Augenhöhe.")}</span>
          </div>

        </div>

      </div>

      {/* DETAILED ACCORDION POPUP MODAL */}
      <AnimatePresence>
        {activeStep && activeStepData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={() => setActiveStep(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              ref={dialogRef}
              id="investment-path-detail"
              role="dialog"
              aria-modal="true"
              aria-labelledby="investment-path-detail-title"
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.95, y: reduceMotion ? 0 : 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.95, y: reduceMotion ? 0 : 15 }}
              className="relative w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto bg-gradient-to-b from-[#091726] to-[#040911] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 text-left shadow-2xl z-10"
            >
              {/* Close X */}
              <button
                onClick={() => setActiveStep(null)}
                aria-label={t("Schließen")}
                className="absolute top-4 right-4 p-1.5 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col">
                {/* Badge step identifier */}
                <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#d4b27c] uppercase mb-1">{t("SCHRITT ")}{t(activeStepData.num)} — {t(activeStepData.title)}
                </span>

                {/* Title */}
                <h3 id="investment-path-detail-title" className="text-xl md:text-2xl font-serif text-white mb-4">
                  {t(activeStepData.details.title)}
                </h3>

                {/* Subtitle description */}
                <p className="text-xs text-white/60 font-sans mb-6">
                  {t(activeStepData.description)}
                </p>

                {/* Check list */}
                <div className="space-y-3 mb-6">
                  {activeStepData.details.items.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-left">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mt-0.5 shrink-0">
                        <CheckCircle2 className="w-3 h-3 fill-current" />
                      </span>
                      <span className="text-xs md:text-sm text-white/80 leading-relaxed font-sans">
                        {t(item)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Horizontal Stat Bar inside popup */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-sans font-bold text-[#d4b27c] uppercase tracking-wider">{t("SCHLÜSSEL-METRIK")}</span>
                    <span className="text-xs text-white/50 font-sans mt-0.5">
                      {t(activeStepData.details.statLabel)}
                    </span>
                  </div>
                  <span className="text-xl md:text-2xl font-sans font-extrabold text-[#d4b27c]">
                    {t(activeStepData.details.stat)}
                  </span>
                </div>

                {/* Action button in popup */}
                <button
                  onClick={() => {
                    setActiveStep(null);
                    if (onCtaClick) onCtaClick();
                  }}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-[#d4b27c] to-[#e5cc9c] hover:brightness-110 text-black text-xs font-sans font-bold tracking-widest rounded-xl uppercase transition-all"
                >{t("Jetzt kostenfreie Erstberatung starten")}</button>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
