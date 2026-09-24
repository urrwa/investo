import { useLanguage } from '../i18n';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, AlertTriangle, ShieldCheck, Search, TrendingUp, Home, Target, ArrowRight, HelpCircle 
} from 'lucide-react';

interface MistakeItem {
  id: string;
  text: string;
  why: string;
  solution: string;
}

interface SolutionStep {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  icon: React.ComponentType<any>;
}

export default function ProblemSolutionSection() {
  const { t } = useLanguage();
  const [activeMistake, setActiveMistake] = useState<string | null>(null);
  const [activeSolutionStep, setActiveSolutionStep] = useState<string | null>(null);

  const mistakes: MistakeItem[] = [
    {
      id: 'ziel',
      text: 'Kauf ohne klare Ziel- und Strategiefestlegung',
      why: 'Ohne definiertes Ziel (Cashflow, Vermögensaufbau, Altersvorsorge) passt das Objekt selten zur persönlichen Lebensplanung.',
      solution: 'Erhebung Ihrer persönlichen Vorgaben und Ziele vor jeder Immobiliensuche.'
    },
    {
      id: 'finanzierung',
      text: 'Finanzierung zu spät oder unvollständig geprüft',
      why: 'Erst suchen, dann rechnen führt zu Zeitdruck und unberechenbaren Risiken.',
      solution: 'Frühzeitige Klärung von Budget, Eigenkapital und Finanzierungsrahmen.'
    },
    {
      id: 'standort',
      text: 'Standort und Vermietbarkeit falsch eingeschätzt',
      why: 'Günstige Preise täuschen oft über strukturschwache Lagen mit hohem Leerstandsrisiko hinweg.',
      solution: 'Systematische Standortbewertung nach Kaufkraft, Infrastruktur und Mieternachfrage.'
    },
    {
      id: 'vergleich',
      text: 'Angebote ohne objektiven Marktvergleich gewählt',
      why: 'Ohne neutrale Vergleichsdaten verlässt man sich auf die Versprechen des Verkäufers.',
      solution: 'Datenbasierte Prüfung und objektive Einordnung der Marktdaten.'
    }
  ];

  const solutions: SolutionStep[] = [
    {
      id: 'strategie',
      title: '1. Strategie & Zielanalyse',
      subtitle: 'Ausrichtung auf Ihre persönlichen Vorgaben',
      details: 'In einem strukturierten Gespräch erfassen wir Ihre finanziellen Ziele, Risikotoleranz und Zeiträume.',
      icon: Search
    },
    {
      id: 'finanzierung',
      title: '2. Finanzierungs-Check',
      subtitle: 'Klarheit über Budget & Konditionen',
      details: 'Wir ermitteln Ihren verlässlichen Finanzierungsrahmen und prüfen realistische Optionen.',
      icon: TrendingUp
    },
    {
      id: 'matching',
      title: '3. Immobilienauswahl',
      subtitle: 'Geprüfte Immobilien, passend zu Ihren Zielen und finanziellen Möglichkeiten.',
      details: 'Sie erhalten gezielte Vorschläge für Anlageimmobilien, die genau Ihren Kriterien entsprechen.',
      icon: Home
    },
    {
      id: 'umsetzung',
      title: '4. Begleitung & Umsetzung',
      subtitle: 'Transparenter Prozess bis zum Kauf',
      details: 'Wir stehen Ihnen im gesamten Kaufprozess mit klaren nächsten Schritten zur Seite.',
      icon: Target
    }
  ];

  return (
    <section className="relative bg-[#16273D] text-white py-24 px-4 md:px-8 lg:px-12 overflow-hidden border-t border-white/5" id="strategie-check">
      
      {/* Decorative background radial grids */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-950/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-950/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch relative">
          
          {/* Centered VS Badge with Glowing orbital rings */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden lg:flex items-center justify-center">
            {/* Outer dotted orbit */}
            <div className="absolute w-44 h-44 rounded-full border border-white/10 border-dashed animate-[spin_20s_linear_infinite]" />
            {/* Inner dotted orbit */}
            <div className="absolute w-32 h-32 rounded-full border border-investo-gold/20 border-dashed animate-[spin_10s_linear_reverse_infinite]" />
            {/* Solid glow core */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#0c1a29] to-[#040911] border border-investo-gold/30 flex items-center justify-center text-investo-gold font-serif text-sm font-bold tracking-widest shadow-[0_0_30px_rgba(212,178,124,0.15)] pointer-events-auto cursor-help group">
              <span className="transition-transform duration-300 group-hover:scale-110">{t("VS")}</span>
              {/* Secret tooltip */}
              <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-[#091726] border border-white/10 text-[10px] text-white/80 font-sans leading-relaxed p-3 rounded-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-center shadow-2xl pointer-events-none">
                <strong className="text-investo-gold block mb-1">{t("STRATEGIE VS. ZUFALL")}</strong>{t("Fehlentscheidungen kosten im Schnitt über 10 Jahre ca. € 45.000 an entgangener Rendite.")}</span>
            </div>
          </div>

          {/* LEFT SIDE: "DAS PROBLEM" */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            className="bg-[#040911]/60 border border-red-500/10 rounded-3xl p-6 md:p-8 xl:p-10 flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            id="problem-card"
          >
            {/* Dark moody background image overlay for "The Problem" */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-10 mix-blend-luminosity">
              <img
                src="https://res.cloudinary.com/dpwfzo2vk/image/upload/v1788219187/Courtyard_House_1-13_jj0ch6.jpg"
                alt={t("Courtyard House Architecture")}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter grayscale contrast-125"
              />
            </div>

            <div className="relative z-10">
              {/* Badge */}
              <span className="text-[10px] font-sans font-extrabold tracking-[0.25em] text-rose-500 uppercase block mb-3">{t("DIE HERAUSFORDERUNG")}</span>

              {/* Main Headline */}
              <h3 className="font-serif text-3xl md:text-4xl xl:text-5xl font-normal leading-[1.12] text-white mb-4">{t("Warum eine klare ")}<br />{t("Strategie vor dem ")}<br />{t("Immobilienkauf ")}<span className="text-rose-500 italic font-serif">{t("entscheidend ist.")}</span>
              </h3>

              {/* Supporting text */}
              <p className="text-xs md:text-sm font-sans font-light text-white/60 leading-relaxed mb-6 max-w-md">{t("Oft wird nach Gefühl gekauft, anstatt Finanzierung, Standort und Rendite genau abzuwägen.")}</p>

              {/* Typische Fehler Sub */}
              <p className="text-xs font-sans font-bold text-white/50 uppercase tracking-widest mb-4">{t("Typische Fehler:")}</p>

              {/* List of mistakes */}
              <div className="space-y-3.5 mb-8">
                {mistakes.map((mistake) => (
                  <div
                    key={mistake.id}
                    onClick={() => setActiveMistake(activeMistake === mistake.id ? null : mistake.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-start text-left group ${
                      activeMistake === mistake.id
                        ? 'bg-rose-950/20 border-rose-500/30'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Circle X icon */}
                    <div className="w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mr-4 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>

                    <div className="flex-1">
                      <span className="text-xs md:text-sm font-sans font-semibold text-white/90 group-hover:text-white transition-colors">
                        {t(mistake.text)}
                      </span>
                      
                      <AnimatePresence>
                        {activeMistake === mistake.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs text-rose-400/90 leading-relaxed font-sans font-light">
                              <strong className="font-bold">{t("Auswirkung:")}</strong> {t(mistake.why)}
                            </p>
                            <p className="text-xs text-emerald-400/90 leading-relaxed font-sans font-light mt-1.5 border-t border-white/5 pt-1.5">
                              <strong className="font-bold">{t("Besserer Weg:")}</strong> {t(mistake.solution)}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="text-[10px] text-white/30 font-sans ml-2 self-start pt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {t(activeMistake === mistake.id ? 'Schließen' : 'Details')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Warning box on bottom */}
            <div className="relative z-10 bg-rose-950/15 border border-rose-500/20 rounded-2xl p-4 md:p-5 flex items-start space-x-3.5">
              <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0 mt-0.5">
                <AlertTriangle className="w-4.5 h-4.5" />
              </div>
              <div className="text-left font-sans text-xs md:text-sm leading-relaxed">
                <p className="text-white/60">{t("Fehler kosten nicht nur Geld,")}</p>
                <p className="text-rose-500 font-bold mt-0.5">{t("sondern auch Zeit und Chancen.")}</p>
              </div>
            </div>

          </motion.div>

          {/* RIGHT SIDE: "DIE LÖSUNG" */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            className="bg-[#091726]/60 border border-investo-gold/10 rounded-3xl p-6 md:p-8 xl:p-10 flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            id="solution-card"
          >
            {/* Glowing traditional house background image overlay for "The Solution" */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
              <img
                src="https://res.cloudinary.com/dpwfzo2vk/image/upload/v1788219205/202600530_xbxzux.jpg"
                alt={t("Unser Ansatz Architektur Hintergrund")}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="relative z-10">
              {/* Badge */}
              <span className="text-[10px] font-sans font-extrabold tracking-[0.25em] text-investo-gold uppercase block mb-3">{t("UNSER ANSATZ")}</span>

              {/* Main Headline */}
              <h3 className="font-serif text-3xl md:text-4xl xl:text-5xl font-normal leading-[1.12] text-white mb-4">{t("Strukturierte ")}<br />
                <span className="text-investo-gold italic font-serif">{t("Strategie")}</span>{t(" für Ihre ")}<br />{t("Kapitalanlage.")}</h3>

              {/* Solution Subtext */}
              <p className="text-xs md:text-sm font-sans font-light text-white/60 leading-relaxed mb-8 max-w-md">{t("Wir begleiten Sie schrittweise von der ersten Analyse bis zur passenden Immobilienentscheidung.")}</p>

              {/* Elegant timeline stepper on the right */}
              <div className="relative pl-6 md:pl-8 border-l border-white/10 space-y-6 mb-8 text-left">
                {solutions.map((step, idx) => {
                  const IconComp = step.icon;
                  const isCurrent = activeSolutionStep === step.id;
                  return (
                    <div 
                      key={step.id} 
                      onClick={() => setActiveSolutionStep(activeSolutionStep === step.id ? null : step.id)}
                      className="relative group cursor-pointer"
                    >
                      {/* Node circle on timeline */}
                      <span className={`absolute left-[-29px] md:left-[-37px] top-1.5 w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
                        isCurrent
                          ? 'bg-[#d4b27c] border-[#d4b27c] scale-125'
                          : 'bg-[#091726] border-white/20 group-hover:border-investo-gold'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-black' : 'bg-white/40'}`} />
                      </span>

                      {/* Content block */}
                      <div className="flex items-start space-x-3.5 p-2 rounded-xl transition-all duration-300 group-hover:bg-white/5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                          isCurrent 
                            ? 'bg-investo-gold border-investo-gold text-black' 
                            : 'bg-[#122336] border-white/5 text-white/70'
                        }`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-white">
                            {t(step.title)}
                          </h4>
                          <p className="text-xs text-white/50 font-sans mt-0.5 group-hover:text-white/80 transition-colors">
                            {t(step.subtitle)}
                          </p>

                          <AnimatePresence>
                            {isCurrent && (
                              <motion.p
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="text-xs text-white/70 leading-relaxed font-sans font-light border-t border-white/10 pt-2"
                              >
                                {t(step.details)}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        <span className="text-[9px] font-mono text-white/30 self-start pt-1">
                          {t(isCurrent ? 'weniger' : 'mehr')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Gold Check Shield box on bottom */}
            <div className="relative z-10 bg-emerald-500/[0.04] border border-[#d4b27c]/20 rounded-2xl p-4 md:p-5 flex items-start space-x-3.5">
              <div className="w-8 h-8 rounded-full bg-investo-gold/10 flex items-center justify-center text-investo-gold shrink-0 mt-0.5">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div className="text-left font-sans text-xs md:text-sm leading-relaxed">
                <p className="text-white/60">{t("Für fundierte Entscheidungen,")}</p>
                <p className="text-investo-gold font-bold mt-0.5">{t("die langfristig Werte schaffen.")}</p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
