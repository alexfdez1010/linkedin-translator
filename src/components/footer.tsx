import type { Dictionary } from '@/i18n/dictionaries';

interface FooterProps {
  t: Dictionary;
  maxWidth?: string;
}

export function Footer({ t, maxWidth = 'max-w-5xl' }: FooterProps) {
  return (
    <footer className="relative z-10 py-6 sm:py-8 text-center text-xs sm:text-sm text-muted-foreground px-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <div className={`${maxWidth} mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-0`}>
        <p>
          {t.footer.text}{' '}
          <a
            href="https://github.com/alexfdez1010/linkedin-translator"
            className="underline underline-offset-2 decoration-border hover:decoration-brand-blue hover:text-brand-blue transition-colors"
          >
            {t.footer.openSource}
          </a>
        </p>
        <span className="hidden sm:inline mx-2 text-border">·</span>
        <p>{t.footer.poweredBy}</p>
      </div>
    </footer>
  );
}
