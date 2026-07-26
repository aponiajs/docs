import { HeroSection } from '@/components/landing/HeroSection';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { CodeShowcase } from '@/components/landing/CodeShowcase';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { CallToAction } from '@/components/landing/CallToAction';

export default function HomePage() {
  return (
    <main className="aponia-landing min-h-[100dvh] overflow-hidden">
      <HeroSection />
      <TrustStrip />
      <CodeShowcase />
      <FeaturesSection />
      <CallToAction />
    </main>
  );
}
