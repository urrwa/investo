import { useLanguage } from '../i18n';
import React, { useState } from 'react';
import { Phone, Mail, MapPin, X, Shield, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onContactClick?: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const navLinks = [
    { label: 'Strategie', href: '#strategie-check-section' },
    { label: 'Philosophie', href: '#investment-philosophy-section' },
    { label: 'Ablauf', href: '#investment-path-section' },
    { label: 'Käufer & Anleger', href: '#target-groups-section' },
    { label: 'Über Investo', href: '#trust-authority-section' },
    { label: 'FAQ', href: '#faq-section' },
  ];

  const legalLinks = [
    { label: 'Impressum', key: 'impressum' },
    { label: 'Datenschutz', key: 'datenschutz' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer 
        className="bg-[#16273D] text-slate-200 pt-16 pb-12 px-6 md:px-10 lg:px-12 border-t border-white/10 relative overflow-hidden" 
        id="main-footer"
      >
        {/* Maximum content width container */}
        <div className="max-w-[1220px] mx-auto">
          
          {/* DESKTOP 4-COLUMN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14">
            
            {/* COLUMN 1 – BRAND */}
            <div className="flex flex-col items-start text-left">
              <img
                src="https://res.cloudinary.com/dpwfzo2vk/image/upload/v1785267703/Ej5y1HdJNBRpyxVBnT39eVSRs_1_kud5ck.png"
                alt={t("INVESTO IMMOBILIEN Logo")}
                className="w-[195px] md:w-[205px] h-auto object-contain mb-6"
                referrerPolicy="no-referrer"
              />
              <p className="text-xs md:text-[13px] font-sans text-slate-300 leading-relaxed max-w-xs mb-4 font-light">{t("Strategische Immobilienberatung, KI-gestützte Analyse und ausgewählte Anlageimmobilien.")}</p>
              <p className="text-xs md:text-[13px] font-sans font-bold text-[#D8A24E] tracking-tight">{t("Erst die Strategie. Dann die Immobilie.")}</p>
            </div>

            {/* COLUMN 2 – NAVIGATION */}
            <div className="flex flex-col items-start text-left">
              <h3 className="text-xs md:text-sm font-sans font-bold text-white tracking-[0.18em] uppercase mb-5">{t("NAVIGATION")}</h3>
              <ul className="space-y-2.5 font-sans text-xs md:text-[13.5px]">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="text-slate-300 hover:text-[#D8A24E] transition-colors duration-200 inline-block font-light"
                    >
                      {t(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3 – KONTAKT */}
            <div className="flex flex-col items-start text-left">
              <h3 className="text-xs md:text-sm font-sans font-bold text-white tracking-[0.18em] uppercase mb-5">{t("KONTAKT")}</h3>
              <div className="space-y-3 font-sans text-xs md:text-[13.5px] text-slate-300 font-light">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#D8A24E] shrink-0 stroke-[1.8]" />
                  <a href="tel:+491757111188" className="hover:text-[#D8A24E]">+49 (0) 175 7111 188</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#D8A24E] shrink-0 stroke-[1.8]" />
                  <a href="mailto:info@investo-immobilien.de" className="break-all hover:text-[#D8A24E]">{t("info@investo-immobilien.de")}</a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#D8A24E] shrink-0 stroke-[1.8] mt-0.5" />
                  <span>{t("Maximilianstraße 15c")}<br />{t("87719 Mindelheim")}</span>
                </div>
              </div>
            </div>

            {/* COLUMN 4 – RECHTLICHES */}
            <div className="flex flex-col items-start text-left">
              <h3 className="text-xs md:text-sm font-sans font-bold text-white tracking-[0.18em] uppercase mb-5">{t("RECHTLICHES")}</h3>
              <ul className="space-y-2.5 font-sans text-xs md:text-[13.5px]">
                {legalLinks.map((item) => (
                  <li key={item.key}>
                    <button
                      onClick={() => setActiveModal(item.key)}
                      className="text-slate-300 hover:text-[#D8A24E] transition-colors duration-200 inline-block text-left font-light cursor-pointer"
                    >
                      {t(item.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* LEGAL INFORMATION AREA */}
          <div className="border-t border-white/10 pt-6 pb-6">
            <p className="text-[11px] md:text-xs font-sans text-slate-400 leading-relaxed font-light text-left">
              <strong className="font-semibold text-slate-300">{t("Rechtlicher Hinweis:")}</strong>{t(" Alle dargestellten Informationen dienen der allgemeinen Information. Es werden keine Renditen, Wertsteigerungen, Finanzierungen oder steuerlichen Vorteile garantiert. Steuerliche, rechtliche und finanzielle Fragen sollten mit entsprechend qualifizierten Fachberatern geklärt werden.")}</p>
          </div>

          {/* BOTTOM FOOTER ROW */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] md:text-xs font-sans text-slate-400 font-light">
            <div>{t("© 2026 INVESTO IMMOBILIEN. Alle Rechte vorbehalten.")}</div>

          </div>

        </div>
      </footer>

      {/* LEGAL MODAL DIALOG FOR IMPRESSUM / DATENSCHUTZ */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-[#0c1a29] border border-white/10 rounded-2xl p-6 md:p-8 text-white shadow-2xl z-10"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#D8A24E]/10 border border-[#D8A24E]/30 flex items-center justify-center text-[#D8A24E]">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base md:text-lg font-serif font-normal text-white">
                  {t(legalLinks.find(l => l.key === activeModal)?.label)}
                </h3>
              </div>

              <div className="text-xs md:text-sm font-sans font-light text-slate-300 leading-relaxed space-y-3 my-4 max-h-[60vh] overflow-y-auto pr-2">
                {activeModal === 'impressum' && (
                  <>
                    <p className="font-semibold text-white">{t("Anbieterkennzeichnung:")}</p>
                    <p>{t("Investo Immobilien UG")}<br />{t("Maximilianstraße 15c")}<br />{t("87719 Mindelheim, Deutschland")}</p>
                    <p><strong className="text-white">{t("Vertreten durch:")}</strong>{t(" Geschäftsführer Alpaslan Coskun")}</p>
                    <p><strong className="text-white">{t("Kontakt:")}</strong><br />{t("Telefon: +49 (0) 175 7111 188")}<br />{t("E-Mail: info@investo-immobilien.de")}</p>
                    <p><strong className="text-white">{t("Umsatzsteuer-ID:")}</strong>{t(" DE463921337")}</p>
                    <p><strong className="text-white">{t("Registereintrag:")}</strong><br />{t("Eintragung im Handelsregister.")}<br />{t("Registergericht: Amtsgericht Memmingen")}<br />{t("Registernummer: HRB 22308")}</p>
                    <p><a className="text-[#D8A24E] underline" href="https://www.investo-immobilien.de/impressum" target="_blank" rel="noopener noreferrer">{t("Vollständiges Impressum")}</a></p>
                  </>
                )}

                {activeModal === 'datenschutz' && (
                  <p><a className="text-[#D8A24E] underline" href="https://www.investo-immobilien.de/datenschutz" target="_blank" rel="noopener noreferrer">{t("Vollständige Datenschutzerklärung von Investo Immobilien lesen")}</a></p>
                )}

              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2 bg-[#D8A24E] hover:bg-white text-black text-xs font-bold tracking-wider rounded-lg uppercase transition-colors cursor-pointer"
                >{t("Schließen")}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
