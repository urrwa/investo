import { useLanguage } from '../i18n';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Calculator, Home, Users, ArrowUpRight, ShieldCheck, TrendingUp, Sparkles, X, Check, FileText, BarChart3, HelpCircle } from 'lucide-react';

interface PromiseCardProps {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  description: string;
  popupDetails: {
    badge: string;
    headline: string;
    paragraph1: string;
    paragraph2: string;
    bullets: string[];
    statLabel: string;
    statVal: string;
  };
  onClick: () => void;
}

export default function PromiseSection() {
  const { t } = useLanguage();
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const pillars = [
    {
      id: 'strategie',
      icon: Target,
      title: 'Strategie vor Objekt',
      description: 'Wir analysieren Ihre Ziele, finanzielle Situation und Erwartungen, bevor eine Immobilie ausgewählt wird.',
      popupDetails: {
        badge: 'STRATEGIE-ANALYSE',
        headline: 'Strategie vor Objekt',
        paragraph1: 'Wir analysieren Ihre persönliche Situation, finanzielle Rahmenbedingungen und Wünsche vor der eigentlichen Immobiliensuche.',
        paragraph2: 'So vermeiden Sie Fehlkäufe und wählen gezielt Objekte, die langfristig zu Ihren Vorhaben passen.',
        bullets: [
          'Erfassung Ihrer Erwartungen und Wünsche',
          'Einordnung von Risikoprofil und Budget',
          'Klare Ausrichtung der Kaufentscheidung'
        ],
        statLabel: 'Fokus',
        statVal: '100% Individuell'
      }
    },
    {
      id: 'finanzierung',
      icon: Calculator,
      title: 'Finanzierung realistisch prüfen',
      description: 'Budget, Eigenkapital und Finanzierungsmöglichkeiten werden frühzeitig und nachvollziehbar eingeordnet.',
      popupDetails: {
        badge: 'FINANZIERUNGSPRÜFUNG',
        headline: 'Finanzierung realistisch prüfen',
        paragraph1: 'Kaufpreis, Eigenkapital und Zinsannahmen werden fundiert betrachtet, damit Sie mit klaren Zahlen planen können.',
        paragraph2: 'Wir prüfen die Machbarkeit und strukturieren das geplante Kaufvorhaben nachhaltig.',
        bullets: [
          'Transparente Eigenkapital-Prüfung',
          'Fundierte Betrachtung der Monatsobligationen',
          'Nachvollziehbare Finanzierungsstruktur'
        ],
        statLabel: 'Planungssicherheit',
        statVal: 'Fundiert'
      }
    },
    {
      id: 'immobilien',
      icon: Home,
      title: 'Datenbasiertes Immobilien-Matching',
      description: 'Immobilien werden anhand von Standort, Vermietbarkeit, Risiko und persönlicher Passung bewertet.',
      popupDetails: {
        badge: 'QUALITÄTS-CHECK',
        headline: 'Datenbasiertes Immobilien-Matching',
        paragraph1: 'Jede Immobilie wird systematisch geprüft: Lage, Qualität, Vermietbarkeit und langfristige Perspektive fließen in die Empfehlung ein.',
        paragraph2: 'Sie erhalten ausgewählte Optionen, die genau zu Ihrem Profil passen.',
        bullets: [
          'Systematische Standort- und Lageanalyse',
          'Prüfung von Vermietbarkeit und Objektqualität',
          'Auswahl passender Anlageimmobilien'
        ],
        statLabel: 'Auswahlkriterium',
        statVal: 'Qualität'
      }
    },
    {
      id: 'begleitung',
      icon: Users,
      title: 'Persönliche Begleitung',
      description: 'Von der ersten Analyse bis zur Auswahl und Umsetzung erhalten Sie einen klaren nächsten Schritt.',
      popupDetails: {
        badge: 'BEGLEITUNG',
        headline: 'Persönliche Begleitung',
        paragraph1: 'Wir stehen Ihnen bei jedem Schritt zur Seite – von der Strategieentscheidung bis hin zur gezielten Vorbereitung der Umsetzung.',
        paragraph2: 'Ein strukturierter Ablauf schafft Transparenz und Sicherheit bei jedem Kaufschritt.',
        bullets: [
          'Transparente Schritte und Vorbereitung',
          'Persönlicher Ansprechpartner',
          'Klarer Ablauf bis zum Notartermin'
        ],
        statLabel: 'Prozess',
        statVal: 'Strukturiert'
      }
    }
  ];

  const activePillarData = pillars.find(p => p.id === selectedPillar);

  return (
    <section className="relative bg-[#16273D] text-white py-24 px-6 md:px-12 lg:py-32 overflow-hidden border-t border-white/5" id="ueber-uns">
      
      {/* Subtle Background Luxury Villa Facade Outline */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=80"
          alt={t("Luxury architectural background")}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter grayscale"
        />
      </div>

      {/* Decorative luxury architectural background elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#16273D]/50 to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block exactly matching reference */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Small caps header */}
            <span className="text-[10px] md:text-xs font-sans font-extrabold tracking-[0.25em] text-[#d4b27c] uppercase">{t("KLARHEIT VOR DEM IMMOBILIENKAUF")}</span>
            {/* Small golden line matching mockup */}
            <div className="w-10 h-[1.5px] bg-[#d4b27c] mt-3 mb-6" />
          </motion.div>

          {/* Main heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white max-w-3xl leading-[1.15]"
          >{t("Fundierte Immobilienentscheidungen beginnen mit einer ")}<span className="text-[#d4b27c] font-normal italic font-serif">{t("klaren Strategie.")}</span>
          </motion.h2>

          {/* Subtext description */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs md:text-sm lg:text-base font-sans font-light text-slate-300 max-w-xl leading-relaxed mt-6"
          >{t("Wir verbinden persönliche Ziele, realistische Finanzierung und ausgewählte Immobilien zu einem nachvollziehbaren Entscheidungsprozess.")}</motion.p>
        </div>

        {/* The Overlapping Layout Container */}
        <div className="relative min-h-[500px] lg:min-h-[580px] flex items-center justify-center">
          
          {/* 4 Cards Grid - Layered beautifully in center */}
          <div className="w-full lg:max-w-5xl xl:max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 px-4 md:px-0" id="promise-pillars-container">
            {pillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 70, 
                    damping: 15,
                    delay: idx * 0.1 
                  }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.25, ease: 'easeOut' }
                  }}
                  onClick={() => setSelectedPillar(pillar.id)}
                  className="bg-[#102035] rounded-3xl p-6 md:p-8 border border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.2)] hover:border-[#d4b27c]/40 hover:bg-[#13263f] transition-all duration-300 flex flex-col justify-between items-center text-center cursor-pointer min-h-[360px] relative group"
                >
                  {/* Card upper content */}
                  <div className="flex flex-col items-center flex-1">
                    {/* Outline Icon in elegant gold circle */}
                    <div className="w-16 h-16 rounded-full border border-white/10 bg-[#16273D] flex items-center justify-center text-[#d4b27c] mb-6 group-hover:bg-[#d4b27c] group-hover:text-[#16273D] transition-all duration-300 shadow-sm group-hover:scale-105">
                      <IconComponent className="w-7 h-7 stroke-[1.4]" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-sans font-bold text-white mb-3 leading-snug">
                      {t(pillar.title)}
                    </h3>

                    {/* Gold Divider Line */}
                    <div className="w-8 h-[1px] bg-[#d4b27c] mb-4 group-hover:w-14 transition-all duration-300" />

                    {/* Short Description */}
                    <p className="text-xs text-slate-300 leading-relaxed font-sans px-2">
                      {t(pillar.description)}
                    </p>
                  </div>

                  {/* Read details prompt overlay */}
                  <div className="mt-4 flex items-center space-x-1 text-[10px] font-sans font-bold tracking-wider text-[#d4b27c] uppercase group-hover:text-white transition-colors">
                    <span>{t("Details ansehen")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Underneath Path with gold dots (Visible on lg+) */}
          <div className="absolute left-0 right-0 bottom-[40px] h-[40px] pointer-events-none hidden lg:block z-0" id="beizer-path-connector">
            <svg className="w-full h-full" viewBox="0 0 1200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Beautiful curving golden path */}
              <path
                d="M 100 20 Q 300 35 500 15 T 900 25 T 1100 20"
                stroke="#d4b27c"
                strokeWidth="1.5"
                strokeDasharray="1 5"
                opacity="0.6"
              />
            </svg>
          </div>

        </div>

        {/* Small team note below cards on mobile/tablet */}
        <div className="mt-12 text-center lg:hidden">
          <p className="text-xs font-sans text-slate-400 italic">{t("* Klicken Sie auf ein Versprechen, um tiefe Einblicke und Details zu erhalten.")}</p>
        </div>

      </div>

      {/* Interactive Detail Popup Modal */}
      <AnimatePresence>
        {selectedPillar && activePillarData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPillar(null)}
              className="absolute inset-0 bg-[#030a13]/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-[#102035] border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden text-left z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPillar(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 rounded-full transition-colors duration-200 cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col">
                {/* Upper Badge */}
                <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#d4b27c] uppercase mb-1">
                  {t(activePillarData.popupDetails.badge)}
                </span>

                {/* Headline */}
                <h3 className="text-2xl font-serif text-white font-semibold tracking-tight leading-tight mb-4">
                  {t(activePillarData.popupDetails.headline)}
                </h3>

                {/* Explanations */}
                <p className="text-xs md:text-sm text-slate-200 font-sans leading-relaxed mb-4">
                  {t(activePillarData.popupDetails.paragraph1)}
                </p>
                
                <p className="text-xs md:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                  {t(activePillarData.popupDetails.paragraph2)}
                </p>

                {/* Sub-Checklist */}
                <div className="bg-[#16273D] rounded-2xl p-4 border border-white/10 mb-6">
                  <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest block mb-3">{t("KERNASPEKTE DIESER LEISTUNG")}</span>
                  
                  <div className="space-y-2.5">
                    {activePillarData.popupDetails.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="text-xs text-slate-200 font-sans leading-tight">
                          {t(bullet)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Stat Block */}
                <div className="flex items-center justify-between p-4 bg-[#16273D] rounded-xl border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#102035] text-white flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-investo-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest leading-none">{t("METRIK & EFFEKT")}</p>
                      <p className="text-xs font-sans text-slate-300 mt-1 leading-none">
                        {t(activePillarData.popupDetails.statLabel)}
                      </p>
                    </div>
                  </div>
                  
                  <span className="text-xl md:text-2xl font-sans font-extrabold text-white leading-none">
                    {t(activePillarData.popupDetails.statVal)}
                  </span>
                </div>

                {/* Action CTA inside popup */}
                <button
                  onClick={() => {
                    setSelectedPillar(null);
                  }}
                  className="w-full mt-6 py-3 bg-[#d4b27c] text-[#16273D] text-xs font-sans font-bold tracking-widest hover:bg-white rounded-xl uppercase transition-colors"
                >{t("Jetzt Analyse starten")}</button>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
