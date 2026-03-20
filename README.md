# LinkedIn Translator 📢

Turn normal human text into the exaggerated, self-congratulatory, inspirational-yet-hollow LinkedIn posts we all know and love (to hate).

> "I made coffee this morning" → A 500-word motivational speech about leadership, hustle, and the grind ☕🚀

## Features

- **Sarcastic translations** — brutally accurate parodies of LinkedIn culture
- **Localized UI** — full English and Spanish interface via `next-i18n-router`
- **Localized LLM prompts** — each language has its own system prompt for better AI output
- **Plain text output** — the LLM is instructed to return plain text (no markdown)
- **One-click copy** — easily copy the result to your clipboard
- **Example prompts** — try pre-built examples (localized per language)
- **Dark mode** — respects your system preference
- **Free** — uses the `openrouter/free` endpoint, so no API credits are needed

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- An [OpenRouter](https://openrouter.ai/) API key (free tier works)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/alexfdez1010/linkedin-translator.git
cd linkedin-translator
```

2. Install dependencies:

```bash
npm install
```

3. Create your environment file:

```bash
cp .env.example .env
```

4. Add your OpenRouter API key to `.env`:

```
OPENROUTER_API_KEY=your_key_here
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start translating. You'll be redirected to `/en` or `/es` based on your browser language.

## Internationalization (i18n)

The app uses [`next-i18n-router`](https://github.com/i18nexus/next-i18n-router) for locale-based routing:

- **Supported locales**: `en` (English), `es` (Spanish)
- **Default locale**: `en`
- **URL structure**: `/en`, `/es` — the middleware auto-detects browser language and redirects
- **UI translations**: stored in `src/i18n/dictionaries/`
- **LLM prompts**: each locale has a dedicated system prompt in `src/i18n/prompts.ts` for optimal AI output in that language

### Adding a new language

1. Add the locale code to `src/i18n/config.ts`
2. Create a new dictionary file in `src/i18n/dictionaries/<locale>.json`
3. Register it in `src/i18n/dictionaries.ts`
4. Add a new system prompt in `src/i18n/prompts.ts`
5. Add the inline dictionary in `src/app/[locale]/page.tsx`
6. Add a language switcher button in the header

## Deploy to Vercel

1. Import the repo on [vercel.com](https://vercel.com)
2. Add `OPENROUTER_API_KEY` as an environment variable
3. Deploy — that's it

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [next-i18n-router](https://github.com/i18nexus/next-i18n-router) (i18n routing)
- [OpenRouter](https://openrouter.ai/) (`openrouter/free` endpoint — no API credits required)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT — see [LICENSE](LICENSE) for details.
