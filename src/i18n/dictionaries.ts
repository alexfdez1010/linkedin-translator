import en from './dictionaries/en';
import es from './dictionaries/es';

export type { Dictionary } from './dictionaries/en';

const dictionaries = { en, es } as const;

export type Locale = keyof typeof dictionaries;

export function getDictionary(locale: string) {
  return dictionaries[locale as Locale] ?? dictionaries.en;
}
