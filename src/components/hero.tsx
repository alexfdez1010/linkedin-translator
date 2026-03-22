interface HeroProps {
  locale: string;
}

export function Hero({ locale }: HeroProps) {
  return (
    <div
      className="animate-fade-up max-w-5xl mx-auto w-full px-4 sm:px-6 pt-8 sm:pt-14 pb-2 text-center"
      style={{ animationDelay: '0.1s' }}
    >
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue mb-3">
        {locale === 'es' ? 'Parodia profesional con IA' : 'AI-powered professional parody'}
      </p>
      <h2 className="font-display text-3xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
        {locale === 'es' ? (
          <>Tu texto. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-fuchsia italic">Su energía.</span></>
        ) : (
          <>Your text. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-fuchsia italic">Their energy.</span></>
        )}
      </h2>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
        {locale === 'es'
          ? 'Convierte pensamientos normales en obras maestras de auto-bombo que harían llorar a cualquier CEO.'
          : 'Turn normal thoughts into self-congratulatory masterpieces that would make any CEO weep with pride.'}
      </p>
    </div>
  );
}
