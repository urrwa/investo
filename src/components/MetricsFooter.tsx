import OptimizedImage from './OptimizedImage';
import { useLanguage } from '../i18n';
import React from 'react';
import { m as motion } from 'motion/react';
import { Target, TrendingUp, Home, Users, ArrowUpRight } from 'lucide-react';

interface MetricsFooterProps {
  onLearnMoreClick?: () => void;
  onMetricItemClick?: (metricName: string) => void;
}

export default function MetricsFooter({ onLearnMoreClick, onMetricItemClick }: MetricsFooterProps) {
  const { t } = useLanguage();
  const features = [
    {
      id: 'analyse',
      title: 'Strategische Analyse',
      icon: Target,
    },
    {
      id: 'finanzierung',
      title: 'Finanzierung verstehen',
      icon: TrendingUp,
    },
    {
      id: 'immobilien',
      title: 'Passende Immobilien',
      icon: Home,
    },
    {
      id: 'begleitung',
      title: 'Persönliche Begleitung',
      icon: Users,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center" id="metrics-footer">
      
      {/* 1. Dark Blue Container with 4 features */}
      <div className="col-span-1 lg:col-span-7" id="features-capsule">
        <div className="bg-[#0d1b2b] border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
            {features.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <div
                  key={feat.id}
                  onClick={() => onMetricItemClick?.(feat.title)}
                  className="flex flex-col items-center text-center p-3 hover:bg-white/5 rounded-xl transition-all duration-300 group cursor-pointer relative"
                >
                  {/* Icon with Gold circle back */}
                  <div className="w-10 h-10 rounded-full bg-[#16273b] border border-white/5 flex items-center justify-center text-investo-gold group-hover:text-white group-hover:bg-investo-gold transition-all duration-300 mb-3.5 shadow-sm group-hover:scale-105">
                    <IconComponent className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  
                  {/* Title */}
                  <span className="text-[11px] md:text-xs font-sans font-medium text-white/80 leading-snug group-hover:text-white transition-colors duration-200">
                    {t(feat.title)}
                  </span>

                  {/* Vertical separator lines for desktop */}
                  {idx < 3 && (
                    <div className="hidden md:block absolute right-0 top-1/4 w-[1px] h-1/2 bg-white/10 pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Customer Overlaps (Middle) */}
      <div className="col-span-1 sm:col-span-1 md:col-span-5 lg:col-span-2 flex flex-row items-center justify-center lg:justify-start space-x-4 md:pl-4" id="satisfied-clients">
        {/* Overlapping Avatar Stack */}
        <div className="flex -space-x-4">
          <div className="w-11 h-11 rounded-full border-2 border-[#030a13] overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer">
            <OptimizedImage sizes="44px"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
              alt={t("Investor Portrait 1")}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-11 h-11 rounded-full border-2 border-[#030a13] overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer">
            <OptimizedImage sizes="44px"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
              alt={t("Investor Portrait 2")}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Quantifier & Metric Label */}
        <div className="flex flex-col text-left">
          <span className="text-2xl md:text-3xl font-sans font-extrabold tracking-tight text-investo-gold leading-none">
            100+
          </span>
          <span className="text-[11px] md:text-xs font-sans text-white/50 mt-1 leading-tight">{t("Begleitete")}<br />{t("Immobilienkäufe")}</span>
        </div>
      </div>

      {/* 3. Text & Underline Link (Right) */}
      <div className="col-span-1 lg:col-span-3 flex flex-col items-center lg:items-end text-center lg:text-right" id="tagline-action">
        <div className="flex flex-col font-sans text-sm md:text-base font-extrabold tracking-[0.14em] text-white/90 leading-relaxed uppercase">
          <span>{t("Strategisch denken.")}</span>
          <span className="mt-0.5">{t("Werte ")}<span className="text-investo-gold">{t("schaffen.")}</span>
          </span>
        </div>

        {/* Highlight action link */}
        <button
          onClick={onLearnMoreClick}
          className="group inline-flex items-center space-x-1.5 mt-3.5 text-xs font-sans font-bold tracking-[0.18em] text-white/90 hover:text-investo-gold transition-colors duration-200 cursor-pointer uppercase pb-0.5 border-b border-white/20 hover:border-investo-gold"
        >
          <span>{t("Mehr erfahren")}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-investo-gold" />
        </button>
      </div>

    </div>
  );
}
