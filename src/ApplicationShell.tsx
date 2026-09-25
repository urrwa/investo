import React, { StrictMode, useEffect } from 'react';
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import App from './App';
import { LanguageProvider, type Language } from './i18n';

function ApplicationReady({ onReady }: { onReady?: () => void }) {
  useEffect(() => { onReady?.(); }, [onReady]);
  return null;
}

export default function ApplicationShell({ initialLanguage, onReady }: { initialLanguage?: Language; onReady?: () => void }) {
  return (
    <StrictMode>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <LanguageProvider initialLanguage={initialLanguage}>
            <App />
            <ApplicationReady onReady={onReady} />
          </LanguageProvider>
        </MotionConfig>
      </LazyMotion>
    </StrictMode>
  );
}
