import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import type { Metadata, Viewport } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | AponiaJS',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [
    {
      name: 'AponiaJS contributors',
      url: siteConfig.organization,
    },
  ],
  creator: 'AponiaJS contributors',
  publisher: 'AponiaJS',
  category: 'technology',
  keywords: [...siteConfig.keywords],
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      {
        url: siteConfig.logo,
        type: 'image/png',
        sizes: '1024x1024',
      },
    ],
    shortcut: [siteConfig.logo],
    apple: [
      {
        url: siteConfig.logo,
        type: 'image/png',
        sizes: '1024x1024',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: '/',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.socialImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}: ${siteConfig.shortDescription}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#ffffff',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#0f0f0f',
    },
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': absoluteUrl('/#organization'),
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl(siteConfig.logo),
      sameAs: [siteConfig.organization, siteConfig.repository],
    },
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: {
        '@id': absoluteUrl('/#organization'),
      },
    },
  ],
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex min-h-[100dvh] flex-col">
        <JsonLd data={websiteJsonLd} />
        <RootProvider
          search={{
            options: {
              type: 'static',
            },
          }}
          theme={{
            defaultTheme: 'dark',
            enableSystem: true,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
