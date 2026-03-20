'use client';

import { useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { translateToLinkedIn } from '@/actions/translate';
import { getDictionary } from '@/i18n/dictionaries';

export default function Home() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) ?? 'en';
  const t = getDictionary(locale);

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
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

      setResult(data.result ?? '');

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    } catch {
      setError(t.errors.generic);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function switchLocale(newLocale: string) {
    router.push(`/${newLocale}`);
  }

  return (
    <div className="min-h-screen flex flex-col sm:mt-24">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex items-center gap-3">
          <span className="text-2xl sm:text-3xl" role="img" aria-label="megaphone">
            📢
          </span>
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">
              {t.header.title}
            </h1>
            <p className="text-xs sm:text-sm text-muted">
              {t.header.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => switchLocale('en')}
              className={`px-2 py-1 text-xs sm:text-sm rounded-md transition-colors cursor-pointer ${locale === 'en'
                  ? 'bg-primary text-white font-semibold'
                  : 'text-muted hover:text-foreground'
                }`}
            >
              EN
            </button>
            <button
              onClick={() => switchLocale('es')}
              className={`px-2 py-1 text-xs sm:text-sm rounded-md transition-colors cursor-pointer ${locale === 'es'
                  ? 'bg-primary text-white font-semibold'
                  : 'text-muted hover:text-foreground'
                }`}
            >
              ES
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Input panel */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <label
              htmlFor="input"
              className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted"
            >
              {t.input.label}
            </label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.input.placeholder}
              maxLength={2000}
              className="min-h-[160px] sm:min-h-[220px] md:min-h-[300px] p-3 sm:p-4 rounded-xl bg-card border border-border resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted/60 text-sm sm:text-base"
            />
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted shrink-0">
                {input.length}/2000
              </span>
              <button
                onClick={handleTranslate}
                disabled={loading || !input.trim()}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer text-sm sm:text-base whitespace-nowrap"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="loading-dot w-1.5 h-1.5 bg-white rounded-full inline-block" />
                      <span className="loading-dot w-1.5 h-1.5 bg-white rounded-full inline-block" />
                      <span className="loading-dot w-1.5 h-1.5 bg-white rounded-full inline-block" />
                    </span>
                    {t.input.translating}
                  </span>
                ) : (
                  <>
                    <span className="hidden sm:inline">{t.input.translateFull}</span>
                    <span className="sm:hidden">{t.input.translateShort}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output panel */}
          <div ref={resultRef} className="flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted">
                {t.output.label}
              </label>
              {result && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-border hover:border-primary hover:text-primary transition-colors cursor-pointer text-muted"
                  title="Copy to clipboard"
                >
                  {copied ? t.output.copied : t.output.copy}
                </button>
              )}
            </div>
            <div
              className={`rounded-xl bg-card border border-border overflow-y-auto scroll-smooth ${result
                  ? 'min-h-[200px] max-h-[60vh] md:max-h-[70vh]'
                  : 'min-h-[160px] sm:min-h-[220px] md:min-h-[300px]'
                }`}
            >
              <div className="p-3 sm:p-4">
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
                {!result && !error && !loading && (
                  <p className="text-muted/40 italic text-sm">
                    {t.output.placeholder}
                  </p>
                )}
                {loading && !result && (
                  <div className="flex items-center gap-2 text-muted">
                    <span className="flex gap-1">
                      <span className="loading-dot w-2 h-2 bg-primary rounded-full inline-block" />
                      <span className="loading-dot w-2 h-2 bg-primary rounded-full inline-block" />
                      <span className="loading-dot w-2 h-2 bg-primary rounded-full inline-block" />
                    </span>
                    <span className="text-sm">{t.output.generating}</span>
                  </div>
                )}
                {result && (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed break-words">
                    {result}
                  </div>
                )}
              </div>
            </div>
            {result && (
              <p className="text-xs text-muted text-center italic">
                {t.output.disclaimer}
              </p>
            )}
          </div>
        </div>

        {/* Examples */}
        <section className="mt-8 sm:mt-12 text-center">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted mb-3 sm:mb-4">
            {t.examples.title}
          </h2>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {t.examples.items.map((example) => (
              <button
                key={example}
                onClick={() => setInput(example)}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full border border-border hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                {example}
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-4 sm:py-6 text-center text-xs sm:text-sm text-muted px-4">
        <p>
          {t.footer.text}{' '}
          <a
            href="https://github.com/alexfdez1010/linkedin-translator"
            className="underline hover:text-foreground transition-colors"
          >
            {t.footer.openSource}
          </a>{' '}
          &middot; {t.footer.poweredBy}
        </p>
      </footer>
    </div>
  );
}
