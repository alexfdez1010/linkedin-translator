import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSharedTranslation } from '@/actions/share';
import { getDictionary } from '@/i18n/dictionaries';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

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
    openGraph: { title: t.share.title, description: preview, type: 'article' },
    twitter: { card: 'summary_large_image', title: t.share.title, description: preview },
  };
}

export default async function SharePage({ params }: { params: Params }) {
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
      <Header t={t} locale={locale} subtitle={t.share.title} maxWidth="max-w-3xl" />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="animate-fade-up text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] border border-border text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-fuchsia inline-block" />
            {t.share.sharedOn} {formattedDate}
          </span>
        </div>

        <section className="animate-slide-left mb-6" style={{ animationDelay: '0.1s' }}>
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue inline-block" />
            {t.share.originalLabel}
          </label>
          <div className="glass-card rounded-2xl">
            <p className="p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-muted-foreground whitespace-pre-wrap break-words">
              {translation.originalText}
            </p>
          </div>
        </section>

        <section className="animate-slide-right mb-10" style={{ animationDelay: '0.2s' }}>
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-fuchsia inline-block" />
            {t.share.translatedLabel}
          </label>
          <div className="glass-card rounded-2xl output-glow output-glow-active">
            <div className="p-4 sm:p-5 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
              {translation.translatedText}
            </div>
          </div>
        </section>

        <div className="animate-fade-up text-center" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-muted-foreground mb-4">{t.share.ctaDescription}</p>
          <Link href={`/${locale}`} className="btn-translate inline-flex items-center gap-2 px-8 py-3 text-base">
            {t.share.cta}
            <span className="arrow-icon">→</span>
          </Link>
        </div>
      </main>

      <Footer t={t} maxWidth="max-w-3xl" />
    </div>
  );
}
