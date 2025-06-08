import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dev Mood ✨ - Track your developer mood, one day at a time',
  description:
    "Dev Mood is a simple and introspective app where developers can log their daily mood, what they're working on, and reflect on how they're feeling.",
  keywords: [
    'developer',
    'mood',
    'tracking',
    'journal',
    'nextjs',
    'prisma',
    'clerk',
  ],
  authors: [
    { name: 'Tiago Rodrigues', url: 'https://github.com/tiagonrodrigues' },
  ],
  openGraph: {
    title: 'Dev Mood ✨',
    description: 'Track your developer mood, one day at a time',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Mood ✨',
    description: 'Track your developer mood, one day at a time',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${geistSans.variable} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
