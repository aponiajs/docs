import { HeroSection } from '@/components/landing/HeroSection';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { BenchmarkSection } from '@/components/landing/BenchmarkSection';
import { AponiaInterlude } from '@/components/landing/AponiaInterlude';
import { CallToAction } from '@/components/landing/CallToAction';
import { LandingNavigation } from '@/components/landing/LandingNavigation';

export default function HomePage() {
  return (
    <>
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
