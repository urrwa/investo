import { useLanguage } from '../i18n';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, Target, Calculator, Home, Shield, ArrowRight, Sparkles, HelpCircle, X, ChevronRight, CheckCircle2 
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
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

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
        <img
          src="https://res.cloudinary.com/z8ule8ik/image/upload/v1786017052/michelstadt-odenwald-is-beautiful-old-city-germany_q3n0ay.jpg"
          alt={t("Michelstadt Old City Germany")}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-15 mix-blend-luminosity filter contrast-110"
        />
        {/* Dark navy overlay tint for optimal text legibility and dark-blue theme retention */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#16273D]/90 via-[#16273D]/80 to-[#16273D]/95" />
      </div>

      {/* Atmospheric lighting gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-950/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-emerald-950/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* UPPER HEADER SECTION */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] md:text-xs font-sans font-extrabold tracking-[0.25em] text-[#d4b27c] uppercase">{t("SO FUNKTIONIERT ES")}</span>
            <div className="w-10 h-[1.5px] bg-[#d4b27c] mt-3 mb-6" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.15]"
          >{t("Ihr Weg zur passenden ")}<span className="text-[#d4b27c] font-normal italic font-serif">{t("Kapitalanlage")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs md:text-sm lg:text-base font-sans font-light text-white/50 max-w-xl mt-4 leading-relaxed"
          >{t("In fünf klaren Schritten von der ersten Analyse bis zum Immobilienkauf.")}</motion.p>
        </div>

        {/* TIMELINE STEPPER GRID */}
        <div className="relative mb-20 md:mb-28" id="timeline-stepper-grid">
          
          {/* Animated Connecting Timeline Line */}
          <div className="absolute left-8 md:left-0 right-0 top-[60px] md:top-[60px] h-[2px] pointer-events-none z-0 hidden md:block">
            {/* Base Line */}
            <div className="absolute inset-0 bg-white/10" />
            
            {/* Flowing animated light ray matching mockup exactly */}
            <motion.div 
              className="absolute h-full bg-gradient-to-r from-transparent via-[#d4b27c] to-transparent w-40"
              animate={{
                left: ['-20%', '110%']
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>

          {/* Stepper Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const isActive = activeStep === step.num;
              const isHovered = hoveredStep === step.num;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 60, 
                    damping: 15,
                    delay: idx * 0.1 
                  }}
                  onMouseEnter={() => setHoveredStep(step.num)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => setActiveStep(isActive ? null : step.num)}
                  className="flex flex-col items-center md:items-start text-center md:text-left group cursor-pointer relative"
                >
                  {/* Step Number with Gold typography */}
                  <span className="font-sans text-lg md:text-xl font-bold tracking-wider text-[#d4b27c]/70 group-hover:text-[#d4b27c] transition-colors mb-3">
                    {t(step.num)}
                  </span>

                  {/* Elegant floating animated gold node circle containing icon */}
                  <motion.div
                    animate={!isHovered ? {
                      y: [0, -4, 0],
                    } : {}}
                    transition={{
                      duration: 3 + idx,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#040911] border-2 flex items-center justify-center text-white relative shadow-lg transition-all duration-300 ${
                      isActive || isHovered
                        ? 'border-[#d4b27c] text-[#d4b27c] scale-105 shadow-[0_0_20px_rgba(212,178,124,0.25)]'
                        : 'border-white/10 group-hover:border-white/30'
                    }`}
                  >
                    <IconComp className="w-5 h-5 md:w-6 md:h-6 stroke-[1.4]" />
                    
                    {/* Tiny bottom gold connector point dot on line */}
                    <span className={`absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-2 border-[#030a13] transition-all duration-300 hidden md:block ${
                      isActive || isHovered ? 'bg-[#d4b27c]' : 'bg-white/40'
                    }`} />
                  </motion.div>

                  {/* Title & Info Block */}
                  <div className="mt-6 md:mt-8 flex flex-col items-center md:items-start">
                    <h3 className="text-base font-sans font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#d4b27c] transition-colors">
                      {t(step.title)}
                    </h3>
                    
                    <p className="text-xs text-white/50 leading-relaxed font-sans max-w-[200px] px-2 md:px-0">
                      {t(step.description)}
                    </p>
                  </div>

                  {/* Desktop hint badge */}
                  <span className="mt-3.5 text-[9px] font-sans font-bold tracking-widest text-[#d4b27c]/40 group-hover:text-[#d4b27c] uppercase transition-colors hidden md:block">
                    {t(isActive ? 'Schließen' : 'Details ansehen')}
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* REASSURANCE LOWER CAPSULE BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="w-full bg-[#0c1a29]/90 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 xl:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-left"
          id="investment-path-footer"
        >
          {/* Left info box with elegant shield in gold circle */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#d4b27c]/30 bg-white/5 flex items-center justify-center text-[#d4b27c] shrink-0 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
            </div>

            <div className="flex flex-col">
              <h4 className="text-sm md:text-base font-sans font-bold text-white uppercase tracking-wider">{t("Erfahrung. Marktkenntnis. Verantwortung.")}</h4>
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

        </motion.div>

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
              onClick={() => setActiveStep(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-gradient-to-b from-[#091726] to-[#040911] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 text-left shadow-2xl z-10"
            >
              {/* Close X */}
              <button
                onClick={() => setActiveStep(null)}
                className="absolute top-4 right-4 p-1.5 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col">
                {/* Badge step identifier */}
                <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#d4b27c] uppercase mb-1">{t("SCHRITT ")}{t(activeStepData.num)} — {t(activeStepData.title)}
                </span>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-serif text-white mb-4">
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
