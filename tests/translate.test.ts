import { describe, it, expect } from 'vitest';
import { translateToLinkedIn } from '@/actions/translate';

describe('translateToLinkedIn', () => {
  it.concurrent('returns error when text is empty', async () => {
    const result = await translateToLinkedIn('');
    expect(result.error).toContain('provide some text');
  });

  it.concurrent('returns error when text is only whitespace', async () => {
    const result = await translateToLinkedIn('   ');
    expect(result.error).toContain('provide some text');
  });

  it.concurrent('returns error when text exceeds 2000 characters', async () => {
    const result = await translateToLinkedIn('a'.repeat(2001));
    expect(result.error).toContain('2000');
  });

  it.concurrent(
    'translates normal text into a LinkedIn-style post',
    async () => {
      const key = process.env.OPENROUTER_API_KEY;
      if (!key) {
        console.warn('Skipping: OPENROUTER_API_KEY not set');
        return;
      }

      const result = await translateToLinkedIn('I made coffee this morning', 'en');

      expect(result.error).toBeUndefined();
      expect(result.result).toBeDefined();
      expect(typeof result.result).toBe('string');
      expect(result.result!.length).toBeGreaterThan(50);
    },
    60000,
  );

  it.concurrent(
    'responds in the same language as the input',
    async () => {
      const key = process.env.OPENROUTER_API_KEY;
      if (!key) {
        console.warn('Skipping: OPENROUTER_API_KEY not set');
        return;
      }

      const result = await translateToLinkedIn('Hoy comí una manzana', 'es');

      expect(result.error).toBeUndefined();
      expect(result.result).toBeDefined();
      expect(result.result!.length).toBeGreaterThan(50);
    },
    60000,
  );
});
