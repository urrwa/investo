import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../i18n';
import { useActiveAnimation } from '../hooks/useActiveAnimation';
import type { TabType } from '../types';
import '../hero-motion.css';

const stages: TabType[] = ['strategie', 'finanzierung', 'immobilie'];
const copy = {
  de: { title: 'Aus einem Plan wird Ihre Immobilie.', replay: 'Architektur-Animation wiederholen', label: 'Investment-Schritte erkunden', hint: 'Wählen Sie Ihren nächsten Schritt.', stages: ['Strategie', 'Finanzierung', 'Immobilie'] },
  en: { title: 'A clear plan. A place of your own.', replay: 'Replay the architecture animation', label: 'Explore the investment stages', hint: 'Explore your next step.', stages: ['Strategy', 'Financing', 'Property'] },
  fr: { title: 'Un projet clair. Votre futur bien.', replay: 'Rejouer l’animation architecturale', label: 'Explorer les étapes de l’investissement', hint: 'Explorez votre prochaine étape.', stages: ['Stratégie', 'Financement', 'Immobilier'] },
};

/** Original vector artwork; no media request or animation runtime is required. */
export default function HeroArchitecture({ activeTab, onTabChange }: {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}) {
  const { language } = useLanguage();
  const { ref, active } = useActiveAnimation<HTMLDivElement>();
  const [replay, setReplay] = React.useState(0);
  const text = copy[language];
  // Explicit interactions replay the short sequence even if an observer delivery is delayed.
  // CSS always disables motion when the user prefers reduced motion.
  return (
    <div ref={ref} className="hero-architecture" data-running={active || replay > 0} data-stage={activeTab}>
      <div className="architecture-caption">
        <span>{text.title}</span>
        <button type="button" className="architecture-replay" aria-label={text.replay} onClick={() => setReplay(value => value + 1)}>
          <RotateCcw size={15} aria-hidden="true" />
        </button>
      </div>
      <svg key={`${activeTab}-${replay}`} className="architecture-art" viewBox="60 6 360 150" fill="none" aria-hidden="true" focusable="false">
        {/* Survey lines give the composition the precision of an architect's drawing. */}
        <g stroke="currentColor" strokeWidth="0.7" opacity="0.28">
          <path d="M20 111 209 21 425 115M44 132 233 42 412 128M4 81 190 144M87 39 368 137M165 17 435 110" />
          <path d="M28 111H417M214 10V144" strokeDasharray="2 5" />
        </g>
        <g className="architecture-foundation" stroke="currentColor" strokeLinejoin="round">
          <path d="m76 106 127-55 161 48-129 44z" fill="#d4b27c" fillOpacity="0.08" strokeOpacity="0.75" />
          <path d="m76 106 159 37 129-44M235 143v-9M76 106v-9M364 99v-9" strokeOpacity="0.75" />
          <path d="m92 107 111-46 143 39-111 36z" strokeOpacity="0.75" strokeDasharray="3 4" />
        </g>
        {/* Two interlocking architectural volumes, drawn entirely with SVG paths. */}
        <g className="architecture-building architecture-building-back" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7">
          <path d="m201 23 75 21-49 25-74-23z" fill="#1e344b" />
          <path d="M153 46v47l74 24V69z" fill="#192e43" />
          <path d="M227 69v48l49-27V44z" fill="#102337" />
          <path d="m161 57 56 17v12l-56-17zm0 22 56 17v12l-56-17z" strokeOpacity="0.75" />
          <path d="M179 63v12m19-7v13m-19 4v12m19-6v12" strokeOpacity="0.65" />
          <path d="m237 73 28-14v13l-28 14zm0 23 28-14v9l-28 16z" strokeOpacity="0.7" />
        </g>
        <g className="architecture-building architecture-building-front" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7">
          <path d="m263 69 62 17-42 22-63-18z" fill="#233950" />
          <path d="M220 90v30l63 18v-30z" fill="#1a3047" />
          <path d="M283 108v30l42-23V86z" fill="#102337" />
          <path d="m229 101 45 13v15l-45-13zm62 13 24-13v14l-24 13z" strokeOpacity="0.6" />
          <path d="M245 106v14m14-10v14M303 108v13" strokeOpacity="0.75" />
        </g>
        {/* Gold light travels along the same outline on each intentional selection. */}
        <path className="architecture-trace" pathLength="1" d="M76 106 153 73V46l48-23 75 21v29l49 13v29l-42 23-63-18-67-27-77 13" stroke="#ffe3ac" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <g className="architecture-marker" style={{ '--marker-delay': '150ms' } as React.CSSProperties} transform="translate(101 66)">
          <path d="M0 0v25l45 13" stroke="currentColor" strokeOpacity="0.65" />
          <circle r="12" fill="#192e43" stroke="currentColor" strokeOpacity={activeTab === 'strategie' ? 1 : 0.65} />
          <text y="3" textAnchor="middle" fill="currentColor" stroke="none" fontSize="8" fontFamily="Inter, sans-serif">01</text>
        </g>
        <g className="architecture-marker" style={{ '--marker-delay': '300ms' } as React.CSSProperties} transform="translate(339 39)">
          <path d="M0 0v20l-48 19" stroke="currentColor" strokeOpacity="0.65" />
          <circle r="12" fill="#192e43" stroke="currentColor" strokeOpacity={activeTab === 'finanzierung' ? 1 : 0.65} />
          <text y="3" textAnchor="middle" fill="currentColor" stroke="none" fontSize="8" fontFamily="Inter, sans-serif">02</text>
        </g>
        <g className="architecture-marker" style={{ '--marker-delay': '450ms' } as React.CSSProperties} transform="translate(392 107)">
          <path d="M-12 0h-38l-26 11" stroke="currentColor" strokeOpacity="0.65" />
          <circle r="12" fill="#192e43" stroke="currentColor" strokeOpacity={activeTab === 'immobilie' ? 1 : 0.65} />
          <text y="3" textAnchor="middle" fill="currentColor" stroke="none" fontSize="8" fontFamily="Inter, sans-serif">03</text>
        </g>
      </svg>
      <div className="architecture-stages" role="group" aria-label={text.label}>
        {stages.map((stage, index) => (
          <button key={stage} type="button" aria-pressed={activeTab === stage} aria-controls="hero-showcase-panel" onClick={() => { setReplay(value => value + 1); onTabChange(stage); }}>
            <span className="architecture-stage-number" aria-hidden="true">0{index + 1}</span>
            <span>{text.stages[index]}</span>
          </button>
        ))}
      </div>
      <p className="architecture-hint">{text.hint}</p>
    </div>
  );
}
