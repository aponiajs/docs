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
