const en = {
  meta: {
    title: 'LinkedIn Translator - Turn Normal Text Into Insufferable Posts',
    description:
      'A sarcastic tool that converts your normal human text into the exaggerated, self-congratulatory LinkedIn posts we all love to hate.',
    ogTitle: 'LinkedIn Translator',
    ogDescription:
      'Turn normal text into insufferable LinkedIn posts. Because every coffee deserves a 500-word motivational speech.',
    twitterDescription:
      'Turn normal text into insufferable LinkedIn posts. Agree? 🚀',
  },
  header: {
    title: 'LinkedIn Translator',
    subtitle: 'Turn normal text into insufferable LinkedIn posts',
  },
  input: {
    label: 'Normal human text',
    placeholder: 'I made coffee this morning...',
    translateFull: '🚀 Translate to LinkedIn',
    translateShort: '🚀 Translate',
    translating: 'Translating',
  },
  output: {
    label: 'LinkedIn version',
    placeholder: 'Your insufferable LinkedIn post will appear here...',
    generating: 'Generating cringe...',
    copied: '✅ Copied',
    copy: '📋 Copy',
    disclaimer:
      "Please don't actually post this. Or do. We won't judge. (We will.)",
  },
  examples: {
    title: 'Try these',
    items: [
      'I ate lunch at my desk today',
      'I got a new job',
      'I went for a walk',
      'My code finally compiled',
      'I read a book this weekend',
    ],
  },
  footer: {
    text: 'Built to expose the absurdity of LinkedIn culture.',
    openSource: 'Open Source',
    poweredBy: 'Powered by sarcasm and AI',
  },
  errors: {
    generic: 'Something went wrong. Please try again.',
    emptyText: 'Please provide some text to translate',
    tooLong: 'Text must be 2000 characters or less',
    noApiKey: 'OPENROUTER_API_KEY is not configured',
    translationFailed: 'Translation failed. Please try again.',
    serviceFailed: 'Translation service failed. Please try again.',
  },
};

export type Dictionary = typeof en;

export default en;
