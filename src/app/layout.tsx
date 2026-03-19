import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LinkedIn Translator - Turn Normal Text Into Insufferable Posts',
  description:
    'A sarcastic tool that converts your normal human text into the exaggerated, self-congratulatory LinkedIn posts we all love to hate.',
  openGraph: {
    title: 'LinkedIn Translator',
    description:
      'Turn normal text into insufferable LinkedIn posts. Because every coffee deserves a 500-word motivational speech.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Translator',
    description:
      'Turn normal text into insufferable LinkedIn posts. Agree? 🚀',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
