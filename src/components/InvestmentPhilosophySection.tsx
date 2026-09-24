import { useLanguage } from '../i18n';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';

interface PrincipleDetail {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  bgNumber: string;
  details: {
    lead: string;
    metrics: { label: string; value: string }[];
    bullets: string[];
  };
}

interface InvestmentPhilosophySectionProps {
  onCtaClick?: () => void;
}

// 1. Mockup-Perfect Icon 01: Location Pin with stylized home/house structure inside
const StandortIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 4.993-5.5 11-8 11s-8-6.007-8-11a8 8 0 0 1 16 0z" />
    <path d="M9 11l3-2.5 3 2.5v3.5H9v-3.5z" fill="none" />
  </svg>
);

// 2. Mockup-Perfect Icon 02: Financial Calculator with grid and a mini bar chart in its display
const WirtschaftlichkeitIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M8 7h8" />
    {/* Micro bar chart lines inside the screen */}
    <path d="M8 11h2M12 10h2" strokeWidth="2" />
    {/* Grid keys */}
    <circle cx="8.5" cy="15.5" r="1" fill="currentColor" />
    <circle cx="12" cy="15.5" r="1" fill="currentColor" />
    <circle cx="15.5" cy="15.5" r="1" fill="currentColor" />
    <circle cx="8.5" cy="18.5" r="1" fill="currentColor" />
    <circle cx="12" cy="18.5" r="1" fill="currentColor" />
    <circle cx="15.5" cy="18.5" r="1" fill="currentColor" />
  </svg>
);

// 3. Mockup-Perfect Icon 03: Strategy Target with nested focus rings and bullseye alignment
const StrategieIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    {/* Concentric crosshair alignment lines */}
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
  </svg>
);

