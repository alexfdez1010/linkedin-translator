'use server';

import { OpenRouter } from '@openrouter/sdk';
import { getSystemPrompt } from '@/i18n/prompts';

export type TranslateResult = {
  result?: string;
  error?: string;
};

export async function translateToLinkedIn(
  text: string,
  locale: string = 'en',
): Promise<TranslateResult> {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return { error: 'Please provide some text to translate' };
  }

  if (text.length > 2000) {
    return { error: 'Text must be 2000 characters or less' };
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return { error: 'OPENROUTER_API_KEY is not configured' };
  }

  try {
    const client = new OpenRouter({ apiKey });
    const systemPrompt = getSystemPrompt(locale);

    const response = await client.chat.send({
      chatGenerationParams: {
        model: 'openrouter/free',
        maxTokens: 8192,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text.trim() },
        ],
      },
    });

    const translated =
      response.choices?.[0]?.message?.content ?? null;

    if (!translated) {
      return { error: 'Translation failed. Please try again.' };
    }

    return { result: translated };
  } catch (error) {
    console.error('Translation error:', error);
    return { error: 'Translation service failed. Please try again.' };
  }
}
