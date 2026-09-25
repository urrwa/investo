import { useLanguage } from './i18n';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroContent from './components/HeroContent';
import InteractiveHouseCard from './components/InteractiveHouseCard';
import MetricsFooter from './components/MetricsFooter';
import PromiseSection from './components/PromiseSection';
import InvestmentPathSection from './components/InvestmentPathSection';
import ProblemSolutionSection from './components/ProblemSolutionSection';
import StrategyCheckSection from './components/StrategyCheckSection';
import InvestmentPhilosophySection from './components/InvestmentPhilosophySection';
import TargetGroupsSection from './components/TargetGroupsSection';
import InvestmentExamplesSection from './components/InvestmentExamplesSection';
import WhyInvestoSection from './components/WhyInvestoSection';
import TrustAuthoritySection from './components/TrustAuthoritySection';
import FinancingPartnersSection from './components/FinancingPartnersSection';
import FaqSection from './components/FaqSection';
import StrategyDecisionSection from './components/StrategyDecisionSection';
import Footer from './components/Footer';
import LegalPage from './components/LegalPage';
import LeadForm, { ThankYouPage } from './components/LeadForm';

export default function App() {
  const { t } = useLanguage();
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  useEffect(() => {
    // Cross-page fragment navigation can run before React mounts the sections.
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  if (pathname === '/danke') return <ThankYouPage />;
  if (pathname === '/impressum' || pathname === '/datenschutz') return <LegalPage page={pathname.slice(1) as 'impressum' | 'datenschutz'} />;

  return (
    <div className="min-h-screen bg-[#16273D] relative flex flex-col" id="investo-root">
      
      {/* 1. Hero Block Wrapper with localized dark background and mountains */}
      <div className="relative w-full overflow-hidden flex flex-col pt-24 pb-16 min-h-screen" id="hero-wrapper">
        
        {/* Dramatic Background Image & High-end Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none" id="bg-visual-layer">
          {/* Mountain range background */}
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80"
            alt={t("Majestätische Alpengipfel")}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-20 md:opacity-25 filter brightness-[0.6] saturate-[0.8] contrast-[1.1] transform scale-105 select-none"
          />
          
          {/* Layered custom gradients for atmospheric lighting */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#16273D] via-[#16273D]/80 to-[#16273D]/95" />
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-blue-900/15 via-indigo-950/10 to-transparent blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-[60%] h-[40%] bg-gradient-to-tr from-sky-950/10 via-slate-900/10 to-transparent blur-3xl rounded-full" />
        </div>

        {/* Brand Header (Navbar) */}
        <Navbar onCheckClick={() => setIsCheckModalOpen(true)} />

        {/* Primary Hero Section Stage */}
        <main className="relative z-10 flex-1 flex flex-col justify-center px-4 md:px-8 lg:px-12 pt-16 pb-10 max-w-7xl mx-auto w-full">
          
          {/* Grid split: Left Typography Content & Right Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center mb-12 md:mb-16">
            
            {/* Column Left */}
            <div className="col-span-1 lg:col-span-6 xl:col-span-5 flex justify-start items-center">
              <HeroContent onCtaClick={() => setIsCheckModalOpen(true)} />
            </div>

            {/* Column Right */}
            <div className="col-span-1 lg:col-span-6 xl:col-span-7">
              <InteractiveHouseCard />
            </div>

          </div>

          {/* Bottom Section (Metrics & Features Footer) */}
          <div className="mt-auto border-t border-white/5 pt-8 md:pt-10">
            <MetricsFooter 
              onLearnMoreClick={() => setIsCheckModalOpen(true)} 
              onMetricItemClick={(metricName) => {
                setIsCheckModalOpen(true);
              }}
            />
          </div>

        </main>
      </div>

      {/* 2. Promise / Brand value section from design reference mockup (crisp elegant beige theme) */}
      <PromiseSection />

      {/* 3. Strategy Check details section (crisp elegant white theme) */}
      <StrategyCheckSection onStartClick={() => setIsCheckModalOpen(true)} />

      {/* 4. Problem & Solution split section from reference mockup (dark slate theme with VS element) */}
      <ProblemSolutionSection />

      {/* 5. Five-step Investment Path timeline section from reference mockup (dark slate / gold outline theme) */}
      <InvestmentPathSection onCtaClick={() => setIsCheckModalOpen(true)} />


      {/* 6. Investment Philosophy section (crisp elegant white theme with wave) */}
      <InvestmentPhilosophySection onCtaClick={() => setIsCheckModalOpen(true)} />

      {/* Credibility statistics; the removed investment examples and returns strip stay absent. */}
      <InvestmentExamplesSection onCtaClick={() => setIsCheckModalOpen(true)} />

      {/* 8. Target Groups section (deep space-blue/gold theme with connection tree) */}
      <TargetGroupsSection onCtaClick={() => setIsCheckModalOpen(true)} />

      {/* 9. Warum Investo comparison section (mockup matched, split layout with gold glowing line and details popups) */}
      <WhyInvestoSection onCtaClick={() => setIsCheckModalOpen(true)} />

      {/* 10. Trust & Authority section (mockup matched, with autoplay interactive video, dual-portrait testimonial, and statistics row) */}
      <TrustAuthoritySection />

      {/* 11. Financing Partner Network section with continuous infinite logo marquee */}
      <FinancingPartnersSection />

      {/* 12. FAQ Section (mockup matched, with gold accents and sequential accordion) */}
      <FaqSection onCtaClick={() => setIsCheckModalOpen(true)} />

      {/* 12. Abschluss & Strategie Section (mockup matched, with step timeline, dual-portrait card elements, action options and highlights bar) */}
      <StrategyDecisionSection 
        onCtaClick={() => setIsCheckModalOpen(true)} 
        onContactClick={() => setIsCheckModalOpen(true)} 
      />

      {/* 13. Brand Footer Section */}
      <Footer onContactClick={() => setIsCheckModalOpen(true)} />

      <LeadForm open={isCheckModalOpen} onClose={() => setIsCheckModalOpen(false)} />
    </div>
  );
}
