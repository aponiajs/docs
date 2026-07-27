import { HeroSection } from '@/components/landing/HeroSection';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { BenchmarkSection } from '@/components/landing/BenchmarkSection';
import { AponiaInterlude } from '@/components/landing/AponiaInterlude';
import { CallToAction } from '@/components/landing/CallToAction';
import { LandingNavigation } from '@/components/landing/LandingNavigation';
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
          title: 'AponiaJS AI documentation index',
        },
        {
          url: '/llms-full.txt',
          title: 'Complete AponiaJS documentation for AI tools',
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
      <LandingNavigation />
      <main
        id="main-content"
        className="aponia-landing mono-root min-h-[100dvh] overflow-hidden"
      >
        <HeroSection />
        <TrustStrip />
        <FeaturesSection />
        <BenchmarkSection />
        <AponiaInterlude />
        <CallToAction />
      </main>
    </>
  );
}
