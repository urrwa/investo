import OptimizedImage from './OptimizedImage';
import { useLanguage } from '../i18n';
import { useActiveAnimation } from '../hooks/useActiveAnimation';
import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'motion/react';
import { Shield, ArrowRight, X, TrendingUp, HelpCircle, CheckCircle2 } from 'lucide-react';

interface TargetGroupItem {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<any>;
  details: {
    target: string;
    focusPoints: string[];
    typicalMistake: string;
    advantage: string;
  };
}

// Custom SVG Icons matching the mockup reference precisely
const ChartIcon = () => (
  <svg className="w-8 h-8 text-[#d4b27c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
    <path d="M15 8h3.7V11.7" />
    <rect x="6" y="16" width="2" height="2" fill="currentColor" opacity="0.3" />
    <rect x="11" y="13" width="2" height="5" fill="currentColor" opacity="0.3" />
    <rect x="16" y="10" width="2" height="8" fill="currentColor" opacity="0.3" />
  </svg>
);

const HouseIcon = () => (
  <svg className="w-8 h-8 text-[#d4b27c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-8 h-8 text-[#d4b27c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-8 h-8 text-[#d4b27c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3M15.5 7.5L14 9" />
  </svg>
);

interface TargetGroupsSectionProps {
  onCtaClick?: () => void;
}

