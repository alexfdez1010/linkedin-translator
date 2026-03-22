'use client';

import { forwardRef } from 'react';
import type { Dictionary } from '@/i18n/dictionaries';
import { Button } from '@/components/ui/button';
import { Check, Copy, Link2 } from 'lucide-react';

interface OutputPanelProps {
  t: Dictionary;
  result: string;
  editedResult: string;
  loading: boolean;
  error: string;
  copied: boolean;
  onEditedResultChange: (value: string) => void;
  onCopy: () => void;
  onShare: () => void;
  sharing: boolean;
}

const PANEL_HEIGHT = 'min-h-[180px] sm:min-h-[240px] md:min-h-[300px]';

export const OutputPanel = forwardRef<HTMLDivElement, OutputPanelProps>(
  function OutputPanel(
    { t, result, editedResult, loading, error, copied, onEditedResultChange, onCopy, onShare, sharing },
    ref,
  ) {
    return (
      <div ref={ref} className="animate-slide-right flex flex-col gap-3" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-fuchsia inline-block" />
            {t.output.label}
          </label>
          {result && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onCopy} className="h-7 rounded-full text-xs gap-1.5">
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? t.output.copied : t.output.copy}
              </Button>
              <Button variant="outline" size="sm" onClick={onShare} disabled={sharing} className="h-7 rounded-full text-xs gap-1.5">
                <Link2 className="w-3 h-3" />
                {t.output.share}
              </Button>
            </div>
          )}
        </div>
        <div
          className={`glass-card rounded-2xl overflow-y-auto scroll-smooth output-glow ${PANEL_HEIGHT} ${
            result ? 'output-glow-active' : ''
          }`}
        >
          <div className="p-4 sm:p-5 h-full">
            {error && (
              <div className="flex items-start gap-2 text-red-500 text-sm animate-fade-up">
                <span className="shrink-0 mt-0.5">⚠</span>
                <p>{error}</p>
              </div>
            )}
            {!result && !error && !loading && (
              <p className="text-muted-foreground/30 italic text-sm">{t.output.placeholder}</p>
            )}
            {loading && !result && (
              <div className="flex items-center gap-3 text-muted-foreground py-4">
                <span className="flex gap-1.5">
                  <span className="loading-dot w-2.5 h-2.5 bg-brand-blue rounded-full inline-block" />
                  <span className="loading-dot w-2.5 h-2.5 bg-brand-blue rounded-full inline-block" />
                  <span className="loading-dot w-2.5 h-2.5 bg-brand-blue rounded-full inline-block" />
                </span>
                <span className="text-sm font-medium">{t.output.generating}</span>
              </div>
            )}
            {result && (
              <textarea
                value={editedResult}
                onChange={(e) => onEditedResultChange(e.target.value)}
                className={`result-text w-full h-full bg-transparent text-sm sm:text-base leading-relaxed resize-none outline-none ${PANEL_HEIGHT}`}
                placeholder={t.output.editHint}
              />
            )}
          </div>
        </div>
        {result && (
          <p className="text-xs text-muted-foreground text-center italic px-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {t.output.disclaimer}
          </p>
        )}
      </div>
    );
  },
);
