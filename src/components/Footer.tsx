import { useLanguage } from '../i18n';
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onContactClick?: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const { t } = useLanguage();
  const isLandingPage = window.location.pathname === '/';

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
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
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
                      href={isLandingPage ? link.href : '/' + link.href}
                      onClick={isLandingPage ? (e) => handleScroll(e, link.href) : undefined}
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
                    <a
                      href={'/' + item.key}
                      aria-current={window.location.pathname.replace(/\/+$/, '') === '/' + item.key ? 'page' : undefined}
                      className="text-slate-300 hover:text-[#D8A24E] transition-colors duration-200 inline-block text-left font-light cursor-pointer"
                    >
                      {t(item.label)}
                    </a>
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

    </>
  );
}