export default function TargetGroupsSection({ onCtaClick }: TargetGroupsSectionProps) {
  const { t } = useLanguage();
  const { ref: animationRef, active: animateDecorations } = useActiveAnimation();
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  const groups: TargetGroupItem[] = [
    {
      id: 'kapitalanleger',
      num: '01',
      title: 'Kapitalanleger & Investor',
      shortDesc: 'Sie möchten Ihr Portfolio gezielt erweitern und suchen ertragsstarke, geprüfte Objekte.',
      icon: ChartIcon,
      details: {
        target: 'Systematischer & passiver Vermögensaufbau mit optimiertem Eigenkapitaleinsatz.',
        focusPoints: [
          'Optimierung der Eigenkapitalrendite',
          'Nutzung steuerlicher Handlungsspielräume',
          'Konservative Mietüberschuss-Kalkulation'
        ],
        typicalMistake: 'Emotionale Objektauswahl statt rein rationaler Kennzahlen-Prüfung.',
        advantage: 'Zugang zu geprüften Bestandsobjekten mit etablierter Verwaltung.'
      }
    },
    {
      id: 'einsteiger',
      num: '02',
      title: 'Erstkäufer & Einsteiger',
      shortDesc: 'Sie möchten zum ersten Mal investieren und suchen Sicherheit bei Finanzierung und Objektauswahl.',
      icon: HouseIcon,
      details: {
        target: 'Sicherer Einstieg in den Immobilienmarkt mit verlässlicher Begleitung.',
        focusPoints: [
          'Verständliche Aufbereitung aller Kennzahlen',
          'Absicherung gegen typische Bausubstanz- und Standortrisiken',
          'Vorbereitung auf das Bankgespräch und die Bonitätsprüfung'
        ],
        typicalMistake: 'Kauf ohne professionelle Prüfung oder unzureichende Rücklagen.',
        advantage: 'Schritt-für-Schritt Begleitung von der Standortanalyse bis zum Kauf.'
      }
    },
    {
      id: 'unternehmer',
      num: '03',
      title: 'Unternehmer & Selbstständige',
      shortDesc: 'Sie suchen strategische Möglichkeiten zur Vermögensbildung und steuerlichen Einordnung.',
      icon: BriefcaseIcon,
      details: {
        target: 'Diversifikation des betrieblichen Risikos und Aufbau privater Sachwerte.',
        focusPoints: [
          'Betrachtung steuerlicher Rahmenbedingungen',
          'Schutz des Privatvermögens durch kluge Asset-Strukturierung',
          'Anlagekonzepte für schwankende Liquidität'
        ],
        typicalMistake: 'Mangelnde zeitliche Ressourcen für Objektsuche und Prüfung.',
        advantage: 'Effiziente Abwicklung für minimalen zeitlichen Eigenaufwand.'
      }
    },
    {
      id: 'eigentuemer',
      num: '04',
      title: 'Eigentümer & Bestandsinhaber',
      shortDesc: 'Sie möchten Ihr bestehendes Portfolio analysieren, optimieren oder gezielt ergänzen.',
      icon: KeyIcon,
      details: {
        target: 'Maximale Transparenz und Optimierung für Ihr bestehendes Immobilienportfolio.',
        focusPoints: [
          'Unabhängige Analyse bestehender Immobilienbestände',
          'Überprüfung von Finanzierungskonditionen und Zinsbindungen',
          'Entwicklung gezielter Zukaufs- oder Umstrukturierungsstrategien'
        ],
        typicalMistake: 'Ungeprüftes Festhalten an ineffizienten Bestandsstrukturen.',
        advantage: 'Objektive Portfolio-Analyse und gezielte Handlungsempfehlungen.'
      }
    }
  ];

  const activeGroupData = groups.find(g => g.id === activeGroup);

  return (
    <section ref={animationRef} className="relative bg-[#16273D] text-white py-24 px-4 md:px-8 lg:px-12 overflow-hidden border-t border-white/5" id="target-groups-section">
      
      {/* Decorative Blueprint Background graphic */}
      <div className="absolute left-[-15%] top-[-5%] w-[50%] h-[60%] pointer-events-none opacity-[0.02] select-none mix-blend-screen">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
          sizes="50vw"
          alt={t("Technical building sketch blueprint")}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter invert"
        />
      </div>

      {/* Atmospheric lighting gradients */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, oklch(28.2% 0.091 267.935 / 0.15) 0%, transparent 72%)' }} />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] rounded-full pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, oklch(25.7% 0.09 281.288 / 0.15) 0%, transparent 72%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* UPPER TITLE BLOCK */}
        <div className="text-center mb-16 md:mb-20 flex flex-col items-center">
          <div
            className="flex flex-col items-center"
          >
            <span className="text-[10px] md:text-xs font-sans font-extrabold tracking-[0.25em] text-[#d4b27c] uppercase">{t("FÜR WEN WIR ARBEITEN")}</span>
            <div className="w-10 h-[1.5px] bg-[#d4b27c] mt-3 mb-6" />
          </div>

          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.15]"
          >{t("Unterschiedliche Ausgangslagen. ")}<span className="text-[#d4b27c] font-normal italic font-serif">{t("Ein gemeinsames Ziel.")}</span>
          </h2>

          <p
            className="text-xs md:text-sm lg:text-base font-sans font-light text-white/50 max-w-xl mt-4 leading-relaxed"
          >{t("Wir begleiten Menschen, die Immobilien gezielt für ihren langfristigen Vermögensaufbau nutzen möchten – von der ersten Kapitalanlage bis zum bestehenden Portfolio.")}</p>
        </div>

        {/* ELEGANT TARGET CONNECTIONS TREE (Visible on desktop screens md+) */}
        <div className="relative mb-8 hidden md:block" id="connections-tree">
          
          {/* Main SVG representing the diagram connection lines connecting main point to the 4 cards */}
          <svg className="w-full h-16 pointer-events-none z-0" viewBox="0 0 1000 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Center dot starting point */}
            <circle cx="500" cy="5" r="3.5" fill="#d4b27c" />
            <circle cx="500" cy="5" r="7" stroke="#d4b27c" strokeOpacity="0.3" />

            {/* Vertical trunk line */}
            <line x1="500" y1="5" x2="500" y2="25" stroke="#d4b27c" strokeWidth="1" strokeOpacity="0.4" />

            {/* Horizontal branch line */}
            <line x1="125" y1="25" x2="875" y2="25" stroke="#d4b27c" strokeWidth="1" strokeOpacity="0.4" />

            {/* Downward branches to the four cards */}
            <line x1="125" y1="25" x2="125" y2="55" stroke="#d4b27c" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="375" y1="25" x2="375" y2="55" stroke="#d4b27c" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="625" y1="25" x2="625" y2="55" stroke="#d4b27c" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="875" y1="25" x2="875" y2="55" stroke="#d4b27c" strokeWidth="1" strokeOpacity="0.4" />

            {/* Branch landing node dots */}
            <circle cx="125" cy="55" r="3" fill="#d4b27c" />
            <circle cx="375" cy="55" r="3" fill="#d4b27c" />
            <circle cx="625" cy="55" r="3" fill="#d4b27c" />
            <circle cx="875" cy="55" r="3" fill="#d4b27c" />

            {/* Flowing golden dash representing dynamic strategy distribution */}
            <path
              d="M 500,5 L 500,25 L 125,25 L 125,55"
              stroke="#e5cc9c"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="10 80"
              className="investo-decorative-dash"
              style={{ animationDuration: '4.5s', animationName: animateDecorations ? undefined : 'none' }}
            />
            <path
              d="M 500,5 L 500,25 L 375,25 L 375,55"
              stroke="#e5cc9c"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="10 80"
              className="investo-decorative-dash"
              style={{ animationName: animateDecorations ? undefined : 'none' }}
            />
            <path
              d="M 500,5 L 500,25 L 625,25 L 625,55"
              stroke="#e5cc9c"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="10 80"
              className="investo-decorative-dash"
              style={{ animationName: animateDecorations ? undefined : 'none' }}
            />
            <path
              d="M 500,5 L 500,25 L 875,25 L 875,55"
              stroke="#e5cc9c"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="10 80"
              className="investo-decorative-dash"
              style={{ animationDuration: '4.5s', animationName: animateDecorations ? undefined : 'none' }}
            />
          </svg>

        </div>

        {/* 4 CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
          {groups.map((group, idx) => {
            const IconComp = group.icon;
            const isHovered = hoveredGroup === group.id;
            const isActive = activeGroup === group.id;

            return (
              <div
                key={group.id}
                onMouseEnter={() => setHoveredGroup(group.id)}
                onMouseLeave={() => setHoveredGroup(null)}
                onClick={() => setActiveGroup(isActive ? null : group.id)}
                className={`relative bg-[#091726]/40 border rounded-[1.75rem] p-6 md:p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 min-h-[340px] justify-between ${
                  isActive || isHovered
                    ? 'border-[#d4b27c] bg-[#0c1e30]/80 shadow-[0_20px_45px_rgba(212,178,124,0.1)] -translate-y-1'
                    : 'border-white/10 hover:border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.3)]'
                }`}
                id={`target-card-${group.id}`}
              >
                
                {/* Step indicator in top left corner of card */}
                <div className="absolute top-4 left-4 w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center text-xs font-mono font-bold text-[#d4b27c]/85">
                  {t(group.num)}
                </div>

                {/* Highly styled circle icon matching reference image precisely */}
                <div className="mt-4 relative flex items-center justify-center select-none">
                  {/* Subtle pulsing background glow layer */}
                  <div className={`absolute inset-0 rounded-full bg-[#d4b27c]/10 blur-xl transition-all duration-500 scale-125 ${
                    isHovered || isActive ? 'opacity-100' : 'opacity-0'
                  }`} />

                  {/* Elegant golden circular container with micro floating animation */}
                  <div
                    style={{
                      animationDuration: `${3 + idx * 0.4}s`,
                      animationName: animateDecorations && !isHovered ? undefined : 'none',
                    }}
                    className={`investo-decorative-float investo-decorative-float-small w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative ${
                      isHovered || isActive
                        ? 'border-[#d4b27c] bg-white/[0.03] scale-105 shadow-[0_0_20px_rgba(212,178,124,0.2)]'
                        : 'border-white/10'
                    }`}
                  >
                    <IconComp />
                  </div>
                </div>

                {/* Card Title & Short Description */}
                <div className="my-6 flex-1 flex flex-col justify-center">
                  <h3 className="font-serif text-xl font-normal leading-snug text-white mb-3 group-hover:text-[#d4b27c] transition-colors">
                    {t(group.title)}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-white/60 leading-relaxed font-sans max-w-[210px] mx-auto font-light">
                    {t(group.shortDesc)}
                  </p>
                </div>

                {/* Interactive Click helper indicator */}
                <span className="text-[10px] font-sans font-bold tracking-widest text-[#d4b27c]/85 group-hover:text-[#d4b27c] uppercase transition-colors duration-300">
                  {t(isActive ? 'Schließen' : 'Details einsehen')}
                </span>

              </div>
            );
          })}
        </div>

        {/* BOTTOM INTEGRITY STATEMENT BANNER */}
        <div className="relative" id="target-groups-footer">
          
          {/* Subtle line decoration bridging the banner */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/5 pointer-events-none" />
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#d4b27c]/40 hidden md:block" />
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#d4b27c]/40 hidden md:block" />

          <div
            className="relative mx-auto max-w-2xl bg-[#040911]/80 border border-[#d4b27c]/20 rounded-full px-8 py-4 flex items-center justify-center space-x-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10"
          >
            <div className="w-7 h-7 rounded-full bg-[#d4b27c]/10 border border-[#d4b27c]/30 flex items-center justify-center text-[#d4b27c] shrink-0">
              <Shield className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            
            <p className="text-xs md:text-sm font-sans font-light text-white/85 leading-none">{t("Individuell. Strategisch. Auf ")}<span className="text-[#d4b27c] font-semibold">{t("Ihre Ziele")}</span>{t(" ausgerichtet.")}</p>
          </div>
        </div>

      </div>

      {/* DETAILED INTERACTIVE ACCORDION POPUP MODAL */}
      <AnimatePresence>
        {activeGroup && activeGroupData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop filter closed on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveGroup(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-gradient-to-b from-[#091726] to-[#040911] border border-white/10 rounded-3xl p-6 md:p-8 text-left shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveGroup(null)}
                className="absolute top-5 right-5 p-1.5 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col">
                {/* Identifier */}
                <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#d4b27c] uppercase mb-1">{t("ZIELGRUPPE ")}{t(activeGroupData.num)} — {t(activeGroupData.title)}
                </span>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                  {t(activeGroupData.title)}
                </h3>

                {/* Target goal text */}
                <p className="text-xs md:text-sm text-white/80 font-sans leading-relaxed mb-6 italic border-l-2 border-[#d4b27c] pl-4 py-0.5">{t('"')}{t(activeGroupData.details.target)}{t('"')}</p>

                {/* Bullet Focus Section */}
                <h4 className="text-xs font-sans font-bold text-[#d4b27c] uppercase tracking-wider mb-3">{t("Schlüsselfaktoren für Ihren Erfolg:")}</h4>

                <div className="space-y-3 mb-6">
                  {activeGroupData.details.focusPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-[#d4b27c]/10 border border-[#d4b27c]/20 flex items-center justify-center text-[#d4b27c] mt-0.5 shrink-0">
                        <CheckCircle2 className="w-3 h-3 fill-current" />
                      </span>
                      <span className="text-xs md:text-sm text-white/80 leading-relaxed font-sans">
                        {t(point)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Matrix Comparison Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] font-sans text-rose-400 uppercase tracking-widest font-extrabold leading-none mb-2">{t("Typisches Risiko / Fehler")}</span>
                    <span className="text-xs text-white/70 font-sans leading-relaxed font-light">
                      {t(activeGroupData.details.typicalMistake)}
                    </span>
                  </div>
                  
                  <div className="flex flex-col text-left border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-4">
                    <span className="text-[9px] font-sans text-emerald-400 uppercase tracking-widest font-extrabold leading-none mb-2">{t("Ihr Investo-Vorteil")}</span>
                    <span className="text-xs text-white/70 font-sans leading-relaxed font-light">
                      {t(activeGroupData.details.advantage)}
                    </span>
                  </div>
                </div>

                {/* Primary strategy check trigger button */}
                <button
                  onClick={() => {
                    setActiveGroup(null);
                    if (onCtaClick) onCtaClick();
                  }}
                  className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#d4b27c] to-[#e5cc9c] hover:brightness-110 text-black text-xs font-sans font-bold tracking-[0.15em] rounded-xl uppercase transition-all"
                >{t("Kostenfreie Erstberatung starten")}</button>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
