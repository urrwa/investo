import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import translations from './translations.json';

export type Language = 'de' | 'en' | 'fr';
const STORAGE_KEY = 'investo-language';
const locales: Record<Language, string> = { de: 'de-DE', en: 'en-GB', fr: 'fr-FR' };
const titles: Record<Language, string> = {
  de: 'Investo Immobilien – Immobilieninvestments mit Strategie',
  en: 'Investo Immobilien – Strategic property investment',
  fr: 'Investo Immobilien – Investissement immobilier stratégique',
};
const catalog: Record<string, { en: string; fr: string }> = translations;
const isLanguage = (value: unknown): value is Language => value === 'de' || value === 'en' || value === 'fr';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  locale: string;
  t: (source: string | false | null | undefined) => string;
}
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, updateLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return isLanguage(saved) ? saved : 'de';
    } catch { return 'de'; }
  });
  const setLanguage = useCallback((next: Language) => {
    updateLanguage(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* Language switching works even if storage is unavailable. */ }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = titles[language];
  }, [language]);
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && isLanguage(event.newValue)) updateLanguage(event.newValue);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const t = useCallback((source: string | false | null | undefined) => {
    if (typeof source !== 'string') return '';
    if (language === 'de') return source;
    const translated = catalog[source.trim()]?.[language];
    if (translated === undefined) return source;
    // Preserve intentional spaces around inline headings and emphasised text.
    return source.replace(source.trim(), translated);
  }, [language]);
  const value = useMemo(() => ({ language, setLanguage, locale: locales[language], t }), [language, setLanguage, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage requires LanguageProvider');
  return context;
}
