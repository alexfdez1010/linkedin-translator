'use client';

import Link from 'next/link';
import type { Dictionary } from '@/i18n/dictionaries';

interface HeaderProps {
  t: Dictionary;
  locale: string;
  subtitle?: string;
  onSwitchLocale?: (locale: string) => void;
  maxWidth?: string;
}

export function Header({ t, locale, subtitle, onSwitchLocale, maxWidth = 'max-w-5xl' }: HeaderProps) {
  const content = (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-fuchsia flex items-center justify-center shadow-lg shrink-0 text-white"
        style={{ boxShadow: '0 4px 16px var(--brand-blue-glow)' }}
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </div>
      <div className="min-w-0">
        <h1 className="font-display text-lg sm:text-xl font-normal tracking-tight truncate">
          {t.header.title}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground truncate">
          {subtitle ?? t.header.subtitle}
        </p>
      </div>
    </div>
  );

  return (
    <header className="animate-fade-up sticky top-0 z-20">
      <div className="header-glass">
        <div className={`${maxWidth} mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-4`}>
          {onSwitchLocale ? content : (
            <Link href={`/${locale}`} className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity">
              {content}
            </Link>
          )}
          {onSwitchLocale && (
            <div className="locale-switch shrink-0">
              <button onClick={() => onSwitchLocale('en')} className={`locale-btn ${locale === 'en' ? 'locale-btn-active' : ''}`}>EN</button>
              <button onClick={() => onSwitchLocale('es')} className={`locale-btn ${locale === 'es' ? 'locale-btn-active' : ''}`}>ES</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
