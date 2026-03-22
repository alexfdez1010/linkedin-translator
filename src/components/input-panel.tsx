'use client';

import type { Dictionary } from '@/i18n/dictionaries';

interface InputPanelProps {
  t: Dictionary;
  input: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onTranslate: () => void;
}

const PANEL_HEIGHT = 'min-h-[180px] sm:min-h-[240px] md:min-h-[300px]';

export function InputPanel({ t, input, loading, onInputChange, onTranslate }: InputPanelProps) {
  const charPercent = Math.min((input.length / 2000) * 100, 100);

  return (
    <div className="animate-slide-left flex flex-col gap-3" style={{ animationDelay: '0.2s' }}>
      <label
        htmlFor="input"
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue inline-block" />
        {t.input.label}
      </label>
      <div className={`glass-card rounded-2xl overflow-hidden ${PANEL_HEIGHT}`}>
        <textarea
          id="input"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={t.input.placeholder}
          maxLength={2000}
          className={`textarea-input w-full h-full p-4 sm:p-5 rounded-2xl text-sm sm:text-base border-0 bg-transparent ${PANEL_HEIGHT}`}
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="13" fill="none" stroke="var(--border)" strokeWidth="2.5" />
              <circle
                cx="16" cy="16" r="13" fill="none"
                stroke={charPercent > 90 ? '#ef4444' : 'var(--brand-blue)'}
                strokeWidth="2.5"
                strokeDasharray={`${charPercent * 0.8168} 81.68`}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
          </div>
          <span className={`text-xs tabular-nums ${charPercent > 90 ? 'text-red-500 font-semibold' : 'text-muted-foreground'}`}>
            {input.length}<span className="text-muted-foreground/50">/2000</span>
          </span>
        </div>
        <button
          onClick={onTranslate}
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
  );
}
