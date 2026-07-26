import Link from 'next/link';
import { ArrowRight, GitFork } from 'lucide-react';
import { HeroMascot } from './HeroMascot';

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="landing-grid" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            Bun-first. Type-safe. Deliberate.
          </p>
          <div>
            <h1>
              Architecture with <span>conviction.</span>
            </h1>
            <p className="hero-deck">
              Build structured server applications with Nest-inspired patterns,
              Elysia-native speed, and Bun at the core.
            </p>
          </div>
          <div className="hero-actions">
            <Link
              href="/docs"
              className="button button-primary"
            >
              Read the docs
              <ArrowRight className="size-4" strokeWidth={1.8} />
            </Link>
            <a
              href="https://github.com/aponiajs/aponiajs"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
            >
              <GitFork className="size-4" strokeWidth={1.8} />
              View GitHub
            </a>
          </div>
        </div>
        <HeroMascot />
      </div>
    </section>
  );
}
