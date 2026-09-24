import { useLanguage } from '../i18n';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ArrowRight, X, Check, HelpCircle } from 'lucide-react';

interface ComparisonRow {
  id: string;
  classicText: string;
  classicDesc: string;
  classicIcon: React.ComponentType<any>;
  investoText: string;
  investoDesc: string;
  investoIcon: React.ComponentType<any>;
  rowLabel: string;
  detailTitle: string;
}

// Left side circular icons (Classic purchase - subtle white/50)
const SearchHouseIcon = () => (
  <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <path d="M9 12.5l2-2 2 2" fill="none" />
  </svg>
);

const BrainIcon = () => (
  <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
);

const SingleHouseIcon = () => (
  <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const PriceTagIcon = () => (
  <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2" />
    <path d="M10 13h4M12 11v4" />
  </svg>
);

// Right side circular icons (Investo approach - gold theme)
const TargetStrategyIcon = () => (
  <svg className="w-5 h-5 text-[#d4b27c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
  </svg>
);

const DataAnalysisIcon = () => (
  <svg className="w-5 h-5 text-[#d4b27c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <circle cx="18" cy="10" r="2" />
    <path d="M20 12l1.5 1.5" />
  </svg>
);

const NetworkStrategyIcon = () => (
  <svg className="w-5 h-5 text-[#d4b27c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="12" r="2.5" />
    <circle cx="12" cy="19" r="2.5" />
    <line x1="12" y1="7.5" x2="6" y2="12" />
    <line x1="12" y1="7.5" x2="18" y2="12" />
    <line x1="6" y1="12" x2="12" y2="19" />
    <line x1="18" y1="12" x2="12" y2="19" />
  </svg>
);

const AdvisorShieldIcon = () => (
  <svg className="w-5 h-5 text-[#d4b27c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 11l2 2 4-4" />
  </svg>
);

interface WhyInvestoSectionProps {
  onCtaClick?: () => void;
}

export default function WhyInvestoSection({ onCtaClick }: WhyInvestoSectionProps) {
  const { t } = useLanguage();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [activeDetailRow, setActiveDetailRow] = useState<ComparisonRow | null>(null);

  const comparisonRows: ComparisonRow[] = [
    {
      id: "approach",
      rowLabel: "Vorgehensweise",
      detailTitle: "Das einzelne Objekt vs. persönliche Strategie",
      classicText: "Das einzelne Objekt zuerst",
      classicDesc: "Beim klassischen Immobilienkauf steht häufig ein aktuell verfügbares Objekt am Anfang. Ob es langfristig zur finanziellen Situation und zur persönlichen Zielsetzung passt, wird oft erst im nächsten Schritt betrachtet.",
      investoText: "Ihre persönliche Strategie zuerst",
      investoDesc: "Bevor wir konkrete Immobilien auswählen, betrachten wir Ihre persönliche Ausgangssituation, Ihre finanziellen Möglichkeiten und Ihre langfristigen Ziele. Auf dieser Grundlage entwickeln wir eine passende Immobilienstrategie.",
      classicIcon: SearchHouseIcon,
      investoIcon: TargetStrategyIcon,
    },
    {
      id: "analysis",
      rowLabel: "Entscheidungsbasis",
      detailTitle: "Einzelbetrachtung vs. datenbasierte Gesamtanalyse",
      classicText: "Einzelbetrachtung des Objekts",
      classicDesc: "Häufig konzentriert sich die Kaufentscheidung auf einzelne Kennzahlen oder den persönlichen Eindruck. Finanzierung, laufende Kosten, Standortqualität und Vermietbarkeit werden dabei nicht immer im Gesamtzusammenhang betrachtet.",
      investoText: "Ganzheitliche, datenbasierte Analyse",
      investoDesc: "Wir analysieren Standort, Kaufpreis, Mietpotenzial, Finanzierung, laufende Kosten, Instandhaltungsrücklagen und langfristiges Entwicklungspotenzial. Aktuelle Markt- und Standortdaten schaffen eine fundierte Grundlage für Ihre Entscheidung.",
      classicIcon: BrainIcon,
      investoIcon: DataAnalysisIcon,
    },
    {
      id: "horizon",
      rowLabel: "Planungshorizont",
      detailTitle: "Einzelner Immobilienkauf vs. strategischer 10-Jahres-Investmentplan",
      classicText: "Der aktuelle Immobilienkauf",
      classicDesc: "Beim klassischen Immobilienkauf steht meist der Erwerb eines einzelnen Objekts im Mittelpunkt. Mögliche weitere Investitionen und der langfristige Aufbau eines Immobilienportfolios werden dabei häufig noch nicht berücksichtigt.",
      investoText: "Strategischer 10-Jahres-Investmentplan",
      investoDesc: "Gemeinsam entwickeln wir einen individuellen Fahrplan für den schrittweisen Aufbau Ihres Immobilienportfolios – abgestimmt auf Ihre Ziele, finanziellen Möglichkeiten und Ihren persönlichen Zeithorizont. Der 10-Jahres-Plan dient als langfristige Orientierung und wird regelmäßig an Ihre persönliche Entwicklung angepasst.",
      classicIcon: SingleHouseIcon,
      investoIcon: NetworkStrategyIcon,
    },
    {
      id: "support",
      rowLabel: "Begleitung",
      detailTitle: "Kaufabschluss im Fokus vs. langfristige Begleitung",
      classicText: "Fokus auf den Kaufabschluss",
      classicDesc: "Beim klassischen Ablauf endet die Begleitung häufig mit dem Notartermin oder der Übergabe der Immobilie. Die weitere Entwicklung des Investments liegt anschließend beim Käufer.",
      investoText: "Persönliche Betreuung – auch über den Kauf hinaus",
      investoDesc: "Wir begleiten Sie von der ersten Strategie über die Immobilienauswahl und Finanzierungskoordination bis zum Kauf und zur Übergabe. Auch danach bleiben wir Ihr persönlicher Ansprechpartner für die nächsten Schritte und die langfristige Entwicklung Ihres Immobilienportfolios.",
      classicIcon: PriceTagIcon,
      investoIcon: AdvisorShieldIcon,
    },
  ];

  return (
    <section className="relative bg-[#16273D] text-white py-24 px-4 md:px-8 lg:px-12 overflow-hidden border-t border-white/5" id="why-investo-section">
      
      {/* Blueprint background lines (Architectural elegance) */}
      <div className="absolute right-[-10%] bottom-[-5%] w-[45%] h-[55%] pointer-events-none opacity-[0.015] select-none mix-blend-screen">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
          alt={t("Technical blueprint draft layout")}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter invert"
        />
      </div>

      {/* Ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#d4b27c]/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-950/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 md:mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] md:text-xs font-sans font-extrabold tracking-[0.25em] text-[#d4b27c] uppercase">{t("WARUM INVESTO")}</span>
            <div className="w-10 h-[1.5px] bg-[#d4b27c] mt-3 mb-6" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.15]"
          >{t("Warum ")}<span className="text-[#d4b27c] font-normal italic font-serif">{t("Investo")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs md:text-sm lg:text-base font-sans font-light text-white/50 max-w-xl mt-4 leading-relaxed"
          >{t("Was einen klassischen Immobilienkauf von unserem strategischen Ansatz unterscheidet.")}</motion.p>
        </div>

        {/* COMPARISON GRID CONTAINER */}
        <div className="relative max-w-5xl mx-auto mb-16" id="comparison-layout">
          
          {/* Main Table Structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-stretch relative">
            
            {/* COLUMN LEFT: Klassischer Immobilienkauf */}
            <div className="bg-[#091726]/20 border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/[0.01] rounded-full blur-2xl pointer-events-none" />
              
              {/* Header */}
              <div className="text-center md:text-left mb-8 min-h-[84px] border-b border-white/5 pb-5">
                <span className="text-[10px] font-sans font-extrabold tracking-widest text-white/40 uppercase block mb-1">{t("HERKÖMMLICHER WEG")}</span>
                <h3 className="font-serif text-lg md:text-xl text-white/80 font-normal">{t("Klassischer Immobilienkauf")}</h3>
              </div>

              {/* Classic Row Elements */}
              <div className="space-y-6 lg:space-y-8">
                {comparisonRows.map((row, idx) => {
                  const ClassicIcon = row.classicIcon;
                  const isHovered = hoveredRow === row.id;

                  return (
                    <div
                      key={row.id}
                      onMouseEnter={() => setHoveredRow(row.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onClick={() => setActiveDetailRow(row)}
                      className={`flex items-center space-x-4 p-4 md:min-h-[112px] rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isHovered 
                          ? 'bg-white/[0.03] border-white/10 translate-x-1' 
                          : 'bg-transparent border-transparent'
                      }`}
                    >
                      {/* Stylized circle icon container */}
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 bg-[#040911]/60">
                        <ClassicIcon />
                      </div>
                      
                      <div className="text-left flex-1">
                        <span className="text-[9px] font-sans font-bold text-white/30 uppercase tracking-widest block mb-0.5">
                          {t(row.rowLabel)}
                        </span>
                        <p className="text-sm md:text-base font-sans text-white/70 font-light">
                          {t(row.classicText)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VERTICAL CONNECTIONS DOT LINE & ARROW STEPS (Desktop MD+ only) */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col justify-around items-center pointer-events-none z-20 hidden md:flex">
              
              {/* Decorative continuous vertical connecting gold line */}
              <div className="absolute top-16 bottom-16 w-[1.5px] bg-gradient-to-b from-[#e5cc9c]/20 via-[#d4b27c]/60 to-[#b0915c]/20" />

              {/* Dynamic animated gold light flow down the line */}
              <motion.div
                animate={{
                  y: ['-200px', '200px']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute w-[2px] h-20 bg-gradient-to-b from-transparent via-[#d4b27c] to-transparent"
              />

              {/* Arrow Indicator Nodes */}
              {comparisonRows.map((row) => {
                const isHovered = hoveredRow === row.id;

                return (
                  <motion.div
                    key={row.id}
                    animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shadow-md ${
                      isHovered
                        ? 'bg-[#d4b27c] border-[#d4b27c] text-black shadow-[0_0_15px_rgba(212,178,124,0.4)]'
                        : 'bg-[#091726] border-[#d4b27c]/40 text-[#d4b27c]'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                );
              })}

            </div>

            {/* COLUMN RIGHT: Strategisch begleitet investieren (Highlighted visually with gold outline & premium glow) */}
            <div className="bg-[#091726]/40 border-2 border-[#d4b27c]/80 rounded-[2rem] p-6 lg:p-8 flex flex-col justify-between backdrop-blur-md relative shadow-[0_20px_50px_rgba(212,178,124,0.08)]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4b27c]/[0.02] rounded-full blur-3xl pointer-events-none" />
              
              {/* Header */}
              <div className="text-center md:text-left mb-8 min-h-[84px] border-b border-[#d4b27c]/20 pb-5">
                <span className="text-[10px] font-sans font-extrabold tracking-widest text-[#d4b27c] uppercase block mb-1">{t("DER INVESTO-WEG")}</span>
                <h3 className="font-serif text-lg md:text-xl text-white font-normal">{t("Strategisch begleitet investieren")}</h3>
              </div>

              {/* Investo Row Elements */}
              <div className="space-y-6 lg:space-y-8">
                {comparisonRows.map((row, idx) => {
                  const InvestoIcon = row.investoIcon;
                  const isHovered = hoveredRow === row.id;

                  return (
                    <div
                      key={row.id}
                      onMouseEnter={() => setHoveredRow(row.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onClick={() => setActiveDetailRow(row)}
                      className={`flex items-center space-x-4 p-4 md:min-h-[112px] rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isHovered 
                          ? 'bg-[#d4b27c]/5 border-[#d4b27c]/30 -translate-x-1' 
                          : 'bg-transparent border-transparent'
                      }`}
                    >
                      {/* Highly styled glowing gold icon container with micro floating animation */}
                      <motion.div
                        animate={isHovered ? {
                          y: [0, -3, 0],
                        } : {}}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 bg-[#040911]/90 transition-all duration-300 ${
                          isHovered ? 'border-[#d4b27c] shadow-[0_0_12px_rgba(212,178,124,0.25)]' : 'border-[#d4b27c]/30'
                        }`}
                      >
                        <InvestoIcon />
                      </motion.div>
                      
                      <div className="text-left flex-1">
                        <span className="text-[9px] font-sans font-bold text-[#d4b27c]/60 uppercase tracking-widest block mb-0.5">
                          {t(row.rowLabel)}
                        </span>
                        <p className="text-sm md:text-base font-sans text-white font-bold tracking-wide">
                          {t(row.investoText)}
                        </p>
                      </div>

                      {/* Detail hint badge */}
                      <span className="text-[9px] font-sans font-extrabold tracking-wider text-[#d4b27c]/40 group-hover:text-[#d4b27c] uppercase">{t("INFO")}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM INTEGRITY STATEMENT CAPSULE */}
        <div className="relative max-w-3xl mx-auto" id="why-investo-footer">
          
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/5 pointer-events-none" />
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#d4b27c]/30 hidden md:block" />
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#d4b27c]/30 hidden md:block" />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-xl bg-[#040911]/80 border border-white/10 rounded-full px-8 py-4 flex items-center justify-center space-x-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] z-10"
          >
            <div className="w-7 h-7 rounded-full bg-[#d4b27c]/15 border border-[#d4b27c]/30 flex items-center justify-center text-[#d4b27c] shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            
            <p className="text-xs md:text-sm font-sans font-light text-white/90 leading-none">{t("Strategisch. Datenbasiert. ")}<span className="text-[#d4b27c] font-semibold">{t("Persönlich begleitet.")}</span>
            </p>
          </motion.div>
        </div>

      </div>

      {/* DETAILED INTERACTIVE POPUP DIALOG */}
      <AnimatePresence>
        {activeDetailRow && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop filter closed on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailRow(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#091726] to-[#040911] border border-white/10 rounded-3xl p-6 md:p-8 text-left shadow-2xl z-10 max-h-[90dvh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDetailRow(null)}
                className="absolute top-5 right-5 p-1.5 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col">
                {/* Identifier */}
                <span className="text-[9px] md:text-[10px] font-sans font-bold tracking-[0.15em] md:tracking-[0.25em] text-[#d4b27c] uppercase mb-1 pr-8">{t("DETAILVERGLEICH — ")}{t(activeDetailRow.rowLabel)}
                </span>

                {/* Big serif title */}
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-6">
                  {t(activeDetailRow.detailTitle)}
                </h3>

                {/* Comparison Columns Container inside the modal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-6">
                  
                  {/* Left Side: Classic */}
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col text-left">
                    <span className="text-[10px] font-sans font-bold text-white/40 uppercase tracking-widest block mb-3">{t("HERKÖMMLICHER WEG")}</span>
                    <h4 className="text-sm font-sans font-extrabold text-white/80 mb-2">
                      {t(activeDetailRow.classicText)}
                    </h4>
                    <p className="text-xs md:text-sm text-white/60 font-sans leading-relaxed font-light">
                      {t(activeDetailRow.classicDesc)}
                    </p>
                  </div>

                  {/* Right Side: Investo (Gold accent border) */}
                  <div className="p-5 bg-[#d4b27c]/5 border border-[#d4b27c]/20 rounded-2xl flex flex-col text-left">
                    <span className="text-[10px] font-sans font-bold text-[#d4b27c] uppercase tracking-widest block mb-3">{t("DER INVESTO-WEG")}</span>
                    <h4 className="text-sm font-sans font-extrabold text-white mb-2">
                      {t(activeDetailRow.investoText)}
                    </h4>
                    <p className="text-xs md:text-sm text-white/95 font-sans leading-relaxed font-light">
                      {t(activeDetailRow.investoDesc)}
                    </p>
                  </div>

                </div>

                {/* Primary strategy check trigger button */}
                <button
                  onClick={() => {
                    setActiveDetailRow(null);
                    if (onCtaClick) onCtaClick();
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-[#d4b27c] to-[#e5cc9c] hover:brightness-110 text-black text-xs font-sans font-bold tracking-[0.15em] rounded-xl uppercase transition-all"
                >{t("KOSTENFREIEN STRATEGIE-CHECK STARTEN")}</button>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
