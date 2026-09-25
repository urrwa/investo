import { useActiveAnimation } from '../hooks/useActiveAnimation';
import OptimizedImage from './OptimizedImage';
import { useLanguage } from '../i18n';
import React from 'react';

interface PartnerLogo {
  id: string;
  name: string;
  url: string;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  { id: "partner-1", name: "ING", url: "/images/partner-1.jpg" },
  { id: "partner-2", name: "Sparkasse", url: "/images/partner-2.jpg" },
  { id: "partner-3", name: "Volksbanken Raiffeisenbanken", url: "/images/partner-3.jpg" },
  { id: "partner-4", name: "Schwäbisch Hall", url: "/images/partner-4.jpg" },
  { id: "partner-5", name: "HypoVereinsbank", url: "/images/partner-5.jpg" },
  { id: "partner-6", name: "Interhyp", url: "/images/partner-6.jpg" },
  { id: "partner-7", name: "Deutsche Bank", url: "/images/partner-7.jpg" },
  { id: "partner-8", name: "Dr. Klein", url: "/images/partner-8.jpg" },
];

// Repeat logos to guarantee an uninterrupted, seamless infinite marquee loop
const MARQUEE_LOGOS = [
  ...PARTNER_LOGOS,
  ...PARTNER_LOGOS,
];

export default function FinancingPartnersSection() {
  const { t } = useLanguage();
  const { ref, active } = useActiveAnimation<HTMLElement>();
  return (
    <section
      ref={ref}
      className="relative bg-[#16273D] text-white py-20 sm:py-24 lg:py-28 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-white/5"
      id="financing-partners-section"
    >
      {/* Subtle warm ambient illumination matching the luxury aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, rgb(212 178 124 / 0.015) 0%, transparent 72%)' }} />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Top Gold Category Pill / Tag */}
        <div
          className="flex items-center justify-center space-x-3 mb-4"
        >
          <div className="h-[1px] w-8 bg-[#d4b27c]/50" />
          <span className="text-[10px] md:text-xs font-sans font-extrabold tracking-[0.25em] text-[#d4b27c] uppercase">{t("FINANZIERUNGSNETZWERK")}</span>
          <div className="h-[1px] w-8 bg-[#d4b27c]/50" />
        </div>

        {/* Headline with Gold Accent */}
        <h2
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.15] max-w-3xl mx-auto"
        >{t("Unser Netzwerk aus")}{t(' ')}
          <span className="text-[#d4b27c] font-normal italic font-serif">{t("Finanzierungspartnern")}</span>
        </h2>

        {/* Description */}
        <p
          className="text-sm md:text-base font-sans font-light text-slate-300 max-w-2xl mx-auto leading-relaxed mt-5"
        >{t("Durch unser Netzwerk aus Banken und Finanzierungspartnern ermöglichen wir passende Finanzierungslösungen und begleiten unsere Investoren durch den gesamten Finanzierungsprozess.")}</p>

        {/* Continuous Horizontal Moving Logo Carousel */}
        <div
          className="relative mt-14 sm:mt-16 w-full overflow-hidden py-4"
        >
          {/* Left and Right Gradient Masks for Seamless Edge Fading */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 md:w-48 bg-gradient-to-r from-[#16273D] via-[#16273D]/90 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 md:w-48 bg-gradient-to-l from-[#16273D] via-[#16273D]/90 to-transparent z-10" />

          {/* Marquee Track Container */}
          <div className="flex overflow-hidden select-none">
            <div style={{ animationName: active ? undefined : "none", animationDuration: "20s" }} className="animate-partner-marquee flex items-center gap-10 sm:gap-14 md:gap-18">
              {MARQUEE_LOGOS.map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="h-20 sm:h-24 md:h-28 w-44 sm:w-52 md:w-64 flex items-center justify-center shrink-0 bg-white rounded-xl overflow-hidden border border-white/10 transition-transform duration-300 hover:scale-105"
                >
                  <OptimizedImage
                    src={logo.url}
                    sizes="(min-width: 768px) 254px, (min-width: 640px) 206px, 174px"
                    alt={t(logo.name)}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
