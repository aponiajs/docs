import Link from 'next/link';
import { ArrowRight, GitFork } from 'lucide-react';
import Image from 'next/image';

export function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-shell">
        <div className="cta-panel">
          <div className="cta-copy">
            <h2>Build with intention.</h2>
            <p>
              Begin with the core concepts and keep every architectural choice
              visible as the service grows.
            </p>
            <div className="cta-actions">
              <Link href="/docs" className="button button-light">
                Start building
                <ArrowRight className="size-4" strokeWidth={1.8} />
              </Link>
              <a
                href="https://github.com/aponiajs/aponiajs"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-dark-ghost"
              >
                <GitFork className="size-4" strokeWidth={1.8} />
                View source
              </a>
            </div>
          </div>
          <div className="cta-portrait" aria-hidden="true">
            <Image
              src="/images/aponia-reference.webp"
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 42vw"
              className="object-cover object-[50%_24%]"
            />
          </div>
          <span className="cta-monogram" aria-hidden="true">
            A
          </span>
        </div>
      </div>
      <footer className="site-footer">
        <p>AponiaJS. Released under the MIT License.</p>
        <div>
          <Link href="/docs">Documentation</Link>
          <a
            href="https://github.com/aponiajs/aponiajs"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
        <p className="site-footer-credit">
          Aponia character artwork © HoYoverse.
        </p>
      </footer>
    </section>
  );
}
