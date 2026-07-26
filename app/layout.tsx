import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'AponiaJS',
    template: '%s | AponiaJS',
  },
  description:
    'A Bun-first, Nest-inspired application framework powered by Elysia.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex min-h-[100dvh] flex-col">
        <RootProvider
          theme={{
            defaultTheme: 'dark',
            enableSystem: false,
            forcedTheme: 'dark',
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
