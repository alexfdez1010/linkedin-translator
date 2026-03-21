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

  const charPercent = Math.min((input.length / 2000) * 100, 100);

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* ── Header ── */}
      <header className="animate-fade-up sticky top-0 z-20">
        <div className="glass-card border-t-0 rounded-none border-x-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shrink-0 text-white"
                   style={{ boxShadow: '0 4px 16px var(--primary-glow)' }}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="font-display text-lg sm:text-xl font-normal tracking-tight truncate">
                  {t.header.title}
                </h1>
                <p className="text-xs sm:text-sm text-muted truncate">
                  {t.header.subtitle}
                </p>
              </div>
            </div>
            <div className="locale-switch shrink-0">
              <button
                onClick={() => switchLocale('en')}
                className={`locale-btn ${locale === 'en' ? 'locale-btn-active' : ''}`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('es')}
                className={`locale-btn ${locale === 'es' ? 'locale-btn-active' : ''}`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero section ── */}
      <div className="animate-fade-up max-w-5xl mx-auto w-full px-4 sm:px-6 pt-8 sm:pt-14 pb-2 text-center"
           style={{ animationDelay: '0.1s' }}>
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
          {locale === 'es' ? 'Parodia profesional con IA' : 'AI-powered professional parody'}
        </p>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
          {locale === 'es'
            ? <>Tu texto. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic">Su energía.</span></>
            : <>Your text. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic">Their energy.</span></>
          }
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted max-w-lg mx-auto leading-relaxed">
          {locale === 'es'
            ? 'Convierte pensamientos normales en obras maestras de auto-bombo que harían llorar a cualquier CEO.'
            : 'Turn normal thoughts into self-congratulatory masterpieces that would make any CEO weep with pride.'
          }
        </p>
      </div>

      {/* ── Main content ── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {/* Input panel */}
          <div className="animate-slide-left flex flex-col gap-3" style={{ animationDelay: '0.2s' }}>
            <label
              htmlFor="input"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              {t.input.label}
            </label>
            <div className="glass-card rounded-2xl overflow-hidden">
              <textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.input.placeholder}
                maxLength={2000}
                className="textarea-input w-full min-h-[160px] sm:min-h-[220px] md:min-h-[280px] p-4 sm:p-5 rounded-2xl text-sm sm:text-base border-0 bg-transparent"
              />
            </div>
            <div className="flex items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="13" fill="none" stroke="var(--border)" strokeWidth="2.5" />
                    <circle
                      cx="16" cy="16" r="13" fill="none"
                      stroke={charPercent > 90 ? '#ef4444' : 'var(--primary)'}
                      strokeWidth="2.5"
                      strokeDasharray={`${charPercent * 0.8168} 81.68`}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                </div>
                <span className={`text-xs tabular-nums ${charPercent > 90 ? 'text-red-500 font-semibold' : 'text-muted'}`}>
                  {input.length}<span className="text-muted/50">/2000</span>
                </span>
              </div>
              <button
                onClick={handleTranslate}
                disabled={loading || !input.trim()}
                className="btn-translate px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base group"
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
                  <span className="flex items-center gap-2">
                    <span className="hidden sm:inline">{t.input.translateFull}</span>
                    <span className="sm:hidden">{t.input.translateShort}</span>
                    <span className="arrow-icon">→</span>
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Output panel */}
          <div ref={resultRef} className="animate-slide-right flex flex-col gap-3" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                {t.output.label}
              </label>
              {result && (
                <button onClick={handleCopy} className="btn-copy animate-fade-in">
                  {copied ? t.output.copied : t.output.copy}
                </button>
              )}
            </div>
            <div
              className={`glass-card rounded-2xl overflow-y-auto scroll-smooth output-glow ${
                result ? 'output-glow-active min-h-[200px] max-h-[60vh] md:max-h-[70vh]' : 'min-h-[160px] sm:min-h-[220px] md:min-h-[280px]'
              }`}
            >
              <div className="p-4 sm:p-5">
                {error && (
                  <div className="flex items-start gap-2 text-red-500 text-sm animate-fade-up">
                    <span className="shrink-0 mt-0.5">⚠</span>
                    <p>{error}</p>
                  </div>
                )}
                {!result && !error && !loading && (
                  <p className="text-muted/30 italic text-sm">
                    {t.output.placeholder}
                  </p>
                )}
                {loading && !result && (
                  <div className="flex items-center gap-3 text-muted py-4">
                    <span className="flex gap-1.5">
                      <span className="loading-dot w-2.5 h-2.5 bg-primary rounded-full inline-block" />
                      <span className="loading-dot w-2.5 h-2.5 bg-primary rounded-full inline-block" />
                      <span className="loading-dot w-2.5 h-2.5 bg-primary rounded-full inline-block" />
                    </span>
                    <span className="text-sm font-medium">{t.output.generating}</span>
                  </div>
                )}
                {result && (
                  <div className="result-text whitespace-pre-wrap text-sm sm:text-base leading-relaxed break-words">
                    {result}
                  </div>
                )}
              </div>
            </div>
            {result && (
              <p className="text-xs text-muted text-center italic px-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                {t.output.disclaimer}
              </p>
            )}
          </div>
        </div>

        {/* ── Examples ── */}
        <section className="mt-10 sm:mt-16 text-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4 sm:mb-5">
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

      {/* ── Footer ── */}
      <footer className="relative z-10 py-6 sm:py-8 text-center text-xs sm:text-sm text-muted px-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-0">
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
