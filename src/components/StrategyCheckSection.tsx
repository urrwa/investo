import { useLanguage } from '../i18n';
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Check, ArrowRight, User, Target, Home, Shield, TrendingUp } from 'lucide-react';

interface StrategyCheckSectionProps {
  onStartClick?: () => void;
}

export default function StrategyCheckSection({ onStartClick }: StrategyCheckSectionProps) {
  const { t } = useLanguage();
  const [selectedStep, setSelectedStep] = useState(1);
  const reduceMotion = useReducedMotion();
  const [selectedBullet, setSelectedBullet] = useState<number | null>(null);

  const checkListItems = [
    {
      title: 'Analyse Ihrer finanziellen Möglichkeiten',
      details: 'Sorgfältige Erfassung von Eigenkapital, monatlicher Liquidität und Ihrem finanziellen Spielraum.'
    },
    {
      title: 'Festlegung klarer Anlagekriterien und Ziele',
      details: 'Abstimmung Ihrer Präferenzen bezüglich Cashflow, Wertentwicklung, Haltedauer und Risikoprofil.'
    },
    {
      title: 'Ermittlung einer realistischen Finanzierungsstruktur',
      details: 'Transparente Prüfung von Machbarkeit, Tilgungssatz und künftigen Zinsannahmen.'
    },
    {
      title: 'Gezielte Vorauswahl geeigneter Anlageimmobilien',
      details: 'Vorauswahl von Standorten und Objekten, die exakt Ihre definierten Kriterien erfüllen.'
    },
    {
      title: 'Nachvollziehbare Entscheidungsgrundlage',
      details: 'Aufbereitung aller Fakten für eine fundierte und sichere Kaufentscheidung.'
    }
  ];

  const steps = [
    {
      num: 1,
      title: 'Erstgespräch & Zielanalyse',
      sub: 'Ihre finanziellen Ziele, Eigenkapital und Wünsche stehen im Mittelpunkt.',
      icon: User,
      image: '/images/strategy-step-consultation.jpg',
      imageAlt: 'Persönliches Gespräch über Immobilienziele',
      imagePosition: 'center center'
    },
    {
      num: 2,
      title: 'Strategie & Finanzierung',
      sub: 'Wir berechnen passende Modelle, prüfen Budgets und schaffen ein klares Bild.',
      icon: Target,
      image: '/images/strategy-step-financing.jpg',
      imageAlt: 'Finanzierungsberatung mit Unterlagen und Taschenrechner',
      imagePosition: 'center center'
    },
    {
      num: 3,
      title: 'Objekt-Matching',
      sub: 'Sie erhalten ausgewählte Immobilien, die gezielt zu Ihrer Strategie passen.',
      icon: Home,
      image: '/images/house-garden-dusk.jpg',
      imageAlt: 'Haus mit Holzbalkon und blühendem Garten in der Abenddämmerung',
      imagePosition: 'center 30%'
    },
    {
      num: 4,
      title: 'Auswertung & Entscheidung',
      sub: 'Sie entscheiden auf Basis transparenter Zahlen und nachvollziehbarer Fakten.',
      icon: Shield,
      image: '/images/strategy-step-decision.jpg',
      imageAlt: 'Gemeinsame Prüfung von Immobilienunterlagen',
      imagePosition: 'center center'
    }
  ];
  const activeStep = steps.find((step) => step.num === selectedStep)!;

  return (
    <section className="relative bg-[#16273D] text-white py-24 px-6 md:px-12 lg:py-32 overflow-hidden border-t border-white/5" id="strategie-check-section">
      
      {/* Decorative clean radial background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Upper container split into Left Info & Right Card Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center mb-0">
          
          {/* LEFT COLUMN: Info Content */}
          <div className="col-span-1 lg:col-span-5 text-left flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
            >
              {/* Gold uppercase badge */}
              <span className="text-[10px] md:text-xs font-sans font-extrabold tracking-[0.25em] text-[#d4b27c] uppercase block mb-4">{t("SCHRITT FÜR SCHRITT ZUR KAPITALANLAGE")}</span>

              {/* Main Headline */}
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.15] mb-4">{t("Der Weg zu Ihrer passenden ")}<span className="text-[#d4b27c] font-normal italic font-serif">{t("Immobilienstrategie.")}</span>
              </h2>

              <p className="text-xs md:text-sm font-sans font-light text-slate-300 leading-relaxed mb-6">{t("Ein klarer, transparenter Prozess vom ersten Gespräch bis zur Auswahl.")}</p>
            </motion.div>

            {/* List items with checkmarks */}
            <div className="space-y-4 mb-8">
              {checkListItems.map((item, idx) => {
                const isSelected = selectedBullet === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    onClick={() => setSelectedBullet(isSelected ? null : idx)}
                    className="flex flex-col text-left group cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Gold Check circle matching exact reference mockup styling */}
                      <span className="w-6 h-6 rounded-full border border-[#d4b27c]/40 bg-[#d4b27c]/10 flex items-center justify-center text-[#d4b27c] shrink-0 group-hover:bg-[#d4b27c] group-hover:text-[#040911] transition-all duration-300">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      
                      <span className="text-sm md:text-base font-sans font-medium text-slate-200 group-hover:text-white transition-colors">
                        {t(item.title)}
                      </span>
                    </div>

                    {/* Expandable descriptive helper */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="pl-10 text-xs text-slate-300 font-sans leading-relaxed"
                        >
                          {t(item.details)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Gold CTA Button matching mockup exactly */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={onStartClick}
                className="group inline-flex items-center justify-between px-8 py-4 bg-[#d4b27c] hover:bg-white text-black text-xs font-sans font-bold tracking-[0.18em] rounded-xl uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="mr-4">{t("JETZT STRATEGIE-CHECK STARTEN")}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Highly Polished Card Showcase */}
          <div className="col-span-1 lg:col-span-7 flex justify-center items-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 50, damping: 15 }}
              className="w-full relative bg-[#102035] border border-white/10 rounded-[2.5rem] p-6 md:p-8 xl:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              id="stepper-visual-card"
            >
              {/* The dynamic center property image */}
              <div
                id="strategy-step-visual"
                role="region"
                aria-labelledby={`strategy-step-${selectedStep}`}
                className="relative aspect-[16/10] bg-[#16273D] rounded-3xl overflow-hidden shadow-md mb-8"
              >
                {steps.map((step) => (
                  <motion.img
                    key={step.num}
                    src={step.image}
                    alt={selectedStep === step.num ? t(step.imageAlt) : ''}
                    aria-hidden={selectedStep !== step.num}
                    loading="lazy"
                    decoding="async"
                    initial={false}
                    animate={{ opacity: selectedStep === step.num ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3 }}
                    style={{ objectPosition: step.imagePosition }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ))}
                
                {/* Visual shade gradient keeps the active-step caption readable. */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent pointer-events-none" />

                {/* Left Floating badge: "Ihre Strategie. Unsere Analyse. Ihr Vorteil." */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 bg-[#040911]/90 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-2xl border border-white/15 text-white text-left shadow-2xl flex items-center space-x-2 sm:space-x-3.5 z-20 max-w-[85%] sm:max-w-xs">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-investo-gold/10 border border-investo-gold/30 flex items-center justify-center text-investo-gold shrink-0">
                    <TrendingUp className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[9px] sm:text-[10px] font-sans font-extrabold tracking-widest text-[#d4b27c] uppercase">{t("Ihre Strategie.")}</h4>
                    <p className="hidden sm:block text-[11px] text-white/90 font-medium leading-normal mt-0.5">{t("Unsere Analyse. Ihr Vorteil.")}</p>
                  </div>
                </div>

                <p aria-live="polite" aria-atomic="true" className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 text-[10px] sm:text-xs font-sans font-semibold text-white leading-snug drop-shadow-md">
                  <span className="text-[#d4b27c]">{t('Schritt ')}{activeStep.num}</span>
                  <span className="mx-2" aria-hidden="true">/</span>
                  {t(activeStep.title)}
                </p>
              </div>

              {/* Dotted tracer graphics linking steps exactly as in reference mockup */}
              <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
                {/* SVG connecting path */}
                <svg className="w-full h-full" viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Curve from top badge down to stepper */}
                  <path
                    d="M 120 70 C 450 70 540 180 540 310"
                    stroke="#d4b27c"
                    strokeWidth="1.2"
                    strokeDasharray="1 4"
                    opacity="0.4"
                  />
                  <path
                    d="M 540 310 C 540 390 620 390 660 390"
                    stroke="#d4b27c"
                    strokeWidth="1.2"
                    strokeDasharray="1 4"
                    opacity="0.4"
                  />
                </svg>
              </div>

              {/* Stepper with 4 numbered point icons positioned cleanly without overlap */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 relative z-10 text-left" id="card-stepper">
                {steps.map((step) => {
                  const IconComp = step.icon;
                  const isSelected = selectedStep === step.num;
                  return (
                    <button
                      key={step.num}
                      id={`strategy-step-${step.num}`}
                      type="button"
                      aria-pressed={isSelected}
                      aria-controls="strategy-step-visual"
                      onClick={() => setSelectedStep(step.num)}
                      className={`flex flex-col items-start text-left p-3.5 sm:p-4 rounded-2xl border transition-colors duration-300 motion-reduce:transition-none group cursor-pointer relative h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b27c] focus-visible:ring-offset-4 focus-visible:ring-offset-[#102035] ${
                        isSelected
                          ? 'border-[#d4b27c] bg-[#d4b27c]/10 shadow-[0_0_0_1px_rgba(212,178,124,0.15)]'
                          : 'bg-white/[0.02] border-white/5 hover:border-[#d4b27c]/40 hover:bg-white/[0.05]'
                      }`}
                    >
                      {/* Circle icon with gold outline */}
                      <span aria-hidden="true" className={`w-11 h-11 rounded-full bg-[#16273D] border-2 flex items-center justify-center mb-3 shadow-md transition-colors duration-300 motion-reduce:transition-none relative shrink-0 ${
                        isSelected
                          ? 'border-[#d4b27c] text-[#d4b27c]'
                          : 'border-white/10 text-slate-200 group-hover:border-white/30'
                      }`}>
                        <IconComp className="w-5 h-5 stroke-[1.8]" />
                        
                        {/* Little Gold indicator dot */}
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#d4b27c] border-2 border-[#16273D] flex items-center justify-center text-[9px] font-mono font-extrabold text-black leading-none shadow-sm">
                          {step.num}
                        </span>
                      </span>

                      {/* Step Title */}
                      <span className="text-xs lg:text-[12.5px] font-sans font-bold text-white tracking-wide block mb-1.5 leading-snug">
                        <span className="text-[#d4b27c] mr-1 font-extrabold">{step.num}.</span>{t(step.title)}
                      </span>

                      {/* Step Subtext */}
                      <span className="text-[11px] lg:text-[11.5px] text-slate-300 font-sans font-light leading-relaxed mt-auto">
                        {t(step.sub)}
                      </span>
                    </button>
                  );
                })}
              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}
