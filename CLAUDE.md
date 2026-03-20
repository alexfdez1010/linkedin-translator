# CLAUDE.md — LinkedIn Translator

## Project overview

A sarcastic web app that converts normal text into exaggerated LinkedIn-style posts using AI. Built with Next.js 16 (App Router), Tailwind CSS 4, and OpenRouter.

## Commands

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm test` — run Vitest tests

## Architecture

### Routing & i18n

- Uses `next-i18n-router` for locale-based routing
- Supported locales: `en`, `es` (default: `en`)
- Middleware at `src/middleware.ts` handles auto-detection and redirects
- Config at `src/i18n/config.ts`
- Pages live under `src/app/[locale]/`
- Root `src/app/layout.tsx` is a passthrough (no `<html>` tag — that's in `[locale]/layout.tsx`)

### Translation flow

1. User enters text in the client page (`src/app/[locale]/page.tsx`)
2. Calls server action `translateToLinkedIn(text, locale)` in `src/actions/translate.ts`
3. Server action selects a locale-specific system prompt from `src/i18n/prompts.ts`
4. Sends request to OpenRouter free model
5. Returns plain text result (prompts explicitly request no markdown)

### i18n structure

- `src/i18n/config.ts` — locale list and default
- `src/i18n/dictionaries/en.ts` — English UI strings (defines the `Dictionary` type)
- `src/i18n/dictionaries/es.ts` — Spanish UI strings (typed against `Dictionary`)
- `src/i18n/dictionaries.ts` — synchronous dictionary loader (works in both server and client components)
- `src/i18n/prompts.ts` — locale-specific LLM system prompts

### Key files

- `src/actions/translate.ts` — server action (outside `app/` directory)
- `src/app/[locale]/page.tsx` — main UI (client component)
- `src/app/[locale]/layout.tsx` — locale layout with metadata
- `src/app/globals.css` — Tailwind + CSS variables for theming
- `tests/translate.test.ts` — Vitest tests for the translate action

### Adding a new locale

1. Add to `locales` array in `src/i18n/config.ts`
2. Create `src/i18n/dictionaries/<locale>.json`
3. Register loader in `src/i18n/dictionaries.ts`
4. Add system prompt in `src/i18n/prompts.ts`
5. Add inline dictionary in `src/app/[locale]/page.tsx`
6. Add switcher button in header

## Environment

- Requires `OPENROUTER_API_KEY` env var (see `.env.example`)
- Uses `openrouter/free` model
