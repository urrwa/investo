import { useLanguage } from '../i18n';
import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause } from 'lucide-react';

interface PrincipleItem {
  id: number;
  text: string;
  icon: React.ComponentType<any>;
}

interface StatItem {
  id: number;
  value: string;
  numericVal: number;
  suffix: string;
  label: string;
  subLabel: string;
  icon: React.ComponentType<any>;
}

// Custom Premium Outline Icons matching reference design precisely
const ShieldCheckIcon = () => (
  <div className="w-11 h-11 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#d4b27c] shrink-0 shadow-sm group-hover:bg-[#062540] group-hover:text-[#d4b27c] group-hover:border-[#062540] transition-all duration-300">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 11 11 13 15 9" strokeWidth="2" />
    </svg>
  </div>
);

const ClockIcon = () => (
  <div className="w-11 h-11 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#d4b27c] shrink-0 shadow-sm group-hover:bg-[#062540] group-hover:text-[#d4b27c] group-hover:border-[#062540] transition-all duration-300">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" strokeWidth="1.75" />
    </svg>
  </div>
);

const TargetIcon = () => (
  <div className="w-11 h-11 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#d4b27c] shrink-0 shadow-sm group-hover:bg-[#062540] group-hover:text-[#d4b27c] group-hover:border-[#062540] transition-all duration-300">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M19 5l-4 4" strokeWidth="1.5" />
    </svg>
  </div>
);

// Stat outline icons as requested in the mockup
const UserIcon = () => (
  <svg className="w-9 h-9 text-[#d4b27c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const HouseIcon = () => (
  <svg className="w-9 h-9 text-[#d4b27c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const TrendIcon = () => (
  <svg className="w-9 h-9 text-[#d4b27c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const ShieldStatIcon = () => (
  <svg className="w-9 h-9 text-[#d4b27c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 11 11 13 15 9" strokeWidth="1.5" />
  </svg>
);

// Render the requested figures immediately, including during fast scrolling.
function Counter({ value }: { value: string; numericVal: number; suffix: string }) {
  const { t } = useLanguage();
  return (
    <span className="text-2xl md:text-[32px] font-serif font-semibold text-white tracking-tight leading-none block">
      {t(value)}
    </span>
  );
}

