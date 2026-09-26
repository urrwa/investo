import React, { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useLanguage } from '../i18n';
import { useActiveAnimation } from '../hooks/useActiveAnimation';
import '../hero-card-motion.css';

const labels = {
  de: { pause: 'Dekorative Animationen pausieren', resume: 'Dekorative Animationen fortsetzen' },
  en: { pause: 'Pause decorative animations', resume: 'Resume decorative animations' },
  fr: { pause: 'Mettre les animations décoratives en pause', resume: 'Reprendre les animations décoratives' },
};

/** Additive artwork only: this layer never changes the existing card's layout. */
export default function HeroCardMotion() {
  const { language } = useLanguage();
  const { ref, active } = useActiveAnimation<HTMLDivElement>();
  const [paused, setPaused] = useState(false);
  const label = labels[language][paused ? 'resume' : 'pause'];
  return (
    <div ref={ref} className="hero-card-motion" data-motion-running={active && !paused}>
      <svg className="hero-card-orbit" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <g transform="rotate(-18 500 500)">
          <ellipse className="hero-card-orbit-track" cx="500" cy="500" rx="460" ry="475" vectorEffect="non-scaling-stroke" />
          <ellipse className="hero-card-orbit-dot hero-card-orbit-dot-soft" cx="500" cy="500" rx="460" ry="475" pathLength="1000" vectorEffect="non-scaling-stroke" />
          <ellipse className="hero-card-orbit-dot" cx="500" cy="500" rx="460" ry="475" pathLength="1000" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      <svg className="hero-card-edge" aria-hidden="true" focusable="false">
        <rect className="hero-card-edge-light" width="100%" height="100%" rx="31" pathLength="1000" />
      </svg>
      <button
        type="button"
        className="hero-card-motion-toggle"
        aria-label={label}
        title={label}
        aria-pressed={paused}
        onClick={() => setPaused(value => !value)}
      >
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
      </button>
    </div>
  );
}
