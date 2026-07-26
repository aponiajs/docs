import Link from 'next/link';
import { ArrowRight, GitFork } from 'lucide-react';
import { HeroMascot } from './HeroMascot';

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="aponia-atmosphere" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="hero-eyebrow">Bun-first application framework</p>
          <div>
            <h1>
              Built with <span>discipline.</span>
            </h1>
            <p className="hero-deck">
              Familiar architecture, Elysia performance, and Bun at the core.
            </p>
          </div>
          <div className="hero-actions">
            <Link href="/docs" className="button button-primary">
              Start building
              <ArrowRight className="size-4" strokeWidth={1.8} />
            </Link>
            <a
              href="https://github.com/aponiajs/aponiajs"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
            >
              <GitFork className="size-4" strokeWidth={1.8} />
              View source
            </a>
          </div>
        </div>
        <HeroMascot />
      </div>
    </section>
  );
}
