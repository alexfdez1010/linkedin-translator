'use client';

import type { Dictionary } from '@/i18n/dictionaries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Copy, ExternalLink, Loader2, Share2 } from 'lucide-react';

interface ShareDialogProps {
  t: Dictionary;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shareUrl: string;
  sharing: boolean;
  shareError: string;
  shareLinkCopied: boolean;
  onCopyLink: () => void;
}

export function ShareDialog({
  t,
  open,
  onOpenChange,
  shareUrl,
  sharing,
  shareError,
  shareLinkCopied,
  onCopyLink,
}: ShareDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        {/* Gradient accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, var(--brand-blue), var(--brand-fuchsia))' }}
        />

        <DialogHeader className="pt-2">
          <DialogTitle className="font-display text-lg flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-fuchsia flex items-center justify-center text-white shrink-0"
              style={{ boxShadow: '0 2px 12px var(--brand-blue-glow)' }}
            >
              <Share2 className="w-4.5 h-4.5" />
            </div>
            {t.output.dialogTitle}
          </DialogTitle>
          <DialogDescription className="pl-[46px]">
            {t.output.dialogDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-1">
          {sharing && (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
              <p className="text-sm text-muted-foreground animate-pulse">
                {t.output.dialogTitle}...
              </p>
            </div>
          )}

          {shareError && (
            <div className="flex items-start gap-2.5 text-red-500 text-sm p-3.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <span className="shrink-0 mt-0.5 text-base">⚠</span>
              <p>{shareError}</p>
            </div>
          )}

          {shareUrl && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 min-w-0 rounded-xl border border-input bg-muted/50 px-3.5 py-2.5 text-sm font-mono tracking-tight focus:outline-none focus:ring-2 focus:ring-ring"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <Button
                  onClick={onCopyLink}
                  size="lg"
                  className="shrink-0 gap-2 rounded-xl px-5"
                  style={{
                    background: shareLinkCopied
                      ? '#22c55e'
                      : 'linear-gradient(135deg, var(--brand-blue), var(--brand-fuchsia))',
                  }}
                >
                  {shareLinkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {shareLinkCopied ? t.output.dialogCopied : t.output.dialogCopy}
                </Button>
              </div>
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-brand-blue transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {shareUrl.replace(/^https?:\/\//, '').split('/').slice(0, 3).join('/')}
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
