import { useLanguage } from '../i18n';
import React from 'react';
import { motion } from 'motion/react';

interface InvestmentExamplesSectionProps {
  onCtaClick?: () => void;
}

export default function InvestmentExamplesSection({ onCtaClick }: InvestmentExamplesSectionProps) {
  const { t } = useLanguage();
  return (
    <section className="relative bg-[#16273D] py-14 sm:py-16 md:py-20 px-6 md:px-12 overflow-hidden border-t border-white/5" id="credibility-statistics-section">
      {/* Subtle warm ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#d4b27c]/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white rounded-3xl sm:rounded-[2rem] p-8 sm:p-10 lg:p-12 shadow-2xl border border-white/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 text-left relative overflow-hidden"
        >
          {/* Column 1 */}
          <div className="flex flex-col">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#d4b27c] font-normal leading-none tracking-tight">
              12+
            </span>
            <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg lg:text-xl mt-4 leading-snug">{t("Jahre")}<br />{t("Markterfahrung")}</h4>
            <p className="text-slate-500 font-sans text-xs sm:text-[13px] mt-2.5 leading-relaxed font-light">{t("Erfahrung im Immobilien- und Kapitalanlagemarkt")}</p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#d4b27c] font-normal leading-none tracking-tight">
              100+
            </span>
            <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg lg:text-xl mt-4 leading-snug">{t("Begleitete")}<br />{t("Immobilienkäufe")}</h4>
            <p className="text-slate-500 font-sans text-xs sm:text-[13px] mt-2.5 leading-relaxed font-light">{t("Strategisch begleitete Immobilieninvestments für private Anleger")}</p>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#d4b27c] font-normal leading-none tracking-tight">
              15+
            </span>
            <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg lg:text-xl mt-4 leading-snug">{t("Experten im")}<br />{t("Netzwerk")}</h4>
            <p className="text-slate-500 font-sans text-xs sm:text-[13px] mt-2.5 leading-relaxed font-light">{t("Etabliertes Netzwerk aus Bauträgern, Finanzierungspartnern und Immobilienexperten")}</p>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#d4b27c] font-normal leading-none tracking-tight">
              50+
            </span>
            <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg lg:text-xl mt-4 leading-snug">{t("Transaktionsvolumen")}<br />{t("(Mio €)")}</h4>
            <p className="text-slate-500 font-sans text-xs sm:text-[13px] mt-2.5 leading-relaxed font-light">{t("Begleitetes Volumen aus Immobilieninvestments")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
