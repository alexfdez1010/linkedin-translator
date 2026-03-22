'use server';

import { prisma } from '@/lib/prisma';

function textToSlug(text: string): string {
  const base = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 25)
    .replace(/-$/, '');

  return base || 'share';
}

function addRandomSuffix(slug: string): string {
  const suffix = Math.floor(Math.random() * 9000 + 1000).toString();
  return `${slug}-${suffix}`;
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
    let slug = textToSlug(originalText);

    const existing = await prisma.sharedTranslation.findUnique({
      where: { slug },
    });
    if (existing) {
      slug = addRandomSuffix(slug);
    }

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