export default function InvestmentPhilosophySection({ onCtaClick }: InvestmentPhilosophySectionProps) {
  const { t } = useLanguage();
  const [activePrinciple, setActivePrinciple] = useState<string | null>(null);
  const [hoveredPrinciple, setHoveredPrinciple] = useState<string | null>(null);

  const principles: PrincipleDetail[] = [
    {
      id: 'standort',
      num: '01',
      title: 'Standort',
      subtitle: 'Wir setzen auf Standorte mit langfristigem Potenzial statt auf kurzfristige Trends.',
      bgNumber: '01',
      details: {
        lead: 'Makrolage und Mikrolage sind das Fundament jeder Immobilieninvestition. Während kurzfristige Hypes schnell verfliegen, sichern demografische Stabilität und wirtschaftliche Dynamik den langfristigen Werterhalt.',
        metrics: [
          { label: 'Bevölkerungstrend', value: 'Positiv' },
          { label: 'Kaufkraft-Index', value: '>100 pt' },
          { label: 'Leerstandsquote', value: '<2.5%' }
        ],
        bullets: [
          'Zukunftsfähige Infrastruktur (ÖPNV, Breitbandausbau, E-Mobilität)',
          'Nähe zu starken Arbeitgebern und renommierten Hochschulen',
          'Konservative Mietpreis-Entwicklungsprognose auf Basis von Realdaten'
        ]
      }
    },
    {
      id: 'wirtschaftlichkeit',
      num: '02',
      title: 'Wirtschaftlichkeit',
      subtitle: 'Kaufpreis, Finanzierung, laufende Kosten und Ertrag müssen realistisch zusammenpassen.',
      bgNumber: '02',
      details: {
        lead: 'Eine Immobilie rechnet sich nur, wenn alle Zahlen einer harten Realitätsprüfung standhalten. Wir kalkulieren grundsätzlich mit Sicherheitsabschlägen und echten Instandhaltungskosten.',
        metrics: [
          { label: 'Ø Bruttorendite', value: '4.2% - 5.8%' },
          { label: 'Sicherheits-Puffer', value: '15%' },
          { label: 'Zinsbindung', value: '10-20 Jahre' }
        ],
        bullets: [
          'Bankenkonforme Cashflow-Berechnung ohne fiktive Wertsteigerungen',
          'Sorgfältige Berücksichtigung von nicht-umlagefähigen Nebenkosten',
          'Optimierte Abschreibungsmodelle (AfA) zur Senkung der Steuerlast'
        ]
      }
    },
    {
      id: 'strategie',
      num: '03',
      title: 'Persönliche Strategie',
      subtitle: 'Die Immobilie muss zu Ihren Zielen, Ihren finanziellen Möglichkeiten und Ihrer Lebenssituation passen.',
      bgNumber: '03',
      details: {
        lead: 'Es gibt nicht die eine "beste" Immobilie, sondern nur die für Sie passende Strategie. Vermögensaufbau, Steuersparmodelle und Altersvorsorge erfordern völlig unterschiedliche Konzepte.',
        metrics: [
          { label: 'Anlagehorizont', value: '10+ Jahre' },
          { label: 'Risikoklasse', value: 'Konservativ' },
          { label: 'Eigenkapital-Hebel', value: 'Optimiert' }
        ],
        bullets: [
          'Abstimmung auf Ihren persönlichen Grenzsteuersatz',
          'Flexibilität für spätere Lebensphasen (Verkauf vs. Entnahmephase)',
          'Echtes Risikomanagement durch Diversifikation über Standorte hinweg'
        ]
      }
    }
  ];

  const activeData = principles.find(p => p.id === activePrinciple);

  return (
    <section className="relative bg-[#16273D] text-white py-24 px-6 md:px-12 lg:py-32 overflow-hidden border-t border-white/5" id="investment-philosophy-section">
      
      {/* Soft warm background gradients */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber-500/[0.01] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gray-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Dynamic Multi-column Layout: Headline Area left & Interactive Timeline Area right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Heading block, intro and primary action CTA */}
          <div className="col-span-1 lg:col-span-5 text-left pt-4 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
            >
              {/* Gold uppercase brand subtitle */}
              <span className="text-[10px] md:text-xs font-sans font-extrabold tracking-[0.25em] text-[#d4b27c] uppercase block mb-4">{t("INVESTMENTPHILOSOPHIE")}</span>

              {/* Serif Headline perfectly matching provided mockup style */}
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.12] mb-6">{t("Nicht jede Immobilie eignet sich als ")}<span className="text-[#d4b27c] font-normal italic font-serif">{t("Kapitalanlage.")}</span>
              </h2>

              <p className="text-sm md:text-base font-sans font-light text-slate-300 leading-relaxed mb-8 max-w-md">{t("Wir bewerten jede Immobilie nach drei entscheidenden Kriterien: Standort, Wirtschaftlichkeit und Übereinstimmung mit Ihrer persönlichen Strategie.")}</p>

              {/* Start strategy check button in philosophy section */}
              <button
                onClick={onCtaClick}
                className="group inline-flex items-center justify-between px-7 py-4 bg-gradient-to-r from-[#d4b27c] to-[#e5cc9c] hover:brightness-105 text-black text-xs font-sans font-bold tracking-[0.18em] rounded-xl uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="mr-4">{t("STRATEGIE-CHECK STARTEN")}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Immersive Interactive Wave Timeline */}
          <div className="col-span-1 lg:col-span-7">
            
            {/* On Desktop: Mathematically precise Golden Wave Timeline */}
            <div className="hidden md:block relative w-full h-[520px] select-none">
              
              {/* 1. Connecting Wave Path (Perfect S-curves hitting exact step coordinates) */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <svg className="w-full h-full" viewBox="0 0 1000 480" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Flowing golden wave line */}
                  <path
                    d="M 0,360 C 80,360 100,310 150,310 C 250,310 400,210 500,210 C 600,210 750,110 850,110 C 900,110 920,80 1000,80"
                    stroke="url(#gold-wave-gradient-philosophy)"
                    strokeWidth="3"
                    fill="none"
                  />

                  {/* Animated overlay glowing dash to represent flowing capital/strategy along the timeline */}
                  <motion.path
                    d="M 0,360 C 80,360 100,310 150,310 C 250,310 400,210 500,210 C 600,210 750,110 850,110 C 900,110 920,80 1000,80"
                    stroke="#e5cc9c"
                    strokeWidth="3.5"
                    strokeDasharray="40 180"
                    fill="none"
                    animate={{
                      strokeDashoffset: [440, 0]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />

                  {/* Linear Gradients for the waves */}
                  <defs>
                    <linearGradient id="gold-wave-gradient-philosophy" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e5cc9c" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#d4b27c" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#b0915c" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* 2. Interactive Step Nodes */}
              {principles.map((p, idx) => {
                const isSelected = activePrinciple === p.id;
                const isHovered = hoveredPrinciple === p.id;

                // Select correct mockup-perfect vector icon
                const IconComp = p.id === 'standort' 
                  ? StandortIcon 
                  : p.id === 'wirtschaftlichkeit' 
                    ? WirtschaftlichkeitIcon 
                    : StrategieIcon;

                // Mathematically mapped vertical and horizontal coordinates
                const positioningClass = 
                  idx === 0 ? 'left-[15%] top-[270px]' :
                  idx === 1 ? 'left-[50%] top-[170px]' :
                  'left-[85%] top-[70px]';

                return (
                  <div
                    key={p.id}
                    onMouseEnter={() => setHoveredPrinciple(p.id)}
                    onMouseLeave={() => setHoveredPrinciple(null)}
                    onClick={() => setActivePrinciple(isSelected ? null : p.id)}
                    className={`absolute ${positioningClass} -translate-x-1/2 transition-all duration-300 cursor-pointer group z-10`}
                  >
                    <div className="flex flex-col items-center relative select-none">
                      
                      {/* Big beautifully visible background text number behind/above the bubble node */}
                      <span className="absolute -top-[110px] text-[10rem] font-serif text-white/10 font-light leading-none tracking-tighter select-none pointer-events-none transition-colors duration-300 group-hover:text-[#d4b27c]/20">
                        {t(p.bgNumber)}
                      </span>
                      
                      {/* Dotted indicator line representing physical stability downward */}
                      <div className="w-[1.5px] h-10 border-l border-dashed border-[#d4b27c]/40 absolute top-[80px] left-1/2 -translate-x-1/2 pointer-events-none opacity-60" />

                      {/* Small gold dot at the end of the stability line */}
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4b27c] absolute top-[120px] left-1/2 -translate-x-1/2" />

                      {/* Highly styled circular gold button node with responsive drop shadows & gradients */}
                      <motion.div
                        animate={!isHovered ? {
                          y: [0, -6, 0],
                        } : {}}
                        transition={{
                          duration: 3 + idx * 0.5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className={`w-20 h-20 rounded-full flex items-center justify-center relative transition-all duration-300 ${
                          isSelected || isHovered
                            ? 'bg-[#102035] scale-105 shadow-[0_15px_35px_rgba(212,178,124,0.25)]'
                            : 'bg-[#102035]/90 shadow-[0_10px_25px_rgba(0,0,0,0.2)]'
                        }`}
                      >
                        {/* Golden ring border glow */}
                        <div className={`w-[72px] h-[72px] rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isSelected || isHovered ? 'border-[#d4b27c] bg-[#16273D]' : 'border-white/10'
                        }`}>
                          {/* Inner solid gold gradient badge with clean white vector icon */}
                          <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#d4b27c] to-[#b0915c] flex items-center justify-center text-white shadow-inner border border-white/20">
                            <IconComp />
                          </div>
                        </div>
                        
                        {/* Info trigger badge */}
                        <span className="absolute bottom-0 right-0 w-5.5 h-5.5 rounded-full bg-[#d4b27c] text-black text-[9px] font-sans font-extrabold flex items-center justify-center border-2 border-[#16273D] shadow-sm">{t("i")}</span>
                      </motion.div>

                      {/* Principle Titles & Content description text */}
                      <div className="mt-16 text-center flex flex-col items-center max-w-[220px]">
                        <h3 className="text-sm md:text-base font-sans font-bold text-white uppercase tracking-wider group-hover:text-[#d4b27c] transition-colors duration-300">
                          {t(p.num)} {t(p.title)}
                        </h3>
                        
                        <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed font-light">
                          {t(p.subtitle)}
                        </p>

                        {/* Details popup helper tag */}
                        <span className="text-[9px] font-sans font-bold tracking-widest text-[#d4b27c] uppercase mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{t("Details einsehen")}</span>
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

            {/* On Mobile: Responsive visual vertical timeline hierarchy */}
            <div className="md:hidden space-y-12 relative pl-6 z-10 pt-4">
              
              {/* Vertical golden line in the background */}
              <div className="absolute top-4 bottom-4 left-[35px] w-[2px] bg-gradient-to-b from-[#e5cc9c] via-[#d4b27c] to-[#b0915c]/30" />

              {principles.map((p, idx) => {
                const isSelected = activePrinciple === p.id;
                
                const IconComp = p.id === 'standort' 
                  ? StandortIcon 
                  : p.id === 'wirtschaftlichkeit' 
                    ? WirtschaftlichkeitIcon 
                    : StrategieIcon;

                return (
                  <div
                    key={p.id}
                    onClick={() => setActivePrinciple(isSelected ? null : p.id)}
                    className="flex items-start space-x-6 relative cursor-pointer group"
                  >
                    
                    {/* Circle Badge and step number */}
                    <div className="relative shrink-0 z-10">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected ? 'bg-[#102035] scale-105 shadow-[0_12px_25px_rgba(212,178,124,0.2)]' : 'bg-[#102035]'
                      }`}>
                        <div className={`w-[58px] h-[58px] rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#d4b27c] bg-[#16273D]' : 'border-white/10'
                        }`}>
                          <div className="w-11 h-11 rounded-full bg-gradient-to-b from-[#d4b27c] to-[#b0915c] flex items-center justify-center text-white shadow-inner border border-white/20">
                            <IconComp />
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating Step Number */}
                      <span className="absolute -top-1 -left-1 bg-[#d4b27c] text-black text-[9px] font-sans font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border border-[#16273D] shadow-md">
                        {t(p.num)}
                      </span>
                    </div>

                    {/* Description Text */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider group-hover:text-[#d4b27c] transition-colors flex items-center">
                        <span>{t(p.title)}</span>
                        <span className="ml-2.5 text-[9px] font-sans font-bold text-[#d4b27c] uppercase tracking-widest bg-[#d4b27c]/10 px-2 py-0.5 rounded-md border border-[#d4b27c]/20">{t("INFO")}</span>
                      </h3>
                      
                      <p className="text-xs text-slate-300 font-sans mt-1.5 leading-relaxed font-light">
                        {t(p.subtitle)}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>

      {/* 3. Detailed Bottom Drawer Modal Dialog Popup */}
      <AnimatePresence>
        {activePrinciple && activeData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Dim click close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePrinciple(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-gradient-to-b from-[#091726] to-[#040911] border border-white/10 rounded-3xl p-6 md:p-8 text-left shadow-2xl z-10 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePrinciple(null)}
                className="absolute top-5 right-5 p-1.5 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col">
                {/* Header step label */}
                <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#d4b27c] uppercase mb-1">{t("PRINZIP ")}{t(activeData.num)} — {t(activeData.title)}
                </span>

                {/* Big serif title */}
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">{t("Das Prinzip ")}{t(activeData.title)}
                </h3>

                {/* Lead text */}
                <p className="text-xs md:text-sm text-white/70 font-sans leading-relaxed mb-6">
                  {t(activeData.details.lead)}
                </p>

                {/* Key criteria point header */}
                <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider mb-3">{t("Wichtige Prüfkriterien:")}</h4>

                {/* Bullet lists */}
                <div className="space-y-3 mb-6">
                  {activeData.details.bullets.map((bullet, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-[#d4b27c]/10 border border-[#d4b27c]/20 flex items-center justify-center text-[#d4b27c] mt-0.5 shrink-0">
                        <CheckCircle2 className="w-3 h-3 fill-current" />
                      </span>
                      <span className="text-xs md:text-sm text-white/80 leading-relaxed font-sans">
                        {t(bullet)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Grid matrix indicators inside modal */}
                <div className="grid grid-cols-3 gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  {activeData.details.metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col text-center">
                      <span className="text-[9px] font-sans text-[#d4b27c]/70 uppercase tracking-widest leading-none">
                        {t(metric.label)}
                      </span>
                      <span className="text-sm md:text-base font-sans font-extrabold text-white mt-1.5 leading-none">
                        {t(metric.value)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Primary strategy check button */}
                <button
                  onClick={() => {
                    setActivePrinciple(null);
                    if (onCtaClick) onCtaClick();
                  }}
                  className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#d4b27c] to-[#e5cc9c] hover:brightness-110 text-black text-xs font-sans font-bold tracking-[0.15em] rounded-xl uppercase transition-all"
                >{t("Individuelle Strategie berechnen lassen")}</button>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
