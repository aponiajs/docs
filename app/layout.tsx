import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'AponiaJS',
    template: '%s | AponiaJS',
  },
  description:
    'A Bun-first, Nest-inspired application framework powered by Elysia.',
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${geist.className}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-[100dvh] flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
