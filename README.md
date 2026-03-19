# LinkedIn Translator 📢

Turn normal human text into the exaggerated, self-congratulatory, inspirational-yet-hollow LinkedIn posts we all know and love (to hate).

> "I made coffee this morning" → A 500-word motivational speech about leadership, hustle, and the grind ☕🚀

## Features

- **Sarcastic translations** — brutally accurate parodies of LinkedIn culture
- **Any language** — write in Spanish, French, Japanese, whatever — the response matches your language
- **One-click copy** — easily copy the result to your clipboard
- **Example prompts** — try pre-built examples to see it in action
- **Dark mode** — respects your system preference
- **Fast** — powered by OpenRouter's free AI models

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

Open [http://localhost:3000](http://localhost:3000) and start translating.

## Deploy to Vercel

1. Import the repo on [vercel.com](https://vercel.com)
2. Add `OPENROUTER_API_KEY` as an environment variable
3. Deploy — that's it

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [OpenRouter](https://openrouter.ai/) (free AI models)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT — see [LICENSE](LICENSE) for details.
