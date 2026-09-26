import { useLanguage } from '../i18n';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import HeroArchitecture from './HeroArchitecture';
import type { TabType } from '../types';

interface HeroContentProps {
  onCtaClick?: () => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function HeroContent({ onCtaClick, activeTab, onTabChange }: HeroContentProps) {
  const { t } = useLanguage();
  return (
    <div
      className="hero-copy flex flex-col items-start text-left max-w-xl xl:max-w-2xl"
    >
      {/* Decorative tag */}
      <div
        className="inline-flex items-center space-x-2 bg-[#223247] px-3.5 py-1.5 rounded-full border border-white/10 mb-6"
      >
        <span className="w-2 h-2 rounded-full bg-investo-gold animate-pulse" />
        <span className="text-[10px] md:text-xs font-sans font-bold tracking-widest text-white/90 uppercase">{t("IMMOBILIEN ALS KAPITALANLAGE")}</span>
      </div>

      {/* Main Elegant Heading */}
      <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[40px] xl:text-[48px] 2xl:text-[52px] font-normal leading-[1.15] tracking-tight text-white mb-6">
        <span className="block font-serif text-white/95 whitespace-nowrap">{t("Erst die Strategie.")}</span>
        <span className="block font-serif text-white/95 mt-1 sm:mt-1.5">{t("Dann die")}</span>
        <span className="block font-serif text-investo-gold font-normal [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] select-none mt-1 sm:mt-1.5 whitespace-nowrap">{t("passende Immobilie.")}</span>
      </h1>

      {/* Concise Subheadline */}
      <p
        className="text-xs md:text-sm lg:text-[15px] font-sans font-light leading-relaxed text-slate-300 mb-8 max-w-lg"
      >{t("Mit unserem kostenfreien Strategie-Check erfahren Sie, welche Immobilienstrategie zu Ihren Zielen und finanziellen Möglichkeiten passt.")}</p>

      {/* Primary Gold Pill CTA Button */}
      <div className="relative z-10">
        <button
          onClick={onCtaClick}
          className="group hero-primary-cta relative inline-flex items-center justify-between px-7 py-4 bg-gradient-to-r from-investo-gold to-investo-gold-light text-[#040911] text-xs font-sans font-bold tracking-[0.15em] rounded-full uppercase shadow-[0_10px_30px_rgba(212,178,124,0.15)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(212,178,124,0.3)] hover:-translate-y-0.5 cursor-pointer overflow-hidden"
        >
          {/* Shimmer effect background */}
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          
          <span className="mr-5 select-none">{t("KOSTENFREIEN CHECK STARTEN")}</span>
          
          {/* Rounded black arrow container matching design */}
          <span className="flex items-center justify-center w-6 h-6 bg-[#040911] rounded-full text-investo-gold group-hover:translate-x-1.5 transition-transform duration-300">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>
      <HeroArchitecture activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
