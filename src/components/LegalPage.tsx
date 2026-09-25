import OptimizedImage from './OptimizedImage';
import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useLanguage, type Language } from '../i18n';
import Footer from './Footer';
import PrivacyPolicy from './PrivacyPolicy';

export type LegalPageKind = 'impressum' | 'datenschutz';

export default function LegalPage({ page }: { page: LegalPageKind }) {
  const { t, language, setLanguage } = useLanguage();
  const isImprint = page === 'impressum';
  const title = isImprint ? 'Impressum' : 'Datenschutz';
  const legalLinks = [
    { page: 'impressum', label: 'Impressum' },
    { page: 'datenschutz', label: 'Datenschutz' },
  ];
  const linkClass = 'text-investo-gold underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-investo-gold';

  return (
    <div className="min-h-screen bg-[#16273D] text-white">
      <header className="border-b border-white/10 px-6 py-6 md:px-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <a href="/" aria-label={t('Zur Startseite')} className="shrink-0">
            <OptimizedImage loading="eager" sizes="170px"
              src="https://res.cloudinary.com/dpwfzo2vk/image/upload/v1785267703/Ej5y1HdJNBRpyxVBnT39eVSRs_1_kud5ck.png"
              alt={t('Investo Immobilien Logo')}
              className="w-[130px] h-auto"
              referrerPolicy="no-referrer"
            />
          </a>
          <select
            aria-label={t('Sprache wählen')}
            value={language}
            onChange={event => setLanguage(event.target.value as Language)}
            className="bg-[#102035] border border-white/20 text-white rounded-lg px-3 py-2 text-sm focus-visible:outline-investo-gold"
          >
            <option value="de" lang="de">DE</option>
            <option value="en" lang="en">EN</option>
            <option value="fr" lang="fr">FR</option>
          </select>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 md:px-10 md:py-16" id="legal-page-content">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-investo-gold hover:text-white mb-10">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t('Zur Startseite')}
        </a>
        <p className="text-xs font-bold tracking-[0.2em] text-investo-gold uppercase mb-4">{t('RECHTLICHES')}</p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-5">{t(title)}</h1>
        <p className="text-slate-300 leading-relaxed mb-8">
          {t(isImprint ? 'Informationen zum Anbieter und Kontakt.' : 'Informationen zum Datenschutz und Kontakt für Ihre Fragen.')}
        </p>

        <nav aria-label={t('Rechtliche Seiten')} className="flex flex-wrap gap-3 mb-8">
          {legalLinks.map(link => (
            <a
              key={link.page}
              href={'/' + link.page}
              aria-current={page === link.page ? 'page' : undefined}
              className={'rounded-lg border px-4 py-2.5 text-sm transition-colors ' + (page === link.page
                ? 'border-investo-gold bg-investo-gold/10 text-investo-gold'
                : 'border-white/15 text-slate-300 hover:border-investo-gold hover:text-white')}
            >{t(link.label)}</a>
          ))}
        </nav>

        <article className="rounded-3xl border border-white/10 bg-[#102035] p-6 md:p-10 text-sm md:text-base leading-relaxed text-slate-300 break-words">
          {isImprint ? (
            <div className="space-y-8">
              <section aria-labelledby="provider-heading">
                <h2 id="provider-heading" className="font-serif text-xl md:text-2xl text-white mb-3">{t('Anbieterkennzeichnung:')}</h2>
                <p className="font-semibold text-white">Investo Immobilien UG</p>
                <p>Maximilianstraße 15c<br />{t('87719 Mindelheim, Deutschland')}</p>
              </section>
              <section aria-labelledby="representative-heading">
                <h2 id="representative-heading" className="font-semibold text-white mb-2">{t('Vertreten durch:')}</h2>
                <p>{t('Geschäftsführer Alpaslan Coskun')}</p>
              </section>
              <section aria-labelledby="contact-heading">
                <h2 id="contact-heading" className="font-semibold text-white mb-2">{t('Kontakt:')}</h2>
                <p><a href="tel:+491757111188" className={linkClass}>{t('Telefon: +49 (0) 175 7111 188')}</a></p>
                <p><a href="mailto:info@investo-immobilien.de" className={linkClass}>info@investo-immobilien.de</a></p>
              </section>
              <section aria-labelledby="register-heading">
                <h2 id="register-heading" className="font-semibold text-white mb-2">{t('Registereintrag:')}</h2>
                <p>{t('Eintragung im Handelsregister.')}<br />{t('Registergericht: Amtsgericht Memmingen')}<br />{t('Registernummer: HRB 22308')}</p>
              </section>
              <section aria-labelledby="vat-heading">
                <h2 id="vat-heading" className="font-semibold text-white mb-2">{t('Umsatzsteuer-ID:')}</h2>
                <p>DE463921337</p>
              </section>
              <div className="border-t border-white/10 pt-6">
                <a href="https://www.investo-immobilien.de/impressum" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {t('Vollständiges Impressum')} <ExternalLink className="inline w-4 h-4 ml-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          ) : (
            <PrivacyPolicy />
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
