import { useLanguage, type Language } from '../i18n';
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X, Landmark, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onCheckClick?: () => void;
}

export default function Navbar({ onCheckClick }: NavbarProps) {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const pendingSection = useRef<string | null>(null);

  const navLinks = [
    { label: 'Strategie-Check', href: '#strategie-check-section' },
    { label: 'Philosophie', href: '#investment-philosophy-section' },
    { label: 'Käufer & Anleger', href: '#target-groups-section' },
    { label: 'Über uns', href: '#trust-authority-section' },
    { label: 'Kontakt', href: '#strategy-decision-section' },
  ];

  const languages: Language[] = ['de', 'en', 'fr'];
  const languageNames = { de: 'Deutsch', en: 'English', fr: 'Français' };

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 bg-gradient-to-b from-black/60 to-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <a href="/" className="flex items-center group shrink-0" id="nav-logo">
          <img
            src="https://res.cloudinary.com/dpwfzo2vk/image/upload/v1785267703/Ej5y1HdJNBRpyxVBnT39eVSRs_1_kud5ck.png"
            alt={t("Investo Immobilien Logo")}
            referrerPolicy="no-referrer"
            className="w-[130px] sm:w-[150px] lg:w-[170px] max-w-[130px] sm:max-w-[150px] lg:max-w-[170px] h-auto object-contain transition-opacity duration-300 group-hover:opacity-90 shrink-0"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7" id="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm text-white/80 hover:text-white transition-colors duration-200 font-sans font-medium py-1 group"
            >
              {t(link.label)}
              <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-investo-gold transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center space-x-6" id="desktop-actions">
          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              aria-label={t('Sprache wählen')}
              aria-expanded={showLangDropdown}
              aria-controls="language-options"
              onKeyDown={event => { if (event.key === 'Escape') setShowLangDropdown(false); }}
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center space-x-1 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 py-2 cursor-pointer"
            >
              <span>{language.toUpperCase()}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showLangDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showLangDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowLangDropdown(false)} />
                  <motion.div
                    id="language-options"
                    role="group"
                    aria-label={t('Sprache wählen')}
                    onKeyDown={event => { if (event.key === 'Escape') setShowLangDropdown(false); }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 w-32 bg-investo-card border border-white/10 rounded shadow-2xl py-1 z-20"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        lang={lang}
                        aria-pressed={language === lang}
                        onClick={() => {
                          setLanguage(lang);
                          setShowLangDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-sans transition-colors duration-150 cursor-pointer ${
                          language === lang ? 'text-investo-gold font-medium bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Action CTA Border Button */}
          <button
            onClick={onCheckClick}
            className="relative px-5 py-2.5 border border-investo-gold text-investo-gold text-xs font-sans font-bold tracking-widest rounded transition-all duration-300 overflow-hidden group hover:text-black cursor-pointer"
          >
            <span className="absolute inset-0 bg-investo-gold transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 -z-10" />{t("STRATEGIE-CHECK")}</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center space-x-4">
          {/* Language selector for mobile */}
          <select
            aria-label={t('Sprache wählen')}
            value={language}
            onChange={event => setLanguage(event.target.value as Language)}
            className="text-xs font-medium text-white bg-[#16273D] border border-white/20 rounded px-2 py-1"
          >
            {languages.map(lang => <option key={lang} value={lang} lang={lang}>{lang.toUpperCase()}</option>)}
          </select>
          
          <button
            type="button"
            aria-label={t(isOpen ? 'Menü schließen' : 'Menü öffnen')}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-investo-gold transition-colors duration-200 cursor-pointer p-1"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence onExitComplete={() => {
        // Removing the clicked anchor can interrupt a native smooth scroll.
        // Start navigation once the drawer's exit animation has finished.
        if (pendingSection.current) {
          document.getElementById(pendingSection.current)?.scrollIntoView({ block: 'start' });
          pendingSection.current = null;
        }
      }}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#030a13]/95 border-b border-white/10 overflow-hidden z-40 px-6 py-6"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.label}
                  href={link.href}
                  onClick={event => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    pendingSection.current = link.href.slice(1);
                    if (window.location.hash !== link.href) {
                      window.history.pushState(null, '', link.href);
                    }
                    setIsOpen(false);
                  }}
                  className="text-base text-white/80 hover:text-white transition-colors py-1.5 border-b border-white/5"
                >
                  {t(link.label)}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  setIsOpen(false);
                  if (onCheckClick) onCheckClick();
                }}
                className="w-full mt-4 py-3 bg-investo-gold text-black text-xs font-sans font-bold tracking-widest rounded flex items-center justify-center space-x-2"
              >
                <span>{t("STRATEGIE-CHECK STARTEN")}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
