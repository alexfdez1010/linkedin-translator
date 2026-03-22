'use server';

import { prisma } from '@/lib/prisma';

function generateSlug(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let slug = '';
  for (let i = 0; i < 8; i++) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }
  return slug;
}

export type ShareResult = {
  slug?: string;
  error?: string;
};

export async function shareTranslation(
  originalText: string,
  translatedText: string,
  locale: string = 'en',
): Promise<ShareResult> {
  if (!originalText || !translatedText) {
    return { error: 'Missing text content' };
  }

  if (originalText.length > 2000 || translatedText.length > 10000) {
    return { error: 'Text too long' };
  }

  try {
    const slug = generateSlug();

    await prisma.sharedTranslation.create({
      data: {
        slug,
        originalText: originalText.trim(),
        translatedText: translatedText.trim(),
        locale,
      },
    });

    return { slug };
  } catch (error) {
    console.error('Share error:', error);
    return { error: 'Failed to create share link' };
  }
}

export async function getSharedTranslation(slug: string) {
  if (!slug || typeof slug !== 'string') return null;

  try {
    return await prisma.sharedTranslation.findUnique({
      where: { slug },
    });
  } catch {
    return null;
  }
}
