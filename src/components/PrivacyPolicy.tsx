import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n';
import content from '../content/privacy-policy.en.json';
import german from '../content/privacy-policy.de.json';
import french from '../content/privacy-policy.fr.json';

type PolicyBlock =
  | { type: 'heading'; text: string; level: 3 | 4 }
  | { type: 'paragraph' | 'contact'; text: string }
  | { type: 'link'; text: string; href: string }
  | { type: 'list'; items: string[] };

interface PolicyContent {
  title: string;
  tocLabel: string;
  backToTop: string;
  sections: { id: string; title: string; blocks: PolicyBlock[] }[];
}

const policy = content as PolicyContent;
const translations: Record<'de' | 'fr', Record<string, string>> = { de: german, fr: french };
const linkClass = 'text-investo-gold underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-investo-gold';

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const text = (source: string) => language === 'en' ? source : translations[language][source] ?? source;

  const renderBlock = (block: PolicyBlock, index: number) => {
    if (block.type === 'heading') {
      const Heading = block.level === 4 ? 'h4' : 'h3';
      return <Heading key={index} className={block.level === 4
        ? 'text-base font-semibold text-white pt-2'
        : 'text-lg font-semibold text-white pt-4'}>{text(block.text)}</Heading>;
    }
    if (block.type === 'list') {
      return <ul key={index} className="list-disc pl-5 space-y-3 marker:text-investo-gold">
        {block.items.map(item => <li key={item}>{text(item)}</li>)}
      </ul>;
    }
    if (block.type === 'link') {
      return <p key={index}><a href={block.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {text(block.text)} <ExternalLink className="inline w-4 h-4 ml-1" aria-hidden="true" />
      </a></p>;
    }
    if (block.type === 'contact') {
      return <address key={index} className="not-italic space-y-1">
        {text(block.text).split('\n').map(line => line.trim().replace(/^,\s*|,\s*$/g, '')).filter(Boolean).map(line => (
          <p key={line}>{line.includes('@')
            ? <a href={'mailto:' + line} className={linkClass}>{line}</a>
            : line.startsWith('+49')
              ? <a href="tel:+491757111188" className={linkClass}>{line}</a>
              : line}</p>
        ))}
      </address>;
    }
    return <p key={index}>{text(block.text)}</p>;
  };

  return (
    <div id="privacy-policy" lang={language}>
      <nav aria-labelledby="privacy-contents-heading" className="border-b border-white/10 pb-8 mb-10">
        <h2 id="privacy-contents-heading" className="text-xs uppercase font-bold tracking-[0.15em] text-investo-gold mb-4">{text(policy.tocLabel)}</h2>
        <ol className="space-y-3">
          {policy.sections.map((section, index) => (
            <li key={section.id}>
              <a href={'#' + section.id} className="inline-flex items-baseline gap-3 text-slate-200 hover:text-investo-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-investo-gold">
                <span className="text-investo-gold text-sm shrink-0" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span>{text(section.title).replace(/^\d+\.\s*/, '')}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="space-y-10 md:space-y-12">
        {policy.sections.map(section => (
          <section key={section.id} id={section.id} aria-labelledby={section.id + '-heading'} className="scroll-mt-6 border-b border-white/10 pb-10 last:border-0 last:pb-0">
            <h2 id={section.id + '-heading'} className="font-serif text-2xl md:text-3xl leading-snug text-white mb-6">{text(section.title)}</h2>
            <div className="space-y-5 leading-relaxed">{section.blocks.map(renderBlock)}</div>
          </section>
        ))}
      </div>
      <a href="#legal-page-content" className="inline-flex items-center gap-2 mt-10 text-sm text-investo-gold hover:text-white">
        <ArrowUp className="w-4 h-4" aria-hidden="true" />{text(policy.backToTop)}
      </a>
    </div>
  );
}