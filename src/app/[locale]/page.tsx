'use client';

import { useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { translateToLinkedIn } from '@/actions/translate';
import { shareTranslation } from '@/actions/share';
import { getDictionary } from '@/i18n/dictionaries';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { InputPanel } from '@/components/input-panel';
import { OutputPanel } from '@/components/output-panel';
import { ShareDialog } from '@/components/share-dialog';
import { Footer } from '@/components/footer';

export default function Home() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) ?? 'en';
  const t = getDictionary(locale);

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [editedResult, setEditedResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [sharing, setSharing] = useState(false);
  const [shareError, setShareError] = useState('');
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  async function handleTranslate() {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setResult('');

    try {
      const data = await translateToLinkedIn(input.trim(), locale);
      if (data.error) {
        setError(data.error);
        return;
      }
      const text = data.result ?? '';
      setResult(text);
      setEditedResult(text);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch {
      setError(t.errors.generic);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!editedResult) return;
    await navigator.clipboard.writeText(editedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    if (!editedResult || sharing) return;
    setSharing(true);
    setShareError('');
    setShareUrl('');
    setShareLinkCopied(false);
    setShareDialogOpen(true);

    try {
      const data = await shareTranslation(input.trim(), editedResult, locale);
      if (data.slug) {
        setShareUrl(`${window.location.origin}/${locale}/share/${data.slug}`);
      } else {
        setShareError(t.output.shareError);
      }
    } catch {
      setShareError(t.output.shareError);
    } finally {
      setSharing(false);
    }
  }

  async function handleCopyShareLink() {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setShareLinkCopied(true);
    setTimeout(() => setShareLinkCopied(false), 2000);
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <Header t={t} locale={locale} onSwitchLocale={(l) => router.push(`/${l}`)} />
      <Hero locale={locale} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          <InputPanel t={t} input={input} loading={loading} onInputChange={setInput} onTranslate={handleTranslate} />
          <OutputPanel
            ref={resultRef}
            t={t}
            result={result}
            editedResult={editedResult}
            loading={loading}
            error={error}
            copied={copied}
            onEditedResultChange={setEditedResult}
            onCopy={handleCopy}
            onShare={handleShare}
            sharing={sharing}
          />
        </div>

        <section className="mt-10 sm:mt-16 text-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4 sm:mb-5">
            {t.examples.title}
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center max-w-2xl mx-auto">
            {t.examples.items.map((example, i) => (
              <button
                key={example}
                onClick={() => setInput(example)}
                className="chip px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm active:scale-95 transition-transform"
                style={{ animationDelay: `${0.45 + i * 0.06}s` }}
              >
                <span className="relative z-10">{example}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <Footer t={t} />

      <ShareDialog
        t={t}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        shareUrl={shareUrl}
        sharing={sharing}
        shareError={shareError}
        shareLinkCopied={shareLinkCopied}
        onCopyLink={handleCopyShareLink}
      />
    </div>
  );
}
