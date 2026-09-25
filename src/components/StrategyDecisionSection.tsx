import OptimizedImage from './OptimizedImage';
import { useLanguage } from '../i18n';
import React, { useEffect, useRef, useState } from 'react';
import { m as motion } from 'motion/react';
import { ArrowRight, Search, Target, TrendingUp, Check, Shield, User, Clock, Play, Pause } from 'lucide-react';

interface StrategyDecisionSectionProps {
  onCtaClick?: () => void;
  onContactClick?: () => void;
}

export default function StrategyDecisionSection({ onCtaClick, onContactClick }: StrategyDecisionSectionProps) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [loadPoster, setLoadPoster] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isVisible = false;
    const updatePlayback = () => {
      if (isVisible && !document.hidden && !reducedMotion.matches && !pausedByUser.current) {
        void video.play().catch(() => { /* Keep the play control available if autoplay is blocked. */ });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      updatePlayback();
    }, { threshold: 0.25 });

    const posterObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setLoadPoster(true); posterObserver.disconnect(); }
    }, { rootMargin: "300px 0px" });
    posterObserver.observe(video);
    observer.observe(video);
    reducedMotion.addEventListener('change', updatePlayback);
    document.addEventListener('visibilitychange', updatePlayback);
    return () => {
      observer.disconnect();
      posterObserver.disconnect();
      reducedMotion.removeEventListener('change', updatePlayback);
      document.removeEventListener('visibilitychange', updatePlayback);
      video.pause();
    };
  }, []);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      void video.play().catch(() => { /* The poster remains visible if playback is unavailable. */ });
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  };

  const handleVideoError = () => {
    videoRef.current?.pause();
    setVideoFailed(true);
  };

  const steps = [
    {
      id: 1,
      label: 'ANALYSE',
      desc: 'Ihre persönliche Ausgangssituation verstehen',
      icon: Search,
      isGold: false,
    },
    {
      id: 2,
      label: 'STRATEGIE',
      desc: 'Ziele und finanzielle Möglichkeiten definieren',
      icon: Target,
      isGold: false,
    },
    {
      id: 3,
      label: 'PLANUNG',
      desc: 'Einen klaren Investitionsfahrplan entwickeln',
      icon: TrendingUp,
      isGold: false,
    },
    {
      id: 4,
      label: 'UMSETZUNG',
      desc: 'Passende Immobilien auswählen und die nächsten Schritte begleiten',
      icon: Check,
      isGold: true,
    },
  ];

  const highlights = [
    {
      id: 1,
      icon: Shield,
      title: 'Kostenfrei',
      sub: '& unverbindlich',
    },
    {
      id: 2,
      icon: User,
      title: 'Individuelle Analyse',
      sub: '',
    },
    {
      id: 3,
      icon: Clock,
      title: 'Klarer Investitionsfahrplan',
      sub: '',
    },
  ];

  return (
    <section 
      className="relative bg-[#16273D] text-white py-20 lg:py-24 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-white/5" 
      id="strategy-decision-section"
    >
      {/* Background soft curved vector lines to match high-end corporate theme */}
      <div className="absolute inset-0 pointer-events-none opacity-20 select-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M-100 200 C300 400, 600 100, 1000 300" stroke="#d4b27c" strokeWidth="0.5" strokeOpacity="0.4" />
          <path d="M-50 250 C330 430, 630 130, 1050 330" stroke="#d4b27c" strokeWidth="0.5" strokeOpacity="0.3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* UPPER MAIN LAYOUT: Text Column Left, Elegant Visual Card Right */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-16 items-center mb-16 md:mb-20">
          
          {/* LEFT COLUMN: Headings and Action CTAs */}
          <div className="xl:col-span-5 flex flex-col text-left">
            
            {/* Header label with line */}
            <div
              className="flex flex-col items-start mb-6"
            >
              <span className="text-[10px] md:text-xs font-sans font-extrabold tracking-[0.25em] text-investo-gold uppercase">{t("IHR NÄCHSTER SCHRITT")}</span>
              <div className="h-[1.5px] w-12 bg-investo-gold mt-2.5" />
            </div>

            {/* Title with exact coloring & linebreaks matching mockup */}
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-[46px] font-normal tracking-tight text-white leading-[1.12] mb-6"
            >{t("Starten Sie mit Ihrer ")}<br />{t("persönlichen ")}<br />
              <span className="text-investo-gold font-serif font-normal">{t("Strategieanalyse.")}</span>
            </h2>

            {/* Subtitle description */}
            <p
              className="text-xs md:text-sm lg:text-[15.5px] font-sans font-light text-slate-300 leading-relaxed mb-10 max-w-xl"
            >{t("Im kostenfreien Strategie-Check betrachten wir Ihre Ausgangssituation, definieren Ihre Ziele und zeigen Ihnen, welche nächsten Schritte für Sie sinnvoll sind – persönlich, transparent und ohne Druck.")}</p>

            {/* Two Premium Interactive Buttons - Stacked Vertically like Reference Image */}
            <div className="flex flex-col space-y-4 w-full max-w-lg">
              
              {/* Primary Filled Gold Button matching hero champagne-beige gradient */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onCtaClick}
                className="group relative overflow-hidden w-full bg-gradient-to-r from-investo-gold to-investo-gold-light text-[#040911] font-sans text-xs md:text-[13px] font-bold tracking-wider px-6 py-4.5 rounded-lg flex items-center justify-between space-x-3 shadow-[0_10px_30px_rgba(212,178,124,0.15)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(212,178,124,0.3)] hover:-translate-y-0.5 cursor-pointer uppercase text-left"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10">{t("KOSTENFREIEN STRATEGIE-CHECK STARTEN")}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] shrink-0 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              {/* Secondary Outline Navy Button */}
              <motion.button
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.99 }}
                onClick={onContactClick}
                className="w-full border border-white/20 text-white bg-transparent font-sans text-xs md:text-[13px] font-bold tracking-wider px-6 py-4.5 rounded-lg flex items-center justify-between space-x-3 transition-all cursor-pointer uppercase text-left hover:border-white/40"
              >
                <span>{t("PERSÖNLICHES ERSTGESPRÄCH VEREINBAREN")}</span>
                <ArrowRight className="w-4 h-4 stroke-[2] shrink-0" />
              </motion.button>

            </div>

          </div>

          {/* RIGHT COLUMN: Strategy timeline and property video */}
          <div className="xl:col-span-7 w-full">
            <div
              className="bg-[#102035] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-stretch gap-8 h-full"
            >
              
              {/* Card Left Part: The Weg / Journey Steps Timeline */}
              <div className="flex-1 flex flex-col justify-center relative z-10 text-left">
                
                {/* Internal Card Heading */}
                <h3 className="font-serif text-lg md:text-xl lg:text-2xl font-normal text-white mb-8 tracking-tight leading-tight">{t("Der Weg zu Ihrer passenden ")}<br />
                  <span className="text-investo-gold font-serif font-normal">{t("Immobilienstrategie.")}</span>
                </h3>

                {/* Steps Timeline Stack */}
                <div className="relative pl-12 space-y-6">
                  
                  {/* Timeline vertical line running behind icons */}
                  <div className="absolute left-5 top-4 bottom-4 w-[1px] bg-white/10" />

                  {steps.map((step) => {
                    const StepIcon = step.icon;

                    return (
                      <div key={step.id} className="relative flex flex-col justify-start group">
                        
                        {/* Circle Icon Badge */}
                        <div className={`absolute -left-12 top-0.5 w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
                          step.isGold 
                            ? 'bg-gradient-to-r from-investo-gold to-investo-gold-light text-[#040911] group-hover:scale-110 shadow-[0_4px_15px_rgba(212,178,124,0.25)]' 
                            : 'bg-[#16273D] text-white border border-white/10 group-hover:bg-investo-gold group-hover:text-[#040911]'
                        }`}>
                          <StepIcon className="w-4 h-4 stroke-[2]" />
                        </div>

                        {/* Step Label & Sub */}
                        <span className="text-[10px] md:text-xs font-sans font-extrabold tracking-widest text-white block mb-0.5">
                          {t(step.label)}
                        </span>
                        <span className="text-xs md:text-[13px] font-sans font-light text-slate-300 leading-tight">
                          {t(step.desc)}
                        </span>

                      </div>
                    );
                  })}

                </div>

              </div>

              {/* Property footage with a still poster and accessible playback control */}
              <div className="w-full md:w-[48%] relative aspect-square md:aspect-auto min-w-0 rounded-[1.5rem] overflow-hidden shadow-md shrink-0 z-10 group border border-white/10">
                <video
                  ref={videoRef}
                  aria-label={t("Video: Europäische Wohnimmobilien")}
                  poster={loadPoster ? "/images/optimized/strategy-property-video-poster-ac16f997-640.webp" : undefined}
                  preload="none"
                  muted
                  loop
                  playsInline
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onError={handleVideoError}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                >
                  <source src="/videos/strategy-property-tour.mp4" type="video/mp4" onError={handleVideoError} />
                </video>
                {videoFailed && (
                  <OptimizedImage
                    src="/images/strategy-property-video-poster.jpg"
                    sizes="(min-width: 1440px) 304.24px, (min-width: 1280px) calc(28vw - 98.96px), (min-width: 1024px) calc(48vw - 118.16px), (min-width: 768px) calc(48vw - 87.44px), calc(100vw - 116px)"
                    alt={t("Standbild europäischer Wohnimmobilien")}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                )}
                
                {/* Soft bottom gradient for the brand caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Subtle light reflections inside visual */}
                <div className="absolute inset-x-4 bottom-4 text-left select-none pointer-events-none">
                  <p className="font-mono text-[9px] tracking-wider text-white/50 uppercase">{t("INVESTO IMMOBILIEN")}</p>
                </div>
                {!videoFailed && (
                  <button
                    type="button"
                    onClick={toggleVideoPlayback}
                    aria-label={t(isVideoPlaying ? "Video pausieren" : "Video abspielen")}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full border border-white/30 bg-[#102035]/80 text-white flex items-center justify-center cursor-pointer hover:bg-[#102035] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {isVideoPlaying ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Play className="w-4 h-4" aria-hidden="true" />}
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM ROW: High Contrast Premium Trust highlights Bar */}
        <div
          className="bg-[#102035] border border-white/10 rounded-[1.5rem] px-8 py-6.5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 items-center shadow-xl relative"
        >
          {highlights.map((item, idx) => {
            const ItemIcon = item.icon;

            return (
              <div 
                key={item.id} 
                className={`flex items-start space-x-4 text-left relative ${
                  /* Elegant thin vertical dividers between blocks */
                  idx > 0 ? 'lg:pl-6' : ''
                }`}
              >
                {/* Vertical column divider only on desktop screens */}
                {idx > 0 && (
                  <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-[1px] bg-white/10" />
                )}

                {/* Styled gold thin outline icon badge */}
                <div className="w-10 h-10 rounded-full border border-investo-gold/30 flex items-center justify-center text-investo-gold shrink-0 bg-[#16273D] shadow-sm">
                  <ItemIcon className="w-4.5 h-4.5 stroke-[1.5]" />
                </div>

                {/* Text strings */}
                <div className="flex flex-col justify-center">
                  <span className="text-[12.5px] font-sans font-extrabold text-white leading-snug">
                    {t(item.title)}
                  </span>
                  <span className="text-[11.5px] font-sans font-light text-slate-300 leading-snug mt-0.5">
                    {t(item.sub)}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