export default function TrustAuthoritySection() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredPrinciple, setHoveredPrinciple] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(err => console.log('Autoplay play error: ', err));
        setIsPlaying(true);
      }
    }
  };

  const principles: PrincipleItem[] = [
    {
      id: 1,
      text: 'Ehrliche Einschätzungen statt unrealistischer Versprechen.',
      icon: ShieldCheckIcon,
    },
    {
      id: 2,
      text: 'Fundierte Entscheidungen statt unnötigem Zeitdruck.',
      icon: ClockIcon,
    },
    {
      id: 3,
      text: 'Klare Strategien, die zu Ihren persönlichen Zielen passen.',
      icon: TargetIcon,
    },
  ];

  const stats: StatItem[] = [
    { id: 1, value: "12+ Jahre", numericVal: 12, suffix: "+ Jahre", label: "MARKTERFAHRUNG", subLabel: "Erfahrung im Immobilien- und Kapitalanlagemarkt", icon: TrendIcon },
    { id: 2, value: "100+", numericVal: 100, suffix: "+", label: "BEGLEITETE IMMOBILIENKÄUFE", subLabel: "Strategisch begleitete Immobilieninvestments für private Anleger", icon: HouseIcon },
    { id: 3, value: "15+", numericVal: 15, suffix: "+", label: "EXPERTEN IM NETZWERK", subLabel: "Etabliertes Netzwerk aus Bauträgern, Finanzierungspartnern und Immobilienexperten", icon: UserIcon },
    { id: 4, value: "50+ Mio. €", numericVal: 50, suffix: "+ Mio. €", label: "TRANSAKTIONSVOLUMEN", subLabel: "Begleitetes Volumen aus Immobilieninvestments", icon: ShieldStatIcon },
  ];

  return (
    <section className="relative bg-[#16273D] text-white py-20 lg:py-24 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-white/5" id="trust-authority-section">
      
      {/* GORGEOUS SUBTLE FLOWING GEOMETRIC CURVED LINES IN GOLD MATCHING MOCKUP */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Top-right curved waves */}
          <path d="M1000 -100 C1150 50, 1300 20, 1500 200" stroke="#d4b27c" strokeWidth="0.5" strokeOpacity="0.35" />
          <path d="M950 -100 C1120 80, 1280 40, 1500 250" stroke="#d4b27c" strokeWidth="0.5" strokeOpacity="0.3" />
          <path d="M900 -100 C1090 110, 1260 60, 1500 300" stroke="#d4b27c" strokeWidth="0.5" strokeOpacity="0.25" />
          <path d="M850 -100 C1060 140, 1240 80, 1500 350" stroke="#d4b27c" strokeWidth="0.5" strokeOpacity="0.2" />
          <path d="M800 -100 C1030 170, 1220 100, 1500 400" stroke="#d4b27c" strokeWidth="0.5" strokeOpacity="0.15" />
          
          {/* Bottom-right/center flowing wave patterns */}
          <path d="M300 900 C600 700, 900 750, 1500 600" stroke="#d4b27c" strokeWidth="0.5" strokeOpacity="0.18" />
          <path d="M350 920 C630 730, 930 770, 1500 630" stroke="#d4b27c" strokeWidth="0.5" strokeOpacity="0.15" />
          <path d="M400 940 C660 760, 960 790, 1500 660" stroke="#d4b27c" strokeWidth="0.5" strokeOpacity="0.12" />
          <path d="M450 960 C690 790, 990 810, 1500 690" stroke="#d4b27c" strokeWidth="0.5" strokeOpacity="0.08" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* UPPER ROW: Header, Principles & Video Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 md:mb-20">
          
          {/* LEFT PANEL (lg:col-span-5): Header & Principles */}
          <div className="lg:col-span-5 flex flex-col text-left">
            
            {/* Header label with line */}
            <div className="flex flex-col items-start mb-4">
              <span className="text-[10px] md:text-xs font-sans font-extrabold tracking-[0.25em] text-[#d4b27c] uppercase">{t("VERTRAUEN & HALTUNG")}</span>
              <div className="h-[1.5px] w-12 bg-[#d4b27c] mt-2.5" />
            </div>

            {/* Main Section Title matching reference image */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.12] mb-6"
            >{t("Vertrauen entsteht ")}<br />{t("durch ")}<span className="text-[#d4b27c] font-serif font-normal">{t("Transparenz.")}</span>
            </motion.h2>

            {/* Subheading text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs md:text-sm lg:text-[14.5px] font-sans font-light text-slate-300 leading-relaxed mb-10 max-w-lg"
            >{t("Wer in Immobilien investiert, braucht Klarheit, eine nachvollziehbare Strategie und einen Partner, der Verantwortung übernimmt.")}</motion.p>

            {/* Title for the timeline steps */}
            <span className="text-xs font-sans font-extrabold uppercase tracking-wider text-white mb-6 block">{t("UNSER ANSPRUCH:")}</span>

            {/* Timeline principles box list with exact gold timeline and connectors */}
            <div className="relative pl-10 space-y-4">
              
              {/* Vertical gold timeline line */}
              <div className="absolute left-4 top-5 bottom-5 w-[1.5px] bg-[#d4b27c]/40" />
              
              {principles.map((p, idx) => {
                const IconComp = p.icon;
                const isHovered = hoveredPrinciple === p.id;

                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    onMouseEnter={() => setHoveredPrinciple(p.id)}
                    onMouseLeave={() => setHoveredPrinciple(null)}
                    className={`relative bg-[#102035] border rounded-[1.25rem] p-5 flex items-center space-x-5 transition-all duration-300 shadow-xl group cursor-pointer ${
                      isHovered
                        ? 'border-[#d4b27c] shadow-[0_12px_30px_rgba(212,178,124,0.12)] translate-x-1.5'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Horizontal Connector Line sitting underneath the gold dot */}
                    <div className={`absolute -left-[25px] top-1/2 -translate-y-1/2 w-[25px] h-[1.5px] transition-colors duration-300 z-10 ${
                      isHovered ? 'bg-[#d4b27c]' : 'bg-[#d4b27c]/40'
                    }`} />

                    {/* Small timeline node dot centered exactly on the vertical line */}
                    <div className={`absolute -left-[29px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-[#16273D] z-20 transition-all duration-300 ${
                      isHovered ? 'bg-[#16273D] scale-125' : 'bg-[#d4b27c]'
                    }`} />
                    
                    <IconComp />

                    <p className="text-xs md:text-sm font-sans font-semibold text-white leading-normal text-left">
                      {t(p.text)}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* RIGHT PANEL (lg:col-span-7): Autoplaying Interactive Video Frame */}
          <div className="lg:col-span-7 flex flex-col w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl group bg-[#102035] cursor-pointer border border-white/10"
              onClick={handleVideoClick}
            >
              {/* Premium corporate gentleman working placeholder video / image */}
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/n5nqkpmk/video/upload/v1784020385/NJhJxdnHmng1psYOJWX58BKDce8_jniwse.mp4"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-[1200ms] ease-out"
                autoPlay
                loop
                muted
                playsInline
                poster="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
              />

              {/* Sophisticated dark blue lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#102035]/65 via-[#102035]/30 to-[#102035]/10 transition-opacity duration-300 group-hover:opacity-90" />

              {/* PERSÖNLICHER EINBLICK Premium Capsule Tab */}
              <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-20">
                <span className="bg-[#102035]/90 border border-white/10 text-white text-[8px] md:text-[9.5px] font-sans font-extrabold tracking-[0.15em] md:tracking-[0.25em] px-4 py-2 md:px-5 md:py-2.5 rounded-full whitespace-nowrap block text-center uppercase backdrop-blur-md shadow-lg">{t("PERSÖNLICHER EINBLICK")}</span>
              </div>

              {/* BIG GLOWING INTERACTIVE PLAY/PAUSE TRIGGER */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                
                {/* Custom glowing rings of concentric gold lines */}
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:scale-105 relative">
                  
                  {/* Glowing pulsing ripple rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#d4b27c]/50 animate-pulse opacity-30 pointer-events-none" />
                  <div className="absolute -inset-2 rounded-full border border-[#d4b27c]/20 animate-ping opacity-15 pointer-events-none" />

                  {/* Solid White Circle Inner button with gold play icon */}
                  <div className="w-11 h-11 md:w-16 md:h-16 rounded-full bg-white shadow-2xl flex items-center justify-center text-[#d4b27c] group-hover:bg-[#d4b27c] group-hover:text-white transition-colors duration-300 z-10">
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" strokeWidth={1.5} />
                    ) : (
                      <Play className="w-6 h-6 fill-current translate-x-0.5" strokeWidth={1.5} />
                    )}
                  </div>
                </div>

                {/* Subtitles below play button matching mockup exactly */}
                <span className="text-white font-sans text-xs font-bold tracking-[0.25em] uppercase mt-4 hidden md:block text-shadow-sm">{t("VIDEO")}</span>
                <span className="text-white/60 font-sans text-[10px] tracking-wider mt-1 hidden md:block">{t("PERSÖNLICHE EINBLICKE")}</span>

              </div>

              {/* Hand-written golden style signature text in bottom right corner */}
              <div className="absolute bottom-3 right-4 md:bottom-6 md:right-8 text-right select-none z-20">
                <p className="font-serif italic text-xs md:text-lg text-[#d4b27c] leading-tight drop-shadow-md">{t("Einblick.")}</p>
                <p className="font-serif italic text-xs md:text-lg text-[#d4b27c] leading-tight drop-shadow-md mt-1">{t("Haltung. Verantwortung.")}</p>
              </div>

            </motion.div>
          </div>

        </div>

        {/* LOWER ROW: Founder Testimonial Card & Statistics Grid */}
        <div className="flex flex-col gap-8 lg:gap-10">
          
          {/* FOUNDER BLOCK CARD (lg:col-span-5) */}
          <div className="w-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#102035] border border-white/10 rounded-[2.5rem] flex flex-col sm:flex-row shadow-xl h-full relative group z-10"
            >
              
              {/* Dual picture showcase split vertical columns side by side (54% width of card) */}
              <div className="h-64 sm:h-auto sm:w-[40%] shrink-0 flex relative bg-[#16273D] border-b sm:border-b-0 sm:border-r border-white/10 rounded-t-[2.5rem] sm:rounded-l-[2.5rem] sm:rounded-r-none overflow-hidden">
                {/* Left Founder Image */}
                <div className="w-1/2 h-full relative overflow-hidden bg-[#0a2540]">
                  <img
                    src="https://res.cloudinary.com/n5nqkpmk/image/upload/v1785272165/WI7YqNyTRf1V91QtxU2SZRFBjM_lkrcpk.png"
                    alt={t("Akay Kula")}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[center_12%] group-hover:scale-105 transition-transform duration-[1000ms]"
                  />
                  {/* Subtle dark shade vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102035]/80 via-transparent to-transparent pointer-events-none" />
                </div>
                
                {/* Right Founder Image */}
                <div className="w-1/2 h-full relative overflow-hidden border-l border-white/10 bg-[#16273D]">
                  <img
                    src="https://res.cloudinary.com/n5nqkpmk/image/upload/v1785272166/WxZXRcmmeilueEbnqnE76Skys_zhkeij.png"
                    alt={t("Alpaslan Coskun")}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[center_12%] group-hover:scale-105 transition-transform duration-[1000ms] delay-75"
                  />
                  {/* Subtle dark shade vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102035]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Text content of quote & testimonial with reserved right padding for badge */}
              <div className="p-6 sm:p-6 md:p-7 pr-20 sm:pr-20 md:pr-24 flex flex-col justify-between flex-1 text-left relative min-h-[220px]">
                <div>
                  {/* Large elegant gold quotation mark */}
                  <span className="text-5xl font-serif text-[#d4b27c] block leading-none mb-1 font-black select-none">{t("“")}</span>
                  
                  {/* Testimonial Quote body */}
                  <p className="text-sm md:text-base font-sans font-light text-slate-300 leading-relaxed italic mb-6">{t("Wir denken nicht in einzelnen Immobilien, sondern in langfristigen Strategien – ehrlich, nachvollziehbar und auf Ihre persönlichen Ziele ausgerichtet.")}</p>
                </div>

                <div>
                  {/* Small gold horizontal divider line */}
                  <div className="w-8 h-[1.5px] bg-[#d4b27c] mb-3" />
                  
                  {/* Founders Names */}
                  <h4 className="text-xs md:text-sm font-sans font-extrabold text-white mb-0.5">{t("Alpaslan Coskun & Akay Kula")}</h4>
                  <p className="text-[10px] md:text-xs font-sans text-slate-300">{t("Persönliche Ansprechpartner für strategische Immobilieninvestments.")}</p>
                </div>

                {/* Floating Authority Seal Stamp overlapping bottom-right corner */}
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-20 h-20 rounded-full bg-[#16273D] border-2 border-[#d4b27c]/60 flex flex-col items-center justify-center text-center shadow-2xl transform rotate-[-6deg] group-hover:rotate-0 transition-transform duration-500 shrink-0 z-30">
                  <svg className="w-4 h-4 text-[#d4b27c] mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 11 11 13 15 9" strokeWidth="2.25" />
                  </svg>
                  <span className="text-[7.5px] font-sans font-bold text-white tracking-widest leading-none">{t("STRATEGIE")}</span>
                  <span className="text-[7px] font-sans font-medium text-[#d4b27c] tracking-widest mt-0.5">{t("ERFAHRUNG")}<br />{t("VERTRAUEN")}</span>
                </div>

              </div>
            </motion.div>
          </div>

          {/* STATISTICS GRID CARD PANEL (lg:col-span-7) */}
          <div className="w-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-[#102035] border border-white/10 rounded-[2.5rem] p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch text-left shadow-xl h-full relative text-white"
            >
              
              {stats.map((item, idx) => {
                const StatIcon = item.icon;

                return (
                  <div
                    key={item.id}
                    className={`group/stat flex flex-col items-center lg:items-start text-center lg:text-left justify-between h-full p-2 rounded-2xl hover:bg-white/5 transition-all duration-300 relative ${
                      /* Clean structural column partitions with dividers */
                      idx > 0 ? 'lg:pl-6' : ''
                    }`}
                  >
                    {/* Vertical line divider shown only on desktop screens */}
                    {idx > 0 && (
                      <div className="hidden lg:block absolute left-0 top-4 bottom-4 w-[1px] bg-white/10" />
                    )}

                    {/* Styled gold outline icon */}
                    <div className="mb-4 transform group-hover/stat:scale-110 transition-transform duration-300">
                      <StatIcon />
                    </div>

                    {/* Numeric counter with animation */}
                    <div className="group-hover/stat:translate-y-0.5 transition-transform duration-300">
                      <Counter value={item.value} numericVal={item.numericVal} suffix={item.suffix} />
                    </div>

                    {/* Descriptive Labels */}
                    <div className="mt-3 flex flex-col">
                      <span className="text-[11px] font-sans text-white font-extrabold leading-snug">
                        {t(item.label)}
                      </span>
                      <span className="text-xs font-sans text-slate-300 font-light leading-relaxed mt-2">
                        {t(item.subLabel)}
                      </span>
                    </div>
                  </div>
                );
              })}

            </motion.div>
          </div>

        </div>

      </div>

    </section>
  );
}
