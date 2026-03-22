import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSharedTranslation } from '@/actions/share';
import { getDictionary } from '@/i18n/dictionaries';

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = getDictionary(locale);
  const translation = await getSharedTranslation(slug);

  if (!translation) {
    return { title: 'Not found' };
  }

  const preview = translation.translatedText.slice(0, 150) + (translation.translatedText.length > 150 ? '...' : '');

  return {
    title: `${t.share.title} | ${t.header.title}`,
    description: preview,
    openGraph: {
      title: t.share.title,
      description: preview,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.share.title,
      description: preview,
    },
  };
}

export default async function SharePage({
  params,
}: {
  params: Params;
}) {
  const { locale, slug } = await params;
  const t = getDictionary(locale);
  const translation = await getSharedTranslation(slug);

  if (!translation) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(translation.createdAt);

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header */}
      <header className="animate-fade-up sticky top-0 z-20">
        <div className="glass-card border-t-0 rounded-none border-x-0">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-4">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity"
            >
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shrink-0 text-white"
                style={{ boxShadow: '0 4px 16px var(--primary-glow)' }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="font-display text-lg sm:text-xl font-normal tracking-tight truncate">
                  {t.header.title}
                </h1>
                <p className="text-xs sm:text-sm text-muted truncate">
                  {t.share.title}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        {/* Share badge */}
        <div className="animate-fade-up text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] border border-border text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            {t.share.sharedOn} {formattedDate}
          </span>
        </div>

        {/* Original text */}
        <section className="animate-slide-left mb-6" style={{ animationDelay: '0.1s' }}>
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            {t.share.originalLabel}
          </label>
          <div className="glass-card rounded-2xl">
            <p className="p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-muted whitespace-pre-wrap break-words">
              {translation.originalText}
            </p>
          </div>
        </section>

        {/* LinkedIn version */}
        <section className="animate-slide-right mb-10" style={{ animationDelay: '0.2s' }}>
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            {t.share.translatedLabel}
          </label>
          <div className="glass-card rounded-2xl output-glow output-glow-active">
            <div className="p-4 sm:p-5 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
              {translation.translatedText}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="animate-fade-up text-center" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-muted mb-4">
            {t.share.ctaDescription}
          </p>
          <Link
            href={`/${locale}`}
            className="btn-translate inline-flex items-center gap-2 px-8 py-3 text-base"
          >
            {t.share.cta}
            <span className="arrow-icon">→</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 sm:py-8 text-center text-xs sm:text-sm text-muted px-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-0">
          <p>
            {t.footer.text}{' '}
            <a
              href="https://github.com/alexfdez1010/linkedin-translator"
              className="underline underline-offset-2 decoration-border hover:decoration-primary hover:text-primary transition-colors"
            >
              {t.footer.openSource}
            </a>
          </p>
          <span className="hidden sm:inline mx-2 text-border">·</span>
          <p>{t.footer.poweredBy}</p>
        </div>
      </footer>
    </div>
  );
}
