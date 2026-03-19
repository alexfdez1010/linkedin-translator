'use client';

import { useRef, useState } from 'react';
import { translateToLinkedIn } from './actions/translate';

export default function Home() {
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
      const data = await translateToLinkedIn(input.trim());

      if (data.error) {
        setError(data.error);
        return;
      }

      setResult(data.result ?? '');

      // On mobile, scroll to result after translation
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    } catch {
      setError('Something went wrong. Please try again.');
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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex items-center gap-3">
          <span className="text-2xl sm:text-3xl" role="img" aria-label="megaphone">
            📢
          </span>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">
              LinkedIn Translator
            </h1>
            <p className="text-xs sm:text-sm text-muted">
              Turn normal text into insufferable LinkedIn posts
            </p>
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
              Normal human text
            </label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="I made coffee this morning..."
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
                    Translating
                  </span>
                ) : (
                  <>
                    <span className="hidden sm:inline">🚀 Translate to LinkedIn</span>
                    <span className="sm:hidden">🚀 Translate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output panel */}
          <div ref={resultRef} className="flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted">
                LinkedIn version
              </label>
              {result && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-border hover:border-primary hover:text-primary transition-colors cursor-pointer text-muted"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <>✅ Copied</>
                  ) : (
                    <>📋 Copy</>
                  )}
                </button>
              )}
            </div>
            <div
              className={`rounded-xl bg-card border border-border overflow-y-auto scroll-smooth ${
                result
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
                    Your insufferable LinkedIn post will appear here...
                  </p>
                )}
                {loading && !result && (
                  <div className="flex items-center gap-2 text-muted">
                    <span className="flex gap-1">
                      <span className="loading-dot w-2 h-2 bg-primary rounded-full inline-block" />
                      <span className="loading-dot w-2 h-2 bg-primary rounded-full inline-block" />
                      <span className="loading-dot w-2 h-2 bg-primary rounded-full inline-block" />
                    </span>
                    <span className="text-sm">Generating cringe...</span>
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
                Please don&apos;t actually post this. Or do. We won&apos;t judge.
                (We will.)
              </p>
            )}
          </div>
        </div>

        {/* Examples */}
        <section className="mt-8 sm:mt-12 text-center">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted mb-3 sm:mb-4">
            Try these
          </h2>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {[
              'I ate lunch at my desk today',
              'I got a new job',
              'I went for a walk',
              'My code finally compiled',
              'I read a book this weekend',
            ].map((example) => (
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
          Built to expose the absurdity of LinkedIn culture.{' '}
          <a
            href="https://github.com/alexfdez1010/linkedin-translator"
            className="underline hover:text-foreground transition-colors"
          >
            Open Source
          </a>{' '}
          &middot; Powered by sarcasm and AI
        </p>
      </footer>
    </div>
  );
}
