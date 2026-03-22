# CLAUDE.md — LinkedIn Translator

## Project overview

A sarcastic web app that converts normal text into exaggerated LinkedIn-style posts using AI. Built with Next.js 16 (App Router), Tailwind CSS 4, shadcn/ui, and OpenRouter.

## Commands

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm test` — run Vitest tests
- `docker compose up -d` — start PostgreSQL (port 5433)
- `npx prisma migrate dev` — run database migrations
- `npx prisma generate` — regenerate Prisma client

## Code style rules

- **Max 200 lines per file.** If a file exceeds 200 lines, refactor into smaller components/modules.

## Architecture

### Routing & i18n

- Uses `next-i18n-router` for locale-based routing
- Supported locales: `en`, `es` (default: `en`)
- Middleware at `src/proxy.ts` handles auto-detection and redirects
- Config at `src/i18n/config.ts`
- Pages live under `src/app/[locale]/`
- Root `src/app/layout.tsx` is a passthrough (no `<html>` tag — that's in `[locale]/layout.tsx`)

### Translation flow

1. User enters text in the client page (`src/app/[locale]/page.tsx`)
2. Calls server action `translateToLinkedIn(text, locale)` in `src/actions/translate.ts`
3. Server action selects a locale-specific system prompt from `src/i18n/prompts.ts`
4. Sends request to OpenRouter free model
5. Returns plain text result (prompts explicitly request no markdown)
6. User can edit the result text before copying/sharing

### Share flow

1. User clicks Share button, which calls `shareTranslation()` in `src/actions/share.ts`
2. Server action saves to PostgreSQL via Prisma (SharedTranslation model)
3. Returns a slug; client builds URL and shows it in a shadcn Dialog
4. Share page at `src/app/[locale]/share/[slug]/page.tsx` is server-rendered
5. Dynamic OG image generated at `opengraph-image.tsx` using `ImageResponse`

### Database

- Prisma ORM with PostgreSQL (Docker, port 5433)
- Schema at `prisma/schema.prisma`
- Client singleton at `src/lib/prisma.ts` (uses `@prisma/adapter-pg`)
- Generated client output: `src/generated/prisma/` (gitignored)

### UI components

- shadcn/ui components in `src/components/ui/`
- App components in `src/components/` (header, hero, input-panel, output-panel, share-dialog, footer)
- Global styles + CSS variables in `src/app/globals.css`

### i18n structure

- `src/i18n/config.ts` — locale list and default
- `src/i18n/dictionaries/en.ts` — English UI strings (defines the `Dictionary` type)
- `src/i18n/dictionaries/es.ts` — Spanish UI strings (typed against `Dictionary`)
- `src/i18n/dictionaries.ts` — synchronous dictionary loader (works in both server and client components)
- `src/i18n/prompts.ts` — locale-specific LLM system prompts

### Key files

- `src/actions/translate.ts` — translation server action
- `src/actions/share.ts` — share server action (create + get)
- `src/app/[locale]/page.tsx` — main UI (client component)
- `src/app/[locale]/share/[slug]/page.tsx` — SSR share page
- `src/app/[locale]/layout.tsx` — locale layout with metadata
- `src/app/globals.css` — Tailwind + CSS variables for theming
- `tests/translate.test.ts` — Vitest tests for the translate action

### Adding a new locale

1. Add to `locales` array in `src/i18n/config.ts`
2. Create `src/i18n/dictionaries/<locale>.ts`
3. Register loader in `src/i18n/dictionaries.ts`
4. Add system prompt in `src/i18n/prompts.ts`
5. Add locale-specific strings in page components
6. Add switcher button in header

## Environment

- Requires `OPENROUTER_API_KEY` env var (see `.env.example`)
- Requires `DATABASE_URL` env var for PostgreSQL
- Uses `openrouter/free` model
- Docker Compose for local PostgreSQL (port 5433)
