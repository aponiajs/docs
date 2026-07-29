import { LandingNavigation } from '@/components/landing/LandingNavigation';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingPrinciples } from '@/components/landing/LandingPrinciples';
import { LandingNumbers } from '@/components/landing/LandingNumbers';
import { LandingIndex } from '@/components/landing/LandingIndex';
import { LandingStart } from '@/components/landing/LandingStart';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { RevealOnScroll } from '@/components/landing/RevealOnScroll';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl, siteConfig } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modular TypeScript for Bun',
  description:
    'Decorated controllers register as routes on a single server instance. Providers resolve at startup, not per request. Modules, validation, and CLI schematics included.',
  /*
   * A nested `openGraph` replaces the root object rather than merging into it,
   * so the image has to be repeated here or the page ships without one.
   */
  openGraph: {
    type: 'website',
    url: '/',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: 'AponiaJS | Modular TypeScript framework for Bun',
    description:
      'Modules, controllers, decorators, and constructor injection on Bun. Providers resolve at startup, not per request.',
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
    title: 'AponiaJS | Modular TypeScript framework for Bun',
    description:
      'Modules, controllers, decorators, and constructor injection on Bun.',
    images: [siteConfig.socialImage],
  },
  alternates: {
    canonical: '/',
    types: {
      'text/plain': [
        {
          url: '/llms.txt',
          title: 'AponiaJS documentation index for LLMs',
        },
        {
          url: '/llms-full.txt',
          title: 'Complete AponiaJS documentation for LLMs',
        },
      ],
    },
  },
};

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  '@id': absoluteUrl('/#software'),
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  codeRepository: siteConfig.repository,
  programmingLanguage: {
    '@type': 'ComputerLanguage',
    name: 'TypeScript',
  },
  runtimePlatform: 'Bun',
  applicationCategory: 'DeveloperApplication',
  keywords: siteConfig.keywords.join(', '),
  license: 'https://opensource.org/license/mit',
  isAccessibleForFree: true,
  operatingSystem: 'Bun',
  targetProduct: {
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Bun',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareJsonLd} />
      <a href="#main-content" className="mono-skip">
        Skip to content
      </a>
      {/* Without JavaScript nothing observes the reveal state, so unhide. */}
      <noscript>
        <style>{
          '[data-mono-reveal]{opacity:1 !important;transform:none !important}'
        }</style>
      </noscript>
      <LandingNavigation />
      <RevealOnScroll />
      <main id="main-content" className="mono-root">
        <LandingHero />
        <LandingPrinciples />
        <LandingNumbers />
        <LandingIndex />
        <LandingStart />
        <LandingFooter />
      </main>
    </>
  );
}
